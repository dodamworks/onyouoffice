<!-- Modified by Onyou Office on 2026-11-04 for the Onyou Office fork. -->

# Onyou Office

[한국어](README.md) · **English**

A free desktop office app for opening and editing documents, with optional AI
assistance. It brings documents, spreadsheets, presentations, PDF, Hangul
(HWP/HWPX), Markdown, HTML, mind maps and EPUB into one app. Editing and conversion
capabilities vary by format.

Onyou Office is an independent fork of
[IeumOffice](https://github.com/pblsketch/openoffice), itself based on
[GenOffice](https://github.com/genspark-ai/genoffice). Its document engines and
much of its editing functionality come from those projects and other open-source
contributors. Onyou changes include product identity, onboarding and Home,
shared AI panels, projects and Knowledge Vault, and separate installation and
storage namespaces. The [comparison record](docs/dodam/UPSTREAM-INTEGRATION.md)
distinguishes inherited functionality from our changes.

## Source and installers

This is a development version that you can build and run from source. See
[Run from source](#run-from-source) for prerequisites and commands.

Official installers and an update feed are not available yet. Build configurations
exist for Windows, macOS and Linux. Release targets, architectures and installation
instructions will be announced separately in this repository after installation
verification.

## AI connections and cost

- The Onyou Office desktop app is free. Document editing does not require AI.
- AI provider subscriptions, pricing and usage limits are separate and follow
  each provider's terms.
- Choose a connection in Settings → AI. Existing OpenRouter, Gemini, API-key and
  local AI paths remain available in the implementation. Provider free tiers can change.
- Knowledge Vault questions and follow-up conversations were verified through
  the official Codex program. Direct ChatGPT login still encounters a provider
  consent error and is not presented as a verified connection. See
  [known issues](docs/tracking/findings.md).
- Using AI sends relevant document content, attachments and conversation to the
  selected provider. Read the [privacy notice](PRIVACY.md) for scope and limitations.

## Run from source

Use Node.js 24, npm and the Rust toolchain (`cargo`). Native builds also require
platform-specific tools. Keep the existing lockfile and internal package names.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Building and mocked-provider tests do not require an AI account. Development runs and
installed builds use separate data folders. The default document directory is
`onyouoffice`; existing user documents are not moved or renamed automatically.

Build all workspaces before the first run to prepare editor main/preload code and
native tools. Once the app opens, use Home to open a file or create a document.
For AI assistance, choose a connection in Settings → AI, then enter a request in
the document's AI panel.

- [Contributing and validation](CONTRIBUTING.md)
- [Architecture](docs/architecture.md)
- [Security reporting](SECURITY.md)
- [Development tooling](docs/dodam/DESKTOP-TOOLING.md)
- [Publication and distribution status](docs/PUBLIC-RELEASE.md)

## Reports and contributions

Use [this repository's Issues](https://github.com/dodamworks/onyouoffice/issues)
and pull requests for reproducible bugs, documentation, translations and code.
For other questions, contact `support@onyouoffice.com`. Response and
resolution times are not guaranteed. Use synthetic examples instead of personal
documents; never post keys or account details publicly. Report security issues
[privately](SECURITY.md).

Community review helps maintenance; maintainers remain responsible for release
validation and disclosing known limitations. See [CONTRIBUTING.md](CONTRIBUTING.md)
for the development and upstream integration workflow.

## License and acknowledgement

Project source is under the [Apache License 2.0](LICENSE). Third-party code,
fonts, artwork and tools with separate notices retain their own terms.
Keep [NOTICE](NOTICE), [contributor credits](CONTRIBUTORS.md) and the third-party
notices distributed with installers.

We acknowledge IeumOffice, GenOffice, rhwp and their open-source contributors.
The original introductions remain available in
[IeumOffice](https://github.com/pblsketch/openoffice#readme) and
[GenOffice](https://github.com/genspark-ai/genoffice#readme). This project claims
no affiliation or endorsement by those projects or AI/file-format vendors.

Apache-2.0 permits reuse, modification and commercial distribution; it does not
require recipients to publish their modifications. Source licensing does not
grant rights to Onyou or upstream trademarks. See [brand usage](TRADEMARKS.md).
