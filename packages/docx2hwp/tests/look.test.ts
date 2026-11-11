import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import JSZip from 'jszip'
import { beforeAll, describe, expect, it } from 'vitest'
import { parseDocx } from '@genoffice/docx-engine'
import { convert } from '../src/convert'
import { withOpenedDocument } from '../src/engine'
import { Docx2HwpError, HwpEngine, docxToHwp, type HwpFormat } from '../src/index'
import { hangulLook } from '../src/look'
import { LossLedger } from '../src/losses'
import { lowerDocument } from '../src/lower'
import type { Block, Cell, HwpPlan, Para, Table } from '../src/model'
import { hwpFromPt, ptFromHwp } from '../src/units'
import { FIXTURES } from './helpers/paths'
import { readBack } from './helpers/read-back'

/**
 * A Markdown file as its Word export writes it: headings, lists, and four
 * tables of two and three even columns whose cells wrap, long enough to run
 * over several pages.
 */
const MARKDOWN_DOCX = `${FIXTURES}/markdown-tables.docx`
const docx = (path: string) => new Uint8Array(readFileSync(path))

async function lowered(path: string): Promise<HwpPlan> {
  return lowerDocument(await parseDocx(docx(path)), new LossLedger())
}

const tables = (story: readonly Block[]): Table[] =>
  story.filter((block): block is Table => block.kind === 'table')
const cellText = (cell: Cell): string =>
  cell.body
    .filter((block): block is Para => block.kind === 'para')
    .map((para) => para.inlines.map((i) => (i.kind === 'text' ? i.text : '')).join(''))
    .join('\n')
const sum = (values: readonly number[]): number => values.reduce((total, v) => total + v, 0)

describe('the Hangul look of a plan', async () => {
  const word = await lowered(MARKDOWN_DOCX)
  const plan = hangulLook(word)
  const before = tables(word.body)
  const after = tables(plan.body)

  it('leaves the paragraphs, the page and the table contents as they were', () => {
    expect(plan.page).toEqual(word.page)
    expect(plan.body.length).toBe(word.body.length)
    expect(plan.body.filter((b) => b.kind === 'para')).toEqual(
      word.body.filter((b) => b.kind === 'para'),
    )
    expect(after.map((t) => t.cells.map(cellText))).toEqual(
      before.map((t) => t.cells.map(cellText)),
    )
  })

  it('puts every body table between the paragraphs, so it can go on to the next page', () => {
    expect(before.map((t) => t.flow.kind)).toEqual(['char', 'char', 'char', 'char', 'char', 'char'])
    expect(after.map((t) => t.flow.kind)).toEqual([
      'block',
      'block',
      'block',
      'block',
      'block',
      'block',
    ])
  })

  it('keeps as much room under a table as the next paragraph asks above itself', () => {
    const flows = plan.body.flatMap((block, i) => {
      if (block.kind !== 'table' || block.flow.kind !== 'block') return []
      const next = plan.body[i + 1]
      return [{ below: block.flow.below, next: next?.kind === 'para' ? next.shape.before : null }]
    })
    // 3 mm at least (850 HWPUNIT); the paragraph unit is twice as fine
    for (const { below, next } of flows) {
      expect(below).toBeGreaterThanOrEqual(850)
      if (next !== null) expect(below).toBeGreaterThanOrEqual(Math.min(next / 2, 2400))
    }
    // a heading follows the first table, and asks for more than 3 mm
    expect(flows[0]!.below).toBeGreaterThan(850)
  })

  it('gives every cell room above and below its text and centres it', () => {
    const cells = after.flatMap((t) => t.cells)
    // Word's export leaves no vertical margin: Hangul would draw the text on the borders
    expect(before.flatMap((t) => t.cells).every((c) => c.padding.top === 0)).toBe(true)
    expect(cells.every((c) => c.padding.top >= 283 && c.padding.bottom >= 283)).toBe(true)
    expect(cells.every((c) => c.padding.left >= 510 && c.padding.right >= 510)).toBe(true)
    expect(cells.every((c) => c.vAlign === 'center')).toBe(true)
  })

  it('makes the shaded first row a header: bold, centred, repeated on each page', () => {
    for (const table of after) {
      expect(table.repeatHeader).toBe(true)
      for (const cell of table.cells) {
        const paras = cell.body.filter((b): b is Para => b.kind === 'para')
        const bold = paras.flatMap((p) => p.inlines).every((i) => i.kind !== 'text' || i.chars.bold)
        const centred = paras.every((p) => p.shape.align === 'center')
        expect(bold && centred).toBe(cell.row === 0)
      }
    }
  })

  it('shares the width by what the columns hold, keeping the table as wide', () => {
    const [info, zones] = after
    expect(sum(before[0]!.colWidths)).toBe(sum(info!.colWidths))
    // 항목 | 내용: the label column takes its longest label, the rest goes to the text
    expect(info!.colWidths[0]!).toBeLessThan(info!.colWidths[1]! / 3)
    // '빌리는 권수' is six characters and a space of 11 pt text, with the cell margins
    expect(info!.colWidths[0]!).toBeGreaterThan(6 * 1100)
    // 번호 | 구역 | 지켜 주실 것
    expect(zones!.colWidths[0]!).toBeLessThan(zones!.colWidths[1]!)
    expect(zones!.colWidths[1]!).toBeLessThan(zones!.colWidths[2]!)
    expect(sum(before[1]!.colWidths)).toBe(sum(zones!.colWidths))
  })

  it('keeps the widths an author set', () => {
    const table = before[0]!
    const uneven: Table = {
      ...table,
      colWidths: [
        hwpFromPt(ptFromHwp(table.colWidths[0]!) * 1.5),
        hwpFromPt(ptFromHwp(table.colWidths[1]!) * 0.5),
      ],
    }
    const looked = tables(hangulLook({ ...word, body: [uneven] }).body)[0]!
    expect(looked.colWidths).toEqual(uneven.colWidths)
  })

  it('leaves a table inside a cell placed like a character', async () => {
    const nested = hangulLook(await lowered(`${FIXTURES}/nested.docx`))
    const outer = tables(nested.body)
    const inner = outer.flatMap((t) => t.cells.flatMap((c) => tables(c.body)))
    expect(outer.length).toBeGreaterThan(0)
    expect(inner.length).toBeGreaterThan(0)
    expect(outer.every((t) => t.flow.kind === 'block')).toBe(true)
    expect(inner.every((t) => t.flow.kind === 'char')).toBe(true)
  })
})

