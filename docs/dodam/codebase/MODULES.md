# Module map

Relationships below describe representative responsibilities, not every value/type import or a complete feature specification. Internal `@genoffice/*` names are intentionally retained.

## Application workspaces: 10

| Directory                                         | Responsibility                                                                                     | Main connections                                    |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [apps/shell](../../../apps/shell/AGENTS.md)       | Deployed application: windows, home, tabs, settings, updates, app control, MCP and project folders | Editor main code and shared packages                |
| [apps/docs](../../../apps/docs/AGENTS.md)         | DOCX/ODT editor and installed-app shared AI IPC host                                               | docx-engine, odt-engine, ai-provider, ui            |
| [apps/sheets](../../../apps/sheets/AGENTS.md)     | Spreadsheet grid, ribbon and editing flows for XLSX/CSV                                            | xlsx-gateway and native/xlsx-engine (Rust)          |
| [apps/slides](../../../apps/slides/AGENTS.md)     | PPTX editing, slide generation and canvas presentation                                             | pptx-engine, pptx-ops, pptx-render, pipelines       |
| [apps/pdf](../../../apps/pdf/AGENTS.md)           | PDF viewing, annotations, editing, structure jobs and translation UI                               | PDF.js, pdf-lib, PDFium, pdf-structure              |
| [apps/markdown](../../../apps/markdown/AGENTS.md) | Markdown blocks and plain-text/JSON source editing                                                 | Shared UI/AI, file and conversion tools             |
| [apps/html](../../../apps/html/AGENTS.md)         | HTML source editing and preview                                                                    | Shared UI/AI and conversion tools such as html2docx |
| [apps/hwp](../../../apps/hwp/AGENTS.md)           | Connects HWP/HWPX editing to the application                                                       | rhwp web editor, WASM and plugin                    |
| [apps/mindmap](../../../apps/mindmap/AGENTS.md)   | XMind map presentation and editing                                                                 | mind-elixir and xmind-engine                        |
| [apps/epub](../../../apps/epub/AGENTS.md)         | Book chapters, editing, preview and translation                                                    | epub-engine and pdf-structure jobs/store            |

Read each app AGENTS.md and package.json for build/registration details. Renderer code is generally under src/renderer, Electron bridges under src/preload, and backend code under src/main. Find configure*Runtime and editor-main imports in Shell main/index.ts to locate installed-app composition.

## Shared packages: 25

