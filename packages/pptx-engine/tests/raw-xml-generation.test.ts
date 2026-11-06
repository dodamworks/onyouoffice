// Modified by Onyou Office: preserve raw slide slices while bounding malformed-input work.
import { execFileSync } from 'node:child_process'
import { expect, it } from 'vitest'
import {
  rawTagMatches,
  quotedTagMatch,
  propertyOpeningMatch,
  removeAttribute,
  quotedTagEnd,
} from '../src/xml-slices'

it('preserves the existing tag grammar, captures and explicit starting offset', () => {
  const tokens = [
    'text',
    '<a:r>',
    '</a:r>',
    '<p:spPr x="a>b"/>',
    "<p:x a='a>b'>",
    '<a x="',
    '<a',
    '<--',
    '>',
    '"',
    "'",
    '/>',
  ]
  const original = /<(\/?)([a-zA-Z][\w:]*)((?:"[^"]*"|'[^']*'|[^"'>])*?)(\/?)>/g
  for (const a of tokens)
    for (const b of tokens)
      for (const c of tokens) {
        const xml = a + b + c
        for (const from of [0, 1]) {
          original.lastIndex = from
          const before: Array<{ captures: string[]; index: number }> = []
          let m: RegExpExecArray | null
          while ((m = original.exec(xml))) before.push({ captures: [...m], index: m.index })
          expect(
            [...rawTagMatches(xml, true, from)].map((m) => ({ captures: [...m], index: m.index })),
          ).toEqual(before)
        }
      }
})

it('keeps quoted slide-opening bytes, property capture order and whitespace attribute removal', () => {
  const tokens = [
    '<p:sld>',
    '<p:sld x="a>b">',
    '<p:sld showMasterSp="1">',
    "<p:sld x='a>b'>",
    '<p:sld x="',
    '<p:spPr/>',
    '<p:spPr />',
    '<p:grpSpPr x="1">',
    '<pic:spPr >',
    'text',
  ]
  for (const a of tokens)
    for (const b of tokens) {
      const xml = a + b
      const name = /^<[^\s/>]+/.exec(xml)
      const end = name ? quotedTagEnd(xml, name[0].length) : -1
      expect(end < 0 ? undefined : xml.slice(0, end + 1)).toBe(
        /^<[^\s/>]+(?:"[^"]*"|'[^']*'|[^"'>])*?>/.exec(xml)?.[0],
      )
      const old = /<p:sld((?:\s(?:"[^"]*"|'[^']*'|[^"'>])*?)?)>/.exec(xml)
      const match = quotedTagMatch(xml, '<p:sld')
      expect(match?.[0]).toBe(old?.[0])
      expect(match?.[1]).toBe(old?.[1])
      expect(match?.index).toBe(old?.index)
      const props = /<(p:spPr|p:grpSpPr|pic:spPr)(\s[^>]*?)?(\/?)>/.exec(xml)
      const property = propertyOpeningMatch(xml)
      expect(property?.[0]).toBe(props?.[0])
      expect(property?.[1]).toBe(props?.[1])
      expect(property?.[2] ?? '').toBe(props?.[2] ?? '')
      expect(property?.[3]).toBe(props?.[3])
      expect(removeAttribute(xml, 'showMasterSp', true)).toBe(
        xml.replace(/\s+showMasterSp=(?:"[^"]*"|'[^']*')/, ''),
      )
    }
})

it.each([
  'raw-tags',
  'raw-quotes',
  'shape-fill',
  'picture-crop',
  'slide-background',
  'slide-root',
  'hidden-whitespace',
  'property-transform',
])(
  'bounds %s through production slide generation',
  (kind) => {
    const source = JSON.stringify(new URL('../src/generate.ts', import.meta.url).href)
    const program = `
      import assert from 'node:assert/strict';
      import { topLevelChildren, patchElementFill, patchPictureSrcRect, patchSlideBackgroundXml, patchSlideShowMasterSpXml, patchSlideHiddenXml, patchElementXfrm } from ${source};
      const kind = ${JSON.stringify(kind)};
      const token = { 'raw-tags': '<a', 'raw-quotes': 'x', 'shape-fill': '<p:spPr ', 'picture-crop': '<p:blipFill ', 'slide-background': '<p:bg>', 'slide-root': '<p:sld x="', 'hidden-whitespace': ' ', 'property-transform': '<p:spPr ' }[kind];
      const raw = token.repeat(100000);
      if (kind === 'raw-quotes') assert.deepEqual(topLevelChildren('<a ' + '"'.repeat(1000000), 0, 2000000), []);
      else if (kind === 'raw-tags') assert.deepEqual(topLevelChildren(raw, 0, raw.length), []);
      else if (kind === 'shape-fill') assert.equal(patchElementFill(raw, '112233'), raw);
      else if (kind === 'picture-crop') assert.equal(patchPictureSrcRect(raw, null), raw);
      else if (kind === 'slide-background') assert.equal(patchSlideBackgroundXml(raw, '112233'), raw);
      else if (kind === 'slide-root') assert.equal(typeof patchSlideShowMasterSpXml(raw, true), 'string');
      else if (kind === 'hidden-whitespace') assert.equal(patchSlideHiddenXml('<p:sld' + raw + '>', false), '<p:sld' + raw + '>');
      else assert.equal(patchElementXfrm({ type: 'shape', transform: { offset: { x: 1, y: 2, cx: 3, cy: 4 } } }, raw), raw);
      console.log('bounded');
    `
    expect(
      execFileSync(
        process.execPath,
        [
          ...(kind === 'raw-quotes' ? ['--max-old-space-size=128'] : []),
          '--import',
          'tsx',
          '--input-type=module',
          '--eval',
          program,
        ],
        { timeout: 5000, encoding: 'utf8' },
      ).trim(),
    ).toBe('bounded')
  },
  10000,
)
