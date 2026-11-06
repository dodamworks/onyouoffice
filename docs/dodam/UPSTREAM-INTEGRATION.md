# Upstream maintenance and fork scope

## Source lineage

GenOffice → IeumOffice → Onyou Office.

IeumOffice is the single routine integration source. GenOffice may be inspected
for important fixes delayed or deferred by IeumOffice, but it is not a second
automatic import stream. Record a specific exception before taking a change
directly, including overlap with IeumOffice's ports and its reasons for deferral.
Preserve both projects' attribution regardless of which source supplied a port.

- [GenOffice](https://github.com/genspark-ai/genoffice): original office application.
- [IeumOffice](https://github.com/pblsketch/openoffice): the direct development base.
- Onyou Office: independent product identity and desktop experience.

The initial IeumOffice baseline is
`a2948eecd1e2572aac2f0c43f6c89f081971d4d8`. The release-preparation branch also
selectively ports the PDF buffer/page-tree fix from
`88c0ff3f790e62aa95fa68680b1e03253f0464dc`. The source update below extends that
basis through selected ports, rather than a wholesale merge of upstream main.

The document engines and most editing functionality come from upstream projects
and their dependencies. Onyou changes cover branding, installation/data
namespaces, Home/onboarding, optional nickname, common AI panels, projects,
Knowledge Vault and validation infrastructure. Preserve those inherited credits.

## Integrated source update

The source update pins IeumOffice `9950706e3ff427198ba91f0f2f89b62a19ddc357`
(2026-11-05 Korea time), 75 commits beyond the baseline. Functional changes are
ported in 41 source changes by feature. Upstream author credits and source
revision records are preserved; the public main starts from a single source
snapshot rather than including the upstream Git ancestry. Growth
snapshots and the original Home card order are not imported.

The update includes the offline draw.io/Visio editor, diagram AI/MCP/CLI,
configurable Home document kinds, PDF image conversion, translation writing
rules and the final pinned rhwp development engine with its carried patches.
Preserve the product's Home order, file-open information popover, optional
nickname, common AI panel presentation and separate app/data registrations.
Engine/studio source stays pinned; importing a candidate is not an installer
release or a claim that it has passed validation.

## November 6 maintenance source

The next maintenance source pins IeumOffice
[`999d2ed2a25424df2b293282bea6c980f3bb9f0e`](https://github.com/pblsketch/openoffice/commit/999d2ed2a25424df2b293282bea6c980f3bb9f0e),
including its 0.12.11 release changes. This extends the selected-port basis above;
upstream growth snapshots and release/operations records remain separate.

The imported changes include legacy Word `.doc` conversion, additional Save As
export formats, PDF source/translated sentence pairing and easy explanations,
HWP missing-font notices and AI edit feedback, spreadsheet external-link/cache
and legacy `.xls` style preservation, shared mind-map layouts, and document
round-trip fixes. The original source, authorship, license and engine contracts
remain those of the credited upstream projects.

Preserve Onyou branding, Home order and nickname, common AI controls, installed
identifiers/data separation, project features and existing validation. Linux
Create New templates use product-specific filenames. The inherited Mac update
helper is tested with isolated packages, but no update feed or in-app automatic
installation is enabled: product updates remain manual downloads.

The app version for this source is 0.12.11. Source integration, passing CI and
actual installer availability are distinct; use GitHub Releases and its build
provenance to determine the published installer state. Dependency security work
is recorded in [security maintenance](SECURITY-MAINTENANCE.md).

## Accept changes deliberately

### Recurring maintenance

Keep upstream maintenance continuous as independent Onyou features are added.
Prefer carrying forward compatible upstream functionality over freezing the
inherited editors. Keep the Onyou-specific delta small and explicit.

For each run:

1. Read current instructions and inspect the real worktree, local changes and
   any unfinished integration. Never reset, stash or overwrite another task's
   work. Continue an existing candidate instead of creating duplicate candidates.
2. Pin the latest upstream main SHA and latest release separately. Read public
   source into an isolated comparison workspace; leave the fixed reference
   checkout unchanged. A release number alone is not the comparison baseline.
3. Compare both accepted upstream to candidate upstream and accepted upstream to
   current Onyou. The public source history starts from a snapshot: do not assume
   Git ancestry or commit counts identify missing functionality. Check actual
   source and prerequisite changes before importing anything.
4. Keep a change ledger identifying inherited functionality, Onyou changes and
   deliberately deferred upstream changes. For each port, record source SHA,
   affected paths, prerequisites, local adaptation and verification. Branding,
   wording and installation separation are not new editor capabilities.
5. Prepare compatible changes in a separate local integration workspace. Preserve
   the accepted brand/copy, installation/data separation, external-service
   boundaries and future independent features. Resolve routine conflicts from
   source contracts; do not automatically prefer either side of every conflict.
6. Read affected module instructions and preserve security, licensing and
   document-format contracts. Where instructions require a human decision, retain
   the candidate analysis and continue independent work; record the exact reason
   and affected change. Do not invent new features as conflict resolution.
7. Run focused checks during integration and the existing full validation required
   for product changes before declaring the candidate ready. Use synthetic
   documents/profiles and mocked providers. Upstream test success does not prove
   the adapted Onyou tree works. Do not weaken checks to finish an unattended run.
8. Record observed, prepared, locally validated and accepted states separately.
   Advance the accepted upstream basis only with the actual accepted integration,
   retaining every deferred change. Keep unvalidated work resumable. Rebase or
   revalidate a candidate when concurrent Onyou changes affect its basis.

Schedules, standing maintainer authorization and machine-local progress belong
in private operational records. The schedule itself grants no permissions. When
the maintainer authorizes recurring integration, follow that recorded scope
without asking again for each routine run.

### Completing an authorized update

1. Create or resume one `codex/upstream-sync-*` branch and its existing PR. Keep
   it separate from concurrent feature work and record the Onyou base, upstream
   candidate and candidate head. Never force-push or rewrite published history.
2. Include a monotonically increasing Onyou app version for functional updates.
   The source of truth is `apps/shell/package.json`; keep the corresponding
   `apps/shell` entry in `package-lock.json` consistent. Do not bump the root
   workspace version or adopt upstream's product name, release tag or endpoints.
   Documentation and growth snapshots alone do not require an app version bump.
3. Commit and push only reviewed public source using the verified project account
   and product author identity. Preserve upstream authorship and licenses, and
   keep raw evidence, machine settings and private records out of publication.
4. Open or update the PR with source provenance, preserved Onyou changes,
   deliberately deferred changes and actual validation. Review the complete
   adapted diff for semantic conflicts even when Git reports a clean merge.
   Perform general code review and a separate security-focused review locally,
   recording their actual scope, findings and verification on the final head.
   Remote Codex code/security bot reviews are not maintenance prerequisites;
   retain GitHub CI and platform build checks independently of any AI review
   integration. Keep existing account connections unchanged.
5. Observe all applicable checks on the exact final head. Fix integration failures
   and repeat affected checks; do not merge on pending, failed, cancelled,
   incomplete or stale evidence. Respect repository protections without admin
   bypasses or weakening checks. Revalidate after relevant base/head changes.
6. Merge only the reviewed head under the maintainer's authorization. If hosted
   merge identity cannot satisfy project policy, use an explicitly identified
   local merge and validate its tree and PR relationship. A successful push alone
   is not proof of a merged PR. Verify main, PR state and post-merge CI.
7. If installer publication is authorized, continue through
   [release preparation](../PUBLIC-RELEASE.md): build from the accepted source,
   verify platform artifacts, privacy, attribution, versions and provenance, then
   publish the matching Onyou release. Versioned source, merged code, generated
   installers and a published release are separate milestones. Resume an
   incomplete release before allocating another version; never overwrite an
   existing published tag or artifact with different bytes.

Record progress after each stage so interrupted runs can resume without duplicate
PRs or releases. Report the actual completed stage and concrete remaining
conditions; a prepared branch is not a shipped update. Repository/account policy
changes, live-provider trials and unrelated feature work remain outside ordinary
upstream maintenance.

1. Record the currently accepted SHA and pin the candidate upstream revision.
2. Compare files, prerequisites, license changes, public contracts and local
   modifications. Inspect existing generators and consumers before replacements.
3. Integrate on an isolated branch. Do not merge multiple upstream tips blindly.
4. Preserve full editor capabilities, document identifiers, original authors and
   LICENSE/NOTICE. Keep product updates and source attribution separate.
5. Validate the affected paths and follow the existing full pre-merge policy.
   Document a reproduced upstream failure rather than skipping it.
6. Record accepted revisions and unresolved compatibility issues with the change.

Document-engine behavior changes need explicit scope and compatibility review.
Use independent reference files/profiles and never borrow another product's
credentials, dependencies or generated outputs through shared writable links.

Previous internal PR numbers and personal operational records are not part of
the public contribution workflow. New PRs describe the current problem, final
change, upstream basis and applicable verification.