| Directory                                                             | Responsibility                                                 | Boundary to inspect                                  |
| --------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| [packages/agent-core](../../../packages/agent-core/AGENTS.md)         | Model/tool iteration, transport contracts and redaction        | Shared AI execution rules                            |
| [packages/ai-provider](../../../packages/ai-provider/AGENTS.md)       | Provider selection and CLI/direct/key model calls              | Separate renderer and main entry points              |
| [packages/ai-search](../../../packages/ai-search/AGENTS.md)           | Search, images, media, web reading and routing                 | Screen and headless contexts                         |
| [packages/ui](../../../packages/ui/AGENTS.md)                         | Shared React components, AI panels, send gates and theme       | Editors and Shell share behavior                     |
| [packages/i18n](../../../packages/i18n/AGENTS.md)                     | Languages, naming and product path/command constants           | Central product-identity boundary                    |
| [packages/electron-utils](../../../packages/electron-utils/AGENTS.md) | Main security, file writes, menus and export helpers           | Shared application boundaries                        |
| [packages/project-store](../../../packages/project-store/AGENTS.md)   | Local projects, conversations and folder contracts             | App data versus user-selected project folders        |
| [packages/google-drive](../../../packages/google-drive/AGENTS.md)     | Drive OAuth and file exchange                                  | Main-side external integration                       |
| [packages/file-parse](../../../packages/file-parse/AGENTS.md)         | Read file text for attachments, search and indexing            | Different purpose from editing; redaction boundary   |
| [packages/zip-gate](../../../packages/zip-gate/AGENTS.md)             | Archive size and safety limits                                 | Shared by document engines                           |
| [packages/font-metrics](../../../packages/font-metrics/AGENTS.md)     | System-font discovery and text measurements                    | Rendering and export layout                          |
| [packages/doc-rules](../../../packages/doc-rules/AGENTS.md)           | Document-format rule data and audit functions                  | Administrative rules, separate from serialization    |
| [packages/docx-engine](../../../packages/docx-engine/AGENTS.md)       | DOCX model, parsing and serialization                          | Foundation for Docs and conversion paths             |
| [packages/odt-engine](../../../packages/odt-engine/AGENTS.md)         | ODT/bridge DOCX conversion and range-preserving save           | Used by Docs, CLI and attachments                    |
| [packages/pptx-engine](../../../packages/pptx-engine/AGENTS.md)       | PPTX model, original XML preservation and save                 | Separate from operations and presentation            |
| [packages/pptx-ops](../../../packages/pptx-ops/AGENTS.md)             | PPTX editing operations and transactions                       | Public model-mutation contract                       |
| [packages/pptx-render](../../../packages/pptx-render/AGENTS.md)       | PPTX model to RenderTree                                       | Coordinates, fonts, wrapping and drawing data        |
| [packages/xlsx-gateway](../../../packages/xlsx-gateway/AGENTS.md)     | Workbook domain logic and write gateway                        | Shared rules between Rust sidecar and UI             |
| [packages/xmind-engine](../../../packages/xmind-engine/AGENTS.md)     | XMind archive/model and preservation-oriented save             | Independent of map UI                                |
| [packages/epub-engine](../../../packages/epub-engine/AGENTS.md)       | EPUB parsing, block maps, range edits and save                 | Independent of book UI; translation units/output     |
| [packages/pdf2docx](../../../packages/pdf2docx/AGENTS.md)             | PDF extraction, intermediate representation and reconstruction | PDFium and layout-analysis pipeline                  |
| [packages/pdf-structure](../../../packages/pdf-structure/AGENTS.md)   | Document trees, output, AI document jobs and result storage    | Used by PDF, EPUB and CLI; some work runs separately |
| [packages/html2docx](../../../packages/html2docx/AGENTS.md)           | Chromium-measured HTML to DOCX                                 | DOM/layout conversion                                |
| [packages/pipelines](../../../packages/pipelines/AGENTS.md)           | Slide specification validation, generation and merging         | Slide generation and CLI paths                       |
| [packages/cli](../../../packages/cli/AGENTS.md)                       | onyouoffice commands, headless MCP and running-app control     | Direct engines and application control coexist       |

## Reading dependencies

- Editors generally depend on shared UI/AI and format engines. Shell directly bundles other apps’ main code, so app directories are not fully independent deployment units.
- Slides separates file models, editing operations and presentation data. Sheets separates gateway logic and a Rust process; TypeScript alone does not explain the full calculation/file path.
- ai-provider browser exports are renderer-facing; CLI execution and other Node-specific paths belong to main/headless contexts. Distinguish type-only imports from value imports before interpreting graph cycles.
- CLI has direct engine paths and running-app control paths. Even related commands may have different execution owners.
- File parsing, visual rendering and attachment text extraction are separate responsibilities. file-parse output does not describe an editor’s serialization model.

## Important code outside npm workspaces

| Location                                                                            | Responsibility                                                        |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [apps/sheets/native/xlsx-engine](../../../apps/sheets/native/xlsx-engine/AGENTS.md) | Rust spreadsheet sidecar, communicating through standard input/output |
| [vendor/rhwp-core](../../../vendor/rhwp-core)                                       | HWP editor base source and build boundary                             |
| [e2e](../../../e2e)                                                                 | Integration scenarios using the built Electron app                    |
| [tools](../../../tools)                                                             | Policy checks, build and fixture support                              |
| [docs/tracking](../../tracking)                                                     | Existing decisions, status and known limitations                      |

