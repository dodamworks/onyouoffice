<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Memasang Onyou Office

[halaman Rilis](https://github.com/dodamworks/onyouoffice/releases/latest)

## Pilih berkas untuk komputer Anda

| Platform                                 | Kebutuhan                                         | Berkas                             |
| ---------------------------------------- | ------------------------------------------------- | ---------------------------------- |
| **Windows**                              | Windows 10 atau lebih baru, Intel/AMD 64-bit      | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon            | macOS 12 atau lebih baru, chip M1 atau lebih baru | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                    | macOS 12 atau lebih baru, prosesor Intel          | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, distribusi apa pun     | 64-bit (x86_64); glibc ≥ 2.35                     | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, keluarga Ubuntu/Debian | 64-bit (x86_64); glibc ≥ 2.35                     | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE   | 64-bit (x86_64); glibc ≥ 2.35                     | `onyouoffice-<version>.x86_64.rpm` |

## Di Windows

1. Unduh `OnyouOffice-Setup-<version>.exe` dari halaman Rilis.
2. Jalankan. Installer ini tidak ditandatangani secara digital, sehingga Windows mungkin lebih dulu menampilkan jendela biru "Windows melindungi PC Anda". Pilih **Info selengkapnya**, lalu **Tetap jalankan**. Kata-kata persisnya bergantung pada versi Windows Anda.
3. Ikuti installer sampai selesai.

Installer menaruh Onyou Office di menu Start dan mendaftarkan `.docx`, `.xlsx`, `.pptx`, `.pdf` dan sejenisnya sehingga klik ganda pada berkas langsung membukanya.

Karena installer tidak ditandatangani, jalankan hanya installer yang Anda unduh dari halaman Rilis di atas.

## Saat Windows memblokir unduhan atau pemasangan

### Edge menyebut berkas "tidak umum diunduh"

Microsoft Defender SmartScreen memberi peringatan seperti ini untuk berkas yang belum banyak diunduh orang. Panduan Microsoft untuk menyimpan berkas tersebut:

1. Buka daftar unduhan Edge (**Ctrl+J**), tekan **…** di sebelah berkas lalu pilih **Keep**.
2. Di jendela yang terbuka, tekan **Show more**, lalu **Keep anyway**. Berkas tetap tersimpan di folder Unduhan Anda.

Jendela itu juga punya tombol untuk melaporkan berkas sebagai aman. Tombol itu hanya membuka halaman laporan Microsoft (`feedback.smartscreen.microsoft.com`) dan tidak menyimpan berkas. Tutup halaman itu dan tekan **Show more** di jendela tadi.

Jika jendela tidak punya **Show more** atau tidak punya **Keep anyway**:

- Di PC yang dikelola sekolah atau perusahaan, administrator dapat mematikan kemampuan melewati peringatan ini (sebuah kebijakan Edge). Maka tidak ada seorang pun di PC itu yang dapat menyimpan berkas; minta administrator untuk memasangnya atau mengizinkannya.
- Mengunduh dari halaman Rilis dengan peramban lain memberi Anda berkas yang sama.

### Muncul jendela "Windows melindungi PC Anda"

Microsoft Defender SmartScreen menampilkan jendela ini saat pertama kali menemukan installer yang tidak ditandatangani. Tekan **Info selengkapnya** dan tombol **Tetap jalankan** akan muncul. Di PC yang dikelola sekolah atau perusahaan, pengaturan administrator dapat menyembunyikan tombol itu; tanyakan kepada administrator.

## Di Mac (beta)

Anda memerlukan macOS 12 (Monterey) atau lebih baru. Build Mac tidak memiliki tanda tangan pengembang Apple, jadi saat pertama kali dibuka macOS menyatakan tidak dapat memastikan aplikasi bebas dari malware dan tidak membukanya. Anda mengizinkannya sekali, seperti di bawah ini.

1. Buka berkas dmg dan seret `Onyou Office.app` ke folder **Aplikasi**.
2. Buka Onyou Office dari folder Aplikasi. Saat peringatan muncul, tekan **Selesai**.
3. Buka **Pengaturan Sistem ▸ Privasi & Keamanan**. Di dekat bagian bawah, di samping baris yang menyatakan Onyou Office diblokir, tekan **Tetap Buka** dan masukkan kata sandi Mac Anda. Tombol itu tampil sekitar satu jam setelah Anda mencoba membuka aplikasi.
4. Di jendela yang muncul lagi, tekan **Buka**. Setelah itu aplikasi terbuka tanpa peringatan.

Di macOS 12 tempatnya adalah **Preferensi Sistem ▸ Keamanan & Privasi ▸ Umum**, dan tombolnya di sana adalah **Tetap Buka**.

Jika macOS menyatakan aplikasi tidak didukung di Mac ini, periksa dua hal:

- Mac Intel tidak dapat menjalankan berkas Apple Silicon (`-arm64.dmg`). Periksa "Prosesor" di **Tentang Mac Ini**, hapus aplikasi yang sudah Anda pasang, lalu pasang berkas `-x64.dmg` sebagai gantinya.
- macOS 11 atau yang lebih lama tidak dapat menjalankan Onyou Office. **Tentang Mac Ini** juga menampilkan versi macOS.

Juga di Mac:

- Kartu koneksi AI tidak punya tombol instal. Ikuti tautan panduan instalasi resmi di kartu untuk memasang Claude Code atau Codex. Aplikasi desktop Claude bukan Claude Code, jadi Claude Code tetap harus dipasang terpisah walaupun aplikasi desktopnya sudah ada.
- Proses masuk diselesaikan di peramban. Jika peramban meminta Anda menempelkan kode, jalankan sendiri `claude auth login` atau `codex login` di Terminal. Lihat [Koneksi langganan](help://subscription).

## Di Linux (beta)

- **AppImage**: jadikan dapat dieksekusi (`chmod +x OnyouOffice-<version>.AppImage`) lalu jalankan berkasnya. Tidak ada langkah pemasangan.
- **deb**: pasang dengan `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: pasang dengan `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. Di openSUSE, gunakan `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Paket deb dan rpm dipasang di `/opt/Onyou Office` dan menautkan perintah terminal `/usr/bin/onyouoffice`. Seperti di Mac, kartu koneksi AI tidak punya tombol instal, dan saat proses masuk meminta kode, Anda menjalankan sendiri `claude auth login` atau `codex login` di terminal.

## Pembaruan

[halaman Rilis](https://github.com/dodamworks/onyouoffice/releases/latest)

## Build yang sedang Anda jalankan

**Pengaturan ▸ Tentang** adalah tempat aplikasi melaporkan versi yang Anda pakai, saluran yang diikutinya, dan letak proyeknya. Di sana juga disebutkan proyek sumber terbuka yang menjadi dasar aplikasi ini.

## Baris perintahnya sudah ikut

Setiap pemasangan membawa perintah `onyouoffice` yang berbicara dengan mesin yang sama dengan jendela, sehingga keduanya tidak pernah berbeda pendapat tentang sebuah berkas. `onyouoffice install-cli` menaruhnya di `PATH` Anda. Lihat [Baris perintah dan agen](help://cli) untuk mengetahui apa saja yang dapat dilakukannya.
