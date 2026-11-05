# Onyou Office development

Onyou Office is an independent IeumOffice fork, with GenOffice as its original base.
Keep the original authors, source acknowledgements and license notices intact.
The `docs/dodam` directory name is an existing internal documentation path; it does
not require a contributor to use the maintainer's accounts or local tools.

## Start here

- [Contributing](../../CONTRIBUTING.md): setup, tests and review expectations.
- [Codebase map](codebase/README.md): workspaces, shared execution paths and ownership.
- [Source-first preflight](SOURCE-FIRST.md): inspect existing sources before changes.
- [CI policy](CI-POLICY.md): proportional local checks and complete pre-merge coverage.
- [Tooling](DESKTOP-TOOLING.md): reproducible local development and isolated UI checks.
- [Editor boundaries](EDITOR-UI-BOUNDARIES.md): app UI versus document engines.
- [Upstream maintenance](UPSTREAM-INTEGRATION.md): accepted source and fork differences.
- [Brand assets](DESKTOP-BRAND-INTEGRATION.md): identity sources, generation and licensing.
- [Project policy](OPEN-SOURCE-DIRECTION.md): free desktop, Apache-2.0 and contributions.
- [Release preparation](../PUBLIC-RELEASE.md): what remains before distribution.

## Product boundaries

Retain the full inherited office feature set and internal `@genoffice/*`,
`GENOFFICE_*`, IPC and document-format identifiers. Keep source attribution
separate from app updates, support addresses and user-data namespaces.
Do not read another app's profiles or subscription credentials.

Product names, document-folder name and support address are defined in
[product.ts](../../packages/i18n/src/product.ts). Installed and development data
folders are distinct. Default documents use `onyouoffice`; existing files are not
renamed or moved automatically. Website/update/feedback endpoints remain
unconfigured until a separately approved distribution setup.

Private account bindings, browser profiles, local backups and one-off operational
records belong outside version control. Publish only synthetic reproduction
files, sanitized logs and screenshots relevant to the code under review.
