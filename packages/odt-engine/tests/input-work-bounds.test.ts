// Modified by Onyou Office: hostile input must not block a document worker.
import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { sniffImage } from '../src/objects/media'

describe('hostile input work bounds', () => {
  it('returns without regex backtracking on a short malformed input', () => {
    const program = `import assert from 'node:assert/strict'; import { sniffImage } from ${JSON.stringify(new URL('../src/objects/media.ts', import.meta.url).href)}; assert.equal(sniffImage(new TextEncoder().encode('<!--' + '--><!--'.repeat(28) + '!')), null); console.log('bounded');`
    const result = execFileSync(
      process.execPath,
      ['--import', 'tsx', '--input-type=module', '--eval', program],
      { timeout: 5000, encoding: 'utf8' },
    )
    expect(result.trim()).toBe('bounded')
  }, 10000)
  it.each([
    '<svg>',
    ' \n<svg xmlns="urn:test">',
    '<?xml version="1.0"?> <!-- first --> <!-- second --> <svg>',
  ])('keeps SVG detection for %s', (text) => {
    expect(sniffImage(new TextEncoder().encode(text))).toEqual({
      ext: 'svg',
      mime: 'image/svg+xml',
    })
  })
})
