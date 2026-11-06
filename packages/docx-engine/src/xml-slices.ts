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

/** Regex-compatible raw slice, without serializing or decoding the document. */
export type XmlMatch = string[] & { index: number; input: string }

function asMatch(xml: string, index: number, end: number): XmlMatch {
  return Object.assign([xml.slice(index, end)], { index, input: xml })
}

/** Same first tag as prefix + [^>]* + >; skip failed tag endings once. */
export function openingTagMatch(
  xml: string,
  prefix: string,
  options: {
    selfClosingOnly?: boolean
    strictBoundary?: boolean
    wordBoundary?: boolean
    requireWhitespace?: boolean
    allowUnterminated?: boolean
    from?: number
  } = {},
): XmlMatch | null {
  if (!prefix) throw new Error('XML prefix must not be empty')
  let from = options.from ?? 0
  while (from < xml.length) {
    const index = xml.indexOf(prefix, from)
    if (index < 0) return null
    const after = index + prefix.length
    if (options.wordBoundary && /\w/.test(xml[after] ?? '')) {
      from = after
      continue
    }
    if (options.requireWhitespace && !/\s/.test(xml[after] ?? '')) {
      from = after
      continue
    }
    if (options.strictBoundary && !/[\s>]/.test(xml[after] ?? '') && !xml.startsWith('/>', after)) {
      from = after
      continue
    }
    const end = xml.indexOf('>', after)
    if (end < 0)
      return options.allowUnterminated && !options.selfClosingOnly
        ? asMatch(xml, index, xml.length)
        : null
    if (!options.selfClosingOnly || xml[end - 1] === '/') return asMatch(xml, index, end + 1)
    from = end + 1
  }
  return null
}

/** Same lazy prefix-to-closing slice, optionally requiring a complete opening tag. */
export function pairedMatch(
  xml: string,
  prefix: string,
  closing: string,
  options: { openingTag?: boolean; strictOpening?: boolean; from?: number } = {},
): XmlMatch | null {
  if (!prefix || !closing) throw new Error('XML delimiters must not be empty')
  let index = xml.indexOf(prefix, options.from ?? 0)
  if (options.strictOpening) {
    let from = options.from ?? 0
    while (from < xml.length) {
      const open = openingTagMatch(xml, prefix, { strictBoundary: true, from })
      if (!open) return null
      index = open.index
      if (!xml.startsWith('/>', index + prefix.length)) break
      from = index + prefix.length
    }
  }
  if (index < 0) return null
  const after = options.openingTag
    ? xml.indexOf('>', index + prefix.length)
    : index + prefix.length - 1
  if (after < 0) return null
  const end = xml.indexOf(closing, after + 1)
  return end < 0 ? null : asMatch(xml, index, end + closing.length)
}

export function* delimitedMatches(
  xml: string,
  prefix: string,
  closing: string,
): Generator<XmlMatch> {
  let from = 0
  let match: XmlMatch | null
  while ((match = pairedMatch(xml, prefix, closing, { from }))) {
    match.push(match[0]!.slice(prefix.length, -closing.length))
    yield match
    from = match.index + match[0]!.length
  }
}

export function replaceDelimited(
  xml: string,
  prefix: string,
  closing: string,
  edit: (part: string) => string,
): string {
  return replaceMatches(xml, delimitedMatches(xml, prefix, closing), edit)
}

export function replaceMatches(
  xml: string,
  matches: Iterable<XmlMatch>,
  edit: (part: string, match: XmlMatch) => string,
): string {
  const parts: string[] = []
  let from = 0
  for (const match of matches) {
    parts.push(xml.slice(from, match.index), edit(match[0]!, match))
    from = match.index + match[0]!.length
  }
  parts.push(xml.slice(from))
  return parts.join('')
}

/** Preserve the old alternation's priority when two matches start together. */
export function firstMatch(a: XmlMatch | null, b: XmlMatch | null): XmlMatch | null {
  return a && (!b || a.index <= b.index) ? a : b
}

export function* openingTagMatches(
  xml: string,
  prefix: string,
  options: {
    allowUnterminated?: boolean
    selfClosingOnly?: boolean
    strictBoundary?: boolean
    wordBoundary?: boolean
    requireWhitespace?: boolean
  } = {},
): Generator<XmlMatch> {
  let from = 0
  let match: XmlMatch | null
  while ((match = openingTagMatch(xml, prefix, { ...options, from }))) {
    yield match
    from = match.index + match[0]!.length
  }
}

