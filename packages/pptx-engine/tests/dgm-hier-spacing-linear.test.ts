import { performance } from 'node:perf_hooks'
import { describe, expect, it } from 'vitest'
import { parseHierConstraints } from '../src/dgm-hier'

const SP = '<dgm:constr type="sp" for="des" forName="hierRoot1"'
const OLD =
  /<dgm:constr type="sp" for="des" forName="hierRoot1"[^>]*?refType="(w|h)"[^>]*?fact="([\d.]+)"/

// The previous regex, applied the same way parseHierConstraints applies its result.
function oldSp(xml: string): number {
  const cons = parseHierConstraints(undefined)
  const aspect = parseHierConstraints(xml).boxAspect
  const m = OLD.exec(xml)
  if (m) {
    const v = parseFloat(m[2]!)
    return Number.isFinite(v) && v > 0 ? (m[1] === 'h' ? v * aspect : v) : cons.sp
  }
  const f = /<dgm:constr type="sp" for="des" forName="hierRoot1"[^>]*fact="([\d.]+)"/.exec(xml)
  const v = f ? parseFloat(f[1]!) : NaN
  return Number.isFinite(v) && v > 0 ? v : cons.sp
}

describe('hierRoot1 row-gap constraint', () => {
  it('reads the same value as the previous regex on varied tags', () => {
    const parts = [
      `${SP} refType="w" fact="0.3"/>`,
      `${SP} refType="h" refFor="ch" fact="0.5"/>`,
      `${SP} refType="x" fact="0.7"/>`,
      `${SP} fact="0.4" refType="w"/>`,
      `${SP} refType="w"/>${SP} refType="h" fact="0.9"/>`,
      `${SP} refType="w" ${SP} fact="1.25"/>`,
      `${SP} refType="h"`,
      `<dgm:constr type="h" for="des" forName="composite" refForName="composite" fact="0.6"/>`,
      '<dgm:constr type="sp" for="des" forName="other" refType="w" fact="0.8"/>',
    ]
    let seed = 7
    const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) % parts.length
    for (let i = 0; i < 400; i++) {
      const xml = Array.from({ length: 1 + (i % 5) }, () => parts[rnd()]).join('')
      expect(parseHierConstraints(xml).sp).toBe(oldSp(xml))
    }
  })

  it('stays linear on a long unclosed constraint tag', () => {
    const xml = SP + ' refType="w"'.repeat(400_000)
    const t0 = performance.now()
    parseHierConstraints(xml)
    // The previous regex needed minutes on this 4.8 MB tag.
    expect(performance.now() - t0).toBeLessThan(2_000)
  })
})
