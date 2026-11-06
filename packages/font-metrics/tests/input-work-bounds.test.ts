// Modified by Onyou Office: hostile input must not block a document worker.
import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { resolveFamilyInfo } from '../src/family-info'

describe('hostile input work bounds', () => {
  it('returns without regex backtracking on a short malformed input', () => {
    const program = `import assert from 'node:assert/strict'; import { resolveFamilyInfo } from ${JSON.stringify(new URL('../src/family-info.ts', import.meta.url).href)}; assert.deepEqual(resolveFamilyInfo(['Family'], [{ name: 'Family' + '\t\tbold'.repeat(28) + '!', hangul: true }]), []); console.log('bounded');`
    const result = execFileSync(
      process.execPath,
      ['--import', 'tsx', '--input-type=module', '--eval', program],
      { timeout: 5000, encoding: 'utf8' },
    )
    expect(result.trim()).toBe('bounded')
  }, 10000)
  it.each([' Bold', '-Regular', ' ExtraLight', ' Semi Bold', ' Ultra-Condensed', ' Bold Italic'])(
    'keeps family grouping for %s',
    (suffix) => {
      expect(resolveFamilyInfo(['Family'], [{ name: 'Family' + suffix, hangul: true }])).toEqual([
        ['Family', { hangul: true }],
      ])
    },
  )
})
