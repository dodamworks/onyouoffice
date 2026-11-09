/// Modified by Onyou Office: bounded scans of malformed stylesheet markup.
/// Entries of a styles.xml list section (fonts, fills, borders, cellXfs,
/// dxfs, numFmts) as a markup-compatibility-aware consumer counts them.
///
/// Hancom Cell wraps individual entries in mc:AlternateContent (ECMA-376
/// Part 3) and binds its extension prefix on mc:Choice only:
///   <dxfs count="12"><mc:AlternateContent xmlns:mc="…">
///     <mc:Choice xmlns:hs="…" Requires="hs"><dxf hs:applyExtension="1">…</dxf></mc:Choice>
///     <mc:Fallback><dxf>…</dxf></mc:Fallback></mc:AlternateContent>…
/// Such a block is one entry. Pulling both branches out as two entries
/// shifted every later id and left hs: unbound once the section was
/// rewritten. The resolution rule matches the sidecar's mc_children
/// (visuals.rs): mc:Fallback, else the first mc:Choice.

interface ChildElement {
  /// qualified name as written
  readonly name: string
  /// the element's full markup
  readonly xml: string
  /// markup between the start and end tags; '' for a self-closing element
  readonly inner: string
}

/// Scan forward once. An unterminated tag must not make a pattern retry every
/// possible name/attribute split for each '<' in a malformed styles part.
function* markupElements(xml: string) {
  let cursor = 0
  while (cursor < xml.length) {
    const at = xml.indexOf('<', cursor)
    if (at < 0) return
    const special = xml.startsWith('<!--', at)
      ? (['-->', 4] as const)
      : xml.startsWith('<![CDATA[', at)
        ? ([']]>', 9] as const)
        : xml.startsWith('<?', at)
          ? (['?>', 2] as const)
          : null
    if (special) {
      const end = xml.indexOf(special[0], at + special[1])
      if (end < 0) return
      cursor = end + special[0].length
      continue
    }
    let i = at + 1
    const closing = xml[i] === '/'
    if (closing) i += 1
    const nameStart = i
    while (i < xml.length && !/[\s/<>"'!?=]/.test(xml[i]!)) i += 1
    if (i === nameStart) {
      cursor = i
      continue
    }
    const name = xml.slice(nameStart, i)
    let quote = ''
    for (; i < xml.length; i += 1) {
      const char = xml[i]!
      if (quote) {
        if (char === quote) quote = ''
      } else if (char === '"' || char === "'") quote = char
      else if (char === '<') break
      else if (char === '>') {
        yield {
          index: at,
          markup: xml.slice(at, i + 1),
          name,
          closing,
          selfClosing: xml[i - 1] === '/',
        }
        i += 1
        break
      }
    }
    cursor = i
  }
}

/// Top-level child elements of an element's inner markup, matched by depth so
/// nested blocks (an AlternateContent inside a Choice) stay whole.
function childElements(inner: string): ChildElement[] {
  const children: ChildElement[] = []
  let depth = 0
  let open: { name: string; start: number; innerStart: number } | null = null
  for (const match of markupElements(inner)) {
    const { markup, closing, name, selfClosing } = match
    const at = match.index
    if (closing) {
      depth -= 1
      if (depth === 0 && open !== null) {
        children.push({
          name: open.name,
          xml: inner.slice(open.start, at + markup.length),
          inner: inner.slice(open.innerStart, at),
        })
        open = null
      }
      if (depth < 0) return children
      continue
    }
    if (selfClosing) {
      if (depth === 0) children.push({ name, xml: markup, inner: '' })
      continue
    }
    if (depth === 0) open = { name, start: at, innerStart: at + markup.length }
    depth += 1
  }
  return children
}

function localName(name: string): string {
  return name.slice(name.indexOf(':') + 1)
}

function isAlternateContent(name: string): boolean {
  return localName(name) === 'AlternateContent'
}

/// The branch a core-only consumer reads: mc:Fallback, else the first
/// mc:Choice; null when the block offers neither.
function chosenBranch(alternateContentInner: string): ChildElement | null {
  const branches = childElements(alternateContentInner)
  return (
    branches.find((branch) => localName(branch.name) === 'Fallback') ??
    branches.find((branch) => localName(branch.name) === 'Choice') ??
    null
  )
}

/// The section's entries as written: each is a plain `<tag>` element or a
/// whole AlternateContent block, kept verbatim so a rewrite of the section
/// leaves them (and the namespace bindings inside them) byte for byte.
/// Other children are not entries and are dropped, as before.
export function styleEntrySlots(sectionInner: string, tag: string): string[] {
  return childElements(sectionInner)
    .filter((child) => child.name === tag || isAlternateContent(child.name))
    .map((child) => child.xml)
}

/// The `<tag>` elements a core-only consumer reads from a section, in index
/// order — what the sidecar reports and what ids in the workbook point at.
export function resolvedStyleEntries(sectionInner: string, tag: string): string[] {
  return resolveEntries(sectionInner, tag, 0)
}

/// Compatibility wrappers beyond this depth are refused, never silently dropped.
function resolveEntries(sectionInner: string, tag: string, depth: number): string[] {
  if (depth > 64) throw new Error('Workbook stylesheet compatibility nesting exceeds 64 levels.')
  return childElements(sectionInner).flatMap((child) => {
    if (child.name === tag) return [child.xml]
    if (!isAlternateContent(child.name)) return []
    const branch = chosenBranch(child.inner)
    return branch === null ? [] : resolveEntries(branch.inner, tag, depth + 1)
  })
}

/// The element a slot stands for. An AlternateContent block must resolve to
/// exactly one `<tag>`, or every later id would mean something else to a
/// reader than to this editor — such a stylesheet is refused, not guessed at.
export function resolveStyleEntry(slot: string, tag: string): string {
  if (!slot.startsWith('<') || !isAlternateContent(/^<([^\s/>]+)/.exec(slot)?.[1] ?? '')) {
    return slot
  }
  const [block] = childElements(slot)
  const branch = block === undefined ? null : chosenBranch(block.inner)
  const entries = branch === null ? [] : resolvedStyleEntries(branch.inner, tag)
  if (entries.length !== 1) {
    throw new Error(
      `The workbook stylesheet wraps a ${tag} entry in a compatibility block it cannot read — ` +
        'style edits cannot be saved.',
    )
  }
  return entries[0]!
}
