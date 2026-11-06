// Added by Onyou Office: reuse verified font packages and bound mirror stalls.
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { lstatSync, mkdirSync, readFileSync, renameSync, rmSync } from 'node:fs'
import { basename, join } from 'node:path'
import { pathToFileURL } from 'node:url'

export const fontLock = JSON.parse(
  readFileSync(new URL('./ci-font-packages.json', import.meta.url)),
)
const mirrors = ['https://archive.ubuntu.com/ubuntu/', 'https://azure.archive.ubuntu.com/ubuntu/']

export function verifiedPackage(file, sha256) {
  try {
    return (
      lstatSync(file).isFile() &&
      createHash('sha256').update(readFileSync(file)).digest('hex') === sha256
    )
  } catch {
    return false
  }
}

export function ensureFontPackage(pkg, cache, run = execFileSync) {
  if (
    !/^pool\/(main|universe)\/f\/[a-z-]+\/[a-z0-9_.+%-]+\.deb$/.test(pkg.path) ||
    !/^[a-f0-9]{64}$/.test(pkg.sha256)
  ) {
    throw new Error('Invalid pinned font package')
  }
  mkdirSync(cache, { recursive: true })
  if (!lstatSync(cache).isDirectory()) throw new Error('Font cache must be a regular directory')
  const file = join(cache, basename(pkg.path))
  if (verifiedPackage(file, pkg.sha256)) return file
  rmSync(file, { force: true })
  const temporary = `${file}.partial`
  rmSync(temporary, { force: true })
  for (const mirror of mirrors) {
    try {
      run(
        'curl',
        [
          '--fail',
          '--location',
          '--silent',
          '--show-error',
          '--proto',
          '=https',
          '--proto-redir',
          '=https',
          '--connect-timeout',
          '15',
          '--max-time',
          '60',
          '--output',
          temporary,
          mirror + pkg.path,
        ],
        { timeout: 70000, maxBuffer: 1024 * 1024 },
      )
      if (!verifiedPackage(temporary, pkg.sha256)) throw new Error('Font package digest mismatch')
      renameSync(temporary, file)
      return file
    } catch {
      rmSync(temporary, { force: true })
    }
  }
  throw new Error(`Pinned font download failed: ${pkg.name}; no unverified package installed`)
}

export function installFonts(cache, run = execFileSync) {
  const files = fontLock.packages.map((pkg) => ensureFontPackage(pkg, cache, run))
  run('sudo', ['dpkg', '--install', ...files], { timeout: 90000, stdio: 'inherit' })
  run('fc-cache', ['-f'], { timeout: 60000, stdio: 'inherit' })
  for (const pkg of fontLock.packages) {
    const version = run('dpkg-query', ['-W', '-f=${Version}', pkg.name], {
      timeout: 10000,
      encoding: 'utf8',
    }).trim()
    if (version !== pkg.version) throw new Error(`Installed font version mismatch: ${pkg.name}`)
  }
  for (const family of ['Carlito', 'Caladea', 'Noto Sans CJK SC']) {
    const found = run('fc-match', ['--format', '%{family}', family], {
      timeout: 10000,
      encoding: 'utf8',
    })
    if (!found.split(',').includes(family))
      throw new Error(`Required font family missing: ${family}`)
  }
  console.log('Verified the pinned document font versions and families')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (
    process.platform !== 'linux' ||
    !readFileSync('/etc/os-release', 'utf8').includes(`VERSION_ID="${fontLock.ubuntu}"`)
  ) {
    throw new Error('Document font lock requires Ubuntu 22.04')
  }
  if (!process.env.RUNNER_TEMP) throw new Error('RUNNER_TEMP is required')
  installFonts(join(process.env.RUNNER_TEMP, 'onyou-font-packages'))
}
