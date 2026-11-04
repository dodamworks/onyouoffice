// Added by Onyou Office on 2026-11-04: fail closed before private reports can enter Git or overwrite inputs.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync, execFileSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  copyFileSync,
  writeFileSync,
  readFileSync,
  linkSync,
  rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const secret = 'synthetic-only@example.invalid'
function fixture(body) {
  const dir = mkdtempSync(join(tmpdir(), 'onyou-readiness-test-'))
  const review = join(dir, '.local/review')
  const scripts = join(dir, '.agents/skills/onyou-release-readiness/scripts')
  mkdirSync(review, { recursive: true })
  mkdirSync(scripts, { recursive: true })
  mkdirSync(join(dir, 'tools'))
  const helper = join(scripts, 'check_local.py')
  copyFileSync(join(root, '.agents/skills/onyou-release-readiness/scripts/check_local.py'), helper)
  copyFileSync(
    join(root, 'tools/check-public-boundary.mjs'),
    join(dir, 'tools/check-public-boundary.mjs'),
  )
  const env = { ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' }
  const git = (...args) => execFileSync('git', args, { cwd: dir, env, stdio: 'pipe' })
  git('-c', 'init.templateDir=', 'init', '-q')
  writeFileSync(join(dir, '.gitignore'), '/.local/\n')
  const deny = join(review, 'deny.json')
  writeFileSync(deny, JSON.stringify([secret]))
  const run = (report = join(review, 'report.json'), args = []) => {
    const result = spawnSync(
      'python3',
      [helper, '--candidate', dir, '--deny-file', deny, '--report', report, ...args],
      { cwd: dir, env, encoding: 'utf8' },
    )
    assert.ifError(result.error)
    assert.equal((result.stdout + result.stderr).includes(secret), false)
    return { code: result.status, output: JSON.parse(result.stdout) }
  }
  try {
    body({ dir, review, deny, git, run })
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

test('public report destinations and non-JSON artifact paths are rejected', () =>
  fixture(({ dir, review, run }) => {
    assert.equal(run(join(dir, 'public.json')).code, 2)
    assert.equal(run(join(review, 'installer.dmg')).code, 2)
  }))
test('an unrelated private artifact cannot be overwritten', () =>
  fixture(({ review, run }) => {
    const report = join(review, 'existing.json')
    const original = JSON.stringify({ confidential: secret })
    writeFileSync(report, original)
    assert.equal(run(report).code, 2)
    assert.equal(readFileSync(report, 'utf8'), original)
  }))
test('hard-linked deny lists cannot be truncated as reports', () =>
  fixture(({ review, deny, run }) => {
    const report = join(review, 'hardlink.json')
    linkSync(deny, report)
    assert.equal(run(report).code, 2)
    assert.deepEqual(JSON.parse(readFileSync(deny, 'utf8')), [secret])
  }))
test('unsupported network guards fail closed rather than approving release', () =>
  fixture(({ dir, run }) => {
    writeFileSync(join(dir, 'sample.txt'), 'Clean synthetic content')
    const result = run()
    if (process.platform !== 'darwin') {
      assert.equal(result.code, 2)
      assert.equal(result.output.reason, 'network-denied-runner-required')
    } else {
      assert.equal(result.code, 0)
      assert.equal(result.output.releaseApproved, false)
    }
  }))
test(
  'macOS checks distinguish private text, binary omissions and staged content',
  { skip: process.platform !== 'darwin' },
  () =>
    fixture(({ dir, git, run }) => {
      const file = join(dir, 'sample.txt')
      writeFileSync(file, secret)
      assert.equal(run().code, 1)
      writeFileSync(file, Buffer.from([1, 0, 2]))
      assert.equal(run().code, 2)
      writeFileSync(file, 'Clean synthetic content')
      git('add', 'sample.txt')
      writeFileSync(file, secret)
      assert.equal(run(undefined, ['--staged']).code, 0)
      assert.equal(run().code, 1)
    }),
)
test(
  'macOS refuses forcibly tracked private report paths',
  { skip: process.platform !== 'darwin' },
  () =>
    fixture(({ review, git, run }) => {
      const report = join(review, 'tracked.json')
      const original = JSON.stringify({ checker: 'tools/check-public-boundary.mjs' })
      writeFileSync(report, original)
      git('add', '-f', '.local/review/tracked.json')
      assert.equal(run(report).code, 2)
      assert.equal(readFileSync(report, 'utf8'), original)
    }),
)