/** Attribute-only matches retain the original greedy/first-attribute policy and partial match ends. */
export function* attributeMatches(
  xml: string,
  prefix: string,
  attribute: RegExp,
  options: { last?: boolean; requireWhitespace?: boolean } = {},
): Generator<RegExpExecArray> {
  const needle = /^(?:\\b)?([A-Za-z_:][A-Za-z0-9_:-]*)(?==|\\s)/.exec(attribute.source)?.[1]
  if (!prefix || !attribute.global || attribute.ignoreCase || !needle)
    throw new Error('A literal attribute name and nonempty tag prefix are required')
  const atCandidate = new RegExp(attribute.source, attribute.flags.replace(/[gy]/g, '') + 'y')
  let from = 0
  let gt = xml.indexOf('>')
  let candidate = xml.indexOf(needle)
  while (from < xml.length && candidate >= 0) {
    const index = xml.indexOf(prefix, from)
    if (index < 0) return
    const after = index + prefix.length
    if (options.requireWhitespace && !/\s/.test(xml[after] ?? '')) {
      from = after
      continue
    }
    if (gt >= 0 && gt < after) gt = xml.indexOf('>', after)
    const start = after + (options.requireWhitespace ? 1 : 0)
    if (candidate < start) candidate = xml.indexOf(needle, start)
    let found: RegExpExecArray | null = null
    while (candidate >= 0 && (gt < 0 || candidate < gt)) {
      atCandidate.lastIndex = candidate
      const match = atCandidate.exec(xml)
      candidate = xml.indexOf(needle, candidate + 1)
      if (match) {
        found = match
        if (options.last === false) break
      }
    }
    if (!found) {
      from = gt < 0 ? xml.length : gt + 1
      continue
    }
    const end = found.index + found[0].length
    found[0] = xml.slice(index, end)
    found.index = index
    found.input = xml
    yield found
    from = end
  }
}

export function attributeMatch(
  xml: string,
  prefix: string,
  attribute: RegExp,
  options: { last?: boolean; requireWhitespace?: boolean } = {},
): RegExpExecArray | null {
  return attributeMatches(xml, prefix, attribute, options).next().value ?? null
}

/** Non-overlapping self-closing-or-paired elements, with shared delimiter cursors. */
export function* elementMatches(
  xml: string,
  prefix: string,
  closing: string,
  options: { openingTag?: boolean; wordBoundary?: boolean } = {},
): Generator<XmlMatch> {
  if (!prefix || !closing) throw new Error('XML delimiters must not be empty')
  let from = 0
  let gt = xml.indexOf('>')
  let closeAt = xml.indexOf(closing)
  while (from < xml.length) {
    const index = xml.indexOf(prefix, from)
    if (index < 0) return
    const after = index + prefix.length
    if (options.wordBoundary && /\w/.test(xml[after] ?? '')) {
      from = after
      continue
    }
    if (gt >= 0 && gt < after) gt = xml.indexOf('>', after)
    if (gt < 0) return
    if (xml[gt - 1] === '/') {
      yield asMatch(xml, index, gt + 1)
      from = gt + 1
      continue
    }
    const body = options.openingTag ? gt + 1 : after
    if (closeAt >= 0 && closeAt < body) closeAt = xml.indexOf(closing, body)
    if (closeAt >= 0) {
      const end = closeAt + closing.length
      yield asMatch(xml, index, end)
      from = end
    } else {
      from = gt + 1
    }
  }
}

/** Remove the first whitespace-prefixed double-quoted attribute without retrying its whitespace. */
export function removeSpacePrefixedAttribute(xml: string, name: string): string {
  const prefix = `${name}="`
  let from = 0
  while (from < xml.length) {
    const at = xml.indexOf(prefix, from)
    if (at < 0) return xml
    const end = xml.indexOf('"', at + prefix.length)
    if (end < 0) return xml
    if (at > 0 && /\s/.test(xml[at - 1]!)) {
      let start = at
      while (start > 0 && /\s/.test(xml[start - 1]!)) start--
      return xml.slice(0, start) + xml.slice(end + 1)
    }
    from = at + prefix.length
  }
  return xml
}

export function pairedContents(xml: string, prefix: string, closing: string): string | undefined {
  const match = pairedMatch(xml, prefix, closing, { openingTag: true })
  return match?.[0]?.slice(match[0].indexOf('>') + 1, -closing.length)
}

/** The revision scanner's original raw-token grammar, with one visit per delimiter. */
export function* revisionTagMatches(xml: string): Generator<XmlMatch> {
  const nameToken = /[A-Za-z][\w.-]*(?::[\w.-]*)?/y
  const opaque = [
    { open: '<!--', close: '-->', at: undefined as number | undefined },
    { open: '<![CDATA[', close: ']]>', at: undefined as number | undefined },
    { open: '<?', close: '?>', at: undefined as number | undefined },
  ]
  let from = 0
  let gt = xml.indexOf('>')
  while (from < xml.length) {
    const start = xml.indexOf('<', from)
    if (start < 0) return
    if (gt >= 0 && gt < start) gt = xml.indexOf('>', start)
    if (gt < 0) return
    const special = opaque.find((kind) => xml.startsWith(kind.open, start))
    if (special) {
      const after = start + special.open.length
      if (special.at === undefined || (special.at >= 0 && special.at < after)) {
        special.at = xml.indexOf(special.close, after)
      }
      if (special.at >= 0) {
        from = special.at + special.close.length
        continue
      }
    }
    const closing = xml[start + 1] === '/'
    nameToken.lastIndex = start + (closing ? 2 : 1)
    const name = nameToken.exec(xml)
    if (!name || nameToken.lastIndex > gt) {
      from = start + 1
      continue
    }
    const tailStart = nameToken.lastIndex
    const tail = xml.slice(tailStart, gt)
    if (tail !== '' && tail !== '/' && !/\s/.test(tail[0]!)) {
      from = start + 1
      continue
    }
    const self = tail.endsWith('/')
    const attrs = self ? tail.slice(0, -1) : tail
    const match = asMatch(xml, start, gt + 1)
    match.push(closing ? '/' : '', name[0], attrs, self ? '/' : '')
    yield match
    from = gt + 1
  }
}
