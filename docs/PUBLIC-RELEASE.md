# Source publication and installer releases

Onyou Office provides source code and installers through
[GitHub Releases](https://github.com/dodamworks/onyouoffice/releases/latest).
The initial 0.12.10 release targets Windows x64, macOS Apple Silicon and Intel
(beta), and Linux x64 (beta), including the standalone Linux command line.

Windows installers are unsigned. macOS builds are signed ad hoc and are not
notarized. Updates are manual for this first release; no upstream update feed
is used. The release assets and their recorded build results define the
actually available downloads. Source publication and installer distribution
remain separate operations for future releases.

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
