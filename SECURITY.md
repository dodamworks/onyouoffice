<!-- Modified by Onyou Office on 2026-11-12 for the Onyou Office fork. -->

# Onyou Office security policy

## Report privately

Send Onyou-specific security reports to **support@onyouoffice.com**. Include the affected
version or commit, platform, impact and minimal reproduction steps. Do not send
passwords, tokens, customer documents or an exploit containing private data.
Coordinate any sensitive attachments before sending them. Response and fix
schedules are not guaranteed.

Do not open a public issue or pull request disclosing an unpatched vulnerability.
This document does not claim that GitHub private vulnerability reporting is
enabled. Onyou is operated independently of IeumOffice and GenOffice; do not
forward confidential reports to upstream without coordinating disclosure.

## Scope and design

This app opens and edits files locally. AI providers, subscription programs and
optional external integrations have their own security and retention policies.
The current app does not operate an Onyou AI relay. A proposed future service is
not part of the present security or privacy promises.

The implementation uses Electron renderer isolation, typed IPC, guarded external
URLs and format-specific protections. These controls are described in
[docs/security.md](docs/security.md) and the affected module guides; they are not
a claim that every vulnerability has been ruled out. File fidelity, document
masking bypasses, unauthorized file access, unsafe AI tool execution and silent
changes to a paid provider are relevant reports.

Claude/Codex connections use the vendors' unmodified programs. The app must not
read or copy those programs' credential stores. Direct ChatGPT connection is a
separate app-owned browser OAuth flow. It currently has a known consent-stage
failure; see [known issues](docs/tracking/findings.md). An account appearing
connected is not sufficient proof that a request works.

Credentials supplied to the app follow platform-specific storage behavior.
Do not assume encryption merely because a build is signed. In particular,
macOS and Linux without a usable keyring have plaintext-storage limitations
in the inherited implementation. The detailed data flow and local storage
inventory are in [PRIVACY.md](PRIVACY.md).

## Downloads and provenance

Official Onyou installers are published only on
[GitHub Releases](https://github.com/dodamworks/onyouoffice/releases) of this
repository and linked from [onyouoffice.com](https://onyouoffice.com). Windows
installers are unsigned. macOS builds are signed ad hoc and are not notarized.
There is no automatic update feed; updates are manual.

Every release includes `SHA256SUMS.txt` and `BUILD-PROVENANCE.json`. To check a
download, compute its SHA-256 (`certutil -hashfile <file> SHA256` on Windows,
`shasum -a 256 <file>` on macOS, `sha256sum <file>` on Linux) and compare it with
the line for that file in `SHA256SUMS.txt`. `BUILD-PROVENANCE.json` records the
source commit, the build runs and the files they produced for that tag.
Do not treat IeumOffice/GenOffice artifacts as Onyou binaries, or apply another
repository's attestation instructions to an Onyou download.

## Attribution and rights reports

This policy is adapted from the original project guidance while preserving its
implementation boundaries. [IeumOffice](https://github.com/pblsketch/ieumoffice)
and [GenOffice](README.md#license-and-origins) remain the source
projects. Their copyright notices and contact details remain in [NOTICE](NOTICE).
For Onyou-specific rights questions, use support@onyouoffice.com.