describe('writing with the Hangul look', () => {
  let engine: HwpEngine
  beforeAll(async () => {
    engine = await HwpEngine.start(
      readFileSync(createRequire(import.meta.url).resolve('@rhwp/core/rhwp_bg.wasm')),
    )
  })

  const pagesOf = (bytes: Uint8Array): number =>
    withOpenedDocument(engine, bytes, (doc) => doc.pageCount())

  it.each(['hwpx', 'hwp'] as const)('writes a %s the engine opens again', async (format) => {
    const { bytes, losses } = await docxToHwp(docx(MARKDOWN_DOCX), format, engine, {
      look: 'hangul',
    })
    expect(losses).toEqual([])
    const back = await readBack(engine, bytes)
    expect(back.tables.map((t) => [t.rows, t.cols])).toEqual([
      [6, 2],
      [4, 3],
      [17, 2],
      [17, 2],
      [17, 2],
      [17, 2],
    ])
    expect(back.tables[0]!.cells.slice(0, 4).map((c) => c.texts.join(''))).toEqual([
      '항목',
      '내용',
      '위치',
      '본관 2층 동쪽 끝, 계단을 올라와 오른쪽 복도를 따라가면 보이는 유리문 안쪽',
    ])
    // the header cells are centred in their cells (1), like every other cell
    expect(back.tables[0]!.cells.every((c) => c.verticalAlign === 1)).toBe(true)
    expect(back.body[0]!.text).toBe('도서관 이용 안내')
    expect(back.body[0]!.style).toBe('개요 1')
  })

  it('saves the tables as ones that continue on the next page with their header', async () => {
    const { bytes } = await docxToHwp(docx(MARKDOWN_DOCX), 'hwpx', engine, { look: 'hangul' })
    const zip = await JSZip.loadAsync(bytes)
    const section = await zip.file('Contents/section0.xml')!.async('string')
    const saved = [...section.matchAll(/<hp:tbl\b[^>]*>/g)].map((m) => m[0])
    expect(saved).toHaveLength(6)
    for (const tag of saved) {
      // TABLE: the table is divided between pages and its rows are not
      expect(tag).toContain('pageBreak="TABLE"')
      expect(tag).toContain('repeatHeader="1"')
    }
    expect([...section.matchAll(/treatAsChar="(\d)"/g)].map((m) => m[1])).toEqual(
      Array(6).fill('0'),
    )
    // room under each table: the outer margin Hancom Hangul reads
    const below = [...section.matchAll(/<hp:outMargin [^>]*bottom="(\d+)"/g)].map((m) =>
      Number(m[1]),
    )
    expect(below).toHaveLength(6)
    expect(below.every((v) => v >= 850)).toBe(true)
  })

  it('reads the same number of pages from both formats', async () => {
    const pages = await Promise.all(
      (['hwpx', 'hwp'] as HwpFormat[]).map(async (format) =>
        pagesOf((await docxToHwp(docx(MARKDOWN_DOCX), format, engine, { look: 'hangul' })).bytes),
      ),
    )
    expect(pages[0]).toBe(pages[1])
    expect(pages[0]).toBeGreaterThan(2)
  })
})

