// Added by Dodam on 2026-11-04: protect public candidates without exposing private input.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { blockedPath, privateMatches, checkBoundary } from './check-public-boundary.mjs'

test('private developer directories remain blocked even when forcibly added', () => {
  for (const path of [
    '.local/profile/settings.json',
    '.codex/config.toml',
    '.aws/credentials',
    'working_dir/customer.docx',
  ]) {
    assert.equal(blockedPath(path), true)
  }
  assert.equal(blockedPath('docs/local-development.md'), false)
  assert.equal(blockedPath('.agents/skills/desktop/SKILL.md'), false)
})

test('identifiers match case-insensitively without being included in the result', () => {
  const deny = ['person@other.example', '/Users/example-person']
  const result = privateMatches(
    Buffer.from('Contact PERSON@OTHER.EXAMPLE under /Users/example-person/docs'),
    deny,
  )
  assert.equal(result, 2)
  assert.equal(privateMatches(Buffer.from('Corporate support and upstream credits'), deny), 0)
})

test('binary data is explicitly uninspected rather than reported as clean text', () => {
  assert.equal(privateMatches(Buffer.from([1, 0, 2]), ['private']), null)
})

test('a clean working file cannot hide a private identifier already staged for publication', () => {
  const root = mkdtempSync(join(tmpdir(), 'onyou-public-boundary-'))
  const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' })
  try {
    git('init', '-q')
    writeFileSync(join(root, 'note.md'), 'person@other.example')
    git('add', 'note.md')
    writeFileSync(join(root, 'note.md'), 'Redacted public note')
    const deny = ['person@other.example']
    assert.equal(checkBoundary({ root, deny }).passed, true)
    const staged = checkBoundary({ root, deny, staged: true })
    assert.equal(staged.passed, false)
    assert.deepEqual(staged.failures, [
      { kind: 'private-identifier', path: 'note.md', matchedRules: 1 },
    ])
    assert.equal(JSON.stringify(staged).includes(deny[0]), false)
    assert.throws(() => checkBoundary({ root, deny: [] }), /deny list/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('maintainer mode rejects an identity injected through the environment', () => {
  const root = mkdtempSync(join(tmpdir(), 'onyou-maintainer-boundary-'))
  const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' })
  const prior = process.env.GIT_AUTHOR_EMAIL
  try {
    git('init', '-q')
    git('config', 'user.name', 'Onyou Office')
    git('config', 'user.email', '269674695+dodamworks@users.noreply.github.com')
    git('config', 'credential.https://github.com.username', 'dodamworks')
    git('remote', 'add', 'origin', 'https://github.com/dodamworks/onyouoffice.git')
    assert.equal(
      checkBoundary({ root, deny: ['private-test-value'], maintainer: true }).passed,
      true,
    )
    process.env.GIT_AUTHOR_EMAIL = 'wrong-identity@example.invalid'
    const result = checkBoundary({ root, deny: ['private-test-value'], maintainer: true })
    assert.equal(result.passed, false)
    assert.deepEqual(result.failures, [
      { kind: 'effective-maintainer-identity', field: 'GIT_AUTHOR_IDENT' },
    ])
  } finally {
    if (prior === undefined) delete process.env.GIT_AUTHOR_EMAIL
    else process.env.GIT_AUTHOR_EMAIL = prior
    rmSync(root, { recursive: true, force: true })
  }
})

test('internal records and downloaded helpers are ignored while shared verification remains public', () => {
  const root = mkdtempSync(join(tmpdir(), 'onyou-ignore-boundary-'))
  const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' })
  const privatePaths = [
    '.local/internal/decisions.md',
    'AGENTS.local.md',
    'CLAUDE.local.md',
    'INTERNAL.md',
    '.agents/product-marketing.md',
    'docs/dodam/VALIDATION-SUMMARY.json',
    '.agents/skills/commit-work/SKILL.md',
    '.agents/skills/crafting-effective-readmes/SKILL.md',
  ]
  try {
    git('-c', 'init.templateDir=', 'init', '-q')
    writeFileSync(join(root, '.gitignore'), readFileSync(new URL('../.gitignore', import.meta.url)))
    for (const path of privatePaths) {
      git('check-ignore', '--no-index', '-q', '--', path)
      assert.equal(blockedPath(path), true)
    }
    for (const path of [
      'AGENTS.md',
      'LICENSE',
      'NOTICE',
      'CONTRIBUTING.md',
      '.agents/skills/onyou-release-readiness/SKILL.md',
    ]) {
      assert.equal(blockedPath(path), false)
      assert.throws(() => git('check-ignore', '--no-index', '-q', '--', path))
    }
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
