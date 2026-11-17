import { performance } from 'node:perf_hooks'
import { describe, expect, it } from 'vitest'
import { parseHierConstraints } from '../src/dgm-hier'

// The constraint parser as it was before the linear rewrite, kept verbatim as the oracle.
function oldParse(layoutXml: string) {
  const cons = { ...parseHierConstraints(undefined) }
  const fact = (re: RegExp): number | undefined => {
    const m = re.exec(layoutXml)
    if (!m) return undefined
    const v = parseFloat(m[1]!)
    return Number.isFinite(v) && v > 0 ? v : undefined
  }
  const composite = '(?:rootComposite1?|composite)'
  cons.boxAspect =
    fact(
      new RegExp(
        `<dgm:constr type="h" for="des" forName="${composite}"[^>]*refForName="${composite}"[^>]*fact="([\\d.]+)"`,
      ),
    ) ?? cons.boxAspect
  cons.sibSp =
    fact(
      new RegExp(`<dgm:constr type="sibSp"[^>]*refForName="${composite}"[^>]*fact="([\\d.]+)"`),
    ) ?? cons.sibSp
  const sp =
    /<dgm:constr type="sp" for="des" forName="hierRoot1"[^>]*?refType="(w|h)"[^>]*?fact="([\d.]+)"/.exec(
      layoutXml,
    )
  if (sp) {
    const v = parseFloat(sp[2]!)
    if (Number.isFinite(v) && v > 0) cons.sp = sp[1] === 'h' ? v * cons.boxAspect : v
  } else {
    cons.sp =
      fact(/<dgm:constr type="sp" for="des" forName="hierRoot1"[^>]*fact="([\d.]+)"/) ?? cons.sp
  }
  const connW = fact(/<dgm:constr type="w" for="ch" forName="rootConnector1?"[^>]*fact="([\d.]+)"/)
  if (connW != null) cons.trunkOff = connW / 2
  const fsz = /<dgm:constr type="primFontSz"[^>]*\bval="([\d.]+)"/.exec(layoutXml)
  if (fsz) cons.fontMax = parseFloat(fsz[1]!) || cons.fontMax
  return cons
}

const PREFIXES = [
  '<dgm:constr type="h" for="des" forName="composite"',
  '<dgm:constr type="h" for="des" forName="rootComposite1"',
  '<dgm:constr type="sibSp"',
  '<dgm:constr type="sp" for="des" forName="hierRoot1"',
  '<dgm:constr type="w" for="ch" forName="rootConnector"',
  '<dgm:constr type="primFontSz"',
]
const ATTRS = [
  ' refForName="composite"',
  ' refForName="rootComposite"',
  ' refForName="other"',
  ' refType="w"',
  ' refType="h"',
  ' refType="x"',
  ' fact="0.3"',
  ' fact="1.25"',
  ' fact="0"',
  ' fact="."',
  ' val="40"',
  ' xval="12"',
  ' val="0"',
  '/>',
  '>',
  '',
]

describe('diagram constraint parsing', () => {
  it('matches the previous regexes on generated layout parts', () => {
    let seed = 7
    const pick = <T>(a: T[]): T => a[(seed = (seed * 1103515245 + 12345) & 0x7fffffff) % a.length]!
    for (let i = 0; i < 4000; i++) {
      let xml = ''
      for (let t = 0; t < 1 + (i % 6); t++) {
        xml += pick(PREFIXES)
        for (let a = 0; a < i % 5; a++) xml += pick(ATTRS)
      }
      expect(parseHierConstraints(xml)).toEqual(oldParse(xml))
    }
  })

  for (const prefix of PREFIXES) {
    it(`stays linear on a repeated unclosed ${prefix.split('"')[1]} prefix`, () => {
      const xml = prefix.repeat(40_000) + ' refType="w"'.repeat(40_000)
      const t0 = performance.now()
      parseHierConstraints(xml)
      // The previous regexes needed minutes on this ~2.5 MB tag.
      expect(performance.now() - t0).toBeLessThan(2_000)
    })
  }
})
