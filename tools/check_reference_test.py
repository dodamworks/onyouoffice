"""Behavioral regressions for reference validation; never launch the application."""

import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('check_reference', Path(__file__).with_name('check-reference.py'))
CHECK = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(CHECK)


class ReferenceChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='onyou-reference-test-')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()

    def write(self, name, value):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(value.encode() if isinstance(value, str) else value)
        return path

    def git(self, *args):
        return subprocess.check_output(['git', '-c', 'user.name=Reference fixture',
            '-c', 'user.email=ci@example.invalid', '-c', 'commit.gpgSign=false',
            '-c', 'core.hooksPath=/dev/null', *args], cwd=self.root, stderr=subprocess.PIPE).decode().strip()

    def commit(self):
        self.git('add', '.')
        self.git('commit', '-m', 'fixture')
        return self.git('rev-parse', 'HEAD')

    def test_svg_rejects_active_content_and_broken_internal_resources(self):
        valid = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M0 0"/></svg>'
        CHECK.check_svg(valid.encode())
        for body in ['<script/>', '<foreignObject/>', '<image href="https://example.invalid/a.png"/>',
                     '<path onclick="x()"/>', '<use href="https://example.invalid/a.svg"/>',
                     '<path fill="url(#missing)"/>', '<style>@import "x";</style>']:
            with self.subTest(body=body), self.assertRaises(ValueError):
                CHECK.check_svg(valid.replace('<path d="M0 0"/>', body).encode())

    def test_json_rejects_duplicates_nonfinite_values_and_stale_digests(self):
        for text in ['{"x":1,"x":2}', '{"x":NaN}', '{']:
            with self.subTest(text=text), self.assertRaises(ValueError):
                CHECK.strict_json(text)
        self.write('docs/design/icon.txt', 'asset')
        p = self.write('docs/design/PROVENANCE.json', json.dumps({'asset_sha256': {'icon.txt': '0' * 64}}))
        with self.assertRaisesRegex(ValueError, 'digest mismatch'):
            CHECK.check_file(self.root, p)

    def test_links_ignore_examples_but_check_real_and_reference_style_targets(self):
        p = self.write('docs/guide.md', '[valid](target.md)\n[ref][id]\n[id]: target.md\n'
                       '```md\n[example](absent.md)\n```\n`[example](also-absent.md)`\n')
        self.write('docs/target.md', 'target')
        CHECK.check_links(self.root, p, {'docs/guide.md', 'docs/target.md'})
        p.write_text('[bad](missing.md)')
        with self.assertRaisesRegex(ValueError, 'missing tracked link'):
            CHECK.check_links(self.root, p, {'docs/guide.md'})
        p.write_text('[escape](../../outside.txt)')
        with self.assertRaisesRegex(ValueError, 'escapes repository'):
            CHECK.check_links(self.root, p, {'docs/guide.md'})

    def test_reference_requires_non_executable_regular_file(self):
        p = self.write('docs/guide.md', 'guide')
        p.chmod(0o755)
        with self.assertRaises(ValueError):
            CHECK.check_file(self.root, p)
        link = self.root / 'docs/link.md'
        link.symlink_to('guide.md')
        with self.assertRaises(ValueError):
            CHECK.check_file(self.root, link)

    def test_real_git_deletion_checks_unchanged_backlinks_and_checkout(self):
        self.git('init', '-b', 'main')
        self.write('docs/guide.md', '[asset](asset.svg)')
        p = self.write('docs/asset.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"/>')
        base = self.commit()
        p.unlink()
        head = self.commit()
        with self.assertRaisesRegex(ValueError, 'missing tracked link'):
            CHECK.validate(self.root, base, head)
        with self.assertRaisesRegex(ValueError, 'checkout'):
            CHECK.validate(self.root, base, base)

    def test_image_decoding_rejects_damage_and_extension_mismatch(self):
        from PIL import Image
        p = self.root / 'docs/image.png'
        p.parent.mkdir()
        Image.new('RGB', (8, 8), 'blue').save(p)
        CHECK.check_file(self.root, p)
        bad = self.write('docs/image.jpg', p.read_bytes())
        with self.assertRaisesRegex(ValueError, 'format'):
            CHECK.check_file(self.root, bad)
        p.write_bytes(p.read_bytes()[:35])
        with self.assertRaises(Exception):
            CHECK.check_file(self.root, p)

    def test_unchanged_provenance_detects_a_changed_asset(self):
        import hashlib
        self.git('init', '-b', 'main')
        p = self.write('docs/asset.txt', 'original')
        self.write('docs/PROVENANCE.json', json.dumps({'asset_sha256': {
            'asset.txt': hashlib.sha256(p.read_bytes()).hexdigest()}}))
        base = self.commit()
        p.write_text('changed')
        head = self.commit()
        with self.assertRaisesRegex(ValueError, 'digest mismatch'):
            CHECK.validate(self.root, base, head)

    def test_font_decoding_and_adjacent_notice(self):
        from fontTools.fontBuilder import FontBuilder
        from fontTools.pens.ttGlyphPen import TTGlyphPen
        builder = FontBuilder(1000, isTTF=True)
        builder.setupGlyphOrder(['.notdef', 'A'])
        builder.setupCharacterMap({65: 'A'})
        builder.setupGlyf({name: TTGlyphPen(None).glyph() for name in ['.notdef', 'A']})
        builder.setupHorizontalMetrics({name: (500, 0) for name in ['.notdef', 'A']})
        builder.setupHorizontalHeader(ascent=800, descent=-200)
        builder.setupNameTable({'familyName': 'Fixture', 'styleName': 'Regular'})
        builder.setupOS2(sTypoAscender=800, sTypoDescender=-200, usWinAscent=800, usWinDescent=200)
        builder.setupPost()
        path = self.root / 'docs/font.ttf'
        path.parent.mkdir()
        builder.save(path)
        with self.assertRaisesRegex(ValueError, 'notice'):
            CHECK.check_file(self.root, path)
        self.write('docs/LICENSE.txt', 'Test fixture notice')
        CHECK.check_file(self.root, path)
        path.write_bytes(b'not a font')
        with self.assertRaises(Exception):
            CHECK.check_file(self.root, path)

    def test_parent_relative_provenance_detects_changes_and_deletions(self):
        import hashlib
        self.git('init', '-b', 'main')
        p = self.write('docs/assets/icon.txt', 'original')
        self.write('docs/metadata/PROVENANCE.json', json.dumps({'asset_sha256': {
            '../assets/icon.txt': hashlib.sha256(p.read_bytes()).hexdigest()}}))
        base = self.commit()
        p.write_text('changed')
        head = self.commit()
        with self.assertRaisesRegex(ValueError, 'digest mismatch'):
            CHECK.validate(self.root, base, head)
        p.unlink()
        head = self.commit()
        with self.assertRaisesRegex(ValueError, 'missing'):
            CHECK.validate(self.root, base, head)


if __name__ == '__main__':
    unittest.main()