Select the responsible area, then read its guide and actual entry source. Rereading the entire repository is not the default workflow.

## Source entry points and structural interpretation

The sections below reconcile manifests with actual source entries for all 35 workspaces. Representative dependencies come from scoped static analysis and may include type-only and dynamic imports. They do not express execution frequency, correctness or quality.

### apps/docs

Serves both as the Word editor and the shared AI host. Renderer document state/serialization is separate from main path authorization, settings and IPC. Shared AI changes here can affect other editors.

- Source entries: [docs-main.ts](../../../apps/docs/src/main/docs-main.ts).
- Observed public names: `configureDocsRuntime`.
- Representative source dependencies: `packages/docx-engine`, `packages/ui`, `packages/electron-utils`.

### apps/epub

Main EpubBookSession owns book bytes and chapter edits. Renderer exchanges chapter data and range replacements. AI panels and translation jobs build on the session/result-store boundary.

- Source entries: [epub-main.ts](../../../apps/epub/src/main/epub-main.ts).
- Observed public names: `configureEpubRuntime`.
- Representative source dependencies: `packages/epub-engine`, `packages/i18n`, `packages/pdf-structure`.

### apps/html

Connects source editing/preview to main file, asset and output handling. Preview content, saved HTML and external-resource access have distinct owners and policies.

- Source entries: [html-main.ts](../../../apps/html/src/main/html-main.ts).
- Observed public names: `configureHtmlRuntime`.
- Representative source dependencies: `packages/electron-utils`, `packages/ui`, `packages/i18n`.

### apps/hwp

Wraps rhwp-studio and the app plugin with file and IPC boundaries. Locate reuse of the existing agent plugin and save corrections before introducing document operations.

- Source entries: [hwp-main.ts](../../../apps/hwp/src/main/hwp-main.ts).
- Observed public names: `configureHwpRuntime`.
- Representative source dependencies: `packages/electron-utils`, `packages/ui`, `packages/i18n`.

### apps/markdown

Renderer owns editing content and the AI panel; main mediates file access, closing and recovery. Markdown editing and text/JSON source editing should not be assumed to share one document model.

- Source entries: [markdown-main.ts](../../../apps/markdown/src/main/markdown-main.ts).
- Observed public names: `configureMarkdownRuntime`.
- Representative source dependencies: `packages/ui`, `packages/electron-utils`, `packages/ai-provider`.

### apps/mindmap

Connects map presentation to the xmind-engine file model. Main tracks per-view paths, write grants and save waiters; distinguish widget state from the persisted document.

- Source entries: [mindmap-main.ts](../../../apps/mindmap/src/main/mindmap-main.ts).
- Observed public names: `configureMindmapRuntime`.
- Representative source dependencies: `packages/xmind-engine`, `packages/electron-utils`, `packages/i18n`.

### apps/pdf

Viewing, annotations/editing, document-structure work and AI document jobs follow different paths. Heavy structure work runs in Shell utilityProcess instances; main manages the result store.

- Source entries: [pdf-main.ts](../../../apps/pdf/src/main/pdf-main.ts).
- Observed public names: `configurePdfRuntime`.
- Representative source dependencies: `packages/pdf-structure`, `packages/i18n`, `packages/ui`.

### apps/sheets

Separates renderer grid state, main tab/session management and Rust file/calculation processing. xlsx-gateway domain/shared/gateway connects edit plans to archive writes.

- Source entries: [sheets-main.ts](../../../apps/sheets/src/main/sheets-main.ts).
- Observed public names: `configureSheetsRuntime`.
- Representative source dependencies: `packages/xlsx-gateway`, `packages/ui`, `packages/electron-utils`.

### apps/shell

Owns process composition and editor integration. main/index.ts connects runtime paths, shared IPC, tabs, projects and the control server. UI changes and application-composition changes therefore have different entry points.

