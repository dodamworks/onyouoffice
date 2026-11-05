# Source history and attribution

The public Onyou Office Git history starts with one source snapshot. The initial
commit imports an existing application and our refinements; it does not mean that
Onyou Office authored all of that code. Earlier development history is available
in the linked upstream repositories rather than copied into this main branch.

| Source                                                       | Revision and scope                                                                                                                      |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| [GenOffice](../dodam/UPSTREAM-INTEGRATION.md#source-lineage) | Original office application, inherited through IeumOffice                                                                               |
| [IeumOffice](https://github.com/pblsketch/openoffice)        | Baseline `a2948eecd1e2572aac2f0c43f6c89f081971d4d8`, with 41 selected source changes through `9950706e3ff427198ba91f0f2f89b62a19ddc357` |
| rhwp                                                         | Pinned engine and carried patches recorded in `vendor/rhwp-core`                                                                        |
| Onyou Office                                                 | Product identity, desktop refinements and integration work described below                                                              |

Upstream copyright, author credits, LICENSE, NOTICE and applicable component
notices remain in the source. New upstream updates record their source revisions
and are reviewed against the local product changes. Commit counts are not feature
counts or a measure of original authorship.

The previous Onyou READMEs were already separate introductions, rather than copies
of the full IeumOffice README. They removed upstream-specific personal history,
download totals and installer instructions. This revision puts the document/AI
workflow first, uses English as the homepage and supplies 20 localized introductions.
Attribution remains in every version and in NOTICE.

Onyou-specific work includes branding and independent app/data namespaces,
onboarding/Home refinements, shared AI-panel presentation and accessibility controls,
project/Knowledge Vault workflow refinements and validation/CI improvements.
The document engines and much of the editing functionality come from the upstream
projects, not from these changes. See the maintained
[integration record](../dodam/UPSTREAM-INTEGRATION.md).

The Apache-2.0 project license remains in the root LICENSE. The Unicode data notice
is kept unchanged under [third-party notices](../third-party/LICENSE-UNICODE.txt).
Installers continue to include it as `LICENSE-UNICODE.txt`, and the full text is
also included by the third-party-notice generator. This separates the project's
license from a component's license without removing that component's terms.
GitHub detects repository licenses automatically; its cached display may take time
to update. The source license texts remain authoritative.
