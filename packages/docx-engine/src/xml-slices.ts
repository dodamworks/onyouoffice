// Modified by Onyou Office: preserve literal XML slices without regex retries.
export interface XmlSlice {
  index: number
  text: string
}

/** Match the old lazy paired-element expression without retrying every opener. */
export function pairedSlice(xml: string, prefix: string, closing: string): XmlSlice | null {
  const index = xml.indexOf(prefix)
  if (index < 0) return null
  const end = xml.indexOf(closing, index + prefix.length)
  return end < 0 ? null : { index, text: xml.slice(index, end + closing.length) }
}

/** Match prefix + [^>]* + />; every unsuccessful tag end is visited once. */
export function selfClosingSlice(xml: string, prefix: string): XmlSlice | null {
  let from = 0
  while (from < xml.length) {
    const index = xml.indexOf(prefix, from)
    if (index < 0) return null
    const end = xml.indexOf('>', index + prefix.length)
    if (end < 0) return null
    if (xml[end - 1] === '/') return { index, text: xml.slice(index, end + 1) }
    from = end + 1
  }
  return null
}

/** Preserve alternation order when both expressions start at the same byte. */
export function firstSlice(a: XmlSlice | null, b: XmlSlice | null): XmlSlice | null {
  return a && (!b || a.index <= b.index) ? a : b
}

/** Same non-overlapping lazy drawing slices and ordinals as the original regex. */
export function* hfDrawingMatches(xml: string): Generator<{ 0: string; index: number }> {
  const opening = /<w:drawing[\s>]/g
  let match: RegExpExecArray | null
  while ((match = opening.exec(xml))) {
    const close = xml.indexOf('</w:drawing>', opening.lastIndex)
    if (close < 0) return
    const end = close + '</w:drawing>'.length
    yield { 0: xml.slice(match.index, end), index: match.index }
    opening.lastIndex = end
  }
}
