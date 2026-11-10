# Beceriler

Beceri, AI için bir dizi çalışma yönergesidir. Tekrar tekrar yaptığınız bir şeyi bir kez yazın — toplantı notlarını toparlama adımları, bir raporun tonu, her seferinde denetlenecek noktalar — ve onu AI panelinde çağırın ya da AI uygun olduğunda kendisi kullansın. Beceri, açık bir biçimde tanımlanmış bir `SKILL.md` dosyası içeren bir klasördür; bu yüzden GenOffice’te yapılan bir beceri Claude Code veya Codex’te de olduğu gibi çalışır.

## Becerileri açma ve kapatma

**Ayarlar ▸ Beceriler** bu bilgisayardaki becerileri geldikleri yere göre gruplayarak listeler. Her beceri, kodlama ajanlarının gösterdiği gibi adıyla görünür. Birini adına veya açıklamasına göre bulmak için üstteki arama kutusunu kullanın.

| Kaynak                    | Neleri barındırır                                                  | İlk durumda |
| ------------------------- | ------------------------------------------------------------------ | ----------- |
| **Yerleşik**              | GenOffice ile gelen 5 beceri                                       | Açık        |
| **Becerilerim**           | Eklediğiniz veya oluşturduğunuz beceriler (`~/.ieumoffice/skills`) | Açık        |
| **Claude beceri klasörü** | `~/.claude/skills` içindeki beceriler                              | Kapalı      |
| **Claude eklentileri**    | Kurulu Claude eklentilerinin becerileri                            | Kapalı      |
| **Codex beceri klasörü**  | `~/.agents/skills` içindeki beceriler                              | Kapalı      |

- Anahtar bir beceriyi açar veya kapatır. Aynı ayar her düzenleyicinin AI panelinde, Giriş ekranındaki AI’a sor bölümünde ve ajan penceresinde geçerlidir.
- Açık bir beceri için **AI karar verir** veya **Yalnızca çağrıldığında** seçin. AI karar verir olarak başlar. Yalnızca çağrıldığında seçiliyken beceri yalnızca siz çağırdığınızda kullanılır.
- Farklı kaynaklardan gelen beceriler aynı adı paylaşabilir. Her satırdaki kaynak etiketi onları ayırır.
- Daha fazla menüsünde **İçeriği görüntüle**, **Düzenle** (yalnızca becerilerim), **Dışa aktar (zip)** (yalnızca becerilerim) ve **Klasörü aç** bulunur.
- **Geri Dönüşüm Kutusu’na taşı** becerilerimden birini sistem geri dönüşüm kutusuna taşır; oradan geri yükleyebilirsiniz.
- Yerleşik bir beceri kaldırılmak yerine gizlenir: **Gizle** seçin. Listenin altındaki **Yeniden göster** onu ilk durumundaki gibi geri getirir.
- Yerleşik bir beceriyi veya başka bir programdan gelen bir beceriyi değiştirmek için **Becerilerime kopyala** seçin. Kopya becerilerimde görünür ve özgün beceri kapatılır.
- Bir beceriyi şablonuyla dışa aktarmak, şablon belgesini de zip dosyasına koyar. Dışa aktarmadan önce belgede kişisel bilgi olmadığını denetleyin.

## Beceri ekleme

1. **Ayarlar ▸ Beceriler** bölümünde **Ekle** düğmesine tıklayın.
2. **Klasörden**, **Zip dosyasından** veya **GitHub bağlantısından** seçin. GitHub için herkese açık bir deponun adresini ya da `owner/repo` yazıp **Bul** düğmesine tıklayın.
3. Önizlemede bulunan becerileri denetleyin. Dosyaların sayısını ve boyutunu, betik olup olmadığını, metindeki web adreslerini ve lisans dosyasını gösterir.
4. Yalnızca kurulacak becerileri işaretleyin ve **Yükle** düğmesine tıklayın. Kurulan beceriler açık olarak başlar.

Önizlemenin altında her zaman şu yazar: "Becerileri yalnızca güvendiğiniz kaynaklardan yükleyin. Bir beceri AI’a yönergeler verir ve ajan penceresinde betik çalıştırabilir." Bilmediğiniz bir kaynaktan gelen beceriyi kurmadan önce okuyun.

- Becerilerimde aynı adı taşıyan bir beceri varsa o satırda **Değiştir** veya **Atla** seçin.
- GitHub’dan indirirken GenOffice yalnızca `github.com`, `api.github.com` ve `codeload.github.com` adreslerine bağlanır ve hiçbir oturum açma verisi göndermez. Arşiv çok büyükse veya güvenlik denetimlerinden geçemezse hiçbir şey kurulmaz.
- **Yeni beceri** adı, açıklamayı ve yönergeleri kendiniz yazacağınız boş bir düzenleyici açar.

