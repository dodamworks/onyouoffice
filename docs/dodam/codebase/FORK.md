# Upstream baseline and fork changes

## Fixed revisions

| Revision                | SHA                                        | Meaning                                                        |
| ----------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| Accepted IeumOffice     | `cca94cf0c65d9022c5fc96500b60847963aea841` | Pinned upstream accepted in PR #1                              |
| Onyou Office foundation | `4f7c52ad84f8ce977aefffd132b4f58321fd5b95` | PR #1 merge commit preserving upstream and independent history |

This document does not track the current remote tip. See [UPSTREAM-INTEGRATION](../UPSTREAM-INTEGRATION.md) for the historical integration record. PR #2 documents the resulting foundation.

## Where our changes concentrate

| Area                                    | Main source / records                                                                                                                                             | Development implication                                                                  |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Display names and product constants     | [i18n/product.ts](../../../packages/i18n/src/product.ts), app HTML/display entry points                                                                           | Onyou Office and its localized name are separate from internal package identifiers       |
| App data, installation and registration | [Shell main](../../../apps/shell/src/main/index.ts), [electron-builder](../../../apps/shell/electron-builder.cjs), [installer scripts](../../../apps/shell/build) | Preserve independent execution, storage and registration paths                           |
| External addresses and updates          | [product constants](../../../packages/i18n/src/product.ts), [updater](../../../apps/shell/src/main/updater.ts), feedback/default-app                              | Unconfigured endpoints must not redirect to upstream services                            |
| CLI, MCP and skill names                | [CLI](../../../packages/cli), [reserved skill names](../../../packages/agent-core/src/user-skill-names.ts), ai-provider user-skills                               | User-facing command is onyouoffice; retain internal package and document/IPC identifiers |
| Provider client and project identity    | [codex-app-server](../../../packages/ai-provider/src/codex-app-server.ts), [folder-api](../../../packages/project-store/src/folder-api.ts)                        | Identity reaches client names and project-data contracts, beyond UI strings              |
| Documentation, attribution and checks   | docs/dodam, NOTICE, CI and related tests                                                                                                                          | Preserve independent product rules, attribution and integration-check history            |

The upstream/product range contains 219 Git change entries, including translations, documentation, tests and CI. File counts do not measure new features or complexity. Numerous changed CLI files do not imply a rewritten command engine.

## Inherited foundation and preserved areas

The editors and shared AI/file-processing structure derive from IeumOffice. In this comparison range, there are no Git changes under docx-engine, odt-engine, pptx-engine, pptx-ops, pptx-render, xlsx-gateway, xmind-engine, epub-engine, pdf2docx, pdf-structure, html2docx, font-metrics, apps/sheets/native or vendor/rhwp-core. This establishes unchanged files in the pinned range, not verification of every runtime behavior.

Retain LICENSE, NOTICE, attribution, `@genoffice/*`, `GENOFFICE_*` and identifiers stored inside documents. The current independent foundation separates user-visible identity, external registration and local storage. Logo, website, new features and release work are outside this architecture task.

## Reviewing later upstream changes

Keep two comparisons separate:

1. **Last accepted upstream → candidate upstream:** what upstream changed.
2. **Last accepted upstream → our product:** independent changes we must preserve.

Map changed modules in the first range to the [module map](MODULES.md), then check overlap with the independent boundaries above. Read the diff to distinguish display-only changes from storage, IPC, provider, native or packaging changes. Commit counts alone do not determine integration suitability. When accepting an update, record the pinned SHA and structural changes while preserving both histories. This procedure does not itself authorize fetch, merge, push or deployment.
