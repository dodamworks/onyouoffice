import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  renameSync,
  chmodSync,
  symlinkSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { classifyChange, referenceOnly, verifyCiResult } from './ci-scope.mjs'

test('reference documents and data qualify only outside runtime and policy surfaces', () => {
  assert.equal(referenceOnly(['docs/dodam/README.md', 'docs/dodam/codebase/README.md']), true)
  for (const path of [
    'apps/docs/src/main/docs-main.ts',
    'apps/shell/i18n/help/topics/start.en.md',
    'skills/onyouoffice/SKILL.md',
    'packages/i18n/src/product.ts',
    'package-lock.json',
    '.github/workflows/ci.yml',
    'tools/ci-scope.mjs',
    'docs/third-party/LICENSE-UNICODE.txt',
    'docs/dodam/script.mjs',
  ]) {
    assert.equal(referenceOnly(['docs/dodam/README.md', path]), false, path)
  }
  assert.equal(
    referenceOnly([
      'README.md',
      'docs/plans/diagram.svg',
      'docs/design/font.woff2',
      'docs/design/spec.json',
    ]),
    true,
  )
  for (const path of [
    'docs/../tools/data.json',
    '/docs/data.json',
    'docs/script.py',
    'docs/page.html',
    'docs/unknown.zip',
    'apps/shell/build/brand/icon.svg',
    'packages/ui/font.woff2',
  ]) {
    assert.equal(referenceOnly([path]), false, path)
  }
  assert.equal(referenceOnly([]), false)
  for (const path of [
    'docs/dodam/CI-POLICY.md',
    'docs/dodam/SOURCE-FIRST.md',
    'docs/standards.md',
    'docs/dodam/codebase/DEVELOPMENT.md',
  ]) {
    assert.equal(referenceOnly([path]), false, 'CI policy prose requires full validation')
  }
})

test('manual, malformed and unavailable comparisons retain full CI', () => {
  const unavailable = () => {
    throw new Error('missing history')
  }
  assert.equal(classifyChange('workflow_dispatch', {}, unavailable).full_ci, true)
  assert.equal(classifyChange('unknown', {}, unavailable).full_ci, true)
  assert.equal(classifyChange('pull_request', {}, () => 'a'.repeat(40)).full_ci, true)
  assert.equal(classifyChange('push', {}, unavailable).full_ci, true)
})

