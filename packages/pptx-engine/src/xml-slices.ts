// Modified by Onyou Office: bound raw OOXML slice matching without serialization.
export type XmlMatch = string[] & { index: number; input: string }

export function openingTagMatch(
  xml: string,
  prefix: string,
  selfClosing = false,
  requireWhitespace = false,
): XmlMatch | null {
  let from = 0
  while (from < xml.length) {
    const at = xml.indexOf(prefix, from)
    if (at < 0) return null
    const after = at + prefix.length
    if (requireWhitespace && !/\s/.test(xml[after] ?? '')) {
      from = after
      continue
    }
    if (!/[\s>]/.test(xml[after] ?? '') && !xml.startsWith('/>', after)) {
      from = after
      continue
    }
    if (!selfClosing && xml.startsWith('/>', after)) {
      from = after
      continue
    }
    const end = xml.indexOf('>', after)
    if (end < 0) return null
    if (!selfClosing || xml[end - 1] === '/')
      return Object.assign([xml.slice(at, end + 1)], { index: at, input: xml })
    from = end + 1
  }
  return null
}

export function pairedMatch(xml: string, prefix: string, closing: string): XmlMatch | null {
  const index = xml.indexOf(prefix)
  if (index < 0) return null
  const end = xml.indexOf(closing, index + prefix.length)
  return end < 0
    ? null
    : Object.assign([xml.slice(index, end + closing.length)], { index, input: xml })
}

export function firstMatch(a: XmlMatch | null, b: XmlMatch | null): XmlMatch | null {
  return a && (!b || a.index <= b.index) ? a : b
}

export function removeAttribute(xml: string, name: string, bothQuotes = false): string {
  let from = 0
  while (from < xml.length) {
    const double = xml.indexOf(name + '="', from)
    const single = bothQuotes ? xml.indexOf(name + "='", from) : -1
    const at = double < 0 ? single : single < 0 ? double : Math.min(double, single)
    if (at < 0) return xml
    const quoteAt = at + name.length + 1
    const end = xml.indexOf(xml[quoteAt]!, quoteAt + 1)
    if (end < 0) return xml
    if (at > 0 && /\s/.test(xml[at - 1]!)) {
      let start = at
      while (start > 0 && /\s/.test(xml[start - 1]!)) start--
      return xml.slice(0, start) + xml.slice(end + 1)
    }
    from = quoteAt + 1
  }
  return xml
}

/** Raw tag grammar: retain quoted > bytes and original captures, without retrying suffixes. */
export function* rawTagMatches(xml: string, pptx = false, from = 0): Generator<XmlMatch> {
  const delimiters: number[] = []
  for (const match of xml.matchAll(/["'>]/g)) delimiters.push(match.index)
  const ends = new Int32Array(delimiters.length + 1).fill(-1)
  let single = -1
  let double = -1
  for (let i = delimiters.length - 1; i >= 0; i--) {
    const ch = xml[delimiters[i]!]!
    if (ch === '>') ends[i] = delimiters[i]!
    else if (ch === "'") {
      ends[i] = single < 0 ? -1 : ends[single + 1]!
      single = i
    } else {
      ends[i] = double < 0 ? -1 : ends[double + 1]!
      double = i
    }
  }
  const name = pptx ? /[A-Za-z][\w:]*/y : /[A-Za-z0-9:._-]+/y
  let delimiter = 0
  while (from < xml.length) {
    const start = xml.indexOf('<', from)
    if (start < 0) return
    const closing = xml[start + 1] === '/'
    name.lastIndex = start + (closing ? 2 : 1)
    const token = name.exec(xml)
    if (!token) {
      from = start + 1
      continue
    }
    while (delimiter < delimiters.length && delimiters[delimiter]! < name.lastIndex) delimiter++
    const end = ends[delimiter]!
    if (end < 0) {
      from = start + 1
      continue
    }
    let attrs = xml.slice(name.lastIndex, end)
    const self = pptx && attrs.endsWith('/')
    if (self) attrs = attrs.slice(0, -1)
    const match = Object.assign([xml.slice(start, end + 1), closing ? '/' : '', token[0], attrs], {
      index: start,
      input: xml,
    })
    if (pptx) match.push(self ? '/' : '')
    yield match
    from = end + 1
  }
}

/** The first unquoted tag end after an already matched name/prefix. */
export function quotedTagEnd(xml: string, from: number): number {
  for (let at = from; at < xml.length; at++) {
    const ch = xml[at]!
    if (ch === '>') return at
    if (ch === '"' || ch === "'") {
      const close = xml.indexOf(ch, at + 1)
      if (close < 0) return -1
      at = close
    }
  }
  return -1
}

/** Prefix-directed quote-aware lookup, including matches in opaque/raw fragments. */
export function quotedTagMatch(xml: string, prefix: string): XmlMatch | null {
  const positions: number[] = []
  for (const match of xml.matchAll(/["'>]/g)) positions.push(match.index)
  const ends = new Int32Array(positions.length + 1).fill(-1)
  let single = -1
  let double = -1
  for (let i = positions.length - 1; i >= 0; i--) {
    const ch = xml[positions[i]!]!
    if (ch === '>') ends[i] = positions[i]!
    else if (ch === "'") {
      ends[i] = single < 0 ? -1 : ends[single + 1]!
      single = i
    } else {
      ends[i] = double < 0 ? -1 : ends[double + 1]!
      double = i
    }
  }
  let from = 0
  let delimiter = 0
  while (from < xml.length) {
    const at = xml.indexOf(prefix, from)
    if (at < 0) return null
    const after = at + prefix.length
    if (!/[\s>]/.test(xml[after] ?? '')) {
      from = after
      continue
    }
    while (delimiter < positions.length && positions[delimiter]! < after) delimiter++
    const end = ends[delimiter]!
    if (end >= 0)
      return Object.assign([xml.slice(at, end + 1), xml.slice(after, end)], {
        index: at,
        input: xml,
      })
    from = after
  }
  return null
}

export function propertyOpeningMatch(xml: string): XmlMatch | null {
  const prefixes = /<(p:spPr|p:grpSpPr|pic:spPr)(?=[\s/>])/g
  let prefix: RegExpExecArray | null
  while ((prefix = prefixes.exec(xml))) {
    const after = prefixes.lastIndex
    if (!/[\s>]/.test(xml[after] ?? '') && !xml.startsWith('/>', after)) continue
    const end = xml.indexOf('>', after)
    if (end < 0) return null
    const self = xml[end - 1] === '/'
    const attrs = xml.slice(after, self ? end - 1 : end)
    return Object.assign([xml.slice(prefix.index, end + 1), prefix[1]!, attrs, self ? '/' : ''], {
      index: prefix.index,
      input: xml,
    })
  }
  return null
}