describe('a .hwp whose tables grew after they were laid out', () => {
  let engine: HwpEngine
  beforeAll(async () => {
    engine = await HwpEngine.start(
      readFileSync(createRequire(import.meta.url).resolve('@rhwp/core/rhwp_bg.wasm')),
    )
  })

  it('is written from the file opened again, with the pages that file has', async () => {
    // Word's look: tables placed like characters, filled inside the batch
    const hwpx = await docxToHwp(docx(MARKDOWN_DOCX), 'hwpx', engine)
    const hwp = await docxToHwp(docx(MARKDOWN_DOCX), 'hwp', engine)
    expect([...hwp.bytes.subarray(0, 4)]).toEqual([0xd0, 0xcf, 0x11, 0xe0])
    const [fromHwpx, fromHwp] = [
      await readBack(engine, hwpx.bytes),
      await readBack(engine, hwp.bytes),
    ]
    expect(fromHwp.pages).toBe(fromHwpx.pages)
    expect(fromHwp.body.map((p) => p.text)).toEqual(fromHwpx.body.map((p) => p.text))
    expect(fromHwp.tables.map((t) => t.cells.map((c) => c.texts))).toEqual(
      fromHwpx.tables.map((t) => t.cells.map((c) => c.texts)),
    )
    expect(hwp.losses).toEqual(hwpx.losses)
  })

  it('matches the document written call by call, where the layout never went stale', async () => {
    const settled = await docxToHwp(docx(MARKDOWN_DOCX), 'hwp', engine)
    const slow = await convert(docx(MARKDOWN_DOCX), 'hwp', engine, { batch: false })
    const [a, b] = [await readBack(engine, settled.bytes), await readBack(engine, slow.bytes)]
    const outline = (back: typeof a) => back.body.map((p) => [p.text, p.style, p.controls])
    expect(a.pages).toBe(b.pages)
    expect(outline(a)).toEqual(outline(b))
    expect(a.body.map((p) => p.shape)).toEqual(b.body.map((p) => p.shape))
    expect(a.tables).toEqual(b.tables)
  })

  it('still refuses a .hwp that reads back differently after that', async () => {
    const core = await import('@rhwp/core')
    const verify = core.HwpDocument.prototype.exportHwpVerify
    core.HwpDocument.prototype.exportHwpVerify = () =>
      JSON.stringify({ ok: true, recovered: true, pageCountBefore: 3, pageCountAfter: 4 })
    try {
      const refusal = await docxToHwp(docx(MARKDOWN_DOCX), 'hwp', engine).catch((err) => err)
      expect(refusal).toBeInstanceOf(Docx2HwpError)
      expect(refusal.code).toBe('hwp-readback')
      expect(refusal.message).toBe('the .hwp reads back with 4 pages instead of 3')
    } finally {
      core.HwpDocument.prototype.exportHwpVerify = verify
    }
  })
})
