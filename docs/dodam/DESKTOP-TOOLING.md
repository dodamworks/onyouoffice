# Desktop development tools

Use Node.js 24, npm and Rust/cargo. Match the exact Node patch in
[CI](../../.github/workflows/ci.yml) when diagnosing environment-sensitive failures.
Use the checked-in lockfile and workspace scripts; do not share writable
node_modules, build outputs or profiles with a reference checkout.

```sh
npm ci
npm run fixtures
npm run dev
```

The project [development skill](../../.agents/skills/onyou-desktop-dev/SKILL.md)
and [design skill](../../.agents/skills/onyou-desktop-design/SKILL.md) guide source
inspection, small UI changes and actual-screen verification. A maintainer's
ignored `.codex/bin/onyou-dev` wrapper is optional; external contributors can run
the same commands directly with Node 24. Never copy account configuration.

For environment-dependent work, the development skill's doctor reports versions,
workspace provenance and build presence without building or launching the app.
Reuse its result until the environment changes. Build presence alone does not
prove that output matches the current source.

## Select checks from the change

- Documentation and Git maintenance: affected sources, links, refs and privacy checks.
- UI changes: affected renderer build, actual screenshots and focused interactions.
- Main/preload changes: rebuild Shell so it includes the updated editor backend.
- Document saving, authentication, IPC, engines or packaging: affected contracts,
  focused regressions and the complete pre-merge policy.

Use the repository's Playwright Electron helpers for isolated app verification.
Editors use WebContentsViews; find the correct page instead of assuming the first
page is the document. Use Computer Use for native dialogs and visible platform
behavior. Browser tests alone are not Electron product evidence.

Use scratch userData and synthetic documents. Mock AI and block unintended
external requests. Never inspect Codex/Claude login stores or repeat live AI
requests merely to validate UI. Do not change timeouts/assertions to hide failures.
On macOS, the documented Electron screencast issue can require `E2E_NO_VIDEO=1`;
this changes recording, not test assertions.

No additional MCP/plugin is required for ordinary source development. Add tools
only for a demonstrated missing capability, keep them isolated from product
dependencies and document source/license/revision before use.
