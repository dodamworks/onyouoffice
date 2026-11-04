// Added by Dodam on 2026-11-01: run the unchanged unit suites on isolated CI runners.
import { readFileSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const root = new URL('../', import.meta.url)
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'))
const commands = pkg.scripts.test.split(/\s*&&\s*/)
const names = commands.map((command) => {
  const match = /^npm run test -w (@genoffice\/[\w-]+)$/.exec(command)
  if (!match) throw new Error(`Unsupported test command: ${command}`)
  return match[1]
})
if (!names.length || new Set(names).size !== names.length)
  throw new Error('The serial test gate must contain unique workspaces')

const libraryNames = new Set(
  readdirSync(new URL('packages/', root), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const path = new URL(`packages/${entry.name}/package.json`, root)
      try {
        return JSON.parse(readFileSync(path, 'utf8')).name
      } catch (error) {
        if (error.code === 'ENOENT') return null
        throw error
      }
    }),
)
const documentNames = new Set(['@genoffice/sheets', '@genoffice/shell'])
// Measured in run 41511617359: libraries took 20m while docs/editors took 11m/10m.
// Move existing suites, never remove them or run a workspace more than once.
const balanced = {
  '@genoffice/docx-engine': 'docs',
  '@genoffice/pptx-engine': 'editors',
  '@genoffice/ui': 'editors',
}
const groups = { libraries: [], docs: [], 'sheets-shell': [], editors: [] }
for (const name of names) {
  const group =
    balanced[name] ??
    (libraryNames.has(name)
      ? 'libraries'
      : name === '@genoffice/docs'
        ? 'docs'
        : documentNames.has(name)
          ? 'sheets-shell'
          : 'editors')
  groups[group].push(name)
}

const group = process.argv[2]
if (group === '--list') {
  console.log(JSON.stringify(groups, null, 2))
} else {
  if (!Object.hasOwn(groups, group) || !groups[group].length)
    throw new Error(`Unknown or empty CI group: ${group}`)
  for (const name of groups[group]) {
    console.log(`\n[unit:${group}] ${name}`)
    const result = spawnSync('npm', ['run', 'test', '-w', name], {
      cwd: root,
      stdio: 'inherit',
      env: process.env,
    })
    if (result.error) throw result.error
    if (result.status !== 0) process.exit(result.status ?? 1)
  }
}
