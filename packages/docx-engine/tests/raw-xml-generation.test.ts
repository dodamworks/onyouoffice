// Modified by Onyou Office: preserve raw generation bytes while bounding hostile fragments.
import { execFileSync } from 'node:child_process'
import { expect, it } from 'vitest'
import {
  rawTagMatches,
  removeLooseAttribute,
  removeSpacePrefixedAttributes,
} from '../src/xml-slices'

it('retains the existing raw tag captures, including quoted delimiters and malformed tails', () => {
  const tokens = [
    'text',
    '<w:r>',
    '</w:r>',
    '<a x="a>b"/>',
    "<a x='a>b'>",
    '<a x="',
    '<a',
    '<--',
    '>',
    '"',
    "'",
    '/>',
  ]
  const original = /<(\/?)([A-Za-z0-9:._-]+)((?:"[^"]*"|'[^']*'|[^"'>])*)>/g
  for (const a of tokens)
    for (const b of tokens)
      for (const c of tokens) {
        const xml = a + b + c
        const shape = (m: readonly string[] & { index: number }) => ({
          captures: [...m],
          index: m.index,
        })
        expect([...rawTagMatches(xml)].map(shape)).toEqual([...xml.matchAll(original)].map(shape))
      }
})

it('keeps the old first/global whitespace and quoting rules for removed attributes', () => {
  const values = [
    ' x="1" ',
    'rot="a\'b"',
    " rot = '2'",
    'notrot="1"',
    '\trot="3"',
    ' w:left="4" w:start="5"',
    ' w:leftChars="6"',
    ' w:startChars="7"',
    'rot="unfinished',
  ]
  for (const a of values)
    for (const b of values) {
      const xml = a + b
      expect(removeLooseAttribute(xml, 'rot')).toBe(
        xml.replace(/\s*\brot\s*=\s*(?:"[^"]*"|'[^']*')/, ''),
      )
      expect(
        removeSpacePrefixedAttributes(xml, ['w:left', 'w:start', 'w:leftChars', 'w:startChars']),
      ).toBe(xml.replace(/\s+w:(left|start|leftChars|startChars)="[^"]*"/g, ''))
    }
})

it.each([
  'z-order-digits',
  'image-transform',
  'image-extents',
  'image-offset',
  'math-text',
  'raw-tags',
  'paragraph-mark',
])(
  'bounds %s through the production generation entry point',
  (kind) => {
    const source = JSON.stringify(new URL('../src/generate.ts', import.meta.url).href)
    const program = `
      import assert from 'node:assert/strict';
      import { patchImageParagraphXml, patchMathTokens, splitXmlChildren, stripParaMarkColor, applyImageZOrder } from ${source};
      const kind = ${JSON.stringify(kind)};
      const token = { 'z-order-digits': '1', 'image-transform': '<pic:spPr ', 'image-extents': '<wp:extent cx="1" ', 'image-offset': '<wp:positionH ', 'math-text': '<m:t ', 'raw-tags': '<a', 'paragraph-mark': '<w:rPr>a' }[kind];
      const xml = token.repeat(100000);
      if (kind === 'z-order-digits') assert.ok(applyImageZOrder('<wp:anchor id="' + xml + '" relativeHeight="4">', 2).endsWith('relativeHeight="251658242">'));
      else if (kind === 'raw-tags') assert.deepEqual(splitXmlChildren(xml), []);
      else if (kind === 'paragraph-mark') assert.equal(stripParaMarkColor(xml), xml);
      else if (kind === 'math-text') assert.equal(patchMathTokens(xml, ['new']), xml);
      else assert.equal(patchImageParagraphXml(xml, { rotDeg: 45, widthPx: 20, heightPx: 30, posOffsetX: 123 }), xml);
      console.log('bounded');
    `
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
