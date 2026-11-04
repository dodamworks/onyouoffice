# Upstream maintenance and fork scope

## Source lineage

GenOffice → IeumOffice → Onyou Office.

- [GenOffice](https://github.com/genspark-ai/genoffice): original office application.
- [IeumOffice](https://github.com/pblsketch/openoffice): the direct development base.
- Onyou Office: independent product identity and desktop experience.

The accepted IeumOffice baseline is
`a2948eecd1e2572aac2f0c43f6c89f081971d4d8`. The release-preparation branch also
selectively ports the PDF buffer/page-tree fix from
`88c0ff3f790e62aa95fa68680b1e03253f0464dc`. This is not a merge of the newest
upstream main. Verify the actual branch before describing either as released.

The document engines and most editing functionality come from upstream projects
and their dependencies. Onyou changes cover branding, installation/data
namespaces, Home/onboarding, optional nickname, common AI panels, projects,
Knowledge Vault and validation infrastructure. Preserve those inherited credits.

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
