# Brand asset validation

This change contains brand artwork, font data, previews, provenance and handoff documents only. No application source, executable generator, dependencies, workflow or packaging configuration is changed. Native input SVGs are reference assets, not replacements in the shipping build paths.

The PR also adds a documentation-only source-first preflight and links it from both agent entry files. These instructions require inspecting existing Onyou/IeumOffice resources before future work; they do not alter runtime or CI configuration.

## Completed targeted checks

- Parsed all 25 SVGs; no live text, raster embedding, scripts, event handlers or external resource references.
- Verified asset SHA-256 digests, selected B geometry, archived versions, and dark variants changing only wordmark foreground.
- Rendered primary/small/mono/light/dark and Korean/English artwork; checked real small sizes, transparent counters and canvas bounds.
- Verified the two-eye SVG against actual rendered React draft geometry at 14/16/18/20/22/26/58px. Both themes and the existing slides 14px class-specific colour rule passed. The draft component was used only in ignored local validation and is not part of this PR.
- Verified Pretendard 1.309/v1.3.9 character coverage and the unmodified OFL matching the font already in the project.
- Used the unchanged existing generator in an isolated tree. Decoded 16 PNG outputs, all seven ICO sizes and ten ICNS chunks, and verified macOS padding and duplicate consumer outputs.
- Existing focused tests passed: product-name substitution 17, product identity 20 (37 total). They were not rerun for byte-identical copies of the verified assets.
- Checked local documentation links, final asset hashes, changed-file formatting and the diff boundary. The upstream OFL has a trailing space on line 22; only that original file is excluded from the whitespace check to preserve its bytes.

See [the integration audit](INTEGRATION-AUDIT.md) and [machine-readable prior validation](verification/RESULT.json). The latter records the isolated audit before this repository handoff, not a claim that app integration was performed.

## Why full application tests are omitted

The user requested validation proportional to this asset/documentation change. Product lint/type checking, all unit/Rust suites, full builds, browser/Electron end-to-end tests, real AI/provider calls and installer/OS registration do not validate new runtime behaviour here because none is changed.

The initial asset commits used a user-approved [skip ci] exception because the earlier classifier sent non-Markdown reference assets through full-product validation. CI improvements were then implemented and merged separately in PR #4. This branch now includes that main baseline and uses normal automatic reference validation without a skip marker. See [the general CI policy](../CI-POLICY.md) and the PR checks for final remote results. No CI policy/workflow change is part of this brand diff. Real UI/OS integration receives its own focused validation in the subsequent app work.
