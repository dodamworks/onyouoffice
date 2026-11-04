// Added by Dodam on 2026-11-03: balancing must retain every existing unit suite exactly once.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { execFileSync, spawnSync } from 'node:child_process'

const runner = new URL('./ci-workspaces.mjs', import.meta.url)
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
test('four balanced groups cover the serial test gate without gaps or duplicates', () => {
  const groups = JSON.parse(
    execFileSync(process.execPath, [fileURLToPath(runner), '--list'], { encoding: 'utf8' }),
  )
  const original = pkg.scripts.test.split(/\s*&&\s*/).map((command) => command.split(' -w ')[1])
  assert.deepEqual(Object.keys(groups), ['libraries', 'docs', 'sheets-shell', 'editors'])
  const actual = Object.values(groups).flat()
  assert.equal(new Set(actual).size, actual.length)
  assert.deepEqual([...actual].sort(), [...original].sort())
  assert.ok(groups.libraries.includes('@genoffice/cli'), 'CLI still has its native sidecar build')
  assert.ok(groups.docs.includes('@genoffice/docx-engine'))
  assert.ok(groups.editors.includes('@genoffice/pptx-engine'))
  assert.ok(groups.editors.includes('@genoffice/ui'))
})
test('unknown groups fail instead of silently running zero suites', () => {
  assert.notEqual(spawnSync(process.execPath, [fileURLToPath(runner), 'unknown']).status, 0)
})
