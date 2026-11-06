// Modified by Onyou Office: hostile input must not block a document worker.
import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import JSZip from 'jszip'
import { parseRels } from '../src/parse-package'
import { firstSlice, hfDrawingMatches, pairedSlice, selfClosingSlice } from '../src/xml-slices'

describe('hostile input work bounds', () => {
  it.each(['drawings', 'borders'])(
    'bounds repeated unterminated %s in real editing code',
    (kind) => {
      const program = `import assert from 'node:assert/strict'; import { patchHfPicturesXml } from ${JSON.stringify(new URL('../src/run-picture.ts', import.meta.url).href)}; import { applySectionSettings, DEFAULT_SECTION } from ${JSON.stringify(new URL('../src/section.ts', import.meta.url).href)}; const kind = ${JSON.stringify(kind)}; if (kind === 'drawings') { const xml = '<w:hdr><!--' + '<w:drawing >'.repeat(100000) + '--></w:hdr>'; assert.equal(patchHfPicturesXml(xml, {}), xml); } else { const comment = '<!--' + '<w:pgBorders >'.repeat(100000) + '-->'; const xml = '<w:sectPr>' + comment + '</w:sectPr>'; const out = applySectionSettings(xml, { ...DEFAULT_SECTION, columns: 2 }); assert.ok(out.includes(comment)); assert.ok(out.includes('<w:cols')); } console.log('bounded');`
      expect(
        execFileSync(
          process.execPath,
          ['--import', 'tsx', '--input-type=module', '--eval', program],
          { timeout: 5000, encoding: 'utf8' },
        ).trim(),
      ).toBe('bounded')
    },
    10000,
  )

  it('retains lazy drawing boundaries, ordinals, whitespace and untouched tail bytes', () => {
    const a = '<w:drawing\n x="1"><w:drawing >nested</w:drawing>'
    const b = '<w:drawing>next</w:drawing>'
    const xml = 'prefix<w:drawingOther/>' + a + '</w:drawing>middle' + b + '<w:drawing >tail'
    const matches = [...hfDrawingMatches(xml)]
    expect(matches.map((m) => m[0])).toEqual([a, b])
    expect(matches.map((m) => m.index)).toEqual([xml.indexOf(a), xml.indexOf(b)])
  })

  it('preserves self-closing and paired border selection, including incomplete prefixes', () => {
    const xml = '<w:pgBorders >incomplete<w:pgBorders/><w:pgMar/>'
    expect(selfClosingSlice(xml, '<w:pgBorders')).toEqual({ index: 24, text: '<w:pgBorders/>' })
    expect(pairedSlice(xml, '<w:pgBorders', '</w:pgBorders>')).toBeNull()
    const paired = '<w:pgBorders><w:top/></w:pgBorders>'
    const both = paired + '<w:pgBorders/>'
    expect(
      firstSlice(
        selfClosingSlice(both, '<w:pgBorders'),
        pairedSlice(both, '<w:pgBorders', '</w:pgBorders>'),
      )?.text,
    ).toBe(paired)
    expect(selfClosingSlice('<w:pgBorders<w:pgBorders/>', '<w:pgBorders')?.text).toBe(
      '<w:pgBorders<w:pgBorders/>',
    )
  })
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
    '<!DOCTYPE Relationships [<!-- brackets [ ] and quotes " are comment text -->]>',
  ])('preserves relationship interpretation and original bytes with %s', async (doctype) => {
    const xml = `${doctype}<Relationships><Relationship Id="rId1" Type="image" Target="media/x.png"/></Relationships>`
    const zip = new JSZip().file('_rels/.rels', xml)
    expect((await parseRels(zip, '_rels/.rels')).has('rId1')).toBe(true)
    expect(await zip.file('_rels/.rels')!.async('string')).toBe(xml)
  })
})
