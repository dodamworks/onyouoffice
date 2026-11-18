import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { expect, it } from 'vitest'

const installer = resolve(__dirname, '../../../packaging/cli/install.sh')
const version = '1.0.6'
const asset = `onyouoffice-cli_${version}_linux-x64.tar.gz`

it.skipIf(process.platform === 'win32')(
  'installs the official CLI, preserves a working reinstall and removes only its own files',
  () => {
    const scratch = mkdtempSync(join(tmpdir(), 'onyouoffice-standalone-'))
    try {
      const tools = join(scratch, 'tools')
      const prefix = join(scratch, "office's $files")
      const bin = join(scratch, "office's $bin")
      const node = join(scratch, "office's $node")
      const launcher = join(bin, 'onyouoffice')
      const cli = join(scratch, 'onyouoffice-cli', 'cli')
      mkdirSync(cli, { recursive: true })
      mkdirSync(tools)
      writeFileSync(join(cli, 'onyouoffice'), '#!/bin/sh\n', { mode: 0o755 })
      writeFileSync(join(cli, 'genoffice.cjs'), `console.log("onyouoffice ${version}")\n`)
      expect(spawnSync('tar', ['-czf', asset, 'onyouoffice-cli'], { cwd: scratch }).status).toBe(0)
      const checksum = createHash('sha256')
        .update(readFileSync(join(scratch, asset)))
        .digest('hex')
      writeFileSync(join(scratch, `${asset}.sha256`), `${checksum}  ${asset}\n`)
      writeFileSync(
        join(tools, 'uname'),
        '#!/bin/sh\ncase "$1" in -s) echo Linux;; -m) echo x86_64;; esac\n',
        {
          mode: 0o755,
        },
      )
      writeFileSync(
        join(tools, 'curl'),
        `#!/bin/sh
case "$2" in
  https://api.github.com/repos/dodamworks/onyouoffice/releases/latest)
    printf '%s\\n' '{"tag_name":"v${version}"}' ;;
  https://github.com/dodamworks/onyouoffice/releases/download/v${version}/${asset}|https://github.com/dodamworks/onyouoffice/releases/download/v${version}/${asset}.sha256)
    cp "$CLI_FIXTURE/\${2##*/}" "$4" ;;
  *) exit 1 ;;
esac
`,
        { mode: 0o755 },
      )
      writeFileSync(
        node,
        `#!/bin/sh
case "$1" in
  */release-*) [ -z "$CLI_FIXTURE_FAIL_ACTIVATION" ] || exit 1 ;;
esac
exec "$CLI_FIXTURE_NODE" "$@"
`,
        { mode: 0o755 },
      )
      const env = {
        ...process.env,
        CLI_FIXTURE: scratch,
        CLI_FIXTURE_NODE: process.execPath,
        PATH: `${tools}:${process.env.PATH}`,
      }
      const install = (extra: string[], fail = false, installPrefix = prefix) =>
        spawnSync(
          'sh',
          [installer, '--prefix', installPrefix, '--bin', bin, '--node', node, ...extra],
          {
            encoding: 'utf8',
            env: { ...env, CLI_FIXTURE_FAIL_ACTIVATION: fail ? '1' : '' },
          },
        )
      const run = () => spawnSync(launcher, ['--version'], { env, encoding: 'utf8' }).stdout.trim()

      expect(install([]).status).toBe(0)
      expect(run()).toBe(`onyouoffice ${version}`)
      const installedLauncher = readFileSync(launcher, 'utf8')
      expect(install(['--version', '1.0.6/path']).status).toBe(1)
      expect(install(['--version', `v${version}`], true).status).toBe(1)
      expect(readFileSync(launcher, 'utf8')).toBe(installedLauncher)
      expect(run()).toBe(`onyouoffice ${version}`)
      expect(install(['--version', version]).status).toBe(0)

      const otherDir = join(prefix, 'release-personal')
      mkdirSync(otherDir)
      writeFileSync(join(otherDir, 'keep'), '')
      expect(install(['--uninstall'], false, join(scratch, 'unrelated-prefix')).status).toBe(0)
      expect(run()).toBe(`onyouoffice ${version}`)
      expect(install(['--uninstall']).status).toBe(0)
      expect(existsSync(launcher)).toBe(false)
      expect(existsSync(join(otherDir, 'keep'))).toBe(true)
    } finally {
      rmSync(scratch, { force: true, recursive: true })
    }
  },
)
