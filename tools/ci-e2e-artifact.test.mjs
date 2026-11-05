// Added by Onyou Office on 2026-11-03: reject stale/cross-platform or incomplete builds.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { applications, verifyIdentity, verifyRuntime } from './ci-e2e-artifact.mjs'

const identity = {
  commit: 'a'.repeat(40),
  tree: 'b'.repeat(40),
  lock: 'c'.repeat(64),
  platform: 'linux',
  arch: 'x64',
  node: 'v24.18.0',
  image: 'ubuntu22',
}
test('only the exact build identity can be restored', () => {
  assert.doesNotThrow(() => verifyIdentity({ ...identity }, identity))
  for (const key of Object.keys(identity)) {
    assert.throws(
      () => verifyIdentity({ ...identity, [key]: 'different' }, identity),
      new RegExp(key),
    )
    const missing = { ...identity }
    delete missing[key]
    assert.throws(() => verifyIdentity(missing, identity), new RegExp(key))
  }
  assert.throws(() => verifyIdentity(null, identity))
})

test('runtime completeness and native executable permission are mandatory', () => {
  const root = mkdtempSync(join(tmpdir(), 'onyou-ci-build-'))
  const write = (file) => {
    mkdirSync(dirname(join(root, file)), { recursive: true })
    writeFileSync(join(root, file), 'fixture')
  }
  try {
    for (const app of applications) {
      for (const file of ['main/index.js', 'preload/index.js', 'renderer/index.html']) {
        write(`apps/${app}/out/${file}`)
      }
    }
    write('packages/cli/dist/genoffice.cjs')
    const binary = `apps/sheets/native/xlsx-engine/target/release/xlsx-sidecar${process.platform === 'win32' ? '.exe' : ''}`
    assert.throws(() => verifyRuntime(root))
    write(binary)
    if (process.platform !== 'win32') assert.throws(() => verifyRuntime(root))
    chmodSync(join(root, binary), 0o755)
    assert.doesNotThrow(() => verifyRuntime(root))
    assert.ok(applications.includes('diagram'))
    rmSync(join(root, 'apps/diagram/out/renderer/index.html'))
    assert.throws(() => verifyRuntime(root))
    write('apps/diagram/out/renderer/index.html')
    rmSync(join(root, 'apps/hwp/out/renderer/index.html'))
    assert.throws(() => verifyRuntime(root))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('all CI jobs select one exact Node patch for shared build verification', () => {
  const workflow = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8')
  assert.match(workflow, /CI_NODE_VERSION: '24\.\d+\.\d+'/)
  const versions = [...workflow.matchAll(/node-version: (.+)/g)].map((match) => match[1].trim())
  const setups = [...workflow.matchAll(/uses: actions\/setup-node@/g)]
  assert.ok(setups.length > 1)
  assert.equal(versions.length, setups.length)
  for (const version of versions) assert.equal(version, '${{ env.CI_NODE_VERSION }}')
})
