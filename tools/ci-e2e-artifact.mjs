// Added by Dodam on 2026-11-03: verify a build shared only within one CI run.
import { accessSync, constants, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const applications = [
  'docs',
  'sheets',
  'slides',
  'pdf',
  'markdown',
  'html',
  'mindmap',
  'hwp',
  'epub',
  'shell',
]
const root = fileURLToPath(new URL('../', import.meta.url))
const metadata = 'apps/shell/out/ci-build.json'

export function buildIdentity(directory = root) {
  const git = (...args) => execFileSync('git', args, { cwd: directory, encoding: 'utf8' }).trim()
  return {
    commit: git('rev-parse', 'HEAD'),
    tree: git('rev-parse', 'HEAD^{tree}'),
    lock: createHash('sha256')
      .update(readFileSync(resolve(directory, 'package-lock.json')))
      .digest('hex'),
    platform: process.platform,
    arch: process.arch,
    node: process.version,
    image: process.env.ImageOS ?? 'local',
  }
}

export function verifyIdentity(actual, expected) {
  for (const [key, value] of Object.entries(expected)) {
    if (typeof actual?.[key] !== 'string' || actual[key] !== value) {
      throw new Error(`Electron build identity mismatch: ${key}`)
    }
  }
}

export function verifyRuntime(directory = root) {
  for (const name of applications) {
    for (const file of ['main/index.js', 'preload/index.js', 'renderer/index.html']) {
      accessSync(resolve(directory, `apps/${name}/out/${file}`), constants.R_OK)
    }
  }
  accessSync(resolve(directory, 'packages/cli/dist/genoffice.cjs'), constants.R_OK)
  const binary = `apps/sheets/native/xlsx-engine/target/release/xlsx-sidecar${process.platform === 'win32' ? '.exe' : ''}`
  accessSync(resolve(directory, binary), constants.R_OK | constants.X_OK)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const identity = buildIdentity()
  verifyRuntime()
  if (process.argv[2] === 'write') {
    writeFileSync(resolve(root, metadata), `${JSON.stringify(identity, null, 2)}\n`)
  } else if (process.argv[2] === 'verify') {
    verifyIdentity(JSON.parse(readFileSync(resolve(root, metadata), 'utf8')), identity)
    console.log('Verified same-commit, same-platform Electron runtime and executable sidecar')
  } else {
    throw new Error('Usage: node tools/ci-e2e-artifact.mjs write|verify')
  }
}