## Güncellemeleri denetleme

- GitHub’dan kurulmuş bir beceri için daha fazla menüsündeki **Güncellemeleri denetle** yeni içerik arar. GitHub’a yalnızca tıkladığınızda bağlanılır.
- Hiçbir şey değişmediyse "Güncel" yazar. Değiştiyse değişen dosyaları ve önizlemeyi gözden geçirin, sonra **Güncelle** düğmesine tıklayın.
- Beceriyi kurduktan sonra kendiniz düzenlediyseniz ayrıca "Kendi düzenlemeleriniz kaybolur" gösterilir.
- Güncelleme becerinin açık/kapalı durumunu ve AI karar verir / Yalnızca çağrıldığında seçimini korur.

## AI panelinde beceri çağırma

1. AI giriş kutusunun başında veya bir boşluktan hemen sonra `/` ya da `$` yazın. Açık olan becerilerin listesi görünür.
2. Yazmaya devam ederek listeyi daraltın. Örneğin `/meet` `meeting-minutes` becerisini bulur. Açıklamadaki sözcükler de işe yarar.
3. Ok tuşlarıyla birini seçin ve Enter ya da Tab’a basın. Beceri giriş kutusunun üstünde bir çip olur.
4. Ne istediğinizi yazın ve gönderin. GenOffice becerinin içeriğini isteğe ekler.

- Excel AI panelinde `$` listeyi yalnızca giriş kutusunun en başında açar, böylece `$A$1` gibi hücre adreslerinin yolunu kesmez.
- Birkaç çip ekleyebilir, birini × ile kaldırabilirsiniz. Esc yalnızca listeyi kapatır; bir AI çalışmasını durdurmaz.
- Listenin altındaki **Becerileri yönet…** düğmesi **Ayarlar ▸ Beceriler** bölümünü açar.
- Çipler gönderdiğiniz mesajda ve kaydedilen sohbette kalır. Bir sohbeti yeniden açıp tekrar gönderdiğinizde becerinin güncel içeriği yeniden okunur. Bu arada kaldırılan veya kapatılan bir beceri çipinde "Kullanılamıyor" olarak görünür.
- Birlikte gönderilecek beceri metni çok uzunsa "Beceriler birlikte gönderilemeyecek kadar büyük" yazar ve hiçbir şey gönderilmez.

## AI’ın kendi kullandığı beceriler

- Açık olan ve AI karar verir olarak ayarlanmış becerilerin adları ve açıklamaları AI’a liste olarak verilir. Biri isteğe uyduğunda AI içeriğini alır ve kullanır.
- AI bir beceri kullandığında sohbet "〈ad〉 becerisi kullanıldı" der.
- AI bir beceriyi kullanıp kullanmayacağına açıklamadan karar verir. Becerinin ne zaman kullanılacağını söyleyen bir açıklama iyi seçim yapmasına yardımcı olur.

## Sorarak beceri oluşturma

1. AI panelinde "Az önce yaptığımızı bir beceri olarak kaydet" veya "Bizim üslubumuzla rapor yazan bir beceri oluştur" gibi bir şey söyleyin.
2. AI tekrarlanmaya değer adımları ve kuralları seçip bir **Yeni beceri** kartı gösterir. Adlar ve tarihler gibi yalnızca o sefer kullanılan değerler yönergelerin dışında kalır.
3. Karttaki adı, açıklamayı ve yönergeleri denetleyip düzenleyin. Ad, beceri listesinde görünen ve `/` sonrasında yazdığınız şeydir: küçük İngilizce harfler, rakamlar ve kısa çizgiler.
4. **Kaydet** düğmesine tıklayın. Yeni beceri becerilerime eklenir, açılır ve hemen `/` listesinde görünür.

- **Kaydet** düğmesine tıklayana kadar hiçbir dosya yazılmaz. **İptal** düğmesine tıklarsanız sohbet bunu yalnızca "Kaydedilmemiş beceri önerisi" olarak saklar.
- Var olan bir beceriyi değiştirmeyi de isteyebilirsiniz, örneğin "Toplantı tutanağı becerisini bizim yaptığımız gibi değiştir". O zaman kartın başlığı **Beceriyi değiştir** olur. Becerilerimden biri **Değiştir** ile üzerine yazılır; yerleşik bir beceri veya başka bir programdan gelen beceri becerilerimde kopya olarak kaydedilir ve özgün beceri kapatılır.

## Belgeyi şablon olarak ekleme

