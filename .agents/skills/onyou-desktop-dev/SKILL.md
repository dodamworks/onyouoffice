---
name: onyou-desktop-dev
description: Develop, debug and verify the Onyou Office Electron desktop checkout, with project toolchain checks and isolated runtime evidence. Use for this desktop app, not the sibling website or general browser work.
---

# Onyou desktop development

Read AGENTS.md and docs/dodam/SOURCE-FIRST.md first. Reuse the codebase map and affected-module instructions. Work only in the actual Onyou desktop checkout; the sibling website, its servers and the fixed IeumOffice reference are separate.

## Start and select tools

Choose verification from the requested work before starting a runtime:

| Work                                                     | Useful evidence                                                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Git cleanup, source comparison, research or prose        | Current refs/diffs and the relevant sources; no app launch, rebuild or full environment probe merely for this work |
| Visible UI change                                        | Affected consumer build and actual changed-screen captures; focused interaction checks when behavior changes       |
| Saving, authentication, IPC, native engines or packaging | Relevant module/security contracts and focused regressions; the existing full pre-merge CI policy still applies    |

For environment-dependent development or an environment/tooling audit, run `.codex/bin/onyou-dev node .agents/skills/onyou-desktop-dev/scripts/doctor.mjs` from the repository root. Reuse its result within the task unless dependencies or the environment change. It reads tool versions, workspace dependency provenance and existing build outputs; it does not build or launch the product. `passed` covers those checks only, `optionalLocal` is inventory rather than a tool handshake, and `buildPresenceOnly` proves neither freshness nor release readiness. Compare local and CI versions explicitly when a failure depends on the runtime patch; the doctor's Node-major check does not prove exact CI parity.

Use `.codex/bin/onyou-dev <command> [arguments...]` for commands when that machine-local wrapper is present. On a fresh checkout, select Node 24 and invoke the doctor directly with `node .agents/skills/onyou-desktop-dev/scripts/doctor.mjs`; optional local config/MCP installs are reported as inventory and do not fail the core check. It selects Node 24 and the project-scoped GitHub wrapper, and disables E2E video by default because this Mac can hang during Electron screencast. Do not change global Node or company-wide shell configuration.

- Use rg, TypeScript, module guides and the codebase map for source navigation.
- Use the available Computer Use interface (`cua_repl`) for actual app appearance, Dock, native menus, file dialogs and installation flows. Observe current state before acting. Use scratch profiles and documents; do not attach to personal app data.
- Use the repository's Playwright `_electron` launcher (`e2e/helpers.ts`) for repeatable renderer interactions and Electron main-process assertions. Electron editors are WebContentsViews: find the correct page rather than assuming the first page contains the document. Native dialogs need explicit main-process stubs in automation, or real Computer Use validation.
- Use Context7 for generic public Electron/React/Vite/Playwright documentation when needed. Never include private code, user documents or secrets in a remote documentation query.
- REA is disabled by default: enable it project-locally only for a specific binary/ASAR/native reverse-engineering question that source inspection cannot answer. Do not reuse the reference checkout's indexes.
- Chrome DevTools MCP is installed at a fixed version under `.local/devtools` but disabled by default. Use it for a concrete renderer profiling/network/console problem. It starts isolated Chrome; that is not an Electron product test. Never auto-connect it to a personal browser. Any Electron CDP attachment must target an explicitly launched scratch app on literal loopback.
- OpenAI Docs MCP is configured but disabled by default. Enable it for relevant Codex/OpenAI integration work; normal document/UI editing does not need it. Configuration changes need project reload before claiming tools are available in the active chat.

## Validate the affected behavior

Follow docs/dodam/CI-POLICY.md. Keep all assertions and provider mocks. Run focused tests during edits; product/tooling changes retain the full pre-merge CI requirement. Collect fixes before a coherent push, observe the existing run instead of dispatching duplicates, and let the existing exact-tree proof decide post-merge reuse. Do not publish or push solely to run CI without authorization.

Rebuild Shell after main/preload changes. Rebuild every affected editor renderer for shared UI changes. Reuse existing scripts rather than introducing another general test framework. Do not add live AI calls, update/support endpoints, accounts, telemetry or new features while validating branding.

For runtime checks, use scratch HOME, userData and document paths, with subscription binaries unavailable and external requests blocked by the verification harness. Preserve internal package, IPC and document identifiers. Never read Codex/Claude login stores. Verify editing/save/reopen when affected; a screenshot alone does not establish document compatibility.

Report separately: local configuration, actual tool handshake, rendered evidence, product test/build results, OS installation and distribution. Keep temporary evidence under `.local` or outside the checkout. The tooling inventory and source/version decisions are in docs/dodam/DESKTOP-TOOLING.md.

## Own the visual review

For visible UI/copy work, also use the project-local `onyou-desktop-design` skill to reuse the accepted brand, tokens and shared components.

After changing a visible surface, inspect actual screenshots before reporting completion. Compare the result with adjacent existing controls: text size/weight/colour, painted artwork versus canvas size, label start lines, icon centres, padding and baseline rhythm. Use live fonts for small UI text; inspect the actual platform font rather than trusting the CSS family name. Verify the changed surface in Korean/English and light/dark themes, plus its supported narrow desktop layout; reuse still-current captures for unaffected states. Preserve word boundaries across languages, and allow long paths or identifiers to wrap without overflowing. Batch findings into one correction pass and one final confirmation. A copy/layout change alone does not call for a fresh install, live-provider request or document round trip. Do not make the user discover basic visual defects or treat passing code checks as visual approval. Preserve the incumbent editor UI and avoid unrelated feature retesting.

The user accepted the sidebar result on 2026-11-02. Preserve that incumbent baseline: live Pretendard product-name text, navigation-scale type, optical-small symbol, aligned label starts/icon centres, and no beta badge. Its source/screenshot hash manifest is `.local/review/desktop-brand-2026-11-02/accepted-sidebar/baseline.json`; the maintained record is docs/dodam/DESKTOP-BRAND-INTEGRATION.md. Inspect the current implementation if machine-local evidence is unavailable. For every modified UI surface, verify that the running build actually includes the latest changed source before capturing it; maintain accepted behavior and visual proportions, then improve only demonstrated defects. No arbitrary enlargement, rebranding or unrelated redesign is implied by maintenance.
