// Added by Onyou Office on 2026-11-04: inspect public candidates without printing private values.
import { execFileSync } from 'node:child_process'
import { readFileSync, lstatSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export function blockedPath(path) {
  return (
    /^(?:\.local|\.codex|\.aws|node_modules|working_dir)(?:\/|$)/.test(path) ||
    /^(?:AGENTS\.local\.md|CLAUDE\.local\.md|INTERNAL\.md|\.agents\/product-marketing\.md|docs\/dodam\/VALIDATION-SUMMARY\.json)$/.test(
      path,
    ) ||
    /^\.agents\/skills\/(?:crafting-effective-readmes|commit-work)(?:\/|$)/.test(path)
  )
}

export function privateMatches(bytes, deny) {
  if (bytes.includes(0)) return null
  const text = bytes.toString('utf8').toLowerCase()
  return deny.reduce((count, value) => count + Number(text.includes(value.toLowerCase())), 0)
}

export function checkBoundary({ root, deny, staged = false, maintainer = false }) {
  if (
    !Array.isArray(deny) ||
    !deny.length ||
    deny.some((s) => typeof s !== 'string' || !s.trim())
  ) {
    throw new Error('A non-empty local deny list of private identifiers is required')
  }
  const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: 64 * 1024 * 1024 })
  const failures = []
  if (maintainer) {
    const expected = [
      [['config', '--get', 'user.name'], 'Onyou Office'],
      [['config', '--get', 'user.email'], '269674695+dodamworks@users.noreply.github.com'],
      [['remote', 'get-url', '--push', 'origin'], 'https://github.com/dodamworks/onyouoffice.git'],
      [['config', '--get', 'credential.https://github.com.username'], 'dodamworks'],
    ]
    for (const [args, value] of expected) {
      if (
        git(...args)
          .toString()
          .trim() !== value
      )
        failures.push({ kind: 'maintainer-config', field: args.at(-1) })
    }
    for (const field of ['GIT_AUTHOR_IDENT', 'GIT_COMMITTER_IDENT']) {
      if (
        !git('var', field)
          .toString()
          .startsWith('Onyou Office <269674695+dodamworks@users.noreply.github.com> ')
      ) {
        failures.push({ kind: 'effective-maintainer-identity', field })
      }
    }
  }
  const paths = git(
    'ls-files',
    '-z',
    ...(staged ? ['--cached'] : ['-c', '-o', '--exclude-standard']),
  )
    .toString()
    .split('\0')
    .filter(Boolean)
  let textFiles = 0
  let uninspectedBinaryOrSymlink = 0
  for (const path of new Set(paths)) {
    if (blockedPath(path)) {
      failures.push({ kind: 'private-directory', path })
      continue
    }
    let bytes
    if (staged) {
      const mode = git('ls-files', '-s', '--', path).toString().split(' ')[0]
      if (mode === '120000') {
        uninspectedBinaryOrSymlink++
        continue
      }
      bytes = git('show', `:${path}`)
    } else {
      let stat
      try {
        stat = lstatSync(resolve(root, path))
      } catch (e) {
        if (e.code === 'ENOENT') continue
        throw e
      }
      if (!stat.isFile()) {
        uninspectedBinaryOrSymlink++
        continue
      }
      bytes = readFileSync(resolve(root, path))
    }
    const matches = privateMatches(bytes, deny)
    if (matches === null) {
      uninspectedBinaryOrSymlink++
      continue
    }
    textFiles++
    if (matches) failures.push({ kind: 'private-identifier', path, matchedRules: matches })
  }
  return {
    passed: failures.length === 0,
    mode: staged ? 'index' : 'working',
    textFiles,
    uninspectedBinaryOrSymlink,
    failures,
    historyScanned: false,
    authenticatedAccountVerified: false,
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2)
    const index = args.indexOf('--deny-file')
    if (index < 0 || !args[index + 1])
      throw new Error('Use --deny-file <private-local-json> [--staged] [--maintainer]')
    const deny = JSON.parse(readFileSync(args[index + 1], 'utf8'))
    const result = checkBoundary({
      root: process.cwd(),
      deny,
      staged: args.includes('--staged'),
      maintainer: args.includes('--maintainer'),
    })
    console.log(JSON.stringify(result, null, 2))
    if (!result.passed) process.exitCode = 1
  } catch {
    console.error(
      'Public-boundary check could not complete; verify arguments, deny-list format and repository access. No private values are printed.',
    )
    process.exitCode = 2
  }
}
