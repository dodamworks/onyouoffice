<!-- Modified by Onyou Office on 2026-11-04. -->

# Onyou Office

**Ruang kerja Anda bersama agen AI.**

Buka dokumen, jelaskan perubahan yang diinginkan, lalu lanjutkan dalam jendela yang sama. Onyou Office menyatukan editor dokumen dan agen AI di desktop. Buat draf dan revisi dengan AI atau edit sendiri. Aplikasi ini gratis dan sumber terbuka; AI bersifat opsional.

[English](../../../README.md) · [العربية](ar.md) · [Čeština](cs.md) · [Deutsch](de.md) · [Español](es.md) · [Français](fr.md) · [עברית](he.md) · [हिन्दी](hi.md) · **Bahasa Indonesia** · [Italiano](it.md) · [日本語](ja.md) · [한국어](ko.md) · [Bahasa Melayu](ms.md) · [Nederlands](nl.md) · [Polski](pl.md) · [Português](pt.md) · [Русский](ru.md) · [ไทย](th.md) · [Tiếng Việt](vi.md) · [简体中文](zh.md) · [繁體中文](zh-TW.md)

## Satu tempat untuk dokumen Anda

- Buat dan edit dokumen, spreadsheet, presentasi, dan Hangul (HWP/HWPX). PDF, Markdown, HTML, peta pikiran, dan EPUB juga didukung. Kemampuan edit dan konversi berbeda menurut format.
- Minta perubahan melalui asisten AI, ajukan pertanyaan tentang dokumen terpilih di Knowledge Vault, dan kumpulkan instruksi, memori, berkas, serta percakapan dalam proyek.
- 21 bahasa antarmuka, tema terang dan gelap, serta ukuran teks chat AI yang dapat diatur. Onyou Office memperbarui pengenalan awal, Beranda, panel AI, proyek, dan Knowledge Vault, dengan merek serta jalur instalasi dan data sendiri.

## Mulai menggunakan

Ini versi pengembangan yang dibangun dari kode sumber. Installer resmi dan feed pembaruan belum tersedia. Konfigurasi build Windows, macOS, dan Linux tersedia; target terverifikasi akan diumumkan terpisah. Siapkan Node.js 24, npm, Rust (cargo), dan alat build native sistem Anda.

```sh
git clone https://github.com/dodamworks/onyouoffice.git
cd onyouoffice
npm ci
npm run fixtures
npm run build:all
npm run dev
```

Buka berkas atau buat dokumen dari Beranda. Untuk AI, pilih koneksi di **Pengaturan → AI**, lalu masukkan permintaan pada asisten dokumen.

[CONTRIBUTING](../../../CONTRIBUTING.md) · [Architecture](../../architecture.md)

## AI, biaya, dan data

Pengeditan tidak memerlukan akun AI. Langganan, biaya API, dan batas penggunaan mengikuti penyedia. Codex, Claude, login ChatGPT langsung, OpenRouter, Gemini, kunci API, dan AI lokal memiliki syarat dan ketersediaan berbeda. Konten dokumen yang relevan, lampiran, dan percakapan dikirim ke penyedia terpilih. Versi pengembangan dan terpasang memakai folder data terpisah.

[Privacy](../../../PRIVACY.md)

Pertanyaan dan percakapan lanjutan Knowledge Vault telah diverifikasi melalui program resmi Codex. Login langsung ChatGPT masih mengalami kesalahan persetujuan penyedia. Tampilan identik dan kompatibilitas penuh dengan aplikasi lain tidak dijamin.

[Known issues](../../tracking/findings.md) · [Release status](../../PUBLIC-RELEASE.md)

## Bantuan dan kontribusi

Laporan bug, saran, terjemahan, dan kode sangat diterima. Gunakan contoh sintetis; jangan unggah dokumen pribadi, kunci, atau detail akun. Pertanyaan lain: **support@onyouoffice.com**.

[Issues](https://github.com/dodamworks/onyouoffice/issues) · [Pull requests](https://github.com/dodamworks/onyouoffice/pulls) · [Security](../../../SECURITY.md)

## Lisensi dan asal

Onyou Office adalah fork independen IeumOffice, yang berbasis GenOffice. Mesin dokumen dan banyak fitur berasal dari proyek tersebut, rhwp, dan kontributor sumber terbuka. Riwayat dan penulis asli dipertahankan; kami tidak mengklaim semua fitur warisan sebagai karya sendiri. Kode memakai Apache-2.0; komponen pihak ketiga mempertahankan syarat masing-masing. Hak merek terpisah. Tidak ada klaim afiliasi atau dukungan proyek asal maupun penyedia.

[IeumOffice](https://github.com/pblsketch/openoffice) → [GenOffice](https://github.com/genspark-ai/genoffice)

[Apache-2.0](../../../LICENSE) · [NOTICE](../../../NOTICE) · [Contributors](../../../CONTRIBUTORS.md) · [Trademarks](../../../TRADEMARKS.md) · [Source history](../SOURCE-HISTORY.md)
