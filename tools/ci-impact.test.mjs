// Added by Onyou Office on 2026-11-03: test-only routes must not hide product or helper changes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { testImpact, validationPlan, verifyCiResult } from './ci-scope.mjs'
import { proofMatches } from './ci-reuse.mjs'

const git = (args) => {
  const files = {
    'head:package.json': JSON.stringify({
      workspaces: ['apps/*', 'packages/*'],
      scripts: { test: 'npm run test -w @genoffice/html && npm run test -w @genoffice/epub' },
    }),
    'head:apps/html/package.json': JSON.stringify({ name: '@genoffice/html' }),
    'head:apps/epub/package.json': JSON.stringify({ name: '@genoffice/epub' }),
    'head:apps/unknown/package.json': JSON.stringify({ name: '@genoffice/unknown' }),
    'head:apps/html/vitest.config.ts': "include: ['tests/**/*.test.ts']",
    'head:apps/epub/vitest.config.ts': "include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx']",
    'head:apps/unknown/vitest.config.ts': "include: ['tests/**/*.test.ts']",
  }
  if (!(args[1] in files)) throw new Error('unavailable source')
  return files[args[1]]
}

test('known unit entry files retain all unit coverage without unrelated E2E', () => {
  const plan = testImpact(
    ['apps/html/tests/print.test.ts', 'apps/epub/tests/reader.test.tsx', 'docs/note.md'],
    git,
    'head',
  )
  assert.deepEqual(plan, {
    full_ci: false,
    checks_required: true,
    unit_required: true,
    e2e_required: false,
  })
})

test('a same-named package outside active workspace patterns cannot narrow validation', () => {
  const excluded = (args) =>
    args[1] === 'head:package.json'
      ? JSON.stringify({
          workspaces: ['packages/*'],
          scripts: { test: 'npm run test -w @genoffice/html' },
        })
      : git(args)
  assert.equal(testImpact(['apps/html/tests/print.test.ts'], excluded, 'head').full_ci, true)
})

test('top-level E2E specs retain the complete integration suite without unrelated units', () => {
  assert.deepEqual(
    testImpact(['e2e/docs-spell-suggestions.spec.ts', 'docs/note.md'], git, 'head'),
    { full_ci: false, checks_required: true, unit_required: false, e2e_required: true },
  )
})

test('mixed tests, code, configuration, fixtures, helpers and unknown entries retain full CI', () => {
  for (const paths of [
    ['apps/html/tests/print.test.ts', 'apps/html/src/renderer/App.tsx'],
    ['apps/html/tests/print.test.ts', 'e2e/html.spec.ts'],
    ['apps/html/tests/print.test.ts', '.github/workflows/ci.yml'],
    ['apps/html/tests/print.test.ts', 'docs/dodam/CI-POLICY.md'],
    ['apps/html/tests/fixtures/fake.test.ts'],
    ['apps/html/tests/helpers/fake.test.ts'],
    ['apps/html/tests/helper.ts'],
    ['e2e/helpers.ts'],
    ['e2e/playwright.config.ts'],
    ['e2e/visual-baselines/image.png'],
    ['apps/unknown/tests/a.test.ts'],
    ['apps/html/tests/not-in-config.test.tsx'],
    ['package-lock.json'],
    ['packages/xlsx-gateway/src/index.ts'],
    ['e2e/nested/foo.spec.ts'],
  ])
    assert.equal(testImpact(paths, git, 'head').full_ci, true, paths.join(','))
  assert.equal(
    testImpact(
      ['apps/html/tests/print.test.ts'],
      () => {
        throw new Error('missing Git')
      },
      'head',
    ).full_ci,
    true,
  )
})

const profiles = [
  {
    full_ci: true,
    reference_check: true,
    checks_required: true,
    unit_required: true,
    e2e_required: true,
  },
  {
    full_ci: false,
    reference_check: true,
    checks_required: false,
    unit_required: false,
    e2e_required: false,
  },
  {
    full_ci: false,
    reference_check: false,
    checks_required: true,
    unit_required: true,
    e2e_required: false,
  },
  {
    full_ci: false,
    reference_check: true,
    checks_required: true,
    unit_required: false,
    e2e_required: true,
  },
]
const outputs = (p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)]))
const needsFor = (p) => ({
  scope: { result: 'success', outputs: outputs(p) },
  ...Object.fromEntries(
    Object.entries({
      references: p.reference_check,
      checks: p.checks_required,
      unit: p.unit_required,
      'e2e-build': p.e2e_required,
      e2e: p.e2e_required,
    }).map(([k, v]) => [k, { result: v ? 'success' : 'skipped' }]),
  ),
})

test('every route rejects failed, cancelled, missing and unexpected results', () => {
  for (const plan of profiles) {
    assert.deepEqual(validationPlan(outputs(plan)), plan)
    assert.match(verifyCiResult(needsFor(plan)), /passed|validated/)
    for (const job of ['references', 'checks', 'unit', 'e2e-build', 'e2e']) {
      const expected = needsFor(plan)[job].result
      for (const state of [
        'failure',
        'cancelled',
        undefined,
        expected === 'success' ? 'skipped' : 'success',
      ]) {
        assert.throws(() => verifyCiResult({ ...needsFor(plan), [job]: { result: state } }))
      }
    }
    for (const field of Object.keys(plan)) {
      const incomplete = outputs(plan)
      delete incomplete[field]
      assert.throws(() => validationPlan(incomplete))
    }
  }
  assert.throws(() => validationPlan(outputs({ ...profiles[0], e2e_required: false })))
  assert.throws(() => validationPlan(outputs({ ...profiles[2], e2e_required: true })))
})

test('scoped proof cannot be presented as full validation or reused for another plan', () => {
  const candidate = { base: 'a'.repeat(40), head: 'b'.repeat(40), tree: 'c'.repeat(40) }
  const env = {
    node: 'v24.22.1',
    platform: 'linux',
    arch: 'x64',
    image: 'ubuntu24',
    imageVersion: 'version',
  }
  const now = Date.now()
  const run = {
    id: 123,
    run_attempt: 1,
    event: 'pull_request',
    path: '.github/workflows/ci.yml',
    status: 'completed',
    conclusion: 'success',
    head_sha: candidate.head,
    repository: { full_name: 'dodamworks/onyouoffice' },
    head_repository: { full_name: 'dodamworks/onyouoffice' },
    updated_at: new Date(now).toISOString(),
  }
  const proof = {
    ...candidate,
    version: 2,
    full_ci: false,
    plan: profiles[2],
    checkout: 'd'.repeat(40),
    repository: 'dodamworks/onyouoffice',
    workflow: run.path,
    run_id: '123',
    attempt: 1,
    environment: env,
  }
  const match = (p, plan) => proofMatches(p, run, candidate, proof.repository, env, now, plan)
  assert.equal(match(proof, profiles[2]), true)
  assert.equal(match(proof, profiles[0]), false)
  assert.equal(match(proof, profiles[3]), false)
  assert.equal(match(proof, undefined), false)
  assert.equal(match({ ...proof, full_ci: true }, profiles[2]), false)
  assert.equal(match({ ...proof, version: 1 }, profiles[2]), false)
  const reused = needsFor(profiles[2])
  for (const job of ['references', 'checks', 'unit', 'e2e-build', 'e2e'])
    reused[job].result = 'skipped'
  reused.scope.outputs.reused_run_id = '123'
  assert.match(verifyCiResult(reused), /reuses successful PR validation/)
})
