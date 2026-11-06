# Security maintenance

The November 6 source update reviews dependency and static-analysis alerts
against actual application, CLI, build and maintainer-tool entry points.
An alert is evidence to investigate; a clean dependency database result does
not certify all source code or every possible exploit.

## Dependency changes

- Update the Electron 43 runtime to the patched 43.8 series.
- Update DOMPurify, Zod, Undici 6/7, Hono and its Node adapter, body-parser,
  qs, fast-uri and ip-address within their supported major versions.
- Update the build-time node-forge dependency. Use patched minimatch 11 only
  where the affected newer major versions were used; keep legacy minimatch
  3/5 consumers on their compatible, unaffected branches.
- Pin image-size 2.1 for the vulnerable transitive image parser. PptxGenJS's
  distributed runtime does not import that dependency; preserve generation
  and image regressions rather than downgrading the presentation library.
- Update CI-only Pillow to 13.0 and Brotli to 1.2.1 with hash-pinned CPython
  3.12 Linux wheels. These validators are not application dependencies, but
  CI also processes repository assets and needs maintained parsers.

Keep unrelated dependency versions pinned. Validate the exact lockfile with
`npm ci`, dependency audit, license checks and the complete product CI plan.
A current advisory database can differ from an earlier alert snapshot.

## Python static-analysis scope

The initial Python alerts concern local maintainer CLIs, fixture/font generators,
the release-readiness helper and historical Flatpak packaging. Supported Onyou
installers do not ship or call these scripts with document or network input.

The readiness helper resolves candidates to an exact Git root, constrains
private evidence to the ignored review directory, invokes a trusted executable
with an argument array without a shell, and denies network during inspection.
The comparison/font/fixture tools intentionally accept operator-selected local
paths; the comparison regex is explicitly supplied by that operator. Flatpak
extraction uses Python's `data` filter and is outside the supported installer
release workflows. This assessment is limited to the inspected entry points;
it does not grant permission to run untrusted scripts or archives.

Retain the alerts and private assessment evidence unless an individual finding
has a justified disposition. Never suppress a rule or weaken a check merely to
obtain a passing result. Reassess changed callers and new scan findings before
release. Local general/security review, GitHub CI, secret scanning and push
protection remain independent layers.

## Reproduced input-processing delays

Short malformed inputs reproduced unbounded regular-expression backtracking in
relationship DOCTYPE removal, ODT SVG header sniffing and font style-suffix
recognition. Replace the ambiguous repetitions with single-pass scanning while
preserving ordinary relationship interpretation, SVG detection and family grouping.
Regressions execute the real parsers in a time-limited subprocess, retain normal
input expectations and check that relationship archive bytes remain unchanged.
Other static-analysis findings still require entry-point and contract review;
these fixes are not a claim that every scanner warning is a confirmed exploit.
