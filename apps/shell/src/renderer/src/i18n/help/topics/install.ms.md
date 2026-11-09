<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Pemasangan Onyou Office

[halaman Keluaran](https://github.com/dodamworks/onyouoffice/releases/latest)

## Memilih fail untuk mesin anda

| Platform                                 | Keperluan                                            | Fail                               |
| ---------------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| **Windows**                              | Windows 10 atau lebih baharu, Intel/AMD 64-bit       | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon            | macOS 12 atau lebih baharu, cip M1 atau lebih baharu | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                    | macOS 12 atau lebih baharu, pemproses Intel          | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, mana-mana pengedaran   | 64-bit (x86_64); glibc ≥ 2.35                        | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, keluarga Ubuntu/Debian | 64-bit (x86_64); glibc ≥ 2.35                        | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE   | 64-bit (x86_64); glibc ≥ 2.35                        | `onyouoffice-<version>.x86_64.rpm` |

## Pada Windows

1. Muat turun `OnyouOffice-Setup-<version>.exe` daripada halaman Keluaran.
2. Jalankannya. Pemasang ini tidak ditandatangani dengan sijil kod, jadi Windows mungkin memaparkan tetingkap biru "Windows protected your PC" dahulu. Pilih **More info**, kemudian **Run anyway**. Perkataan sebenar bergantung pada versi Windows anda.
3. Ikut langkah pemasang itu hingga selesai.

Ia meletakkan Onyou Office dalam menu Start dan mendaftarkan `.docx`, `.xlsx`, `.pptx`, `.pdf` dan yang lain supaya mengklik dua kali pada fail membukanya.

Oleh sebab pemasang ini tidak ditandatangani, jalankan hanya pemasang yang anda muat turun daripada halaman Keluaran di atas.

## Apabila Windows menyekat muat turun atau pemasangan

### Edge menyatakan fail itu "isn't commonly downloaded"

Microsoft Defender SmartScreen memberi amaran begini tentang fail yang belum dilihatnya dimuat turun oleh ramai orang. Panduan Microsoft untuk mengekalkan fail itu:

1. Buka senarai muat turun Edge (**Ctrl+J**), tekan **…** di sebelah fail itu dan pilih **Keep**.
2. Dalam tetingkap yang terbuka, tekan **Show more**, kemudian **Keep anyway**. Fail itu kekal dalam folder Muat Turun anda.

Tetingkap itu juga mempunyai butang yang melaporkan fail itu sebagai selamat. Butang itu hanya membuka halaman laporan Microsoft (`feedback.smartscreen.microsoft.com`) dan tidak mengekalkan fail. Tutup halaman itu dan tekan **Show more** dalam tetingkap tadi.

Jika tetingkap itu tiada **Show more** atau tiada **Keep anyway**:

- Pada PC yang diurus oleh sekolah atau syarikat, pentadbir boleh mematikan pilihan untuk melangkau amaran ini (dasar Edge). Jika begitu, tiada sesiapa pada PC itu boleh mengekalkan fail; minta pentadbir memasangnya atau membenarkannya.
- Memuat turun dari halaman Keluaran dalam pelayar lain memberi anda fail yang sama.

### Tetingkap "Windows protected your PC" muncul

Microsoft Defender SmartScreen memaparkan tetingkap ini kali pertama ia menemui pemasang yang tidak ditandatangani. Tekan **More info** dan butang **Run anyway** akan muncul. Pada PC yang diurus oleh sekolah atau syarikat, tetapan pentadbir boleh menyembunyikan butang itu; tanya pentadbir.

## Pada Mac (beta)

Anda memerlukan macOS 12 (Monterey) atau lebih baharu. Binaan Mac tidak mempunyai tandatangan pembangun Apple, jadi apabila anda membukanya buat kali pertama, macOS menyatakan ia tidak dapat mengesahkan aplikasi itu bebas daripada perisian hasad dan tidak membukanya. Anda membenarkannya sekali sahaja, seperti di bawah.

1. Buka dmg dan seret `Onyou Office.app` ke dalam folder **Aplikasi**.
2. Buka Onyou Office dari folder Aplikasi. Apabila amaran muncul, tekan **Selesai**.
3. Buka **Tetapan Sistem ▸ Privasi & Keselamatan**. Berhampiran bahagian bawah, di sebelah baris yang menyatakan Onyou Office disekat, tekan **Open Anyway** dan masukkan kata laluan Mac anda. Butang itu dipaparkan selama kira-kira sejam selepas anda cuba membuka aplikasi itu.
4. Dalam tetingkap yang muncul semula, tekan **Buka**. Selepas itu ia dibuka tanpa amaran.

Pada macOS 12 tempatnya ialah **Keutamaan Sistem ▸ Keselamatan & Privasi ▸ Umum**, dan butangnya di sana ialah **Open Anyway**.

Jika macOS menyatakan aplikasi itu tidak disokong pada Mac ini, semak dua perkara:

- Mac Intel tidak dapat menjalankan fail Apple Silicon (`-arm64.dmg`). Semak "Pemproses" di bawah **Perihal Mac Ini**, padam aplikasi yang telah anda pasang, dan pasang fail `-x64.dmg` sebagai gantinya.
- macOS 11 atau lebih lama tidak dapat menjalankan Onyou Office. **Perihal Mac Ini** juga menunjukkan versi macOS.

Juga pada Mac:

- Kad sambungan AI tiada butang pasang. Ikut pautan panduan pemasangan rasmi pada kad itu untuk memasang Claude Code atau Codex. Aplikasi desktop Claude bukan Claude Code, jadi Claude Code perlu dipasang berasingan walaupun aplikasi desktop sudah ada.
- Log masuk diselesaikan dalam pelayar. Jika pelayar meminta anda menampal kod, jalankan sendiri `claude auth login` atau `codex login` dalam Terminal. Lihat [Sambungan langganan](help://subscription).

## Pada Linux (beta)

- **AppImage**: jadikan ia boleh laku (`chmod +x OnyouOffice-<version>.AppImage`) dan jalankan failnya. Tiada langkah pemasangan.
- **deb**: pasang dengan `sudo apt install ./onyouoffice_<version>_amd64.deb`.
- **rpm**: pasang dengan `sudo dnf install ./onyouoffice-<version>.x86_64.rpm`. Pada openSUSE, gunakan `sudo zypper install ./onyouoffice-<version>.x86_64.rpm`.

Pakej deb dan rpm dipasang ke `/opt/Onyou Office` dan memaut perintah terminal `/usr/bin/onyouoffice`. Seperti pada Mac, kad sambungan AI tiada butang pasang, dan apabila log masuk meminta kod, anda menjalankan sendiri `claude auth login` atau `codex login` dalam terminal.

## Kemas kini

[halaman Keluaran](https://github.com/dodamworks/onyouoffice/releases/latest)

## Keluaran yang anda jalankan

**Tetapan ▸ Perihal** ialah tempat aplikasi melaporkan versi yang anda ada, saluran yang diikutinya dan di mana projek itu terletak. Ia juga menamakan projek sumber terbuka yang menjadi asas aplikasi ini.

## Baris arahan yang disertakan

Setiap pemasangan meliputi satu perintah `onyouoffice` yang bercakap dengan enjin yang sama seperti yang digunakan oleh tetingkap itu, jadi kedua-duanya tidak pernah berselisih tentang sesuatu fail. `onyouoffice install-cli` meletakkannya pada `PATH` anda. Lihat [Baris arahan dan ejen](help://cli) untuk apa yang boleh ia lakukan.
