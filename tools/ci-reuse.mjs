// Added by Onyou Office on 2026-11-03: reuse a successful PR validation only for its exact main merge.
import { execFileSync } from 'node:child_process'
import { appendFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { verifyCiResult, validationPlan } from './ci-scope.mjs'

const SHA = /^[a-f0-9]{40}$/
const workflow = '.github/workflows/ci.yml'
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
export const environment = () => ({
  node: process.version,
  platform: process.platform,
  arch: process.arch,
  image: process.env.ImageOS ?? '',
  imageVersion: process.env.ImageVersion ?? '',
})

export function mergeCandidate(eventName, event, current, parents, tree) {
  if (eventName !== 'push' || event.ref !== 'refs/heads/main' || event.after !== current)
    return null
  if (parents.length !== 2 || event.before !== parents[0]) return null
  if (![current, ...parents, tree].every((value) => SHA.test(value))) return null
  return { commit: current, base: parents[0], head: parents[1], tree }
}

export function proofMatches(
  proof,
  run,
  candidate,
  repository,
  env,
  now = Date.now(),
  expectedPlan,
) {
  if (!proof || !run || !candidate || !env.image || !env.imageVersion) return false
  if (
    run.event !== 'pull_request' ||
    run.path !== workflow ||
    run.status !== 'completed' ||
    run.conclusion !== 'success'
  )
    return false
  if (
    run.head_sha !== candidate.head ||
    run.repository?.full_name !== repository ||
    run.head_repository?.full_name !== repository
  )
    return false
  if (
    !Number.isSafeInteger(run.id) ||
    run.id <= 0 ||
    !Number.isSafeInteger(run.run_attempt) ||
    run.run_attempt <= 0
  )
    return false
  const age = now - Date.parse(run.updated_at)
  if (!Number.isFinite(age) || age < 0 || age > 24 * 60 * 60 * 1000) return false
  if (proof.repository !== repository || proof.workflow !== workflow) return false
  if (expectedPlan) {
    if (Object.values(expectedPlan).some((value) => typeof value !== 'boolean')) return false
    try {
      validationPlan(
        Object.fromEntries(
          Object.entries(expectedPlan).map(([key, value]) => [key, String(value)]),
        ),
      )
    } catch {
      return false
    }
  }
  if (proof.version === 1) {
    if (proof.full_ci !== true || (expectedPlan && !expectedPlan.full_ci)) return false
  } else if (proof.version === 2) {
    const fields = [
      'full_ci',
      'reference_check',
      'checks_required',
      'unit_required',
      'e2e_required',
    ]
    if (
      !expectedPlan ||
      !fields.every(
        (key) => typeof expectedPlan[key] === 'boolean' && proof.plan?.[key] === expectedPlan[key],
      )
    )
      return false
    if (proof.full_ci !== expectedPlan.full_ci || !expectedPlan.checks_required) return false
  } else return false
  if (proof.run_id !== String(run.id) || proof.attempt !== run.run_attempt) return false
  for (const key of ['base', 'head', 'tree']) if (proof[key] !== candidate[key]) return false
  if (!SHA.test(proof.checkout ?? '')) return false
  return Object.entries(env).every(([key, value]) => proof.environment?.[key] === value)
}

async function findReusable(candidate, plan) {
  const repository = process.env.GITHUB_REPOSITORY
  if (!candidate || !/^[\w.-]+\/[\w.-]+$/.test(repository ?? '') || !process.env.GH_TOKEN)
    return null
  const deadline = Date.now() + 25_000
  const signal = () => AbortSignal.timeout(Math.max(1, Math.min(10_000, deadline - Date.now())))
  const headers = {
    Authorization: `Bearer ${process.env.GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
  }
  const json = async (path) => {
    const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
      headers,
      signal: signal(),
    })
    if (!response.ok) throw new Error(`GitHub read failed (${response.status})`)
    return response.json()
  }
  const { workflow_runs: runs } = await json(
    `actions/workflows/ci.yml/runs?event=pull_request&status=success&head_sha=${candidate.head}&per_page=10`,
  )
  for (const run of runs ?? []) {
    if (Date.now() >= deadline) return null
    if (run.head_sha !== candidate.head) continue
    const { artifacts } = await json(`actions/runs/${run.id}/artifacts?per_page=100`)
    const artifact = artifacts?.find(
      (item) =>
        item.name === `ci-validated-${run.run_attempt}` &&
        !item.expired &&
        item.size_in_bytes < 100_000,
    )
    if (!artifact) continue
    const response = await fetch(
      `https://api.github.com/repos/${repository}/actions/artifacts/${artifact.id}/zip`,
      { headers, signal: signal() },
    )
    if (!response.ok) throw new Error(`Validation proof download failed (${response.status})`)
    const directory = mkdtempSync(join(tmpdir(), 'onyou-ci-proof-'))
    try {
      const zip = join(directory, 'proof.zip')
      writeFileSync(zip, Buffer.from(await response.arrayBuffer()))
      const proof = JSON.parse(
        execFileSync('unzip', ['-p', zip, 'validation.json'], {
          encoding: 'utf8',
          maxBuffer: 32_000,
        }),
      )
      if (proofMatches(proof, run, candidate, repository, environment(), Date.now(), plan))
        return String(run.id)
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  }
  return null
}

async function main() {
  if (process.argv[2] === 'attest') {
    const needs = JSON.parse(process.env.CI_NEEDS ?? '{}')
    verifyCiResult(needs)
    const plan = validationPlan(needs.scope?.outputs)
    if (
      process.env.GITHUB_EVENT_NAME !== 'pull_request' ||
      !plan.checks_required ||
      needs.scope.outputs.reused_run_id
    )
      throw new Error('Only a fresh validated PR plan can produce validation proof')
    const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
    const parents = git('show', '-s', '--format=%P', 'HEAD').split(' ')
    if (parents.length !== 2 || parents[1] !== event.pull_request?.head?.sha)
      throw new Error('Unverified PR merge checkout')
    writeFileSync(
      'validation.json',
      `${JSON.stringify(
        {
          version: 2,
          full_ci: plan.full_ci,
          plan,
          repository: process.env.GITHUB_REPOSITORY,
          workflow,
          run_id: process.env.GITHUB_RUN_ID,
          attempt: Number(process.env.GITHUB_RUN_ATTEMPT),
          checkout: git('rev-parse', 'HEAD'),
          tree: git('rev-parse', 'HEAD^{tree}'),
          base: parents[0],
          head: parents[1],
          environment: environment(),
        },
        null,
        2,
      )}\n`,
    )
  } else if (process.argv[2] === 'lookup') {
    let id = null
    try {
      const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
      const candidate = mergeCandidate(
        process.env.GITHUB_EVENT_NAME,
        event,
        git('rev-parse', 'HEAD'),
        git('show', '-s', '--format=%P', 'HEAD').split(' '),
        git('rev-parse', 'HEAD^{tree}'),
      )
      const plan = validationPlan(JSON.parse(process.env.CI_PLAN ?? '{}'))
      id = await findReusable(candidate, plan)
    } catch (error) {
      console.log(`Normal validation plan retained: ${error.message}`)
    }
    if (id) {
      appendFileSync(process.env.GITHUB_OUTPUT, `reused_run_id=${id}\n`)
      appendFileSync(
        process.env.GITHUB_STEP_SUMMARY,
        `Exact merge tree and runner identity match a successful PR validation plan: https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${id}\n`,
      )
    } else console.log('No reusable validation plan; normal checks remain required')
  } else throw new Error('Usage: node tools/ci-reuse.mjs lookup|attest')
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main()
