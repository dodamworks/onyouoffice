// Modified by Onyou Office on 2026-11-02: read-only desktop development environment check.
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { dirname, resolve, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..')
const require = createRequire(resolve(root, 'package.json'))
const lock = JSON.parse(readFileSync(resolve(root, 'package-lock.json'), 'utf8'))
const checks = []
const add = (name, ok, detail) => checks.push({ name, ok, detail })
const command = (file, args) => {
  const r = spawnSync(file, args, { cwd: root, encoding: 'utf8', timeout: 15000 })
  return { ok: r.status === 0, text: (r.stdout || r.stderr || String(r.error)).trim() }
}
add('Node 24', process.versions.node.split('.')[0] === '24', process.version)
for (const [name, args] of [
  ['npm', ['--version']],
  ['cargo', ['--version']],
  ['rustc', ['--version']],
  ['git', ['--version']],
]) {
  const r = command(name, args)
  add(name, r.ok, r.text)
}
const git = command('git', ['rev-parse', '--show-toplevel'])
add('Git root', git.ok && realpathSync(git.text) === realpathSync(root), git.text)
for (const name of ['@genoffice/shell', '@genoffice/ui', '@genoffice/i18n']) {
  try {
    const path = realpathSync(resolve(root, 'node_modules', name, 'package.json'))
    const rel = relative(realpathSync(root), path)
    add(name, !rel.startsWith('..') && !isAbsolute(rel), rel)
  } catch (e) {
    add(name, false, e.message)
  }
}
for (const name of ['@playwright/test', 'playwright-core', 'vitest', 'typescript']) {
  try {
    const installed = require(`${name}/package.json`).version
    const locked = lock.packages[`node_modules/${name}`]?.version
    add(name, installed === locked, `${installed}; lock ${locked}`)
  } catch (e) {
    add(name, false, e.message)
  }
}
try {
  const binary = require('electron')
  add('Electron executable', existsSync(binary), binary)
} catch (e) {
  add('Electron executable', false, e.message)
}
// Machine-local integrations are optional on a fresh checkout.
const chrome = resolve(root, '.local/devtools/node_modules/chrome-devtools-mcp/package.json')
const optionalLocal = {
  projectConfigPresent: existsSync(resolve(root, '.codex/config.toml')),
  chromeDevtoolsVersion: existsSync(chrome)
    ? JSON.parse(readFileSync(chrome, 'utf8')).version
    : null,
}
const builds = [
  'shell',
  'docs',
  'sheets',
  'slides',
  'pdf',
  'markdown',
  'html',
  'mindmap',
  'hwp',
  'epub',
].map((name) => ({
  name,
  exists: existsSync(resolve(root, `apps/${name}/out/renderer/index.html`)),
}))
console.log(
  JSON.stringify(
    { root, passed: checks.every((c) => c.ok), checks, optionalLocal, buildPresenceOnly: builds },
    null,
    2,
  ),
)
if (checks.some((c) => !c.ok)) process.exitCode = 1
