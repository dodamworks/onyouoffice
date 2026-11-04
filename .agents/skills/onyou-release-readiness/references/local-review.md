# Local review routes

Resolve project-relative paths from the actual repository root. Commands below
are existing entry points, not permission to run external operations. Verify the
current source of each tool before execution. Private processing stays in a
network-denied environment; no live credentials or user documents in test flows.

## Source, index and history

Use tools/check-public-boundary.mjs through ../scripts/check_local.py for text
scope. Its binary/symlink omissions and historyScanned=false are material limits.
It checks tracked/nonignored files or the index, not every file on the computer.
For history, choose the actual publication refs explicitly and inventory reachable
objects, commit messages and author metadata locally. A clean worktree does not
clear older commits, tags, PR refs or cached remote content. Never rewrite or push
history merely because this skill is active. Preserve original upstream authors.
Use an already installed local secret scanner; inspect false positives locally,
redact logs, and keep reports ignored. Do not install tools during private scanning.

## Photos, attachments and binary data

Inventory by magic bytes as well as extension; inspect renamed files, data URLs,
SVG image references, EXIF/GPS/comments, PDFs and embedded OOXML/ODF/EPUB media.
Inspect symlink targets without following them into personal directories. Archive
entries need bounded extraction with traversal, symlink, recursion and size limits.
Use existing format tooling and scratch directories; never execute an attachment.
Unknown/encrypted/oversized objects remain incomplete. Hash matches can reuse
previously reviewed images only with provenance and matching review scope.
Use local OCR/viewers and an explicit human review when needed. No image, video,
file or extracted text goes to chat/model vision or a cloud service. A raster with
no OCR text can still contain a face, private room or a messenger screenshot.

## Installer and native outputs

Follow docs/PUBLIC-RELEASE.md and apps/shell/electron-builder.cjs. Inspect explicit
files/extraResources, notice generation and consumers before building. Our .agents
skills are development guidance, separate from skills/onyouoffice and app bundled
skills. No user profile, .codex, .local, auth store or debug evidence may be packaged.
A new source/privacy cleanup requires fresh affected outputs rather than stale
out/dist/target. Remap personal build prefixes for Rust/Swift/native tools; inspect
CLI raw-text labels as well as binary strings. Do not print the private prefixes.
The build must disable publication, signing credential discovery and notarization;
inspect hooks before running. Use cached approved dependencies offline. Missing
build dependencies are a separate blocker, not permission for network access.
Extract ASAR with the installed @electron/asar library. Inspect a read-only mounted
installer and its hidden files/metadata, symlinks and all regular payload bytes.
Compare mounted contents with the intended packaged app; record package SHA-256,
platform, source tree and local patch hash if dirty. No repeated rebuild if identical.
Reuse existing packaged headless Markdown/CSV export smoke procedures from
.github/workflows/mac-build.yml with scratch HOME/userData and network denied;
source-test success alone does not prove installer or platform behavior.

## Attribution and validation

Compare LICENSE/NOTICE with the accepted upstream revision recorded in
docs/dodam/UPSTREAM-INTEGRATION.md. Preserve attribution and document our changes;
do not replace original authors/emails with product identity. Run existing
npm run licenses and tools/gen-third-party-notices.mjs as appropriate; generated
notices must actually be in the candidate package. These tools do not provide a
universal legal clearance or prove every embedded binary/font license.
Read README.md, README.en.md, PRIVACY.md, SECURITY.md, CONTRIBUTING.md and
TRADEMARKS.md against packages/i18n/src/product.ts and actual routing behavior.
Support address consistency is distinct from tested mail delivery/reply identity.
Use tools/check-reference.py for actual committed ranges and existing focused
tests; docs/dodam/CI-POLICY.md determines complete final CI and proof reuse.
No auto-dispatch, support email, website change or release upload is part of review.
