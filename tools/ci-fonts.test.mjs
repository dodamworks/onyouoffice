// Added by Onyou Office: cached or downloaded font bytes must match the trusted lock.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { ensureFontPackage, fontLock, installFonts, verifiedPackage } from './ci-fonts.mjs'

const bytes = Buffer.from('synthetic font archive bytes')
const pkg = {
  name: 'fonts-fixture',
  path: 'pool/main/f/fonts-fixture/fonts-fixture_1_all.deb',
  sha256: createHash('sha256').update(bytes).digest('hex'),
}
function withCache(fn) {
  const directory = mkdtempSync(join(tmpdir(), 'onyou-font-cache-'))
  try {
    fn(directory)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}
function output(args) {
  return args[args.indexOf('--output') + 1]
}

test('verified cache bytes need no network and corrupt cache bytes cannot be trusted', () =>
  withCache((directory) => {
    const file = join(directory, basename(pkg.path))
    writeFileSync(file, bytes)
    assert.equal(
      ensureFontPackage(pkg, directory, () => assert.fail('cache hit downloaded')),
      file,
    )
    writeFileSync(file, 'corrupt')
    let downloads = 0
    assert.equal(
      ensureFontPackage(pkg, directory, (command, args, options) => {
        assert.equal(command, 'curl')
        assert.ok(options.timeout <= 70000)
        assert.ok(args.includes('--max-time'))
        assert.ok(args.includes('=https'))
        downloads++
        writeFileSync(output(args), bytes)
      }),
      file,
    )
    assert.equal(downloads, 1)
    assert.deepEqual(readFileSync(file), bytes)
  }))

test('a stalled mirror falls back once to a different mirror and discards partial bytes', () =>
  withCache((directory) => {
    const urls = []
    const file = ensureFontPackage(pkg, directory, (_command, args) => {
      urls.push(new URL(args.at(-1)).host)
      if (urls.length === 1) {
        writeFileSync(output(args), 'partial')
        throw new Error('synthetic network timeout')
      }
      assert.equal(existsSync(output(args)), false)
      writeFileSync(output(args), bytes)
    })
    assert.equal(urls.length, 2)
    assert.notEqual(urls[0], urls[1])
    assert.equal(verifiedPackage(file, pkg.sha256), true)
  }))

test('wrong downloaded hashes fail closed without leaving an installable cache file', () =>
  withCache((directory) => {
    let attempts = 0
    assert.throws(
      () =>
        ensureFontPackage(pkg, directory, (_command, args) => {
          attempts++
          writeFileSync(output(args), 'wrong package')
        }),
      /no unverified package installed/,
    )
    assert.equal(attempts, 2)
    assert.equal(existsSync(join(directory, basename(pkg.path))), false)
    assert.equal(existsSync(join(directory, basename(pkg.path) + '.partial')), false)
  }))

test('cache symlinks and untrusted package paths are rejected', () =>
  withCache((directory) => {
    const target = join(directory, 'target')
    writeFileSync(target, bytes)
    const file = join(directory, basename(pkg.path))
    symlinkSync(target, file)
    assert.equal(verifiedPackage(file, pkg.sha256), false)
    assert.throws(() => ensureFontPackage({ ...pkg, path: '../escape.deb' }, directory), /Invalid/)
  }))

test('a download failure cannot run package installation or font registration', () =>
  withCache((directory) => {
    assert.throws(
      () =>
        installFonts(directory, (command) => {
          assert.equal(command, 'curl')
          throw new Error('synthetic offline mirror')
        }),
      /Pinned font download failed/,
    )
  }))

test('the Ubuntu lock retains all three original visual-baseline font families', () => {
  assert.equal(fontLock.ubuntu, '22.04')
  assert.deepEqual(fontLock.packages.map((p) => p.name).sort(), [
    'fonts-crosextra-caladea',
    'fonts-crosextra-carlito',
    'fonts-noto-cjk',
  ])
  assert.ok(fontLock.packages.every((p) => /^[a-f0-9]{64}$/.test(p.sha256)))
})
