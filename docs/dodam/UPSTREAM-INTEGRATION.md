# Upstream maintenance and fork scope

## Source lineage

GenOffice → IeumOffice → Onyou Office.

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

## Accept changes deliberately

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
