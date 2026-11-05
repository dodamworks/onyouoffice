# Development entry points

## Starting a new session

1. Read repository AGENTS.md and the [development guide](../README.md). Maintainers also apply their private workspace boundary when present. Confirm the active request; repository guidance does not authorize external operations.
2. Check `git rev-parse HEAD` and `git --no-optional-locks status --short --branch`. This map describes `4f7c52ad84f8ce977aefffd132b4f58321fd5b95`. If relevant code has changed, inspect whether the affected module description still applies. Documentation-only changes do not require rebuilding the entire analysis.
3. Select the responsible area using the [system map](README.md) and [module map](MODULES.md). Read [standards](../../standards.md), [engineering notes](../../engineering-notes.md) and that module's AGENTS.md.
4. Find the source entry below, then inspect relevant callers, state owners and boundaries. This is a retrieval procedure, not a requirement to reread the repository or rerun all tests in every session.

## Task-to-source routing

| Task                                             | Start here                                            | Follow these boundaries                                                       |
| ------------------------------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| Home, tabs, windows, format routing              | apps/shell/src/main/index.ts, src/renderer/src        | TabManager and target editor runtime/preload/renderer                         |
| Editor UI and document tools                     | Target apps/*/src/renderer                            | Format model, shared UI and module guide                                      |
| Open, save and export                            | Editor file-actions/main and format engine            | Original preservation, path grants, atomic write and recovery owner           |
| Shared AI panel and send decisions               | packages/ui, packages/agent-core                      | Docs shared AI IPC, provider selection and transport                          |
| AI provider and CLI subprocess                   | packages/ai-provider                                  | Browser/main entry points, security and start/cancel lifecycle                |
| Search, images and web reading                   | packages/ai-search                                    | Call context, provider and file/network policy                                |
| Product identity, installation and storage paths | packages/i18n/src/product.ts                          | Shell main, electron-builder and CLI install; avoid global string replacement |
| CLI and MCP                                      | packages/cli/src/cli.ts, registry.ts, mcp             | Headless engine versus app control; docs/contracts.md                         |
| Projects and conversations                       | packages/project-store, Shell project code            | App data versus user folders; permission, trust and redaction                 |
| Attachments and indexing                         | packages/file-parse, Shell indexing code              | Text extraction versus editor model; redaction and file access                |
| Drive files                                      | packages/google-drive, Shell Drive integration        | Local copies, remote files and save/reopen routing                            |
| Sheets calculation and file handling             | apps/sheets/native/xlsx-engine, packages/xlsx-gateway | Rust process protocol and UI state                                            |
| HWP/PDF native and WASM paths                    | apps/hwp or apps/pdf guide                            | rhwp/PDFium build, assets and process boundaries                              |

Paths are repository-relative. Locate symbols rather than relying on line numbers that move. Useful search terms include Shell's `configureDocsRuntime`, `routeDocumentPath`, `registerAiIpc`, and provider's `selectAiProvider`.

## Reading the common flows

- **Document:** Shell format routing → editor renderer/bridge → format engine → save path. Identify whether the engine runs in renderer, main or native code.
- **AI:** UI send decision → AgentLoop → IPC transport → main provider selection → model response → app tool execution. Separate the owner of model requests from the owner of document mutations.
- **Command/MCP:** Command/tool registration → headless file processing or running-app control → engine/storage/AI. Read contracts.md when changing external behavior.

See [architecture](../../architecture.md) for inherited detail and [tracking](../../tracking) for existing status, decisions and limitations. Do not mark an inherited finding resolved without new evidence.

## Maintaining this record

Write new architecture analysis and developer-reference documentation in English, keeping source identifiers exact. Product-facing strings continue to follow the repository language and localization rules.

Update the relevant section when modules move, responsibilities or process boundaries change, or the accepted upstream SHA advances. Ordinary function edits do not require a full graph rebuild or a lengthy report.

At handoff, record the target SHA, affected modules, decisions and rationale, source entry points and remaining questions. Choose checks for the actual implementation change and reuse applicable evidence. Completing PR #2 does not require revalidating product features individually.

Static graphs support navigation. They do not fully resolve type imports, IPC constants and registration lifetime, native/WASM code or dynamic calls. Graph edges alone do not establish behavior or defects. The references above should allow a new session to continue without a graph database or remembered chat context.

## Change-impact map

| Change                                  | Primary area                                    | Follow-on impact                                                                                                             |
| --------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Add a document editor                   | New apps module                                 | Shell format routing, tab contract, runtime injection, builds/packaging, file associations, attachments/CLI formats and i18n |
| Change shared editor AI behavior        | ui / agent-core / Docs AI IPC                   | Editor skills/transports, provider browser/main contracts, conversation storage and cancellation                             |
| Add or change an AI provider            | ai-provider registry/selection/protocol         | Connection state, settings/send UI, ai-search/headless, execution owner and billing selection                                |
| Add a document operation                | Format engine or editor op                      | UI and CLI/MCP reuse, undo/transactions, save model and external contracts                                                   |
| Change product identity or installation | i18n/product, Shell packaging/main, CLI install | userData, project paths, updates/external addresses, registrations and coexistence                                           |
| Accept upstream changes                 | Modules affected by candidate diff              | Shared hubs, independent fork boundaries, API/build alias/native dependency changes                                          |

This table gives navigation paths derived from the architecture. It does not authorize feature implementation or refactoring. Inspect the relevant source and choose checks for each actual change.

## CI and review cost policy

The [CI workflow](../../../.github/workflows/ci.yml) routes changes by product impact, using the shared [reference policy](../../../tools/ci-reference-policy.json) and [scope classifier](../../../tools/ci-scope.mjs). This is a general rule for human reference material, not a brand-specific exemption. See the [policy, upstream audit and measurements](../CI-POLICY.md).

| Change                                                                                               | Automatic CI path                                                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Only supported, regular non-executable reference files under docs/ or the listed root documents      | Scope-policy tests, reference validation and final result                                                                                  |
| Any app/package code, runtime assets/content, dependency, workflow, tooling or unsupported path/mode | Existing static checks, 35 workspace suites, Rust/compatibility, builds and browser/Electron jobs; reference checks also run when relevant |
| Missing/ambiguous comparison or manual run                                                           | Full product validation                                                                                                                    |

Reference validation checks local Markdown link targets, deleted-file backlinks, JSON syntax/provenance hashes, self-contained static SVGs, decoded raster images and readable reference fonts with adjacent notices. Its three CI-only Python dependencies have pinned wheel hashes; it does not install the application's npm workspace or launch Electron. Structural checks do not judge design quality, prose accuracy or license suitability.

Classification uses the complete PR merge tree against its first parent and recorded push ranges. Both sides of renames remain visible. Executable modes, symlinks and unknown file kinds cannot take the reference-only path. Never move app resources into a documentation location to obtain a cheaper result; a new runtime consumer of reference files requires updating the policy and its boundary tests in the same PR.

`CI result` always runs and rejects missing, failed, cancelled or unexpectedly skipped required jobs. If required-check enforcement becomes available, use this aggregate status. Workflow-level path filters and commit skip markers are not the routing mechanism: they can leave required checks pending. See [GitHub required-check guidance](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks).

CI configuration/checker changes themselves take the full path. Keep every existing application validation category and inherited publishing/scheduled workflows disabled. Measure elapsed time and runner consumption separately before adopting shared builds or greater parallelism. A passed local policy test is not a passed GitHub run.

Codex GitHub review is separate from CI. It reviews the PR diff with relevant repository context; it is not a request to execute all repository tests. Prepare the change locally and request one review of the intended final diff. Re-request when substantive changes or fixes invalidate earlier findings, recording the reviewed SHA and new scope. For a follow-up, identify what changed since the prior reviewed SHA without assuming Codex guarantees an incremental-only scan or token reuse. Do not claim an old review covers a new revision.

Automatic review triggers are configured in Codex repository/personal settings, not this YAML. Their current configuration has not been changed by this policy update. If automatic reviews are enabled, avoid adding a duplicate manual request while one is already running. For documentation, focus the review request on source accuracy, ownership, baseline/delta distinctions and usefulness for subsequent development. See the [official Codex GitHub review guide](https://learn.chatgpt.com/docs/third-party/github).
