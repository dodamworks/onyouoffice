# GenOffice kurulumu

Her sürüm, projenin GitHub’daki [Sürümler sayfasında](https://github.com/pblsketch/openoffice/releases/latest) yayımlanır. Bu sürüm Windows için çıkarılmıştır.

## Makineniz için dosyayı seçin

| Platform    | Gereksinimler                           | Dosya                           |
| ----------- | --------------------------------------- | ------------------------------- |
| **Windows** | Windows 10 veya üzeri, 64 bit Intel/AMD | `GenOffice-Setup-<version>.exe` |

Eski sürümler Sürümler sayfasında kalır.

## Windows’ta

1. Sürümler sayfasından `GenOffice-Setup-<version>.exe` dosyasını indirin.
2. Çalıştırın. Yükleyici kod imzalı olmadığı için Windows önce mavi bir “Windows bilgisayarınızı korudu” penceresi gösterebilir. **Daha fazla bilgi**’yi ve ardından **Yine de çalıştır**’ı seçin. Tam ifade Windows sürümünüze göre değişir.
3. Yükleyiciyi sonuna kadar izleyin.

GenOffice’i Başlat menüsüne koyar ve `.docx`, `.xlsx`, `.pptx`, `.pdf` ile benzerlerini kaydeder, böylece bir dosyaya çift tıklamak onu açar.

Yükleyici imzalı olmadığı için yalnızca yukarıdaki Sürümler sayfasından indirdiğiniz bir dosyayı çalıştırın.

## Güncellemeler

- GenOffice yeni bir sürümü aynı GitHub Sürümler sayfasında arar. Yeni bir sürüm yayımlandığında **Ayarlar ▸ Hakkında** onu sunar: **… sürümüne güncelle** düğmesine basın, indirmeyi bekleyin, sonra **Yeniden başlat ve yükle** düğmesine basın. Windows’ta bir yükleyici penceresi ilerlemeyi gösterir; bittiğinde GenOffice açık belgelerinizle birlikte yeniden açılır. Güncelleme yalnızca o düğmeye bastığınızda kurulur; uygulamayı sadece kapattığınızda hiçbir zaman kurulmaz.
- **Menü (☰) ▸ Güncellemeleri denetle** istediğiniz zaman denetler. Mac’te bu, **Yardım ▸ Güncellemeleri denetle**’dir.
- Denetim başarısız olduğunda — ağ yoksa ya da henüz bir şey yayımlanmamışsa — hiçbir şey olmaz ve uygulama eskisi gibi çalışmaya devam eder.
- Ayarlar ▸ Hakkında altında yer alan **Güncelleme kanalı** da Kararlı veya Beta’dır. Değiştirmek hemen etkili olur ve bir güncelleme denetler; Beta kurulumunu Kararlı’ya geri düşürmez.
- Güncellemeler de kod imzalı değildir. Bir güncellemeyi kurmadan önce uygulama, indirilen dosyayı o sürümle birlikte yayımlanan sağlama toplamıyla karşılaştırır.
- **Yeniden başlat ve yükle** uygulamayı kapatır da yeni sürüm görünmezse, bir sonraki açılış bunu söyler ve güncellemeyi yeniden sunar. Bu kez yükleyici kendi penceresinde açılır, böylece onu izleyip yönetici istemine yanıt verebilirsiniz. Bu da işe yaramazsa güncelleme penceresi indirme sayfasına yönlendirir; oradan aldığınız dosyayı kurmak ayarlarınızı ve belgeleriniz korur. Güncelleyicinin ne yaptığı, uygulamanın veri klasöründeki `update-log.txt` dosyasına yazılır (açmak için Dosya Gezgini’nin adres çubuğuna `%APPDATA%\GenOffice` yazın). Sorunu bildirirken bu dosyayı ekleyin.

## Çalıştırdığınız yapı

**Ayarlar ▸ Hakkında**, uygulamanın elinizdeki sürümü, izlediği kanalı ve projenin nerede durduğunu bildirdiği yerdir. Ayrıca bu uygulamanın temel aldığı açık kaynak projenin adını da belirtir.

## Komut satırı da onunla gelir

Her kurulum, penceredekiyle aynı motorlarla konuşan bir `ieumoffice` komutu içerir, böylece ikisi bir dosya konusunda asla anlaşmazlığa düşmez. `ieumoffice install-cli` komutu onu `PATH`’inize ekler. Neler yapabildiğini görmek için [Komut satırı ve ajanlar](help://cli) bölümüne bakın.
