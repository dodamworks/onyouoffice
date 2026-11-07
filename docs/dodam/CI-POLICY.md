# CI scope and efficiency

## Basis and boundaries

This policy separates non-runtime human reference material from product changes. It is not permission to skip validation or to weaken existing application assertions. Brand assets, planning diagrams, research data and contributor guidance use the same rule when they are genuinely reference material.

Before implementation, the public IeumOffice tree was pinned at `4e9e1cd51a81d7af8aa410cb379ed6cd228bbb9c`. Its inventory contained 9,187 entries. We compared 122 CI/build/test contract files, including all six workflows and all 35 workspace manifests: 111 matched this product byte-for-byte, 11 differed, none were missing. This is a CI-focused structural/source review, not a semantic audit of every source line or a new upstream integration. The pinned [upstream CI](https://github.com/pblsketch/openoffice/blob/4e9e1cd51a81d7af8aa410cb379ed6cd228bbb9c/.github/workflows/ci.yml) remains the verification baseline; newer upstream features are outside this change.

Full validation preserves formatting, npm/Rust license checks, theme policy, shipped-skill versioning, 21-language help consistency, comment/vendor guards, lint, typecheck, deterministic fixtures, all 35 workspace suites including Rust, spreadsheet preservation compatibility, Markdown browser tests and built Electron tests. Keep the product's Node 24, four unit groups, three E2E shards and mock-provider defaults. In particular, the library job's sidecar build prevents CLI spreadsheet tests from silently skipping coverage.

## Routing

The [shared policy](../../tools/ci-reference-policy.json) declares documentation roots, known root documents and supported reference formats. The [classifier](../../tools/ci-scope.mjs) verifies the full PR merge comparison or push range, retaining old and new paths for renames.

- Only supported non-executable regular files in these non-runtime locations qualify for the reference route.
- App/package assets, help articles, translations, fonts, templates, shipped skills/prompts, fixtures and document engines remain product changes regardless of extension.
- Product code, dependencies, tooling, workflow/configuration, the routing/checker policy itself, mixed unit/E2E changes and unknown comparisons retain full product CI. The narrowly verified test-entry-only routes below do not change product code.
- The CI policy document, source-first preflight, development/CI guide and standards are explicitly full-CI paths, even for prose-only updates; the policy's `require_full_ci` list takes precedence over the documentation allowlist.
- Unsupported formats, executable files and symlinks do not receive the reference-only route. Every classified change produces a final result; do not use routine `[skip ci]` markers.
- A new import, copy step or packaging consumer of documentation assets must update the routing boundary and tests in the same PR. Location is an audited contract, not proof by file extension alone.

The [reference checker](../../tools/check-reference.py) checks changed files plus affected surviving links/provenance. It validates tracked local Markdown link targets (not external URL availability or heading anchors), JSON syntax and declared asset hashes, static self-contained SVGs, fully decoded raster images, and readable font tables with adjacent notices. Visual quality, wording, accessibility in a real UI and legal suitability still require review. Original third-party text is read without rewriting its whitespace.

The dedicated Ubuntu job uses Python 3.12 and three hash-pinned, CI-only validators: Pillow 13.0.0, fontTools 4.63.0 and Brotli 1.2.1. The [requirements](../../tools/reference-requirements.txt) pin Linux x86_64 wheels; these do not enter the application's dependency graph or installers. Pillow uses an HPND-style license, fontTools and Brotli use MIT licenses. See [Pillow license](https://github.com/python-pillow/Pillow/blob/13.0.0/LICENSE), [fontTools license](https://github.com/fonttools/fonttools/blob/4.63.0/LICENSE), [Brotli license](https://github.com/google/brotli/blob/v1.2.1/LICENSE).

The final `CI result` checks the classifier and all applicable job outcomes, including reference failures and cancellation. The CI-policy PR itself requires full product checks. Manual or unavailable comparisons retain full product checks; without a verified range the change-specific reference job is not claimed to have run.

## Test-entry-only plans on the next development branch

The change classifier compares the complete PR merge range or verified push range. It emits independent `checks_required`, `unit_required`, `e2e_required` and `reference_check` flags alongside `full_ci`; the aggregate validates every flag and the exact expected success/skipped result of every job.

| Complete change                                                                                      | Checks                                                 | Unit suites                                            | Build + integration                                                  |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------------------------- |
| Non-runtime references only                                                                          | Reference validator                                    | None                                                   | None                                                                 |
| Known unit entry files only, optionally with references                                              | All general checks and applicable reference validation | All 37 workspaces, including Rust/native/compatibility | None: product and E2E code are unchanged                             |
| Top-level `e2e/*.spec.ts` only, optionally with references                                           | All general checks and applicable reference validation | None: product and unit code are unchanged              | All app builds, Markdown browser tests and all three Electron shards |
| Product code, mixed test types, shared helpers/fixtures, config, dependencies, policy or uncertainty | All                                                    | All                                                    | All                                                                  |

A unit entry must be under an existing `apps/<module>/tests` or `packages/<module>/tests` directory, have the `.test.ts`/`.test.tsx` suffix enabled by that workspace's actual Vitest configuration, and belong to a package in the root serial unit gate. Fixture/helper directories, deleted/executable/symlink entries and unknown packages do not qualify. Test removals or renames involving deletions retain full validation. Tests and assertions are not removed to obtain a smaller plan. Test-only routing is not a source-module dependency graph: all unit suites or all integration suites still execute within the selected kind.

Scoped runs record version-2 validation proof containing the exact checks plan. An exact main merge can reuse it only with the same plan, Git tree, parents, repository/workflow, latest successful attempt, age and runner identity. A unit-only proof cannot stand in for full or E2E validation. Legacy version-1 proof is accepted only as full evidence. If proof lookup fails, the classified validation plan runs normally; an unknown classification still selects full validation. Reference-only work remains cheap and does not need product proof.

The CI-policy change itself remains full-CI work. Local classifier/aggregate/proof regressions are not represented as full remote product validation. Do not push incomplete routing changes repeatedly merely to exercise expensive CI.

Source basis: merge `c679d8bacfd8b9e31eb2be5b88302a64bd935805`, the root unit gate, all workspace Vitest include patterns, the existing classifier/aggregate/workflow/proof producer and consumers, and the source/test helpers. CLI directly imports parts of the Docs/Markdown/HWP renderers; PDF-structure's round-trip unit test also imports Markdown editor modules. Therefore a blanket `apps/<module>/src/renderer` skip rule is not justified. Runtime UI/module selection needs a separate consumer audit; current runtime changes still receive full validation.

## Timing and next performance work

In company [run 41380645664](https://github.com/dodamworks/onyouoffice/actions/runs/41380645664), the first attempt took 19m48s to reach a failed final result. The eventual 36m42s creation-to-success duration includes rerunning a failed E2E shard, not a 37-minute first pass. The failure was the HTML preview inspector's Style panel click timeout; the same revision passed on rerun. That establishes retry-sensitive behavior, not its root cause.

Summed job elapsed time in the first attempt was 110m56s. Including distinct rerun execution intervals it was 127m18s. These are observed runner durations, not a verified invoice or billed-minute total; later attempts restate successful jobs and must not be double-counted. Eight dependency installs totalled 9m21s; three independent E2E builds took 5m44s, 5m55s and 7m02s, totalling 18m41s.

This change fixes routing and provides substantive reference validation. It does not simultaneously redesign sharding or caching. Subsequent performance work should:

1. Diagnose the observed E2E instability with failure artifacts and targeted reproductions. Do not hide it with blanket retries, weaker assertions or larger global timeouts.
2. Benchmark one shared Linux E2E build against independent shard builds. Include transfer/setup costs, exact source/environment/native-resource parity and executable permissions. Saving runner time may add a dependency to the critical path; measure both effects.
3. Improve existing caches only with evidence, and preserve replacement-run cancellation. Do not share writable profiles/dependencies between checkouts.
4. Post-merge reuse must prove the exact merge tree and validation identity; the November 3 implementation below adds this narrow route with full validation as its fallback.

Free models, Growth and Linux/macOS/Windows installer workflows remain disabled in the company repository. Do not enable schedules, releases, real-provider calls or distribution to optimize CI. Linux CI is not installed-product verification on every supported OS.

## November 3 build reuse and unit balancing

The source-first basis is product head `667545aba0b3bc00df13d1aca58478290d611c4f`, `.github/workflows/ci.yml`, `tools/ci-workspaces.mjs`, the root serial test gate, `e2e/helpers.ts`, every app's build configuration, CLI `build.mjs`/`collect-deps.mjs`, and the Shell/Sheets/CLI native-resource consumers. The reference checkout's `spell-replace.ts` matches the product implementation; no upstream integration is part of this work.

The shared build route reduces redundant Electron builds while retaining the full validation plan. Runner-time or cost claims require measurements of the current workflow.

The full route now builds all Electron test apps once on Ubuntu 22.04 and shares that result with its three test shards. A tar archive retains native executable permissions and includes all eleven app outputs, the bundled CLI with its collected runtime dependencies, and the Rust sidecar. GitHub's artifact transfer supplies transport integrity. Before running tests, each shard checks the build's commit, Git tree, lockfile hash, Node version, platform, architecture and runner image, every app's main/preload/renderer entry points, the CLI bundle and the executable sidecar. A stale, incomplete or mismatched build fails validation. Artifacts are restricted to the current workflow run, retained for one day, and named by the checked-out commit. A failed-shard rerun reuses that run's successful build; after retention expires the build job must be rerun too. This is not a cross-run build cache or a release artifact.

All 37 unit workspaces execute exactly once across four groups, including the diagram editor and draw.io model. The docx-engine suite moves to docs; pptx-engine and shared UI move to editors. CLI remains in libraries with its explicit native-sidecar preparation, and spreadsheet Rust/compatibility checks remain intact. This redistributes measured work; it does not remove tests. New regressions verify complete, duplicate-free assignment and rejection of stale/incomplete build identity. The final CI gate also requires the shared build job to pass and rejects its cancellation, absence or unexpected skip.

Measure the new full run before claiming a saving. The additional build job, dependency installation, archive transfer and storage have overhead; this change is intended to reduce runner minutes, and unit balancing is intended to shorten the critical path. All product test assertions, real-provider exclusions and distribution restrictions remain in force. Post-merge reuse is limited to the verified route below. Prepare focused local fixes together before pushing; do not use full remote CI as the first reproduction loop or repeatedly rerun a reproducible failure without new evidence.

For a single merge pushed to `main`, `tools/ci-reuse.mjs` may reuse a successful PR validation plan only when the main commit's two parents match the tested base/head, its complete Git tree matches the recorded test tree, the run belongs to this repository and CI workflow, the proof belongs to the latest run attempt, the run completed successfully within 24 hours, and Node/platform/architecture/Ubuntu gate-runner image/version match. A proof is produced only after every job required by the PR plan has passed; a reference-only, pending, failed, cancelled, foreign, stale or earlier-attempt run cannot authorize product-validation reuse. Scoped version-2 evidence is bound to the exact plan described above. The complete Git tree also fixes the workflow, runner-label and dependency inputs. This reuses prior test evidence; it does not claim that fresh tests ran on main or that every hosted runner image is immutable. Unavailable APIs, expired/malformed proof, a different tree, base movement, a new dependency/workflow input or different gate-runner identity retain the classified validation plan; uncertain product changes still retain full validation. Only `actions: read` is added to the workflow token. The aggregate explicitly distinguishes proven reuse from an unverified skip. Record the actual reviewed SHA and passing workflow evidence for each accepted change. Do not treat historical execution timings as validation of a new version.

For spellcheck instability, reproduce the specific state and compare failures before changing assertions. Keep diagnostic screenshots and private environment records outside the public source tree.

## Dependency changes

The `Dependency review` workflow runs on pull requests to `main` using a pinned
GitHub-maintained action on a standard runner. It rejects newly introduced known
vulnerabilities at low severity or above across runtime, development and unknown
scopes. It uses read-only repository permissions and posts no PR comments.
Keep this result alongside the existing CI and code scanning checks when merging.
Dependabot alerts remain enabled; automatic dependency fix PRs remain disabled.

## Review policy

CI executes mechanical checks. Perform general code review and a separate security review locally against the final diff and applicable repository guidance. Fix findings before merge and refresh reviews after consequential changes. Record the reviewed commit; an old review does not cover a new revision. Do not request automatic or manual remote PR reviews as part of this maintenance flow. Preserve document compatibility, identity/data separation and mocked AI/provider boundaries.

See [GitHub skipped/required-check semantics](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks). Branch protection, billing plans and account connections are separate from this YAML; none is changed here. Keep the existing GitHub CI, code scanning and platform build checks.

## Bounded document-font setup

The November 6 E2E retry stalled while downloading the 61.2 MB Ubuntu Noto CJK
package. Keep the same Carlito, Caladea and Noto CJK package versions used by the
Ubuntu 22.04 visual baselines. `tools/ci-font-packages.json` records their official
Ubuntu package paths and SHA-256 values; changing the font stack still requires
visual compatibility review.

Cache only these download archives, using the complete lockfile hash as the key.
`tools/ci-fonts.mjs` verifies each archive against the committed hash before any
installation, including cache hits. A bad cache entry is discarded. A download
has a 15-second connection deadline and a 60-second total deadline, then tries
one other Ubuntu mirror. The complete setup step is limited to five minutes.
Verify installed package versions and font-family resolution before tests start.
A missing font, digest mismatch or failed installation fails the job; no layout
assertion, test or product check is skipped. Preserve all three E2E shards and
the existing exact-build and aggregate gates.
