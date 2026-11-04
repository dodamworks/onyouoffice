---
name: onyou-release-readiness
description: Prepare and review Onyou Office source or installers before public release, including private-data exposure, upstream attribution and exact-artifact evidence. Use for release readiness, not ordinary UI edits or automatic publishing.
---

# Onyou release readiness

Read repository AGENTS.md, docs/dodam/SOURCE-FIRST.md and docs/PUBLIC-RELEASE.md.
Preserve GenOffice → IeumOffice → Onyou Office attribution, LICENSE/NOTICE,
engine behavior and internal identifiers. Follow docs/dodam/CI-POLICY.md;
this skill does not authorize commits, pushes, cloud actions or distribution.
The original release-ieumoffice skill is historical context, not our release target.

## Establish the actual candidate

Identify source HEAD/tree, selected refs, index versus working tree, packaging
inputs, platform and artifact SHA-256. Inspect existing generators and consumers.
Keep the company/account routing in private workspace instructions; do not copy it
into public files. Read references/local-review.md for the affected review modes.
Reuse evidence only when its inputs, scope, tool revision and hashes still match.
A new source change needs affected checks; no duplicate CI just to restate a result.

## Keep private material local

- Never send candidate text, filenames containing private information, deny lists,
  photos, embedded media, documents, logs or extracted package contents to web,
  connectors, external agents/models, cloud scanners or cloud OCR. Do not embed or
  emit them in chat images, attachments, prompts or tool output. Use synthetic
  fixtures when sharing a reproduction. Local OS tools may inspect private data.
- Do not capture the entire desktop, unrelated windows or personal apps. If visual
  review requires a person, use a local viewer and leave it pending until reviewed;
  do not upload it for model vision. Local OCR is a lead, not proof of no secrets.
- Never read Codex/Claude credential stores, personal profiles or unrelated folders.
  Scan only the explicitly selected publication/build candidate. Do not delete
  user data, rewrite history or quarantine files automatically.
- Keep raw evidence under ignored .local/review with restrictive permissions,
  outside publication refs/packages. Report counts, categories and sanitized paths;
  never repeat actual private values, image pixels or personal filenames in chat.
- Use installed local tools; no npx downloads, remote scans, authenticated services,
  live AI, auto-updaters, publishing or notarization during the privacy review.
  Run candidate-processing commands in a network-denied local environment. If none
  is available, report that limit and stop private-content processing until isolated.

## Run bounded checks

For the existing text boundary checker, use the local helper from repository root:

```sh
python3 .agents/skills/onyou-release-readiness/scripts/check_local.py \
  --candidate . --deny-file .local/review/private-deny.json \
  --report .local/review/readiness/text-scope.json
```

Add `--staged` for the actual Git index. The user supplies or authorizes a private
deny list locally; never print its values or invent one as proof of complete coverage.
The helper currently uses the macOS network guard; other platforms return incomplete
until a network-denied runner is provided.
Exit 0 means text scope only; 1 means blocked; 2 means incomplete or invalid input.
Binary/symlink omissions are incomplete, not clean. Read the local report for details.
This helper reuses tools/check-public-boundary.mjs; it does not scan history,
recognize photos, detect every secret or establish overall release readiness.

Route remaining work through references/local-review.md: local secret scanning,
explicit Git ref/history review, embedded media/metadata inspection, clean package
build and native path remapping, mounted installer checks and source attribution.
Use scratch profiles and synthetic documents for runtime checks; block network.
Do not rebuild unchanged artifacts or repeat live-provider checks for this skill.

## Report the decision

Distinguish source text, history, media, package bytes, installation/runtime, CI,
review, signing, support-mail delivery and publication. Use passed / blocked /
incomplete per scope, with exact candidate hashes and outstanding work. Any
unreviewed media/archive/ref, unsupported format, failed tool, stale evidence or
unverified package keeps that scope incomplete. Zero text matches is never a
claim that all private data is absent. Readiness is not permission to publish.
