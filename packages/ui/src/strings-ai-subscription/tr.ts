import type { zh } from './zh'

export const tr = {
  aiAssistant: 'AI Asistanı',
  cardChecking: 'Denetleniyor…',
  cardNotInstalled: 'Yüklü değil',
  cardSignedOut: 'Oturum açılmadı',
  cardSigningIn: 'Oturum açılıyor…',
  cardReady: 'Bağlı',
  cardReadyPlan: 'Bağlı · {plan}',
  cardMetered: 'Oturum açıldı, ancak abonelikle değil',
  cardMeteredAccepted: 'Kullanımda · kullanım başına ücretlendirilir',
  cardError: 'Bağlantı denetlenemedi',
  cardErrNeedsUpdate:
    'Bu bilgisayardaki {provider} programı çok eski. Güncelleyip yeniden denetleyin.',
  cardErrNeedsUpdateVersion:
    'Bu bilgisayardaki {provider} programı ({version}) çok eski; {minimum} veya daha yeni bir sürüm gerekiyor. Bir terminalde {command} komutunu çalıştırıp yeniden denetleyin.',
  cardErrNeedsUpdatePath: 'Bu uygulamanın çalıştırdığı dosya:',
  cardErrNeedsUpdateWindows:
    '{provider} programını WSL (Ubuntu) içinde veya başka bir klasörde güncellemek bu dosyayı değiştirmez. {command} komutunu Windows PowerShell’de çalıştırın.',
  cardErrTimeout: '{provider} programı zamanında yanıt vermedi. Birazdan yeniden denetleyin.',
  cardErrFailed: '{provider} denetlenirken bir sorun oluştu. Yeniden denetleyin.',
  actionInstall: 'Yükle',
  actionLogin: 'Oturum aç',
  actionLoginWindow: 'Tarayıcı açılmadı mı?',
  actionLoginWithCode: 'Tarayıcı bir kod mu gösterdi?',
  actionLoginBrowser: 'Bunun yerine tarayıcıda oturum aç',
  actionRecheck: 'Yeniden denetle',
  actionAcceptMetered: 'Yine de kullan',
  actionInstallHelp: 'Resmî yükleme kılavuzu',
  actionOpenSettings: 'Ayarları aç',
  actionDismiss: 'Kapat',
  actionSwitchAccount: 'Başka bir hesapla oturum aç',
  actionLogout: 'Oturumu kapat',
  installNote: '{vendor} için resmî yükleme komutu yeni bir terminal penceresinde çalışır.',
  loginNote: 'Açılan oturum açma sayfası {vendor} şirketinin kendi sayfasıdır.',
  signingInBrowserNote:
    'Açılan tarayıcıda {vendor} hesabınızla oturum açın ve erişime izin verin. Bitirdiğinizde kendiliğinden bağlanır.',
  signingInWindowNote:
    'Yeni açılan oturum açma penceresinin üstündeki kılavuzu izleyin. Tarayıcınızda açılan {vendor} sayfasında oturum açın: pencere sonra kapanır ve bağlanırsınız. Daha önce açık olan bir oturum açma sayfası artık çalışmaz; onu kapatın.',
  meteredWarning: 'Bu bir abonelik değil: kullandığınız kadar ücretlendirilirsiniz.',
  meteredMeaning:
    'Bu oturum bir API anahtarı, kullanım başına ödeme yapan bir hesap ya da türü doğrulanamayan bir oturum olabilir. “Yine de kullan” AI’ın bu bağlantıyla çalışmasına izin verir ve her istek o hesaba faturalandırılır.',
  connectTitle: 'Başlamak için bir AI bağlayın',
  connectBody:
    'AI, zaten sahip olduğunuz Claude veya Codex aboneliğiyle çalışır. API anahtarı gerekmez.',
  connectProviderTitle: '{provider} bağlantısı şu anda kullanılamıyor',
  connectKeyBody:
    '{provider} kurulumu tamamlanmadı. Ayarlar’da tamamlayın veya başka bir AI seçin.',
  errNotConnected:
    'Bağlı AI yok. Önce bir Claude veya Codex aboneliği ya da ücretsiz bir AI bağlayın.',
  errNotInstalled: 'Bu bilgisayarda {provider} programı bulunamadı.',
  errSignedOut: '{provider} oturumunun süresi doldu. Devam etmek için yeniden oturum açın.',
  errRateLimit: '{provider} abonelik kotası tükendi.',
  errRateLimitReset: '{provider} abonelik kotası tükendi. {time} itibarıyla sıfırlanır.',
  errUnsafeTools:
    '{provider} programı kendi araçları açıkken başladı, bu yüzden güvenlik için çalışma durduruldu.',
  errMeteredNotAccepted:
    '{provider} bağlantısı henüz izin vermediğiniz, kullanım başına ödeme yapan bir oturum. Kullanmak için bağlantı ayarlarında “Yine de kullan” seçeneğini seçin.',
  errNeedsUpdate: '{provider} programı bu özellik için çok eski. Güncelleyip yeniden deneyin.',
  errHeadlessLimit: 'Otomatik istekler için saatlik sınıra ulaşıldı.',
  errHeadlessLimitReset:
    'Otomatik istekler için saatlik sınıra ulaşıldı. {time} itibarıyla yeniden istek gönderilebilir.',
  connectFreeHint:
    'Aboneliğiniz yok mu? Ayarlar’da yaklaşık bir dakikada ücretsiz bir AI bağlayabilirsiniz.',
  actionConnectFree: 'Ücretsiz AI bağla',
  errFreeLimit:
    'Bugünkü ücretsiz kullanım hakkı tükendi. Yarın yeniden deneyin veya Ayarlar’da başka bir AI seçin.',
  errFreeLimitReset:
    'Bugünkü ücretsiz kullanım hakkı tükendi. {time} itibarıyla yeniden kullanabilirsiniz.',
  continueWith: '{provider} ile devam et',
  continueMeteredNote:
    '{provider} bağlantısı bir abonelik değil: devam etmek kullanım başına ücretlendirilir.',
  usageLine: '%{percent} kullanıldı · {time} itibarıyla sıfırlanır',
  usageWindowFiveHour: '5 saatlik sınır',
  usageWindowSevenDay: '7 günlük sınır',
  noticeTitle: 'AI’ı aboneliğinizle kullanmadan önce',
  noticeSend:
    'Belge içeriği ve sohbetiniz kendi hesabınız üzerinden Anthropic veya OpenAI’a gönderilir. Her istek ayrıca “AI karar verir” olarak ayarlanmış her becerinin adını, başlığını ve açıklamasını taşır; kullanımdaki beceriler ve AI’ın okuduğu beceri dosyaları da bunlarla birlikte gider.',
  noticeTraining:
    'Bu içeriğin AI eğitmek için kullanılıp kullanılmayacağına o şirketteki kendi hesap ayarlarınız karar verir.',
  noticeCodexHistory:
    'Bu uygulama Codex’te sohbet geçmişi kaydetmeyi kapatır, ancak Codex yine de bu bilgisayarda kendi tanılama günlüklerini tutabilir.',
  noticePdfWholeDocument:
    'PDF düzenleyicide AI ile sayfa okuma ve belge çevirisi, sayfa görüntülerini ve belgenin tüm metnini gönderebilir.',
  noticeAck: 'Anladım',
  codexNotice:
    'Bir uygulama içinde Codex aboneliği kullanmak OpenAI’ın resmî olarak önerdiği bir yöntem değildir.',
  truncatedNotice: 'Giriş çok uzundu, bu yüzden gönderilmeden önce bir kısmı kesildi.',
  pickerAuto: 'Otomatik',
  pickerAutoUsing: 'Otomatik · {provider}',
  pickerAutoUsingModel: 'Otomatik · {provider} · {model}',
  pickerDefaultModel: 'Varsayılan model',
  pickerDefaultModelNamed: 'Varsayılan model · {model}',
  pickerSubscription: 'Abonelik',
  pickerPaid: 'Ücretli',
  pickerPaidTitle: 'Kullanım başına ücretlendirilir, abonelik kapsamında değildir',
  pickerNotConnected: 'AI bağla',
  guideQuestion: 'Hangi AI’ı zaten kullanıyorsunuz?',
  guidePathClaudeTitle: 'Claude için ödeme yapıyorum',
  guidePathClaudeBody: 'Pro veya Max planı gerekir. Ücretsiz bir Claude hesabı bağlanamaz.',
  guidePathCodexTitle: 'ChatGPT kullanıyorum',
  guidePathCodexBody:
    'ChatGPT hesabınızla OpenAI’ın Codex programında oturum açın. Ücretsiz plan yalnızca az bir kullanıma izin verir.',
  guidePathFreeTitle: 'Henüz hiçbiri',
  guidePathFreeBody:
    'Yaklaşık bir dakikada ücretsiz bir AI bağlayın. Ücretsiz kullanırken gönderdikleriniz o şirketin AI’ını geliştirmek için kullanılabilir.',
  guideBack: 'Başka bir yol seç',
  guideBadgeReady: 'Bağlı',
  guideBadgeInstalled: 'Yüklü',
  guideBadgeCheck: 'Dikkat gerekiyor',
  guideStepsLabel: 'Bağlantı adımları',
  stepInstall: 'Programı yükle',
  stepLogin: 'Oturum aç',
  stepReady: 'Bağlı',
  installReturnNote:
    'O penceredeki yükleme bittiğinde buraya dönün. Uygulama kendiliğinden yeniden denetler.',
  loginHowNote:
    'Düğmeye bastığınızda bir tarayıcı açılır. {vendor} hesabınızla oturum açıp İzin ver’e basın; bağlantı kendiliğinden tamamlanır.',
  signingInStalledNote:
    'Tarayıcınızda hiçbir oturum açma sayfası açılmadıysa aşağıdaki düğmeyle oturum açma penceresini açın. Hâlâ tarayıcıda oturum açıyorsanız bunun yerine orada bitirin: düğme o oturum açmayı durdurup baştan başlatır.',
  actionLoginWindowOpen: 'Oturum açma penceresini aç',
  loginUnfinishedNote:
    'Oturum açma tamamlanmadı. Tarayıcı bir kod gösterdiyse kodun oturum açma penceresine yapıştırılması gerekir: pencereyi açıp orada yeniden oturum açın. Daha önce gösterilen bir kod artık çalışmaz.',
  loginWindowTitle: '{provider} oturum açma',
  loginWindowIntro:
    'Bu, {provider} programının oturum açma penceresidir. Aşağıdaki İngilizce metin {provider} programından gelir.',
  loginWindowStepBrowser:
    '{vendor} oturum açma sayfası tarayıcınızda açıldığında oturum açın ve erişime izin verin. Bu pencere sonra kendiliğinden kapanır.',
  loginWindowStepAddress:
    'Tarayıcı açılmadıysa aşağıda https:// ile başlayan adresin üzerinden fareyle geçerek seçin, sonra kopyalamak için sağ tıklayın. Oturum açma sayfasını açmak için tarayıcınızın adres çubuğuna yapıştırın.',
  loginWindowStepCode:
    'Oturum açtıktan sonra tarayıcı bir kod gösterirse kodun tamamını kopyalayın (kopyalama düğmesi varsa onu kullanın). Bu pencerenin içine bir kez sağ tıklayıp yapıştırın, sonra Enter’a basın. Yapıştırılan kodun görünmemesi normaldir.',
  loginWindowStepInvalid:
    'Eğer “Invalid code” görürseniz kod tam kopyalanmamıştır. Bu pencereyi açık tutun, kodu yeniden kopyalayıp yapıştırın.',
  loginWindowClosing:
    'Oturum açma tamamlanmadı. Yukarıdaki iletileri okuduktan sonra bu pencereyi kapatmak için Enter’a basın. Yeniden denemek için oturum açma düğmesine yeniden basın.',
  actionCancelLogin: 'Oturum açmayı iptal et',
  actionUpdate: 'Güncelle',
  updateNote:
    '{vendor} için resmî güncelleme bastığınızda yeni bir pencerede çalışır. Orada bittiğinde buraya dönün.',
  guideInfoHint:
    'Hâlâ takıldınız mı? Bağlantı ayrıntılarını kopyalayıp size yardım edene gönderin. Bunlarda hesap ve dosya yolu yoktur.',
  actionCopyInfo: 'Yardım için ayrıntıları kopyala',
  copyInfoDone: 'Kopyalandı',
  actionConnectHelp: 'Her adımı ekranda görün (sayfa Korece)',
} satisfies Record<keyof typeof zh, string>
