// Modified by Onyou Office: compare raw slice boundaries with the upstream match semantics.
import { describe, expect, it } from 'vitest'
import {
  attributeMatch,
  attributeMatches,
  delimitedMatches,
  elementMatches,
  firstMatch,
  openingTagMatch,
  pairedMatch,
  removeSpacePrefixedAttribute,
  revisionTagMatches,
} from '../src/xml-slices'
import { readPageColor } from '../src/section'
import type { ParsedDoc } from '../src/types'

function shape(match: { 0?: string; index?: number } | null) {
  return match ? [match[0], match.index] : null
}

describe('literal XML matching compatibility', () => {
  it('retains greedy and first attribute captures, including values crossing a tag-like >', () => {
    const tokens = [
      'x',
      '<v:textpath ',
      '<v:textpath>',
      'string="A > B"',
      'string=""',
      'string="first string="last"',
      '>',
      '/>',
      ' title=\'string="quoted"\'',
      '<!--',
    ]
    for (const a of tokens)
      for (const b of tokens)
        for (const c of tokens) {
          const xml = a + b + c
          const actual = attributeMatch(xml, '<v:textpath', /\bstring="([^"]*)"/g)
          const old = /<v:textpath[^>]*\bstring="([^"]*)"/.exec(xml)
          expect(actual ? [Array.from(actual), actual.index] : null).toEqual(
            old ? [Array.from(old), old.index] : null,
          )
        }
    const xml = '<!--<wp:docPr id="2" <wp:docPr id=\'31\' <wp:docPr id="7"-->'
    const expected = [...xml.matchAll(/<wp:docPr\s[^>]*?\bid\s*=\s*(["'])(\d+)\1/g)].map((m) => [
      Array.from(m),
      m.index,
    ])
    expect(
      [
        ...attributeMatches(xml, '<wp:docPr', /\bid\s*=\s*(["'])(\d+)\1/g, {
          last: false,
          requireWhitespace: true,
        }),
      ].map((m) => [Array.from(m), m.index]),
    ).toEqual(expected)
  })

  it('preserves revision token spelling, attributes, offsets and complete opaque regions', () => {
    const tokens = [
      'x',
      '<w:r>',
      '<w:r x=">">',
      '</w:r>',
      '<w:r/>',
      '<w:r //>',
      '<w:r!',
      '<!--',
      '-->',
      '<![CDATA[',
      ']]>',
      '<?',
      '?>',
      '<a:b:c>',
      '<a:/>',
    ]
    const oldToken =
      /<(\/?)([A-Za-z][\w.-]*:?[\w.-]*)((?:\s+[^>]*?)?)(\/?)>|<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\?[\s\S]*?\?>/g
    for (const a of tokens)
      for (const b of tokens)
        for (const c of tokens) {
          const xml = a + b + c
          const expected = [...xml.matchAll(oldToken)]
            .filter((m) => m[2] !== undefined)
            .map((m) => [Array.from(m), m.index])
          expect([...revisionTagMatches(xml)].map((m) => [Array.from(m), m.index])).toEqual(
            expected,
          )
        }
  })

  it('retains global element ranges and whitespace-prefixed link removal', () => {
    const tokens = [
      'x',
      '<w:background',
      '<w:background>',
      '<w:background/>',
      '</w:background>',
      '>',
      '/>',
      ' r:link="x > y"',
      'r:link="x r:link="y"',
    ]
    for (const a of tokens)
      for (const b of tokens)
        for (const c of tokens) {
          const xml = a + b + c
          expect(
            [...elementMatches(xml, '<w:background', '</w:background>', { openingTag: true })].map(
              shape,
            ),
          ).toEqual(
            [
              ...xml.matchAll(/<w:background[^>]*\/>|<w:background[^>]*>[\s\S]*?<\/w:background>/g),
            ].map(shape),
          )
          expect(removeSpacePrefixedAttribute(xml, 'r:link')).toBe(
            xml.replace(/\s+r:link="[^"]*"/, ''),
          )
        }
    const xml = '<w:sdtPr>x</w:sdtPr><w:sdtPr>y</w:sdtPr>'
    expect([...delimitedMatches(xml, '<w:sdtPr>', '</w:sdtPr>')].map((m) => m[1])).toEqual([
      'x',
      'y',
    ])
  })
  it('preserves opening and self-closing matches on short complete and incomplete inputs', () => {
    const tokens = [
      'x',
      '<w:pgMar',
      '<w:pgMar >',
      '<w:pgMar/>',
      '<w:pgMarWrong/>',
      '>',
      '/>',
      ' w:left="5"',
      '<!--',
    ]
    for (const a of tokens)
      for (const b of tokens)
        for (const c of tokens) {
          const xml = a + b + c
          expect(shape(openingTagMatch(xml, '<w:pgMar'))).toEqual(
            shape(/<w:pgMar[^>]*\/?>/.exec(xml)),
          )
          expect(shape(openingTagMatch(xml, '<w:pgMar', { selfClosingOnly: true }))).toEqual(
            shape(/<w:pgMar[^>]*\/>/.exec(xml)),
          )
        }
  })

  it('preserves lazy paired slices and self-closing alternation priority', () => {
    const tokens = ['x', '<w:cols', '<w:cols>', '<w:cols/>', '</w:cols>', '>', '/>', '<!--']
    for (const a of tokens)
      for (const b of tokens)
        for (const c of tokens) {
          const xml = a + b + c
          const paired = pairedMatch(xml, '<w:cols', '</w:cols>', { openingTag: true })
          expect(shape(paired)).toEqual(shape(/<w:cols[^>]*>[\s\S]*?<\/w:cols>/.exec(xml)))
          expect(
            shape(firstMatch(openingTagMatch(xml, '<w:cols', { selfClosingOnly: true }), paired)),
          ).toEqual(shape(/<w:cols[^>]*\/>|<w:cols[^>]*>[\s\S]*?<\/w:cols>/.exec(xml)))
        }
  })

  it('keeps the strict section opener boundary, including self-closing spelling', () => {
    for (const xml of [
      '<w:sectPr/>',
      '<w:sectPr />',
      '<w:sectPr>',
      '<w:sectPr x="1">',
      '<w:sectPrOther/><w:sectPr/>',
      '<w:sectPr/no><w:sectPr>',
      '<w:sectPr<w:sectPr>',
    ]) {
      expect(shape(openingTagMatch(xml, '<w:sectPr', { strictBoundary: true }))).toEqual(
        shape(/<w:sectPr(?:\s[^>]*?)?\/>|<w:sectPr(?:\s[^>]*?)?>/.exec(xml)),
      )
    }
  })

  it('keeps background color matching across missing attributes and unfinished tags', () => {
    for (const xml of [
      '<w:background/><w:background w:color="123aBc"/>',
      '<w:background w:color="abcdef"',
      '<w:background w:color="123456" w:color="abcdef"/>',
      '<w:background w:color="wrong"/><w:background/>',
    ]) {
      const old =
        /<w:background[^>]*w:color="([0-9A-Fa-f]{6})"/.exec(xml)?.[1]?.toUpperCase() ?? null
      expect(readPageColor({ internal: { documentXml: xml } } as ParsedDoc)).toBe(old)
    }
  })
})
