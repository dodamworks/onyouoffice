<!-- Modified by Onyou Office on 2026-11-04. -->

<p align="center">
  <img src="../../../apps/shell/build/brand/app-icon.svg" alt="Onyou Office" width="88" height="88">
</p>

<h1 align="center">Onyou Office</h1>

<p align="center"><strong>Pejabat anda bersama ejen AI.</strong></p>

<p align="center">
  <a href="../../../LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-2456FF" alt="License: Apache-2.0"></a>
  <a href="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml"><img src="https://github.com/dodamworks/onyouoffice/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI on main"></a>
  <a href="https://github.com/dodamworks/onyouoffice/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/onyouoffice?style=flat&amp;label=GitHub%20stars&amp;color=2456FF" alt="GitHub stars"></a>
</p>

Buka dokumen, nyatakan perubahan yang diingini dan teruskan dalam tetingkap yang sama. Onyou Office menggabungkan penyunting dokumen dengan ejen AI pada desktop. Hasilkan draf dan semakan dengan AI atau sunting sendiri. Aplikasi ini percuma dan sumber terbuka; AI adalah pilihan.

<details>
<summary>Pilih bahasa · 21 bahasa</summary>

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · [Bahasa Indonesia](id.md) · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · **Bahasa Melayu** · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md) <!-- lang-switcher -->

</details>

## Dokumen dalam satu ruang kerja

- Sunting rajah draw.io dan import fail Visio (.vsdx) sebagai rajah baharu secara setempat.
- Cipta dan sunting dokumen, hamparan, persembahan dan Hangul (HWP/HWPX). PDF, Markdown, HTML, peta minda dan EPUB turut disokong. Keupayaan penyuntingan dan penukaran berbeza mengikut format.
- Minta perubahan melalui pembantu AI, tanya tentang dokumen terpilih dalam Knowledge Vault dan himpunkan arahan, ingatan, fail serta perbualan dalam projek.
- 21 bahasa antara muka, tema cerah dan gelap serta saiz teks sembang AI boleh laras. Onyou Office memperkemas pengenalan, laman utama, panel AI, projek dan Knowledge Vault, dengan jenama serta laluan pemasangan dan data tersendiri.

## Bermula

Ini versi pembangunan yang dibina daripada kod sumber. Pemasang rasmi dan suapan kemas kini belum tersedia. Konfigurasi Windows, macOS dan Linux tersedia; sasaran yang disahkan akan diumumkan berasingan. Sediakan Node.js 24, npm, Rust (cargo) dan alat binaan natif sistem anda.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Buka fail atau cipta dokumen di laman utama. Untuk AI, pilih sambungan dalam **Tetapan → AI**, kemudian masukkan permintaan dalam pembantu dokumen.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, kos dan data

Penyuntingan tidak memerlukan akaun AI. Langganan, caj API dan had penggunaan mengikut syarat penyedia. Codex, Claude, log masuk terus ChatGPT, OpenRouter, Gemini, kunci API dan AI setempat mempunyai syarat serta ketersediaan berbeza. Kandungan berkaitan, lampiran dan perbualan dihantar kepada penyedia pilihan. Versi pembangunan dan terpasang menggunakan folder data berasingan.

[Privacy](../../../PRIVACY.md)

Soalan dan perbualan susulan Knowledge Vault telah disahkan melalui program rasmi Codex. Log masuk terus ChatGPT masih mengalami ralat persetujuan penyedia. Paparan serupa dan keserasian penuh dengan aplikasi lain tidak dijamin.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Bantuan dan sumbangan

Laporan pepijat, cadangan, terjemahan dan kod dialu-alukan. Gunakan contoh sintetik; jangan siarkan dokumen peribadi, kunci atau maklumat akaun. Pertanyaan lain: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Lesen dan asal

Onyou Office ialah fork bebas IeumOffice, yang berasaskan GenOffice. Enjin dokumen dan banyak fungsi datang daripada projek tersebut, rhwp dan penyumbang sumber terbuka. Maklumat sumber serta kredit pengarang asal dikekalkan; kami tidak mendakwa semua fungsi warisan sebagai ciptaan sendiri. Kod menggunakan Apache-2.0; komponen pihak ketiga mengekalkan syarat masing-masing. Hak tanda dagangan berasingan. Tiada dakwaan hubungan atau sokongan daripada projek asal atau penyedia.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
