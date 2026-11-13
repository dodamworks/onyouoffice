<!-- Modified by Onyou Office: product downloads and manual distribution guidance. -->

# Onyou Office kurulumu

[Sürümler sayfası](https://github.com/dodamworks/onyouoffice/releases/latest)

## Makineniz için dosyayı seçin

| Platform                               | Gereksinimler                           | Dosya                              |
| -------------------------------------- | --------------------------------------- | ---------------------------------- |
| **Windows**                            | Windows 10 veya üzeri, 64 bit Intel/AMD | `OnyouOffice-Setup-<version>.exe`  |
| **Mac (beta)**, Apple Silicon          | macOS 12 veya üzeri, M1 ya da daha yeni | `OnyouOffice-<version>-arm64.dmg`  |
| **Mac (beta)**, Intel                  | macOS 12 veya üzeri, Intel işlemci      | `OnyouOffice-<version>-x64.dmg`    |
| **Linux (beta)**, tüm dağıtımlar       | 64 bit (x86_64); glibc ≥ 2.35           | `OnyouOffice-<version>.AppImage`   |
| **Linux (beta)**, Ubuntu/Debian ailesi | 64 bit (x86_64); glibc ≥ 2.35           | `onyouoffice_<version>_amd64.deb`  |
| **Linux (beta)**, Fedora/RHEL/openSUSE | 64 bit (x86_64); glibc ≥ 2.35           | `onyouoffice-<version>.x86_64.rpm` |

## Windows’ta

1. Sürümler sayfasından `OnyouOffice-Setup-<version>.exe` dosyasını indirin.
2. Çalıştırın. Yükleyici kod imzalı olmadığı için Windows önce mavi bir “Windows bilgisayarınızı korudu” penceresi gösterebilir. **Daha fazla bilgi**’yi ve ardından **Yine de çalıştır**’ı seçin. Tam ifade Windows sürümünüze göre değişir.
3. Yükleyiciyi sonuna kadar izleyin.

Onyou Office’i Başlat menüsüne koyar ve `.docx`, `.xlsx`, `.pptx`, `.pdf` ile benzerlerini kaydeder, böylece bir dosyaya çift tıklamak onu açar.

Yükleyici imzalı olmadığı için yalnızca yukarıdaki Sürümler sayfasından indirdiğiniz bir dosyayı çalıştırın.

## Windows indirmeyi veya kurulumu engellediğinde

### Edge dosyanın "yaygın olarak indirilmediğini" söylüyor

Microsoft Defender SmartScreen, pek çok kişinin indirdiğini görmediği bir dosya için bu şekilde uyarır. Microsoft’un dosyayı tutmak için verdiği yol şudur:

1. Edge’in indirme listesini açın (**Ctrl+J**), dosyanın yanındaki **…** düğmesine basın ve **Sakla**’yı seçin.
2. Açılan pencerede **Daha fazla göster**’e, ardından **Yine de sakla**’ya basın. Dosya İndirilenler klasörünüzde kalır.

O pencerede dosyayı güvenli olarak bildiren bir düğme de vardır. Bu düğme yalnızca Microsoft’un bildirim sayfasını (`feedback.smartscreen.microsoft.com`) açar ve dosyayı tutmaz. O sayfayı kapatın ve bunun yerine penceredeki **Daha fazla göster**’e basın.

Pencerede **Daha fazla göster** veya **Yine de sakla** yoksa:

- Bir okulun veya şirketin yönettiği bir bilgisayarda yönetici bu uyarıları atlamayı kapatabilir (bir Edge ilkesi). O zaman o bilgisayarda kimse dosyayı tutamaz; yöneticiden onu kurmasını veya izin vermesini isteyin.
- Sürümler sayfasından başka bir tarayıcıyla indirmek size aynı dosyayı verir.

### "Windows bilgisayarınızı korudu" penceresi beliriyor

Microsoft Defender SmartScreen, imzasız bir yükleyiciyi ilk gördüğünde bu pencereyi gösterir. **Daha fazla bilgi**’ye basın; bir **Yine de çalıştır** düğmesi belirir. Bir okulun veya şirketin yönettiği bir bilgisayarda bir yönetici ayarı bu düğmeyi gizleyebilir; yöneticiye sorun.

## Mac’te (beta)

macOS 12 (Monterey) veya üzeri gerekir. Mac yapısının Apple geliştirici imzası yoktur; bu yüzden onu ilk açtığınızda macOS, uygulamanın kötü amaçlı yazılım içermediğini doğrulayamadığını söyler ve açmaz. Aşağıdaki gibi bir kez izin verin.

1. dmg’yi açın ve `Onyou Office.app` uygulamasını **Uygulamalar** klasörüne sürükleyin.
2. Onyou Office’i Uygulamalar klasöründen açın. Uyarı belirdiğinde **Bitti**’ye basın.
3. **Sistem Ayarları ▸ Gizlilik ve Güvenlik**’i açın. Alta yakın bir yerde, Onyou Office’in engellendiğini söyleyen satırın yanında **Yine de Aç**’a basın ve Mac parolanızı girin. Düğme, uygulamayı açmayı denedikten sonra yaklaşık bir saat görünür.
4. Yeniden beliren pencerede **Aç**’a basın. Bundan sonra uyarısız açılır.

macOS 12’de yer **Sistem Tercihleri ▸ Güvenlik ve Gizlilik ▸ Genel**’dir ve düğme orada da **Yine de Aç**’tır.

macOS uygulamanın bu Mac’te desteklenmediğini söylerse iki şeyi denetleyin:

- Intel bir Mac, Apple Silicon dosyasını (`-arm64.dmg`) çalıştıramaz. **Bu Mac Hakkında** altındaki "İşlemci"yi denetleyin, kurduğunuz uygulamayı silin ve bunun yerine `-x64.dmg` dosyasını kurun.
- macOS 11 veya daha eskisi Onyou Office’i çalıştıramaz. **Bu Mac Hakkında** macOS sürümünü de gösterir.

Mac’te ayrıca:

- AI bağlantı kartlarında kurulum düğmesi yoktur. Claude Code veya Codex’i kurmak için kartın resmî kurulum kılavuzu bağlantısını izleyin. Claude masaüstü uygulaması Claude Code değildir; bu yüzden masaüstü uygulaması kurulu olsa bile Claude Code’un kurulması gerekir.
- Oturum açma tarayıcıda biter. Tarayıcı bir kod yapıştırmanızı isterse Terminal’de `claude auth login` veya `codex login` komutunu kendiniz çalıştırın. Bkz. [Abonelik bağlantısı](help://subscription).

## Linux’ta (beta)

- **AppImage**: dosyayı çalıştırılabilir yapın (`chmod +x OnyouOffice-<version>.AppImage`) ve çalıştırın. Kurulum adımı yoktur.
- **deb**: `sudo apt install ./onyouoffice_<version>_amd64.deb` ile kurun.
- **rpm**: `sudo dnf install ./onyouoffice-<version>.x86_64.rpm` ile kurun. openSUSE’de `sudo zypper install ./onyouoffice-<version>.x86_64.rpm` kullanın.

deb ve rpm paketleri `/opt/Onyou Office` konumuna kurulur ve `/usr/bin/onyouoffice` terminal komutunu bağlar. Mac’te olduğu gibi AI bağlantı kartlarında kurulum düğmesi yoktur ve bir oturum açma kod istediğinde bir terminalde `claude auth login` veya `codex login` komutunu kendiniz çalıştırırsınız.

## Güncellemeler

[Sürümler sayfası](https://github.com/dodamworks/onyouoffice/releases/latest)

## Çalıştırdığınız yapı

**Ayarlar ▸ Hakkında**, uygulamanın elinizdeki sürümü, izlediği kanalı ve projenin nerede durduğunu bildirdiği yerdir. Ayrıca bu uygulamanın temel aldığı açık kaynak projenin adını da belirtir.

## Komut satırı da onunla gelir

Her kurulum, penceredekiyle aynı motorlarla konuşan bir `onyouoffice` komutu içerir, böylece ikisi bir dosya konusunda asla anlaşmazlığa düşmez. `onyouoffice install-cli` komutu onu `PATH`’inize ekler. Neler yapabildiğini görmek için [Komut satırı ve ajanlar](help://cli) bölümüne bakın.
