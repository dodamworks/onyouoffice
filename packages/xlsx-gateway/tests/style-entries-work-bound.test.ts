import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { resolvedStyleEntries, styleEntrySlots } from '../src/gateway/xlsx-style-entries'

describe('style entry scan boundaries', () => {
  it('finishes malformed tag runs within a bounded child process', () => {
    const moduleUrl = new URL('../src/gateway/xlsx-style-entries.ts', import.meta.url).href
    const script = `import { resolvedStyleEntries } from ${JSON.stringify(moduleUrl)};
      for (const xml of ['<'.repeat(8000), '<font ' + 'a'.repeat(8000), '<font a="' + '<'.repeat(8000)]) {
        if (resolvedStyleEntries(xml, 'font').length !== 0) process.exit(1);
      }`
    expect(() =>
      execFileSync(process.execPath, ['--input-type=module', '-e', script], {
        timeout: 3000,
        stdio: 'pipe',
      }),
    ).not.toThrow()
  })

  it('keeps quoted delimiters and ignores comments, CDATA and instructions', () => {
    const font = '<font label="a>b"><name val=\'x>y\'/></font>'
    const xml = `<!-- <font/> --><![CDATA[<font/>]]><?hint value="<font/>"?>${font}<font/>`
    expect(styleEntrySlots(xml, 'font')).toEqual([font, '<font/>'])
    expect(resolvedStyleEntries(xml, 'font')).toEqual([font, '<font/>'])
  })

  it('retains nested compatibility entries and refuses excessive nesting', () => {
    const wrap = (inner: string) =>
      `<mc:AlternateContent><mc:Fallback>${inner}</mc:Fallback></mc:AlternateContent>`
    let xml = '<font/>'
    for (let i = 0; i < 8; i++) xml = wrap(xml)
    expect(resolvedStyleEntries(xml, 'font')).toEqual(['<font/>'])
    for (let i = 8; i < 66; i++) xml = wrap(xml)
    expect(() => resolvedStyleEntries(xml, 'font')).toThrow('nesting exceeds 64 levels')
  })
})
