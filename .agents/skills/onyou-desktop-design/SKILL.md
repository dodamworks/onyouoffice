---
name: onyou-desktop-design
description: Refine Onyou Office desktop UI and copy using its accepted brand, shared components and multilingual layout. Use for this app's visible screens, not website design or document-content styling.
---

# Onyou desktop design

Read `AGENTS.md`, the affected module guide and `docs/dodam/SOURCE-FIRST.md`.
Use this alongside `onyou-desktop-dev` for runtime verification. Neither skill
authorizes unrelated redesign, new features, publication or additional services.

## Reuse the accepted system

- Product names and locale behavior: `packages/i18n/src/product.ts`.
- Brand artwork and provenance: `docs/dodam/brand/BRAND-SPEC.json`,
  `docs/dodam/brand/SOURCE-NOTICES.md`, `docs/dodam/DESKTOP-BRAND-INTEGRATION.md`.
  Keep the selected layered-document B mark; use the optical-small variant at
  navigation scale. The sidebar uses live Pretendard 600 text and the existing
  blue symbol. Do not substitute outlined wordmarks for small live UI text.
- Chrome color, type and spacing: `packages/ui/src/tokens.css`. Inspect the
  affected app's overrides before changing a token. Brand SVG colors are not
  a replacement palette for every control. Never recolor document contents,
  charts, page canvases or exported files through interface theme rules.
- Shared AI controls: `packages/ui/src/AiComposer.tsx`, `AiMark.tsx`,
  `AiPanelFontSizeButtons.tsx` and their current consumers. Change a common
  control once when behavior should match across editors; do not create another
  local copy of the same component or a second font preference.

## Copy and layout

State the action and outcome in plain language. Remove repeated explanations
and keep optional help behind an existing help/info affordance. Preserve real
privacy, permission and billing disclosures; shortening them must not change
their meaning. Do not label an unverified connection as ready or a third-party
tier as unlimited/free without qualification.

Keep words intact in Korean and other supported languages. Use normal wrapping
or `keep-all` where appropriate; reserve emergency wrapping for long paths,
identifiers and unspaced strings. Do not force whole paragraphs onto one line.
Respect RTL direction and test real translated text rather than fixed manual
line breaks. Follow the existing 22-language resource structure.

Empty states should have one clear purpose, a balanced focal point and an
obvious next action. Keep composer controls and scope selectors stable between
states. Avoid long instructions in an otherwise empty chat. Distinguish pending,
completed, failed and disconnected states; obsolete progress labels must settle.

Preserve keyboard navigation, visible focus, accessible names, contrast and
reduced-motion behavior. Icon-only buttons still need a translated accessible
name. Keep UI scaling, AI text size and document zoom as separate controls.

## Finish within the changed scope

Check the actual changed screen in the relevant language/theme/window states.
Reuse unaffected evidence as described in `onyou-desktop-dev`; do not run a
fresh-install or live-AI journey for a copy/layout edit. Correct demonstrated
issues in one pass, then confirm. Report what was rendered separately from
code checks. Existing CI policy remains authoritative.

For a new visual direction or a change to agreed navigation, discuss the choice
with the user before replacing the accepted baseline. For ordinary refinements
already authorized, apply these existing rules without asking the user to
specify every margin and font size.
