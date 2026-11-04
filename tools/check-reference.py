"""Validate non-runtime reference files without installing the office application."""

import argparse
import hashlib
import json
import math
from pathlib import Path, PurePosixPath
import re
import subprocess
import warnings
import xml.etree.ElementTree as ET

POLICY = json.loads(Path(__file__).with_name('ci-reference-policy.json').read_text())
MAX_BYTES = 32 * 1024 * 1024
TEXT = {'.md', '.txt', '.json', '.svg'}
IMAGES = {'.png': 'PNG', '.jpg': 'JPEG', '.jpeg': 'JPEG', '.webp': 'WEBP'}
FONTS = {'.woff', '.woff2', '.ttf', '.otf'}


def is_reference(path):
    p = PurePosixPath(path)
    return path in POLICY['root_documents'] or (
        any(path.startswith(root) for root in POLICY['roots'])
        and p.suffix in POLICY['extensions']
    )


def git(root, *args):
    return subprocess.check_output(['git', *args], cwd=root).decode('utf-8')


def local_target(root, source, href):
    from urllib.parse import unquote, urlsplit
    if href.startswith('#') or re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', href):
        return None
    value = urlsplit(href)
    if value.netloc or not value.path:
        return None
    raw = unquote(value.path)
    target = root / raw.lstrip('/') if raw.startswith('/') else source.parent / raw
    resolved = target.resolve()
    if not resolved.is_relative_to(root):
        raise ValueError(f'{source.relative_to(root)}: link escapes repository: {href}')
    return resolved


def markdown_links(text):
    # Code samples are not rendered links. Definitions cover reference-style links too.
    text = re.sub(r'^\s*(```|~~~).*?^\s*\1\s*$', '', text, flags=re.M | re.S)
    text = re.sub(r'`+[^`\n]*`+', '', text)
    for match in re.finditer(r'!?\[[^\]\n]*\]\(\s*(<[^>\n]+>|[^\s)]+)', text):
        yield match[1].strip('<>')
    for match in re.finditer(r'^\s{0,3}\[[^\]\n]+\]:\s*(<[^>\n]+>|\S+)', text, re.M):
        yield match[1].strip('<>')


def check_links(root, path, tracked, removed=None):
    for href in markdown_links(path.read_text(encoding='utf-8')):
        target = local_target(root, path, href)
        if target is None:
            continue
        relative = target.relative_to(root).as_posix()
        # For unchanged documents, inspect only links affected by deletions.
        if removed is not None and not any(
            name == relative or name.startswith(relative.rstrip('/') + '/') for name in removed
        ):
            continue
        known = relative in tracked or any(name.startswith(relative.rstrip('/') + '/') for name in tracked)
        if not target.exists() or not known:
            raise ValueError(f'{path.relative_to(root)}: missing tracked link target: {href}')


def check_svg(data):
    if re.search(br'<!DOCTYPE|<!ENTITY|<\?xml-stylesheet', data, re.I):
        raise ValueError('SVG declarations or external stylesheets are unsupported')
    tree = ET.fromstring(data)
    if tree.tag != '{http://www.w3.org/2000/svg}svg':
        raise ValueError('expected an SVG root')
    view = [float(v) for v in re.split(r'[\s,]+', tree.attrib.get('viewBox', '').strip()) if v]
    if len(view) != 4 or not all(math.isfinite(x) for x in view) or min(view[2:]) <= 0:
        raise ValueError('SVG requires a finite, positive viewBox')
    safe = {'svg', 'g', 'defs', 'title', 'desc', 'path', 'rect', 'circle', 'ellipse',
            'line', 'polyline', 'polygon', 'text', 'tspan', 'linearGradient',
            'radialGradient', 'stop', 'clipPath', 'mask', 'use', 'symbol'}
    ids = {e.attrib['id'] for e in tree.iter() if 'id' in e.attrib}
    for element in tree.iter():
        if element.tag.removeprefix('{http://www.w3.org/2000/svg}') not in safe:
            raise ValueError(f'unsupported active or non-vector SVG element: {element.tag}')
        for key, value in element.attrib.items():
            key = key.rsplit('}', 1)[-1].lower()
            if key.startswith('on') or key in {'src', 'base'}:
                raise ValueError(f'active SVG attribute: {key}')
            if key == 'href' and (not value.startswith('#') or value[1:] not in ids):
                raise ValueError('SVG href must target an internal ID')
            if key == 'style' and re.search(r'[@\\]', value):
                raise ValueError('unsupported SVG CSS escape/import')
            for url in re.findall(r'url\(([^)]*)\)', value, re.I):
                url = url.strip(' \t\"\'')
                if not url.startswith('#') or url[1:] not in ids:
                    raise ValueError('SVG URL must target an internal ID')


def strict_json(text):
    def pairs(items):
        result = {}
        for key, value in items:
            if key in result:
                raise ValueError(f'duplicate JSON key: {key}')
            result[key] = value
        return result

    def constant(value):
        raise ValueError(f'non-finite JSON value: {value}')
    return json.loads(text, object_pairs_hook=pairs, parse_constant=constant)


