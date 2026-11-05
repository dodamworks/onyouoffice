/** Home-only display preference; never a document author or provider identity. */
export const NICKNAME_KEY = 'nickname'
export const NICKNAME_MAX = 40

export function normalizeNickname(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  const clean = raw
    .normalize('NFC')
    .replace(/[\p{Cc}\u200b\u200e\u200f\u202a-\u202e\u2066-\u2069\ufeff]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
  return Array.from(clean).slice(0, NICKNAME_MAX).join('')
}
