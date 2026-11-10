import type { zh } from './zh'

export const tr = {
  driveNav: 'Google Drive',
  driveDesc:
    'Drive dosyalarınızı GenOffice içinde açıp düzenleyin; kaydettiğinizde dosyalar Drive’a geri konur. Ayrıca AI’ın Drive’ınızdaki dosyaları bulup okumasına izin verebilirsiniz.',
  driveConnect: 'Google Drive’a bağlan',
  driveConnecting: 'Tarayıcıda Google hesabınızla oturum açın ve erişime izin verin…',
  driveCancel: 'İptal',
  driveConnectedAs: '{email} olarak bağlandı',
  driveDisconnect: 'Bağlantıyı kes',
  driveDisconnectConfirm:
    'Bu işlem Drive oturumunu bu bilgisayardan kaldırır ve Google’dan GenOffice erişimini iptal etmesini ister. Bu bilgisayardaki mevcut kopyalar kalır.',
  driveDisconnectYes: 'Bağlantıyı kes',
  driveNotPersisted:
    'Bu bilgisayar oturum bilgilerini şifreli tutamıyor, bu nedenle uygulamayı kapattığınızda bağlantı sona erer.',
  driveExpired:
    'Google bağlantıyı sona erdirdi: erişim kaldırıldı veya oturumun süresi doldu. Yeniden bağlanın.',
  driveAiAccess: 'AI’ın Drive’daki dosyaları bulup okumasına izin ver',
  driveAiAccessDesc:
    'Açıkken editörlerdeki AI tüm Drive’ınızda arama yapabilir ve dosya metnini okuyabilir. Okuduğu içerik kullandığınız AI sağlayıcısına gönderilir. AI, Drive dosyalarını değiştiremez, silemez veya paylaşamaz.',
  drivePrivacy:
    'Dosya listeleri ve içerikleri yalnızca bu bilgisayar ile Google arasında gider. GenOffice’i yapanların sunucusundan asla geçmez.',
  driveFailDenied: 'Google izin vermediği için bağlantı kurulmadı.',
  driveFailScope:
    'Drive erişimi işaretlenmediği için bağlantı kurulmadı. Yeniden bağlanın ve Drive öğesini işaretleyin.',
  driveFailTimeout: 'Oturum açma 10 dakika içinde tamamlanmadı. Yeniden deneyin.',
  driveFailNetwork: 'Google’a ulaşılamadı. İnternet bağlantınızı denetleyip yeniden deneyin.',
  driveMyDrive: 'Drive’ım',
  driveShared: 'Benimle paylaşılanlar',
  driveRecent: 'Son kullanılanlar',
  driveSearchPlaceholder: 'Drive’da ara',
  driveSearchResults: '“{q}” için sonuçlar',
  driveRefresh: 'Yenile',
  driveNotConnectedTitle: 'Google Drive bağlı değil',
  driveNotConnectedBody:
    'Bağlandıktan sonra Drive dosyalarını burada açıp düzenleyebilirsiniz; kaydettiğinizde dosyalar Drive’a geri konur.',
  driveOpenSettings: 'Ayarlar’dan bağlan',
  driveEmpty: 'Dosya yok.',
  driveLoading: 'Yükleniyor…',
  driveLoadMore: 'Daha fazla göster',
  driveOpening: 'Açılıyor…',
  driveGoogleBadge: 'Google biçimi',
  driveGoogleNote:
    'Bir Google belgesi Office dosyası olarak açılır. Kaydetmek orijinali olduğu gibi bırakır ve aynı klasöre bir Office dosyası kaydeder.',
  driveReadOnly: 'Yalnızca görüntüleme',
  driveReadOnlyNote:
    'Bu dosyayı düzenleyemezsiniz. Kaydettiğinizde Drive’a bir kopya kaydedilip kaydedilmeyeceği sorulur.',
  driveUnsupported: 'Bu uygulama bu tür dosyayı açamıyor.',
  driveErrNotConnected: 'Google Drive bağlantısı kesildi. Ayarlar’dan yeniden bağlanın.',
  driveErrNotFound: 'Dosya bulunamadı. Silinmiş olabilir veya bu hesap onu göremiyor.',
  driveErrForbidden: 'Bu hesap bu dosyayı indiremiyor olabilir.',
  driveErrTooLarge: 'Dosya açılamayacak kadar büyük.',
  driveErrRateLimit: 'Google istekleri bir süre bekletiyor. Kısa süre sonra yeniden deneyin.',
  driveErrNetwork: 'Google Drive’a ulaşılamadı. İnternet bağlantınızı denetleyin.',
  driveErrDisk: 'Dosya bu bilgisayara kaydedilemedi.',
  drivePickTitle: 'Drive’dan ekle',
  drivePickAttach: 'Ekle',
  drivePickSelected: '{n} seçildi',
  drivePickWorking: 'Dosyalar Drive’dan alınıyor…',
  drivePickFolderNote: 'Bir klasörü işaretlemek içindeki en fazla 20 dosyayı ekler.',
  drivePickGoogleNote: 'Bir Google belgesi Office dosyası olarak eklenir.',
} satisfies Record<keyof typeof zh, string>
