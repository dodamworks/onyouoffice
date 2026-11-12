# Release status

Onyou Office publishes source code and installers on
[GitHub Releases](https://github.com/dodamworks/onyouoffice/releases/latest).
Each release targets Windows x64, macOS Apple Silicon and Intel (beta), and
Linux x64 (beta: AppImage, DEB, RPM), plus the standalone Linux command line.

Windows installers are unsigned. macOS builds are signed ad hoc and are not
notarized. Your operating system may show an installation warning, and managed
devices may block installation. There is no automatic update feed and no
upstream update feed is used; updates are manual downloads. Each release
carries `SHA256SUMS.txt` and `BUILD-PROVENANCE.json`; see
[SECURITY.md](../SECURITY.md#downloads-and-provenance) for how to check a download.
The release assets define the downloads that are actually available.

The rest of this page is the maintainers' release checklist.

## Independent product versions

The independent Onyou Office release series starts at **1.0.0**. The source app
version and its lockfile entry use the same number. Published downloads are
identified by their actual release tag; changing the source version does not
publish new installers.

Routine maintenance takes the next unused Onyou patch version. Onyou feature
releases may advance the minor version after an explicit release decision.
Upstream release numbers do not determine Onyou versions: the accepted upstream
source commit and observed upstream release are tracked separately in the
[integration record](dodam/UPSTREAM-INTEGRATION.md).
Existing published 0.x tags, release records and installer files remain unchanged.

## Before making the source public

- Review the final source/ref range, README, license and upstream acknowledgements.
- Confirm that private profiles, local paths, keys, personal documents/photos and
  internal operational records are absent from the material being published.
  Review embedded document media and metadata, not just filename extensions.
- Run the checks and review required by the [CI policy](dodam/CI-POLICY.md) for
  the final change scope. Reuse evidence only when its source inputs and scope
  still match.
- Publish supported formats and known limitations accurately. Direct ChatGPT
  consent remains a known issue; Codex verification does not certify that route.
- Confirm the product support address receives mail and can reply using the
  intended product identity. Alias creation is not a delivery test.

## Before distributing installers

- Choose and verify supported OS/architectures and signing/notarization.
- Build from the final sanitized source in a fresh isolated environment. Do not reuse
  old local `out`, `dist` or native `target` outputs after identity/privacy cleanup.
  Inspect the resulting package, including binary strings, for personal home paths,
  stale account/contact details and unrelated screenshots. Remap native compiler
  source paths where necessary, and verify the current product contact in the app.
- Validate clean installation, opening/editing/saving/reopening representative
  documents, AI connection failures, updates and removal with isolated profiles.
- Generate/check all shipped third-party notices, fonts and bundled components.
- Configure the actual download/update destinations and publish matching release
  notes. Do not point users to upstream binaries as Onyou installers.

The technical source lineage and accepted revisions are in
[upstream maintenance](dodam/UPSTREAM-INTEGRATION.md). File/AI data behavior is
in [PRIVACY.md](../PRIVACY.md); confidential reports go through
[SECURITY.md](../SECURITY.md). Publication and distribution require a separate
explicit decision after the final preparation/review results.
