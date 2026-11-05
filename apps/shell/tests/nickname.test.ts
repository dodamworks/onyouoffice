import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { readNickname, writeNickname } from '../src/main/nickname'
import { normalizeNickname } from '../src/shared/nickname'

let dir: string
let path: string
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'onyou-nickname-'))
  path = join(dir, 'app-settings.json')
})
afterEach(() => rmSync(dir, { recursive: true, force: true }))

describe('local nickname preference', () => {
  it('normalizes whitespace and controls without losing international text', () => {
    expect(normalizeNickname('  민아\n\u202e  Mina  ')).toBe('민아 Mina')
    expect(normalizeNickname('Jose\u0301')).toBe('José')
    expect(normalizeNickname('ليلى')).toBe('ليلى')
    expect(normalizeNickname('😀'.repeat(41))).toBe('😀'.repeat(40))
    expect(normalizeNickname(null)).toBe('')
  })
  it('starts empty and preserves author and other preferences through save and clear', () => {
    expect(readNickname(path)).toBe('')
    writeFileSync(path, JSON.stringify({ authorName: 'Document Author', lang: 'ko' }))
    expect(writeNickname(path, '  Mina  ')).toBe('Mina')
    expect(readNickname(path)).toBe('Mina')
    expect(writeNickname(path, '')).toBe('')
    expect(JSON.parse(readFileSync(path, 'utf8'))).toEqual({
      authorName: 'Document Author',
      lang: 'ko',
      nickname: '',
    })
  })
  it('rejects invalid writes and reports storage failures rather than claiming success', () => {
    expect(() => writeNickname(path, { name: 'Mina' })).toThrow('Invalid nickname')
    expect(() => writeNickname(join(dir, 'missing', 'settings.json'), 'Mina')).toThrow()
    expect(readNickname(path)).toBe('')
  })
})
