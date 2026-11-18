#!/bin/sh
# Onyou Office command line, installed without the desktop app.
#
#   sh packaging/cli/install.sh
#
# Flags (after `sh -s --` when piping):
#   --version <v>   release to install (default: the latest published release)
#   --prefix <dir>  where the files live (default: $XDG_DATA_HOME/onyouoffice-cli)
#   --bin <dir>     where the `onyouoffice` launcher goes (default: $XDG_BIN_HOME or ~/.local/bin)
#   --node <path>   use this Node 22+ instead of the one on PATH
#   --uninstall     remove the launcher and the installed files
#
# It writes only the two folders above and needs no root. When the machine has
# no Node 22, the official build from nodejs.org is downloaded, checked against
# nodejs.org's SHASUMS256.txt and unpacked under --prefix. No telemetry, no
# shell profile edits, no other program is touched.
set -eu

REPO=dodamworks/onyouoffice
NODE_VERSION=22.12.0
MARKER='# onyouoffice launcher (command-line install)'
INSTALL_MARKER=.onyouoffice-cli-managed
RELEASE_MARKER=.onyouoffice-cli-release

: "${HOME:?HOME is not set}"

VERSION=
PREFIX=${XDG_DATA_HOME:-$HOME/.local/share}/onyouoffice-cli
BIN=${XDG_BIN_HOME:-$HOME/.local/bin}
NODE_ARG=
UNINSTALL=

say() { printf '%s\n' "$*"; }
die() {
  printf 'install.sh: %s\n' "$*" >&2
  exit 1
}

usage() {
  cat <<'TEXT'
Onyou Office command line, installed without the desktop app.

  sh install.sh [--version <v>] [--prefix <dir>] [--bin <dir>] [--node <path>] [--uninstall]

  --version <v>   release to install (default: the latest published release)
  --prefix <dir>  where the files live (default: $XDG_DATA_HOME/onyouoffice-cli)
  --bin <dir>     where the onyouoffice launcher goes (default: ~/.local/bin)
  --node <path>   use this Node 22+ instead of the one on PATH
  --uninstall     remove the launcher and the installed files
TEXT
}

while [ $# -gt 0 ]; do
  case "$1" in
    --version) VERSION=${2:?--version needs a value}; shift 2 ;;
    --prefix) PREFIX=${2:?--prefix needs a value}; shift 2 ;;
    --bin) BIN=${2:?--bin needs a value}; shift 2 ;;
    --node) NODE_ARG=${2:?--node needs a value}; shift 2 ;;
    --uninstall) UNINSTALL=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) die "unknown argument: $1" ;;
  esac
done