Bir düzenleyicinin AI panelinde beceri oluştururken açık belge bir şablon olarak birlikte gidebilir. Kartta **Bu belgeyi şablon olarak birlikte kaydet** seçeneğini işaretleyin, düğme ikiye ayrılır.

- **Boş bir şablon oluştur**: belgenin bir kopyası yeni bir sekmede, "Şablon önizlemesi - 〈başlık〉" olarak açılır ve o sekmedeki AI adlar, tarihler ve kişisel bilgiler gibi doldurulmuş değerleri temizler. Sekmeyi gözden geçirin, elle daha fazlasını değiştirin, sonra **Bu sekmeyi şablon olarak kaydet** düğmesine tıklayın; sekme o anda olduğu gibi şablon olur.
- **Belgeyi olduğu gibi kaydet**: açık belgeyi değiştirmeden şablon olarak kaydeder. Belgede AI’dan gizlediğiniz kısımlar varsa bu düğme engellenir, böylece gizli içerik olduğu gibi şablona girmez.
- Şablon, beceri klasörünün içinde belgenin bir kopyası olarak saklanır. Özgün belge değişmez.

## Şablonlu bir beceriyi kullanma

- Şablonu olan bir beceri listede **Şablonu var** olarak görünür.
- Çip olarak çağırıp gönderin, şablonun bir kopyası yeni, adsız bir belge olarak açılır; o sekmedeki AI isteğinizle devam eder. Özgün panel "Şablonla yeni bir sekmede çalışılıyor" ve **Sekmeye git** bilgisini korur.
- AI bir şablon becerisini kendisi seçtiğinde hemen bir sekme açılmaz. Sohbet bunun yerine bir **Bu şablondan yeni bir belge aç** düğmesi gösterir.
- Yeni belgenin nereye gideceğini genellikle ilk kaydettiğinizde seçersiniz. Markdown ve HTML düzenleyicileri her zamanki gibi varsayılan klasöre kaydeder. Şablon dosyasının kendisi olduğu gibi kalır.

## Betikli beceriler

- Normal AI panelinde ve Giriş ekranındaki AI’a sor bölümünde bir becerinin betikleri asla çalışmaz. AI’a yalnızca becerinin metni ulaşır.
- Betikli bir beceri **Betikleri var · ajan penceresinde tam olarak çalışır** olarak görünür ve çip olarak eklendiğinde "Bu becerinin betikleri normal AI panelinde çalışmaz" yazar. Gönderme engellenmez.
- Betikleri de kullanmak için beceriyi ajan penceresinde çağırın. Bkz. [Ajan modu](help://agent-mode).

## Yerleşik beceriler

| Beceri            | Ne yapar                                                                           |
| ----------------- | ---------------------------------------------------------------------------------- |
| `meeting-minutes` | Toplantı notlarını kararları ve eylem maddelerini gösteren tutanaklara çevirir     |
| `internal-comms`  | Duyurular, bültenler, ilerleme güncellemeleri, SSS’ler ve diğer iç mesajları yazar |
| `humanizer`       | AI yazılmış gibi duran ifadeleri bulur ve doğallaştırır                            |
| `copy-editing`    | Yazdığınız İngilizce metni gözden geçirir, daha açık ve daha derli toplu yapar     |
| `find-skills`     | Ajan penceresinde ihtiyaç duyduğunuz becerileri bulur ve kurmayı önerir            |

`copy-editing` İngilizce pazarlama metinleri için yapılmıştır. `find-skills` yalnızca ajan penceresinde çalışır.

## Ajan penceresinde

- Ajan penceresi **Ayarlar ▸ Beceriler** bölümündeki aynı açma/kapama ayarlarını izler ve becerileri giriş kutusunda aynı şekilde `/` veya `$` ile çağırırsınız.
- Proje klasörünün `.claude/skills` ve `.agents/skills` klasörlerindeki beceriler o oturumda açılmadan kullanılır.
- Beceri listesi oturum başladığında sabitlenir. Bir oturum sırasında becerileri açıp kapatırsanız "Değişen beceriler sonraki oturumdan itibaren geçerli olur" yazar.
- Ajan bir beceri oluşturduğunda pencerede aynı kart görünür. Şablon için sekmelerde açık belgeler ve proje klasöründeki dosyalar arasından seçin.
- Ajan kurmaya değer bir beceri bulduğunda bir kurulum önerisi görünür. **Önizlemeyi aç** ile açın ve **Yükle** düğmesine kendiniz tıklayın; aksi halde hiçbir şey kurulmaz. Kurulan beceri sonraki oturumdan itibaren kullanılabilir.