def check_file(root, path):
    if path.is_symlink() or not path.is_file() or path.stat().st_mode & 0o111:
        raise ValueError('reference files must be regular, non-executable files')
    if not 0 < path.stat().st_size <= MAX_BYTES:
        raise ValueError('empty or oversized reference file')
    ext = path.suffix
    if ext not in POLICY['extensions']:
        raise ValueError('unsupported reference format')
    data = path.read_bytes()
    if ext in TEXT:
        text = data.decode('utf-8')
        if '\0' in text:
            raise ValueError('NUL in reference text')
        if ext == '.json':
            obj = strict_json(text)
            if isinstance(obj, dict) and 'asset_sha256' in obj:
                if not isinstance(obj['asset_sha256'], dict):
                    raise ValueError('asset_sha256 must be a mapping')
                for name, digest in obj['asset_sha256'].items():
                    asset = (path.parent / name).resolve()
                    if not asset.is_relative_to(root) or not asset.is_file():
                        raise ValueError(f'provenance asset missing or outside repository: {name}')
                    if not isinstance(digest, str) or not re.fullmatch('[a-f0-9]{64}', digest):
                        raise ValueError(f'invalid SHA-256: {name}')
                    if hashlib.sha256(asset.read_bytes()).hexdigest() != digest:
                        raise ValueError(f'provenance digest mismatch: {name}')
        elif ext == '.svg':
            check_svg(data)
    elif ext in IMAGES:
        from PIL import Image
        Image.MAX_IMAGE_PIXELS = 16_000_000
        with warnings.catch_warnings():
            warnings.simplefilter('error', Image.DecompressionBombWarning)
            with Image.open(path) as image:
                if image.format != IMAGES[ext]:
                    raise ValueError('image format disagrees with extension')
                image.verify()
            with Image.open(path) as image:
                if getattr(image, 'n_frames', 1) > 120:
                    raise ValueError('too many image frames')
                for frame in range(getattr(image, 'n_frames', 1)):
                    image.seek(frame)
                    image.load()
    elif ext in FONTS:
        from fontTools.ttLib import TTFont
        if ext == '.woff2' and (data[:4] != b'wOF2' or int.from_bytes(data[16:20], 'big') > MAX_BYTES):
            raise ValueError('invalid or oversized WOFF2')
        with TTFont(path, lazy=False, ignoreDecompileErrors=False) as font:
            font.ensureDecompiled()
            if not font.getBestCmap() or not font.getGlyphOrder():
                raise ValueError('font has no character map or glyphs')
        notices = [p for p in path.parent.iterdir()
                   if p.is_file() and not p.is_symlink() and p.stat().st_size > 0 and p.suffix.lower() in {'.txt', '.md'}
                   and re.search('license|ofl|notice', p.name, re.I)]
        if not notices:
            raise ValueError('reference font requires an adjacent license/notice')


def validate(root, base, head):
    root = root.resolve()
    if git(root, 'rev-parse', 'HEAD').strip() != head:
        raise ValueError('checkout does not match classified revision')
    paths = git(root, 'diff', '--name-only', '--no-renames', '-z', base, head, '--').split('\0')
    tracked = set(git(root, 'ls-files', '-z').split('\0')) - {''}
    changed = {p for p in paths if p and is_reference(p)}
    removed = {p for p in changed if p not in tracked}
    for name in sorted(changed - removed):
        path = root / name
        check_file(root, path)
        if path.suffix == '.md':
            check_links(root, path, tracked)
    # Check surviving documents when their linked file/directory was removed.
    if removed:
        for name in sorted(tracked - changed):
            if is_reference(name) and name.endswith('.md'):
                check_links(root, root / name, tracked, removed)
    # A changed asset must not leave an unchanged provenance manifest stale.
    for name in sorted(tracked - changed):
        if is_reference(name) and name.endswith('.json'):
            data = strict_json((root / name).read_text(encoding='utf-8'))
            if isinstance(data, dict) and isinstance(data.get('asset_sha256'), dict) and any(
                ((root / name).parent / asset).resolve().relative_to(root).as_posix() in changed
                for asset in data['asset_sha256']
            ):
                check_file(root, root / name)
        if is_reference(name) and PurePosixPath(name).suffix in FONTS and any(
            PurePosixPath(item).parent == PurePosixPath(name).parent for item in changed
        ):
            check_file(root, root / name)
    print(json.dumps({'reference_files_changed': len(changed), 'removed': len(removed), 'result': 'passed'}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', required=True)
    parser.add_argument('--head', required=True)
    args = parser.parse_args()
    if not all(re.fullmatch('[a-f0-9]{40}|[a-f0-9]{64}', value) for value in [args.base, args.head]):
        parser.error('base and head must be full commit IDs')
    validate(Path.cwd(), args.base, args.head)
