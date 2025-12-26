import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni - Ekip Proje',
  description: 'Ekip Proje KVKK (Kişisel Verilerin Korunması Kanunu) aydınlatma metni.',
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-warm-concrete">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue py-24 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-topo-pattern opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              KVKK Aydınlatma Metni
            </h1>
            <p className="font-manrope text-xl text-white/80 leading-relaxed">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme
            </p>
            <p className="font-roboto-mono text-sm text-white/60 mt-4">
              Son Güncelleme: 26 Aralık 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">

            {/* Giriş */}
            <div className="mb-12">
              <div className="bg-muted-gold/10 border-l-4 border-muted-gold p-6 rounded-lg mb-6">
                <p className="font-manrope text-dark-carbon/90 leading-relaxed">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla <strong>Ekip Proje Mimarlık ve Mühendislik</strong>, kişisel verilerinizin işlenmesine ilişkin sizleri bilgilendirmek ister.
                </p>
              </div>
            </div>

            {/* 1. Veri Sorumlusu */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                1. Veri Sorumlusu ve Temsilcisi
              </h2>
              <div className="bg-warm-concrete p-6 rounded-lg">
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>Ticaret Unvanı:</strong> Ekip Proje Mimarlık ve Mühendislik
                </p>
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>Adres:</strong> [Şirket Adresi]
                </p>
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>E-posta:</strong> <a href="mailto:kvkk@ekipproje.com" className="text-muted-gold hover:text-bronze transition-colors">kvkk@ekipproje.com</a>
                </p>
                <p className="font-manrope text-dark-carbon/80">
                  <strong>Telefon:</strong> <a href="tel:+902121234567" className="text-muted-gold hover:text-bronze transition-colors">+90 212 123 45 67</a>
                </p>
              </div>
            </div>

            {/* 2. İşlenen Kişisel Veriler */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                2. İşlenen Kişisel Veriler
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-6">
                Şirketimiz tarafından işlenen kişisel veri kategorileri aşağıda belirtilmiştir:
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-muted-gold pl-6">
                  <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">
                    Kimlik Bilgileri
                  </h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    Ad, soyad, T.C. kimlik numarası, pasaport numarası, doğum tarihi, doğum yeri
                  </p>
                </div>

                <div className="border-l-4 border-muted-gold pl-6">
                  <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">
                    İletişim Bilgileri
                  </h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    Telefon numarası, e-posta adresi, adres bilgileri
                  </p>
                </div>

                <div className="border-l-4 border-muted-gold pl-6">
                  <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">
                    Müşteri İşlem Bilgileri
                  </h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    Proje talepleri, teklif bilgileri, sözleşme verileri, fatura bilgileri, ödeme bilgileri
                  </p>
                </div>

                <div className="border-l-4 border-muted-gold pl-6">
                  <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">
                    Özlük Bilgileri (İş Başvuruları)
                  </h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    Özgeçmiş, eğitim durumu, deneyim bilgileri, sertifika ve referanslar
                  </p>
                </div>

                <div className="border-l-4 border-muted-gold pl-6">
                  <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">
                    İşlem Güvenliği Bilgileri
                  </h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    IP adresi, çerez kayıtları, tarayıcı bilgileri, cihaz bilgileri, log kayıtları
                  </p>
                </div>
              </div>
            </div>

            {/* 3. İşleme Amaçları */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                3. Kişisel Verilerin İşlenme Amaçları
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Mimarlık ve mühendislik hizmetlerinin sunulması
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Müşteri ilişkileri yönetimi ve iletişim
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Teklif hazırlama ve sözleşme süreçlerinin yürütülmesi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Proje yönetimi ve koordinasyonu
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Faturalama ve ödeme işlemlerinin gerçekleştirilmesi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İnsan kaynakları süreçlerinin yönetimi (işe alım, değerlendirme)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İş sürekliliği ve bilgi güvenliğinin sağlanması
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yasal yükümlülüklerin yerine getirilmesi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yetkili kişi, kurum ve kuruluşlara bilgi verilmesi
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Hukuki Sebepler */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                4. Kişisel Verilerin İşlenme Hukuki Sebepleri
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayalı olarak işlenmektedir:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Açık rızanızın bulunması
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Kanunlarda açıkça öngörülmesi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması
                  </span>
                </li>
              </ul>
            </div>

            {/* 5. Veri Aktarımı */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                5. Kişisel Verilerin Aktarılması
              </h2>
              <p className="font-manrore text-dark-carbon/80 leading-relaxed mb-4">
                Kişisel verileriniz, yukarıda belirtilen amaçlar doğrultusunda ve KVKK'da öngörülen güvenlik standartları çerçevesinde aşağıdaki taraflara aktarılabilir:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İş ortaklarımız ve hizmet sağlayıcılarımız (muhasebe, hukuk, IT hizmetleri)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yetkili kamu kurum ve kuruluşları (vergi dairesi, SGK, mahkemeler vb.)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yurt dışındaki bulut hizmet sağlayıcıları (veri güvenliği ve yedekleme amacıyla)
                  </span>
                </li>
              </ul>
            </div>

            {/* 6. Toplama Yöntemi */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                6. Kişisel Verilerin Toplanma Yöntemi
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Web sitesi iletişim formları
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    E-posta ve telefon iletişimi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yüz yüze görüşmeler ve toplantılar
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Sözleşme ve form imzalamaları
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Otomatik sistemler (çerezler, log kayıtları)
                  </span>
                </li>
              </ul>
            </div>

            {/* 7. İlgili Kişi Hakları */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                7. KVKK Kapsamındaki Haklarınız
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-6">
                KVKK'nın 11. maddesi uyarınca, ilgili kişi olarak aşağıdaki haklara sahipsiniz:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ Bilgi Talep Etme</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    Kişisel verilerinizin işlenip işlenmediğini öğrenme
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ Erişim Hakkı</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    İşlenmişse bilgi talep etme
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ Amaç Öğrenme</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    İşlenme amacını ve kullanımını öğrenme
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ Aktarım Bilgisi</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    Üçüncü kişilere aktarımı öğrenme
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ Düzeltme</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    Eksik/yanlış verilerin düzeltilmesini isteme
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ Silme/Yok Etme</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    Verilerin silinmesini/yok edilmesini isteme
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ Bildirim Talebi</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    Üçüncü kişilere bildirilmesini isteme
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <p className="font-manrope text-dark-carbon/80 font-semibold mb-1">✓ İtiraz Hakkı</p>
                  <p className="font-manrope text-dark-carbon/60 text-sm">
                    Otomatik sistemlere itiraz etme
                  </p>
                </div>
              </div>
            </div>

            {/* 8. Başvuru Yöntemi */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                8. Haklarınızı Kullanma ve Başvuru Yöntemi
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-6">
                Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerle başvuruda bulunabilirsiniz:
              </p>

              <div className="bg-muted-gold/10 border-2 border-muted-gold/30 rounded-xl p-6 mb-6">
                <h3 className="font-manrope font-bold text-lg text-dark-carbon mb-4">Başvuru Kanalları:</h3>

                <div className="space-y-4">
                  <div>
                    <p className="font-manrope font-semibold text-dark-carbon mb-1">📧 E-posta ile:</p>
                    <p className="font-manrope text-dark-carbon/70 text-sm ml-6">
                      <a href="mailto:kvkk@ekipproje.com" className="text-muted-gold hover:text-bronze transition-colors">kvkk@ekipproje.com</a>
                    </p>
                  </div>

                  <div>
                    <p className="font-manrope font-semibold text-dark-carbon mb-1">📮 Posta ile:</p>
                    <p className="font-manrope text-dark-carbon/70 text-sm ml-6">
                      [Şirket Adresi]<br />
                      "KVKK Başvurusu" yazarak
                    </p>
                  </div>

                  <div>
                    <p className="font-manrope font-semibold text-dark-carbon mb-1">✍️ Islak İmzalı Dilekçe ile:</p>
                    <p className="font-manrope text-dark-carbon/70 text-sm ml-6">
                      Noter onaylı başvuru formu
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-warm-concrete p-6 rounded-lg">
                <h4 className="font-manrope font-bold text-dark-carbon mb-3">⏱️ Başvuru Süreci:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="font-manrope text-dark-carbon/80">
                    • Başvurunuz en geç <strong>30 gün içinde</strong> değerlendirilir
                  </li>
                  <li className="font-manrope text-dark-carbon/80">
                    • İşlem ücrete tabi ise <strong>Kişisel Verileri Koruma Kurulu tarifesi</strong> uygulanır
                  </li>
                  <li className="font-manrope text-dark-carbon/80">
                    • Kimlik doğrulama için <strong>T.C. kimlik numarası fotokopisi</strong> gereklidir
                  </li>
                  <li className="font-manrope text-dark-carbon/80">
                    • Yanıt tercihinizi (e-posta/posta) belirtmeniz önerilir
                  </li>
                </ul>
              </div>
            </div>

            {/* İlgili Sayfalar */}
            <div className="border-t-2 border-dark-carbon/10 pt-8">
              <h3 className="font-playfair font-bold text-xl text-dark-carbon mb-4">
                İlgili Belgeler
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/gizlilik"
                  className="px-6 py-3 bg-muted-gold/10 hover:bg-muted-gold/20 text-dark-carbon font-manrope rounded-lg transition-colors"
                >
                  Gizlilik Politikası
                </Link>
                <Link
                  href="/kullanim-kosullari"
                  className="px-6 py-3 bg-muted-gold/10 hover:bg-muted-gold/20 text-dark-carbon font-manrope rounded-lg transition-colors"
                >
                  Kullanım Koşulları
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