# Store absolute paths in the launcher so its working directory does not matter.
absolute_path() {
  case "$1" in
    /*) printf '%s\n' "$1" ;;
    *) printf '%s/%s\n' "$PWD" "$1" ;;
  esac
}

newline='
'
case "$PREFIX$BIN$NODE_ARG" in
  *"$newline"*) die "installation paths must fit on one line" ;;
esac
PREFIX=$(absolute_path "$PREFIX")
BIN=$(absolute_path "$BIN")
launcher=$BIN/onyouoffice
launcher_prefix="# Onyou Office CLI prefix: $PREFIX"

is_our_launcher() {
  [ ! -L "$launcher" ] && [ -f "$launcher" ] &&
    grep -Fxq -e "$MARKER" "$launcher" &&
    grep -Fxq -e "$launcher_prefix" "$launcher"
}

is_managed_dir() { [ ! -L "$1" ] && [ -d "$1" ] && [ -f "$1/$2" ]; }
is_our_prefix() {
  is_managed_dir "$PREFIX" "$INSTALL_MARKER" &&
    grep -Fxq -e "$launcher" "$PREFIX/$INSTALL_MARKER"
}

if [ -n "$UNINSTALL" ]; then
  if is_our_launcher; then
    rm -f "$launcher"
    say "removed $launcher"
  elif [ -e "$launcher" ] || [ -L "$launcher" ]; then
    say "left $launcher alone: it was not installed for this prefix"
  fi
  if is_our_prefix; then
    for installed_release in "$PREFIX"/release-*; do
      if is_managed_dir "$installed_release" "$RELEASE_MARKER"; then
        rm -rf "$installed_release"
      fi
    done
    rm -f "$PREFIX/$INSTALL_MARKER"
    rmdir "$PREFIX" 2>/dev/null || say "left other files in $PREFIX"
  elif [ -e "$PREFIX" ] || [ -L "$PREFIX" ]; then
    say "left $PREFIX alone: it was not installed by this script"
  fi
  exit 0
fi

if [ -e "$PREFIX" ] || [ -L "$PREFIX" ]; then
  if ! is_our_prefix; then
    [ ! -L "$PREFIX" ] && [ -d "$PREFIX" ] && [ -z "$(ls -A "$PREFIX")" ] ||
      die "$PREFIX belongs to another program; pass an empty directory with --prefix"
  fi
fi

if [ -e "$launcher" ] || [ -L "$launcher" ]; then
  is_our_launcher || die "$launcher belongs to another installation; move it away first"
fi

validate_version() {
  case "$1" in
    *[!0-9.]*|'') die "invalid release version: $1" ;;
  esac
  printf '%s\n' "$1" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$' ||
    die "invalid release version: $1"
}
if [ -n "$VERSION" ]; then
  VERSION=${VERSION#v}
  validate_version "$VERSION"
fi

# --- platform -----------------------------------------------------------------

case "$(uname -s)" in
  Linux) os=linux ;;
  Darwin) os=darwin ;;
  *) die "unsupported operating system: $(uname -s)" ;;
esac
case "$(uname -m)" in
  x86_64|amd64) arch=x64 ;;
  aarch64|arm64) arch=arm64 ;;
  *) die "unsupported architecture: $(uname -m)" ;;
esac
[ "$os-$arch" = linux-x64 ] || die "this release ships a command-line build for Linux x64 only (this machine is $os-$arch)"

if command -v curl >/dev/null 2>&1; then
  fetch() { curl -fsSL "$1"; }
  download() { curl -fsSL "$1" -o "$2"; }
elif command -v wget >/dev/null 2>&1; then
  fetch() { wget -qO- "$1"; }
  download() { wget -qO "$2" "$1"; }
else
  die "curl or wget is required"
fi

sha256_of() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | awk '{print $1}'
  elif command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1" | awk '{print $1}'
  elif command -v openssl >/dev/null 2>&1; then openssl dgst -sha256 "$1" | awk '{print $NF}'
  else die "no sha256 tool (sha256sum, shasum or openssl)"
  fi
}

# verify <file> <shasums file>  — the sums file lists "<hex>  <name>"
verify() {
  name=$(basename "$1")
  expected=$(awk -v name="$name" '$2 == name { print $1 }' "$2")
  [ -n "$expected" ] || die "no checksum for $name"
  actual=$(sha256_of "$1")
  [ "$expected" = "$actual" ] || die "checksum mismatch for $name"
}

tmp=$(mktemp -d)
release_dir=
launcher_tmp=
cleanup() {
  rm -rf "$tmp"
  if [ -n "$release_dir" ]; then rm -rf "$release_dir"; fi
  if [ -n "$launcher_tmp" ]; then rm -f "$launcher_tmp"; fi
}
trap cleanup EXIT
trap 'exit 1' HUP INT TERM

# --- Node 22 ------------------------------------------------------------------

node_major() { "$1" -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0; }

node_bin=
bundled_runtime=
if [ -n "$NODE_ARG" ]; then
  [ -x "$NODE_ARG" ] || die "--node is not executable: $NODE_ARG"
  [ "$(node_major "$NODE_ARG")" -ge 22 ] || die "--node must be Node 22 or newer: $NODE_ARG"
  node_bin=$(absolute_path "$NODE_ARG")
elif command -v node >/dev/null 2>&1 && [ "$(node_major node)" -ge 22 ]; then
  node_bin=$(absolute_path "$(command -v node)")
fi

if [ -z "$node_bin" ]; then
  say "Node 22 or newer was not found; downloading Node v$NODE_VERSION from nodejs.org"
  base="https://nodejs.org/dist/v$NODE_VERSION"
  fetch "$base/SHASUMS256.txt" > "$tmp/node-SHASUMS256.txt"
  node_asset=node-v$NODE_VERSION-$os-$arch.tar.gz
  download "$base/$node_asset" "$tmp/$node_asset"
  verify "$tmp/$node_asset" "$tmp/node-SHASUMS256.txt"
  tar -xzf "$tmp/$node_asset" -C "$tmp"
  bundled_runtime="$tmp/node-v$NODE_VERSION-$os-$arch"
  node_bin=$bundled_runtime/bin/node
fi

"$node_bin" -e "" || die "Node at $node_bin does not run"

# --- the command line ---------------------------------------------------------

if [ -z "$VERSION" ]; then
  fetch "https://api.github.com/repos/$REPO/releases/latest" > "$tmp/latest.json" ||
    die "could not look up the latest release; pass --version to select one"
  VERSION=$("$node_bin" -p 'require(process.argv[1]).tag_name' "$tmp/latest.json") ||
    die "could not read the latest release tag; pass --version to select one"
  VERSION=${VERSION#v}
  validate_version "$VERSION"
fi

say "installing Onyou Office command line $VERSION"
asset="onyouoffice-cli_${VERSION}_${os}-${arch}.tar.gz"
base="https://github.com/$REPO/releases/download/v$VERSION"
download "$base/$asset" "$tmp/$asset"
download "$base/$asset.sha256" "$tmp/$asset.sha256"
verify "$tmp/$asset" "$tmp/$asset.sha256"

tar -xzf "$tmp/$asset" -C "$tmp"
[ -x "$tmp/onyouoffice-cli/cli/onyouoffice" ] || die "archive is missing its CLI launcher"
"$node_bin" "$tmp/onyouoffice-cli/cli/genoffice.cjs" --version ||
  die "the archived command did not run"
mkdir -p "$PREFIX" "$BIN"
printf '%s\n' "$launcher" > "$PREFIX/$INSTALL_MARKER"
release_dir=$(mktemp -d "$PREFIX/release-$VERSION.XXXXXX")
: > "$release_dir/$RELEASE_MARKER"
mv "$tmp/onyouoffice-cli" "$release_dir/app"
if [ -n "$bundled_runtime" ]; then
  mv "$bundled_runtime" "$release_dir/runtime"
  node_bin=$release_dir/runtime/bin/node
fi

# Quote paths as shell literals, including embedded apostrophes and dollar signs.
shell_quote() { printf "'%s'" "$(printf '%s' "$1" | sed "s/'/'\\\\''/g")"; }
launcher_tmp=$(mktemp "$BIN/.onyouoffice-launcher.XXXXXX")
{
  printf '%s\n' '#!/bin/sh' "$MARKER" "$launcher_prefix"
  printf 'exec %s %s "$@"\n' "$(shell_quote "$node_bin")" \
    "$(shell_quote "$release_dir/app/cli/genoffice.cjs")"
} > "$launcher_tmp"
chmod 755 "$launcher_tmp"
"$launcher_tmp" --version || die "the launcher did not run"

# Preserve the prior launcher and release until the staged launcher is verified.
# If publication is interrupted, uninstall can clean up the marked release.
release_dir=
mv -f "$launcher_tmp" "$launcher"

case ":$PATH:" in
  *":$BIN:"*) ;;
  *) say "Add $BIN to PATH for future shells: export PATH=$(shell_quote "$BIN"):\"\$PATH\"" ;;
esac

say "installed: $launcher"