- Source entries: [index.ts](../../../apps/shell/src/main/index.ts).
- Entry shape: internal initialization or child-module re-exports; root export names alone do not describe execution.
- Representative source dependencies: `packages/i18n`, `packages/electron-utils`, `packages/ai-provider`.

### apps/slides

Connects main document sessions and editing transactions to renderer canvas/panels. Distinguish the file model, editing operations and presentation data to avoid duplicating changes across layers.

- Source entries: [slides-main.ts](../../../apps/slides/src/main/slides-main.ts).
- Observed public names: `configureSlidesRuntime`.
- Representative source dependencies: `packages/pptx-render`, `packages/ui`, `packages/electron-utils`.

### packages/agent-core

Provider-independent execution loop. Owns history, turns, tool calls, cancellation generations and abort state; transport and skill contracts inject external implementations. It is not the persistent conversation store.

- Source entries: [index.ts](../../../packages/agent-core/src/index.ts), [loop.ts](../../../packages/agent-core/src/loop.ts), [electron-transport.ts](../../../packages/agent-core/src/electron-transport.ts).
- Observed public names: `AgentLoop`, `createIpcTransport`.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.

### packages/ai-provider

Separates provider selection from protocol dispatch. selectAiProvider decides connection/selection; streamForProvider uses adapter endpoints to route CLI subscriptions, direct connections or HTTP protocols. Browser and main-only subpaths are explicit.

- Source entries: [index.ts](../../../packages/ai-provider/src/index.ts), [browser.ts](../../../packages/ai-provider/src/browser.ts), [provider-selection.ts](../../../packages/ai-provider/src/provider-selection.ts), [stream.ts](../../../packages/ai-provider/src/stream.ts).
- Observed public names: `isKeyProviderConfigured`, `selectAiProvider`, `configuredImageKeyProviders`, `streamForProvider`.
- Representative source dependencies: `packages/agent-core`, `packages/i18n`, `packages/zip-gate`.

### packages/ai-search

Combines search APIs with read-url, media, images and headless call context. UI implementations should reuse this layer to keep provider selection and external-access policy consistent.

- Source entries: [index.ts](../../../packages/ai-search/src/index.ts).
- Observed public names: `searchEnvKey`, `webSearch`, `imageSearch`, `MIN_USABLE_IMAGE_PX`, `filterUsableImages`.
- Representative source dependencies: `packages/ai-provider`, `packages/electron-utils`.

### packages/cli

Common structure is registry → arguments/command → result/exit code. Direct engines, app socket control and MCP hosting coexist, with some paths reusing Docs/HWP application code.

- Source entries: [index.ts](../../../packages/cli/src/index.ts).
- Observed public names: `runCli`.
- Representative source dependencies: `packages/xlsx-gateway`, `apps/docs`, `packages/pdf-structure`.

### packages/doc-rules

Pure profile → rule-set → audit layer. Administrative rules are data applied to extracted document profiles; keep this separate from file serialization.

- Source entries: [index.ts](../../../packages/doc-rules/src/index.ts).
- Entry shape: internal initialization or child-module re-exports; root export names alone do not describe execution.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.

### packages/docx-engine

Provides parseDocx/saveDocx and XML/document models. It depends on zip-gate, redaction constants and some PPTX-derived handling, so it is not a completely isolated leaf engine.

- Source entries: [index.ts](../../../packages/docx-engine/src/index.ts).
- Observed public names: `parseDocx`, `assertZipInflatesWithinLimits`, `assertZipWithinLimits`, `saveDocx`.
- Representative source dependencies: `packages/agent-core`, `packages/pptx-engine`, `packages/zip-gate`.

### packages/electron-utils

Provides atomic writes, safe URL handling, renderer bridges, print/export and recovery through subpaths. Its name does not imply that every export is safe to import into a renderer.

- Source entries: [index.ts](../../../packages/electron-utils/src/index.ts).
- Observed public names: `configuredAuthorName`, `configuredDefaultSaveDir`.
- Representative source dependencies: `packages/i18n`, `packages/project-store`, `packages/ui`.

