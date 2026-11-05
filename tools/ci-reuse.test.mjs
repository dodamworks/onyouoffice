// Added by Onyou Office on 2026-11-03: main may reuse only recent, complete, identical PR validation.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mergeCandidate, proofMatches } from './ci-reuse.mjs'
import { verifyCiResult } from './ci-scope.mjs'

const current = 'a'.repeat(40),
  base = 'b'.repeat(40),
  head = 'c'.repeat(40),
  tree = 'd'.repeat(40)
const event = { ref: 'refs/heads/main', before: base, after: current }
const candidate = { commit: current, base, head, tree }
const env = {
  node: 'v24.18.0',
  platform: 'linux',
  arch: 'x64',
  image: 'ubuntu24',
  imageVersion: '20261025.1.0',
}
const now = Date.parse('2026-11-03T00:00:00Z')
const run = {
  id: 123,
  run_attempt: 2,
  event: 'pull_request',
  path: '.github/workflows/ci.yml',
  status: 'completed',
  conclusion: 'success',
  head_sha: head,
  repository: { full_name: 'dodamworks/onyouoffice' },
  head_repository: { full_name: 'dodamworks/onyouoffice' },
  updated_at: new Date(now - 60_000).toISOString(),
}
const proof = {
  version: 1,
  full_ci: true,
  repository: 'dodamworks/onyouoffice',
  workflow: '.github/workflows/ci.yml',
  run_id: '123',
  attempt: 2,
  checkout: 'e'.repeat(40),
  base,
  head,
  tree,
  environment: env,
}
const matches = (p = proof, r = run, c = candidate, e = env) =>
  proofMatches(p, r, c, 'dodamworks/onyouoffice', e, now)

test('only a verified single main merge can look for reuse', () => {
  assert.deepEqual(mergeCandidate('push', event, current, [base, head], tree), candidate)
  for (const kind of ['pull_request', 'workflow_dispatch'])
    assert.equal(mergeCandidate(kind, event, current, [base, head], tree), null)
  for (const change of [{ ref: 'refs/heads/topic' }, { before: head }, { after: head }])
    assert.equal(mergeCandidate('push', { ...event, ...change }, current, [base, head], tree), null)
  for (const parents of [[base], [base, head, current], [head, base]])
    assert.equal(mergeCandidate('push', event, current, parents, tree), null)
  assert.equal(mergeCandidate('push', event, current, [base, head], 'invalid'), null)
})

test('exact successful full proof can be reused; content and run identity cannot drift', () => {
  assert.equal(matches(), true)
  for (const key of ['base', 'head', 'tree', 'repository', 'workflow', 'run_id', 'checkout'])
    assert.equal(matches({ ...proof, [key]: 'different' }), false, key)
  for (const change of [{ full_ci: false }, { version: 2 }, { attempt: 1 }, { environment: {} }])
    assert.equal(matches({ ...proof, ...change }), false)
  assert.equal(matches(null), false)
  assert.equal(matches(proof, run, null), false)
  for (const key of Object.keys(env))
    assert.equal(matches(proof, run, candidate, { ...env, [key]: 'different' }), false, key)
  assert.equal(matches(proof, run, candidate, { ...env, imageVersion: '' }), false)
})

test('failed, pending, foreign, stale and previous-attempt results never authorize reuse', () => {
  for (const change of [
    { event: 'push' },
    { path: '.github/workflows/other.yml' },
    { status: 'in_progress' },
    { conclusion: 'failure' },
    { conclusion: 'cancelled' },
    { head_sha: base },
    { repository: { full_name: 'other/repo' } },
    { head_repository: { full_name: 'other/repo' } },
    { run_attempt: 3 },
    { id: '123' },
    { updated_at: 'invalid' },
    { updated_at: new Date(now + 1).toISOString() },
    { updated_at: new Date(now - 24 * 60 * 60 * 1000 - 1).toISOString() },
  ])
    assert.equal(matches(proof, { ...run, ...change }), false, JSON.stringify(change))
})

test('the aggregate distinguishes proven reuse from missing or failed new validation', () => {
  const jobs = Object.fromEntries(
    ['references', 'checks', 'unit', 'e2e-build', 'e2e'].map((name) => [
      name,
      { result: 'skipped' },
    ]),
  )
  const needs = {
    scope: {
      result: 'success',
      outputs: {
        full_ci: 'true',
        reference_check: 'true',
        checks_required: 'true',
        unit_required: 'true',
        e2e_required: 'true',
        reused_run_id: '123',
      },
    },
    ...jobs,
  }
  assert.match(verifyCiResult(needs), /reuses successful PR validation 123/)
  for (const job of Object.keys(jobs)) {
    for (const state of ['failure', 'cancelled', 'success', undefined])
      assert.throws(() => verifyCiResult({ ...needs, [job]: { result: state } }))
  }
  for (const id of ['', '0', 'unverified'])
    assert.throws(() =>
      verifyCiResult({
        ...needs,
        scope: { ...needs.scope, outputs: { ...needs.scope.outputs, reused_run_id: id } },
      }),
    )
  assert.throws(() =>
    verifyCiResult({
      ...needs,
      scope: { ...needs.scope, outputs: { ...needs.scope.outputs, full_ci: 'false' } },
    }),
  )
})
