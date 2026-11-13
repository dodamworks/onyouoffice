<!-- Modified by Onyou Office on 2026-11-04 for the Onyou Office fork. -->

# Contributing to Onyou Office

Bug reports, reproducible examples, documentation, translations and code reviews
are welcome. Onyou Office is an independent fork of
[IeumOffice](https://github.com/pblsketch/ieumoffice), which is based on
[GenOffice](README.md#license-and-origins). Preserve source attribution,
author credits, copyright notices, [LICENSE](LICENSE) and [NOTICE](NOTICE).

Development for this fork belongs in
[dodamworks/onyouoffice](https://github.com/dodamworks/onyouoffice). Do not send
Onyou-specific support requests or private documents to upstream maintainers.
Installers are published on this repository's [Releases](https://github.com/dodamworks/onyouoffice/releases).

## Start small

Report the app version or commit, OS, affected editor, expected behavior and
steps to reproduce. Prefer a minimal synthetic document. Remove names, account
identifiers, local paths and confidential content from screenshots and logs.
Report security issues [privately](SECURITY.md), not in an issue or pull request.

Discuss substantial features, new dependencies and document-engine changes
before implementing them. A focused bug fix or documentation correction does not
need an elaborate proposal. AI-generated contributions need the same review and
verification as other contributions; the person submitting them is responsible
for checking the result.

## Local development

Use Node.js 24, npm and Rust (`cargo`). CI pins an exact Node patch in
[ci.yml](.github/workflows/ci.yml); use that patch when reproducing CI failures.
Native builds need platform-specific tooling. From the repository root:

```sh
npm ci
npm run fixtures
npm run build:all
npm run dev
```

The initial full build prepares the editor main/preload code and native tools;
renderer development servers alone do not produce those files. Rebuild Shell after
changing editor main-process code, and rebuild the affected editor after preload changes.

No AI account is needed for builds or mocked tests. Never read or copy Codex or
Claude login stores. Live-provider checks require the user's authorization and
must not be added to CI. Read [AGENTS.md](AGENTS.md), the affected module's guide
and [source-first requirements](docs/dodam/SOURCE-FIRST.md) before changing code.
Machine-local company wrappers are optional for contributors outside the
maintainer's environment; they must not be copied with credentials or profiles.

## Source and compatibility boundaries

- Keep `@genoffice/*`, `GENOFFICE_*`, IPC contracts and identifiers persisted in
  documents. Product identity is defined in `packages/i18n/src/product.ts`;
  CLI names are in `packages/cli/src/names.ts`.
- Reuse the existing editor/shared components, resource dictionaries and design
  tokens. Preserve 22-language coverage for changed user-facing strings.
- Keep unrelated code unchanged so future upstream fixes remain reviewable.
- Open/save changes need meaningful round-trip coverage for untouched content,
  original-file protection and the actual format affected.
- AI requests must honor the current document scope, masking, project trust and
  user-selected billing path. No silent paid fallback.

For the module map and detailed contracts, see [architecture](docs/architecture.md),
[standards](docs/standards.md), [security](docs/security.md) and
[developer notes](docs/engineering-notes.md).

## Receiving upstream fixes

IeumOffice is the default integration source. GenOffice is also monitored for
engine, compatibility and security fixes. A GenOffice patch may be brought in
directly after checking existing Ieum changes, patch equivalence, prerequisites
and format/API differences. A clean textual application is not proof of safe
behavior. Never merge both upstream heads automatically or replace our accepted
UI and product boundaries wholesale.

Record the source repository, exact commit, reason, affected consumers and
validation. Preserve the original author when cherry-picking; identify manual
adaptations. See the [current comparison](docs/PUBLIC-RELEASE.md).

## Validation and pull requests

Follow [CI-POLICY.md](docs/dodam/CI-POLICY.md). Run the focused checks needed for
the changed behavior locally. Product, tooling and policy changes still receive
the required full pre-merge CI; non-runtime references use their dedicated route.
Do not dispatch duplicate CI runs, remove assertions or add skip markers to save
time. The existing exact-tree proof controls post-merge reuse.

Useful commands include:

```sh
npm run format:check
npm run test -w @genoffice/pdf -- --run tests/page-tree-patch.test.ts
npm run typecheck -w @genoffice/pdf
npm run licenses
```

The PDF commands are examples for that module, not a replacement for the CI plan
or a requirement on unrelated changes. A PR should describe the problem,
resulting behavior, source of imported changes, actual validation and remaining
limits. Include changed-screen evidence for visible changes. Use focused English
Conventional Commit subjects and preserve existing history.

Before publishing a branch, review staged files and the proposed diff for
credentials, personal paths, private documents and generated artifacts. Public
history retains removed files; deleting a file in the newest commit does not
remove it from prior commits.

Keep conversation notes, internal decisions, account configuration and raw review
evidence under ignored `.local/internal/` or `.local/review/`. Optional local
instructions can use `AGENTS.local.md` or `CLAUDE.local.md`; agents do not necessarily
load these automatically. Shared build/test rules and project-owned verification
skills remain versioned so contributors can reproduce validation. Downloaded
authoring helpers are local-only. Ignore rules do not remove previously tracked
files or old commits; inspect the actual publication refs separately.

Maintainers can use `tools/check-public-boundary.mjs` with a private local deny
list to inspect working files or the actual Git index. The optional maintainer
identity checks apply only to the project maintainer, not community
contributors' authorship. See the [release preparation guide](docs/PUBLIC-RELEASE.md)
for its scope and limits. It does not replace a secret scanner or history review.

## License and community

Contributions are accepted under Apache-2.0, consistent with section 5 of
[LICENSE](LICENSE). There is currently no CLA. Third-party components retain their
own licenses; document provenance rather than claiming the entire tree has one
uniform license. A later license change cannot revoke licenses already granted,
and relicensing others' contributions may require their permission.

Upstream contributor credits remain in [CONTRIBUTORS.md](CONTRIBUTORS.md),
[NOTICE](NOTICE) and the linked upstream repositories. This repository begins
with a source snapshot; later contributions appear in its own Git history.
Follow the [code of conduct](CODE_OF_CONDUCT.md). Community feedback assists the
maintainers; it does not replace release verification or guarantee a fix.