### packages/epub-engine

The core subpath exposes reading, blocks, range edits and saving; root also includes translation. Translation output and Node-specific dependencies require restricted renderer entry points/aliases.

- Source entries: [index.ts](../../../packages/epub-engine/src/index.ts), [core.ts](../../../packages/epub-engine/src/core.ts).
- Observed public names: `openEpub`, `saveEpub`.
- Representative source dependencies: `packages/pdf-structure`, `packages/pdf2docx`, `packages/zip-gate`.

### packages/file-parse

Dispatches file content to format-specific text readers. Its purpose differs from editing deserialization/serialization; it connects attachment/search input to redaction and file-reading rules.

- Source entries: [index.ts](../../../packages/file-parse/src/index.ts).
- Observed public names: `parseFileToText`.
- Representative source dependencies: `packages/agent-core`, `packages/docx-engine`, `packages/odt-engine`.

### packages/font-metrics

Provides font discovery, face information, advances and vertical metrics. Renderer dimensions and exported layouts depend on these values, beyond ordinary UI styling.

- Source entries: [index.ts](../../../packages/font-metrics/src/index.ts).
- Observed public names: `configureMetricsCache`, `configureExtraFontDirs`.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.

### packages/google-drive

Exports OAuth, format conversion, REST APIs and connection lifetime separately. It is an external file-provider layer connected to Shell, rather than a replacement for local document sessions.

- Source entries: [index.ts](../../../packages/google-drive/src/index.ts).
- Entry shape: internal initialization or child-module re-exports; root export names alone do not describe execution.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.

### packages/html2docx

Uses an injected BrowserDriver to normalize Chromium measurements into IR and generate DOCX. Web preview and document conversion process HTML with different responsibilities and execution contexts.

- Source entries: [index.ts](../../../packages/html2docx/src/index.ts).
- Observed public names: `convertHtmlToDocx`.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.

### packages/i18n

Combines language/string handling with product identity constants. Names, commands and data paths define fork separation; distinguish them from document-format identifiers. It is a foundation layer without value imports from other workspaces in the analyzed graph.

- Source entries: [index.ts](../../../packages/i18n/src/index.ts).
- Observed public names: `LANGS`, `isLang`, `normalizeLang`, `htmlLang`, `isRtlLang`, `htmlDir`.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.

### packages/odt-engine

Organized into core/text/table/objects/page/assemble. Its public API joins ODT-to-bridge-DOCX conversion with original-plus-bridge-plus-edited-DOCX saving. Docs edits the bridge model while this layer preserves the ODT.

- Source entries: [index.ts](../../../packages/odt-engine/src/index.ts).
- Observed public names: `odtToDocx`, `saveOdt`.
- Representative source dependencies: `packages/docx-engine`, `packages/zip-gate`.

### packages/pdf-structure

Combines PDF-IR document trees, Markdown/EPUB output, AI reading/translation, writeback and jobs, with a separate store entry point. Also imports an apps/pdf font helper, an existing reverse dependency.

- Source entries: [index.ts](../../../packages/pdf-structure/src/index.ts).
- Observed public names: `extractEmbeddedImages`, `MIN_IMAGE_PX`, `MAX_IMAGE_TOTAL_PX`, `writeEpub`, `epubLanguages`, `guessLanguageFromText`.
- Representative source dependencies: `packages/pdf2docx`, `packages/ai-provider`, `apps/pdf`.

### packages/pdf2docx

Provides extract → analyze → rebuild stages and a shared IR. Despite its name, exports also include PPTX/XLSX reconstruction. Separate raw PDF extraction, semantic structure and output formats.

- Source entries: [index.ts](../../../packages/pdf2docx/src/index.ts).
- Observed public names: `extractIrDocument`.
- Representative source dependencies: `packages/pptx-engine`, `packages/docx-engine`, `packages/font-metrics`.

