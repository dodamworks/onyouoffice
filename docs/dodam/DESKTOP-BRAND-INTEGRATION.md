# Desktop brand assets

The display names are **Onyou Office** and **온유오피스**. Technical names such as
the command and default documents directory use `onyouoffice`.

## Sources and consumers

- `packages/i18n/src/product.ts`: product names, storage names and contact address.
- `apps/shell/build/brand`: installer/icon source artwork.
- `tools/gen-brand-assets.mjs`: generated sizes and platform icon files; inspect
  its destinations before running it.
- `docs/dodam/brand`: retained source/reference artwork and font licensing.
- `packages/ui/src/AiMark.tsx`: shared AI mark.
- `apps/shell/src/renderer/src/assets/brand`: sidebar assets and Pretendard license.

Use existing shared components/tokens and the project design skill. Keep the
accepted desktop identity, optical icon proportions and word boundaries across
languages. Reference artwork is not proof that a running build uses that asset.
Inspect the actual affected screen after rebuilding the relevant consumers.

Do not regenerate or rename document engine/package/IPC identifiers as a brand
change. Product installation/data namespaces must stay separate from upstream.

## Licenses and attribution

Keep [NOTICE](../../NOTICE), [TRADEMARKS.md](../../TRADEMARKS.md), original source
acknowledgements and the font license files. The sidebar embeds Pretendard under
SIL OFL; its copyright and license are preserved alongside the source asset.
The original projects' names/logos are used for attribution, not as an endorsement.

Screenshots committed for an issue or review must use synthetic documents and
omit personal account names, local paths, avatars and unrelated windows. Private
historical verification screenshots are not required in the public source tree.