test('real Git ranges include earlier PR code, renames, and the current merge base', () => {
  const root = mkdtempSync(join(tmpdir(), 'onyou-ci-scope-'))
  const git = (args) =>
    execFileSync(
      'git',
      [
        '-c',
        'user.name=CI scope fixture',
        '-c',
        'user.email=ci@example.invalid',
        '-c',
        'commit.gpgSign=false',
        '-c',
        'core.hooksPath=/dev/null',
        ...args,
      ],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    )
  const write = (path, text) => {
    mkdirSync(dirname(join(root, path)), { recursive: true })
    writeFileSync(join(root, path), text)
  }
  const commit = () => {
    git(['add', '.'])
    git(['commit', '-m', 'fixture'])
    return git(['rev-parse', 'HEAD']).trim()
  }
  const pr = (sha) => classifyChange('pull_request', { pull_request: { head: { sha } } }, git)
  try {
    git(['init', '-b', 'main'])
    write('code.ts', 'export const value = 1\n')
    const initial = commit()
    git(['checkout', '-b', 'docs'])
    write('docs/dodam/codebase/README.md', 'architecture\n')
    const docs = commit()
    git(['checkout', 'main'])
    write('unrelated.ts', 'export const other = 1\n')
    const newBase = commit()
    git(['merge', '--no-ff', 'docs', '-m', 'merge fixture'])
    assert.equal(pr(docs).full_ci, false, 'new main code is not attributed to the documentation PR')
    assert.equal(
      classifyChange('push', { before: newBase, after: git(['rev-parse', 'HEAD']).trim() }, git)
        .full_ci,
      false,
    )
    assert.equal(pr(initial).full_ci, true, 'an unverified checkout does not qualify')
    assert.equal(classifyChange('push', { before: '0'.repeat(40), after: docs }, git).full_ci, true)

    git(['checkout', '-b', 'code-then-docs', newBase])
    write('code.ts', 'export const value = 2\n')
    commit()
    write('docs/dodam/codebase/README.md', 'updated architecture\n')
    const mixed = commit()
    git(['checkout', '-b', 'mixed-merge', newBase])
    git(['merge', '--no-ff', 'code-then-docs', '-m', 'mixed fixture'])
    assert.equal(
      pr(mixed).full_ci,
      true,
      'a documentation-only last commit cannot hide earlier code',
    )

    git(['checkout', '-b', 'renamed-code', newBase])
    mkdirSync(join(root, 'docs/dodam'), { recursive: true })
    renameSync(join(root, 'code.ts'), join(root, 'docs/dodam/moved.md'))
    const renamed = commit()
    assert.equal(classifyChange('push', { before: newBase, after: renamed }, git).full_ci, true)
    assert.equal(
      classifyChange('push', { before: 'f'.repeat(40), after: renamed }, git).full_ci,
      true,
    )
    git(['checkout', '-b', 'test-fixture-base', newBase])
    write(
      'package.json',
      JSON.stringify({
        workspaces: ['apps/*', 'packages/*'],
        scripts: { test: 'npm run test -w @genoffice/html' },
      }),
    )
    write('apps/html/package.json', JSON.stringify({ name: '@genoffice/html' }))
    write('apps/html/vitest.config.ts', "include: ['tests/**/*.test.ts']\n")
    const testBase = commit()
    write('apps/html/tests/print.test.ts', 'export const assertion = true\n')
    const testOnly = commit()
    const unitPlan = classifyChange('push', { before: testBase, after: testOnly }, git)
    assert.equal(unitPlan.unit_required, true)
    assert.equal(unitPlan.e2e_required, false)
    assert.equal(unitPlan.full_ci, false)
    git(['checkout', '-b', 'test-pr-merge', testBase])
    git(['merge', '--no-ff', 'test-fixture-base', '-m', 'test-only merge'])
    assert.equal(pr(testOnly).e2e_required, false)
    git(['checkout', '-b', 'product-then-test', testBase])
    write('code.ts', 'export const value = 99\n')
    commit()
    write('apps/html/tests/print.test.ts', 'export const assertion = true\n')
    const sourceAndTest = commit()
    assert.equal(
      classifyChange('push', { before: testBase, after: sourceAndTest }, git).full_ci,
      true,
    )
    git(['checkout', '-b', 'delete-test', testOnly])
    rmSync(join(root, 'apps/html/tests/print.test.ts'))
    const removed = commit()
    assert.equal(classifyChange('push', { before: testOnly, after: removed }, git).full_ci, true)

    git(['checkout', '-b', 'reference-modes', newBase])
    write('docs/guide.md', 'guide\n')
    const regular = commit()
    chmodSync(join(root, 'docs/guide.md'), 0o755)
    const executable = commit()
    assert.equal(classifyChange('push', { before: regular, after: executable }, git).full_ci, true)
    symlinkSync('../code.ts', join(root, 'docs/link.md'))
    const symlink = commit()
    assert.equal(classifyChange('push', { before: executable, after: symlink }, git).full_ci, true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('final CI status rejects failed, cancelled, missing or unexpectedly skipped jobs', () => {
  const needs = (flag, state) => ({
    scope: {
      result: 'success',
      outputs: {
        full_ci: flag,
        reference_check: 'true',
        checks_required: flag,
        unit_required: flag,
        e2e_required: flag,
      },
    },
    references: { result: 'success' },
    checks: { result: state },
    unit: { result: state },
    'e2e-build': { result: state },
    e2e: { result: state },
  })
  assert.match(verifyCiResult(needs('false', 'skipped')), /references/)
  assert.match(verifyCiResult(needs('true', 'success')), /passed/)
  const noReferences = needs('true', 'success')
  noReferences.scope.outputs.reference_check = 'false'
  noReferences.references.result = 'skipped'
  assert.match(verifyCiResult(noReferences), /passed/)
  noReferences.scope.outputs.full_ci = 'false'
  for (const key of ['checks_required', 'unit_required', 'e2e_required'])
    noReferences.scope.outputs[key] = 'false'
  for (const job of ['checks', 'unit', 'e2e-build', 'e2e']) noReferences[job].result = 'skipped'
  assert.throws(() => verifyCiResult(noReferences), /requires reference validation/)
  for (const state of ['failure', 'cancelled', 'skipped']) {
    assert.throws(() => verifyCiResult(needs('true', state)))
  }
  assert.throws(() => verifyCiResult(needs('false', 'success')))
  assert.throws(() => verifyCiResult(needs('unknown', 'skipped')))
  assert.throws(() =>
    verifyCiResult({ ...needs('false', 'skipped'), scope: { result: 'failure' } }),
  )
  assert.throws(() => verifyCiResult({ ...needs('true', 'success'), e2e: undefined }))
  for (const state of ['failure', 'cancelled', 'skipped', undefined]) {
    assert.throws(() =>
      verifyCiResult({ ...needs('true', 'success'), 'e2e-build': { result: state } }),
    )
  }
  for (const state of ['failure', 'cancelled', 'skipped']) {
    assert.throws(() =>
      verifyCiResult({ ...needs('false', 'skipped'), references: { result: state } }),
    )
  }
  assert.throws(() => verifyCiResult({ ...needs('false', 'skipped'), references: undefined }))
})

test('the required workflow aggregate runs even after dependency cancellation', () => {
  const workflow = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8')
  const aggregate = workflow.split('\n  result:\n')[1]
  assert.ok(aggregate, 'CI result job must exist')
  assert.match(aggregate, /^ {4}if: \$\{\{ always\(\) \}\}$/m)
  assert.match(aggregate, /^ {4}needs: \[scope, references, checks, unit, e2e-build, e2e\]$/m)
})