### packages/pipelines

Groups slide specification, layout, template and build stages under the slides namespace. Deterministic generation steps separate model-produced JSON from the output document.

- Source entries: [index.ts](../../../packages/pipelines/src/index.ts).
- Entry shape: internal initialization or child-module re-exports; root export names alone do not describe execution.
- Representative source dependencies: `packages/pptx-render`, `packages/pptx-engine`.

### packages/pptx-engine

Owns OpenedPptx, original XML anchors and the archive. openPptx/savePptx/commitSaved form the file lifecycle, separately from the UI and operation registry.

- Source entries: [index.ts](../../../packages/pptx-engine/src/index.ts).
- Observed public names: `assertZipWithinLimits`, `openPptx`, `savePptx`, `savePptxToFile`.
- Representative source dependencies: `packages/agent-core`, `packages/zip-gate`.

### packages/pptx-ops

Registry and executor run public editing operations as transactions. Side-effect imports in ops/index.ts register implementations, making module initialization part of the execution structure.

- Source entries: [index.ts](../../../packages/pptx-ops/src/index.ts).
- Observed public names: `mapScriptOps`.
- Representative source dependencies: `packages/pptx-engine`, `packages/docx-engine`.

### packages/pptx-render

Transforms PPTX models through render-tree, build-slide and text-layout into presentation data. It is the layout layer between file models and React/canvas UI.

- Source entries: [index.ts](../../../packages/pptx-render/src/index.ts).
- Observed public names: `patternGrid`, `imageDpiFromBytes`, `imageSizeFromBytes`.
- Representative source dependencies: `packages/pptx-engine`.

### packages/project-store

Provides the userData/projects index and document-conversation storage. folder-api describes .onyouoffice inside user-selected folders. App data and project-folder data have different owners even within this package.

- Source entries: [index.ts](../../../packages/project-store/src/index.ts).
- Observed public names: `ProjectStore`.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.

### packages/ui

Exports shared behavior as well as visual components: AI send rules, connection guidance, task cards, attachments, queues and CSS. Changes here can affect multiple editors.

- Source entries: [index.ts](../../../packages/ui/src/index.ts).
- Observed public names: `AiPanelSideButton`, `DriveAttachButton`, `drivePickedOf`, `DocAttachButton`, `docPickedOf`, `attachmentFolderLabel`.
- Representative source dependencies: `packages/i18n`, `packages/ai-provider`, `packages/agent-core`.

### packages/xlsx-gateway

Uses wildcard subpath exports without a single src/index.ts. domain contains workbook behavior, shared contains schemas/bounds, and gateway contains OOXML mutation plans and sidecar save paths.

- Source entries: [xlsx-gateway.ts](../../../packages/xlsx-gateway/src/gateway/xlsx-gateway.ts), [xlsx-package-io.ts](../../../packages/xlsx-gateway/src/gateway/xlsx-package-io.ts), [in-memory-workbook.ts](../../../packages/xlsx-gateway/src/domain/in-memory-workbook.ts).
- Observed public names: `saveWorkbookViaSidecar`.
- Representative source dependencies: `packages/zip-gate`.

### packages/xmind-engine

Exports open/create/document models plus structure, presentation and resource handling. It is independent of the map widget; widget state and original archive preservation are separate concerns.

- Source entries: [index.ts](../../../packages/xmind-engine/src/index.ts).
- Entry shape: internal initialization or child-module re-exports; root export names alone do not describe execution.
- Representative source dependencies: `packages/i18n`, `packages/zip-gate`.

### packages/zip-gate

Defines common declared-size and actual-inflate limits. It is a shared file boundary for several document formats and is independent of editor UI.

- Source entries: [index.ts](../../../packages/zip-gate/src/index.ts).
- Observed public names: `assertZipInflatesWithinLimits`.
- Representative source dependencies: no outgoing imports to other workspaces in the analyzed scope.
