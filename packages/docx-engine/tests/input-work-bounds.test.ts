// Modified by Onyou Office: hostile input must not block a document worker.
import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import JSZip from 'jszip'
import { parseRels } from '../src/parse-package'

describe('hostile input work bounds', () => {
  it('returns without regex backtracking on a short malformed input', () => {
    const program = `import assert from 'node:assert/strict'; import JSZip from 'jszip'; import { parseRels } from ${JSON.stringify(new URL('../src/parse-package.ts', import.meta.url).href)}; const zip = new JSZip().file('_rels/.rels', '<!doctype[' + ']['.repeat(28) + '!'); await assert.rejects(parseRels(zip, '_rels/.rels'), /Unterminated/); console.log('bounded');`
    const result = execFileSync(
      process.execPath,
      ['--import', 'tsx', '--input-type=module', '--eval', program],
      { timeout: 5000, encoding: 'utf8' },
    )
    expect(result.trim()).toBe('bounded')
  }, 10000)
  it.each([
    '<!DOCTYPE Relationships SYSTEM "https://example.invalid/rels.dtd">',
    '<!DOCTYPE Relationships [<!ENTITY literal "quoted ] > [">]>',
    '<!DOCTYPE Relationships [<!-- brackets [ ] and quotes \" are comment text -->]>',
  ])('preserves relationship interpretation and original bytes with %s', async (doctype) => {
    const xml = `${doctype}<Relationships><Relationship Id="rId1" Type="image" Target="media/x.png"/></Relationships>`
    const zip = new JSZip().file('_rels/.rels', xml)
    expect((await parseRels(zip, '_rels/.rels')).has('rId1')).toBe(true)
    expect(await zip.file('_rels/.rels')!.async('string')).toBe(xml)
  })
})
