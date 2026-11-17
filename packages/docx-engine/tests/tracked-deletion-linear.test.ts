import { performance } from 'node:perf_hooks'
import { describe, expect, it } from 'vitest'
import { replaceTrackedDeletions } from '../src/generate'

const OLD = /<w:del(?:\s[^>]*)?(?<!\/)>[\s\S]*?<\/w:del>/g
const mark = (del: string) => `[${del.length}]`

describe('replaceTrackedDeletions', () => {
  it('matches the previous regex replacement on varied paragraphs', () => {
    const parts = [
      '<w:r><w:t>a</w:t></w:r>',
      '<w:del w:id="1" w:author="x"><w:r><w:delText>b</w:delText></w:r></w:del>',
      '<w:del><w:r/></w:del>',
      '<w:del w:id="2"/>',
      '<w:del />',
      '<w:delText>c</w:delText>',
      '<w:del\tw:id="3">',
      '</w:del>',
      '<w:del',
      '>',
      '<w:ins w:id="4"><w:r/></w:ins>',
    ]
    let seed = 11
    const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) % parts.length
    for (let i = 0; i < 2000; i++) {
      const xml = Array.from({ length: 1 + (i % 9) }, () => parts[rnd()]).join('')
      expect(replaceTrackedDeletions(xml, mark)).toBe(xml.replace(OLD, mark))
    }
  })

  it('stays linear on many unclosed deletions', () => {
    const xml = '<w:del\t'.repeat(700_000) + '>'
    const t0 = performance.now()
    expect(replaceTrackedDeletions(xml, mark)).toBe(xml)
    // The previous regex needed minutes on this 4.9 MB paragraph.
    expect(performance.now() - t0).toBeLessThan(2_000)
  })
})
