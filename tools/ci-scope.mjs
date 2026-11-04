// Modified by Dodam on 2026-11-03: classify complete changes and bind test-only validation plans.
import { appendFileSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { posix } from 'node:path'

const SHA = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/
const policy = JSON.parse(readFileSync(new URL('./ci-reference-policy.json', import.meta.url)))

export function isReferencePath(path) {
  if (path !== posix.normalize(path) || path.startsWith('/') || path.startsWith('../')) return false
  return (
    policy.root_documents.includes(path) ||
    (policy.roots.some((root) => path.startsWith(root)) &&
      policy.extensions.includes(posix.extname(path)))
  )
}

export function referenceOnly(paths) {
  return (
    paths.length > 0 &&
    paths.every((path) => isReferencePath(path) && !policy.require_full_ci.includes(path))
  )
}

/** Only actual unit entry files in the serial gate qualify; helpers/fixtures do not. */
export function testImpact(paths, git, head) {
  const product = { full_ci: true, checks_required: true, unit_required: true, e2e_required: true }
  const relevant = paths.filter(
    (path) => !isReferencePath(path) || policy.require_full_ci.includes(path),
  )
  if (!relevant.length) return product
  if (relevant.every((path) => /^e2e\/[^/]+\.spec\.ts$/.test(path))) {
    return { full_ci: false, checks_required: true, unit_required: false, e2e_required: true }
  }
  try {
    const root = JSON.parse(git(['show', `${head}:package.json`]))
    const commands = root.scripts.test.split(/\s*&&\s*/)
    const names = commands.map((command) => {
      const match = /^npm run test -w (@genoffice\/[\w-]+)$/.exec(command)
      if (!match) throw new Error('Unknown unit gate')
      return match[1]
    })
    const unit = relevant.every((path) => {
      const match = /^((?:apps|packages)\/[^/]+)\/tests\/(.+)\.test\.(ts|tsx)$/.exec(path)
      if (!match || /(?:^|\/)(?:fixtures|helpers)(?:\/|$)/.test(match[2])) return false
      if (
        !Array.isArray(root.workspaces) ||
        !root.workspaces.some(
          (pattern) => pattern === match[1] || pattern === `${match[1].split('/')[0]}/*`,
        )
      )
        return false
      const manifest = JSON.parse(git(['show', `${head}:${match[1]}/package.json`]))
      const config = git(['show', `${head}:${match[1]}/vitest.config.ts`])
      return names.includes(manifest.name) && config.includes(`tests/**/*.test.${match[3]}`)
    })
    if (unit)
      return { full_ci: false, checks_required: true, unit_required: true, e2e_required: false }
  } catch {
    // Unknown workspaces, custom test gates and unavailable files retain every check.
  }
  return product
}

/** Strict, explicit selection also binds validation proofs to the checks that ran. */
export function validationPlan(outputs) {
  const fields = ['full_ci', 'reference_check', 'checks_required', 'unit_required', 'e2e_required']
  if (!fields.every((key) => ['true', 'false'].includes(outputs?.[key])))
    throw new Error('Incomplete CI validation plan')
  const plan = Object.fromEntries(fields.map((key) => [key, outputs[key] === 'true']))
  if (plan.full_ci) {
    if (!plan.checks_required || !plan.unit_required || !plan.e2e_required)
      throw new Error('Full CI cannot omit product checks')
  } else if (plan.checks_required) {
    if (plan.unit_required === plan.e2e_required) throw new Error('Invalid test-only selection')
  } else if (!plan.reference_check || plan.unit_required || plan.e2e_required) {
    throw new Error('The reference-only route requires reference validation')
  }
  return plan
}

/** Compare the complete PR merge tree, never just its latest commit. */
export function classifyChange(eventName, event, git) {
  const full = (reason) => ({
    full_ci: true,
    reference_check: false,
    checks_required: true,
    unit_required: true,
    e2e_required: true,
    reason,
  })
  if (!['push', 'pull_request'].includes(eventName)) return full('manual-or-unknown-event')
  try {
    const head = git(['rev-parse', 'HEAD']).trim()
    let base
    if (eventName === 'pull_request') {
      const prHead = event.pull_request?.head?.sha
      if (!SHA.test(prHead ?? '')) return full('missing-pr-head')
      const parents = git(['rev-list', '--parents', '-n', '1', head]).trim().split(/\s+/)
      if (parents.length !== 3 || parents[2] !== prHead) return full('unverified-pr-merge')
      base = parents[1]
    } else {
      base = event.before
      if (event.after !== head || !SHA.test(base ?? '') || /^0+$/.test(base)) {
        return full('unverified-push-range')
      }
      // A rewritten or missing base must never make a code change look documentation-only.
      git(['merge-base', '--is-ancestor', base, head])
    }
    // --no-renames retains both old and new paths, including code moved into docs.
    const records = git(['diff', '--raw', '--no-abbrev', '--no-renames', '-z', base, head, '--'])
      .split('\0')
      .filter(Boolean)
    const changes = []
    for (let i = 0; i < records.length; i += 2) {
      const match = /^:(\d{6}) (\d{6}) [a-f0-9]+ [a-f0-9]+ [AMDT]$/.exec(records[i])
      if (!match || !records[i + 1]) return full('unverified-diff-record')
      changes.push({ path: records[i + 1], oldMode: match[1], newMode: match[2] })
    }
    const paths = changes.map((change) => change.path)
    const regular = changes.every(({ oldMode, newMode }) =>
      [oldMode, newMode].every((mode) => ['000000', '100644'].includes(mode)),
    )
    const reference = referenceOnly(paths) && regular
    const impact = reference
      ? { full_ci: false, checks_required: false, unit_required: false, e2e_required: false }
      : regular && changes.every(({ newMode }) => newMode === '100644')
        ? testImpact(paths, git, head)
        : full('non-regular-or-deleted-test')
    return {
      ...impact,
      reference_check: paths.some(
        (path) =>
          isReferencePath(path) || path.startsWith('tools/') || path === '.github/workflows/ci.yml',
      ),
      base_sha: base,
      head_sha: head,
      reason: reference
        ? 'non-runtime-reference-only'
        : impact.full_ci
          ? 'product-policy-or-unknown-path'
          : impact.unit_required
            ? 'unit-tests-only'
            : 'e2e-specs-only',
      changed_paths: paths.length,
    }
  } catch {
    return full('comparison-unavailable')
  }
}

/** A single status can represent both intentional skips and complete validation. */
export function verifyCiResult(needs) {
  const scope = needs.scope
  if (scope?.result !== 'success')
    throw new Error('CI change classification did not complete successfully')
  const plan = validationPlan(scope.outputs)
  const reused = scope.outputs.reused_run_id
  if (reused) {
    if (!plan.checks_required || !/^[1-9]\d*$/.test(reused))
      throw new Error('Invalid reused validation')
    for (const job of ['references', 'checks', 'unit', 'e2e-build', 'e2e']) {
      if (needs[job]?.result !== 'skipped')
        throw new Error(`Unexpected ${job} result on reuse route`)
    }
    return `Exact main merge reuses successful PR validation ${reused}`
  }
  const expected = {
    references: plan.reference_check,
    checks: plan.checks_required,
    unit: plan.unit_required,
    'e2e-build': plan.e2e_required,
    e2e: plan.e2e_required,
  }
  for (const [job, required] of Object.entries(expected)) {
    const state = required ? 'success' : 'skipped'
    if (needs[job]?.result !== state)
      throw new Error(`Expected ${job}=${state}, received ${needs[job]?.result ?? 'missing'}`)
  }
  return plan.full_ci
    ? 'Full validation passed'
    : plan.unit_required
      ? 'Unit-only validation passed; product code unchanged'
      : plan.e2e_required
        ? 'E2E-only validation passed; product code unchanged'
        : 'Non-runtime references validated; product validation not applicable'
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv[2] === '--verify') {
    console.log(verifyCiResult(JSON.parse(process.env.CI_NEEDS ?? '{}')))
  } else {
    let event = {}
    try {
      event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
    } catch {
      // Missing event data keeps full validation enabled.
    }
    const result = classifyChange(process.env.GITHUB_EVENT_NAME, event, (args) =>
      execFileSync('git', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }),
    )
    if (process.env.GITHUB_OUTPUT) {
      for (const key of [
        'full_ci',
        'reference_check',
        'checks_required',
        'unit_required',
        'e2e_required',
        'base_sha',
        'head_sha',
      ]) {
        appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${result[key] ?? ''}\n`)
      }
    }
    console.log(JSON.stringify(result))
  }
}
