import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Ekip Proje',
  description: 'Ekip Proje gizlilik politikası ve kişisel verilerin korunması.',
};

export default function GizlilikPage() {
  return (
    <div className="min-h-screen bg-warm-concrete">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue py-24 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-topo-pattern opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              Gizlilik Politikası
            </h1>
            <p className="font-manrope text-xl text-white/80 leading-relaxed">
              Kişisel verilerinizin güvenliği bizim için önceliklidir
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

            {/* 1. Giriş */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                1. Giriş
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Ekip Proje olarak, kişisel verilerinizin gizliliğine ve güvenliğine büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.
              </p>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.
              </p>
            </div>

            {/* 2. Toplanan Veriler */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                2. Toplanan Kişisel Veriler
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Web sitemiz üzerinden aşağıdaki kişisel veriler toplanabilir:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>İletişim Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarası
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Kurumsal Bilgiler:</strong> Şirket adı, pozisyon, sektör bilgisi (iş başvurularında)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, işletim sistemi, çerez bilgileri
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>İletişim İçeriği:</strong> İletişim formları ve e-postalar yoluyla gönderilen mesajlar
                  </span>
                </li>
              </ul>
            </div>

            {/* 3. Kullanım Amaçları */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                3. Verilerin Kullanım Amaçları
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Toplanan kişisel verileriniz aşağıdaki amaçlarla kullanılmaktadır:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İletişim taleplerinize yanıt vermek ve müşteri hizmetleri sağlamak
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Proje teklifleri hazırlamak ve iş süreçlerini yönetmek
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İş başvurularını değerlendirmek ve insan kaynakları süreçlerini yürütmek
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Web sitesi performansını analiz etmek ve kullanıcı deneyimini iyileştirmek
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yasal yükümlülükleri yerine getirmek
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Veri Güvenliği */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                4. Veri Güvenliği
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Kişisel verilerinizin güvenliğini sağlamak için aşağıdaki teknik ve idari tedbirler alınmıştır:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    SSL/TLS şifreleme ile güvenli veri iletimi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Güvenli sunucu altyapısı ve düzenli güvenlik güncellemeleri
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Erişim kontrolü ve yetkilendirme sistemleri
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Düzenli veri yedekleme ve kurtarma prosedürleri
                  </span>
                </li>
              </ul>
            </div>

            {/* 5. Çerezler */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                5. Çerez Politikası
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için çerezler kullanmaktadır. Kullanılan çerez türleri:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerini sağlar
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Analitik Çerezler:</strong> Site kullanımını ve performansını ölçer
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>İşlevsel Çerezler:</strong> Tercihlerinizi hatırlar ve özelleştirilmiş deneyim sunar
                  </span>
                </li>
              </ul>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mt-4">
                Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz.
              </p>
            </div>

            {/* 6. Veri Saklama */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                6. Veri Saklama Süresi
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed">
                Kişisel verileriniz, toplama amacının gerektirdiği süre boyunca ve yasal saklama yükümlülüklerine uygun olarak saklanır. Saklama süresi sona erdiğinde verileriniz silinir, yok edilir veya anonim hale getirilir.
              </p>
            </div>

            {/* 7. Haklarınız */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                7. KVKK Kapsamındaki Haklarınız
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Kişisel verilerinizin işlenip işlenmediğini öğrenme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İşlenmişse bilgi talep etme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Eksik veya yanlış işlenmişse düzeltilmesini isteme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Silinmesini veya yok edilmesini isteme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Aktarıldığı üçüncü kişilere bildirilmesini isteme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonuç doğmasına itiraz etme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme
                  </span>
                </li>
              </ul>
            </div>

            {/* 8. İletişim */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                8. İletişim ve Başvuru
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Kişisel verilerinizle ilgili taleplerinizi aşağıdaki kanallardan iletebilirsiniz:
              </p>
              <div className="bg-warm-concrete p-6 rounded-lg">
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>E-posta:</strong> <a href="mailto:kvkk@ekipproje.com" className="text-muted-gold hover:text-bronze transition-colors">kvkk@ekipproje.com</a>
                </p>
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>Posta Adresi:</strong> [Şirket Adresi]
                </p>
                <p className="font-manrope text-dark-carbon/80 text-sm mt-4">
                  Başvurularınız en geç 30 gün içinde değerlendirilir ve sonuçlandırılır.
                </p>
              </div>
            </div>

            {/* 9. Değişiklikler */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                9. Politika Güncellemeleri
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed">
                Bu Gizlilik Politikası, yasal düzenlemelerdeki değişiklikler veya iş süreçlerindeki güncellemeler doğrultusunda revize edilebilir. Önemli değişiklikler yapıldığında web sitemiz üzerinden bilgilendirme yapılacaktır.
              </p>
            </div>

            {/* İlgili Sayfalar */}
            <div className="border-t-2 border-dark-carbon/10 pt-8">
              <h3 className="font-playfair font-bold text-xl text-dark-carbon mb-4">
                İlgili Belgeler
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/kvkk"
                  className="px-6 py-3 bg-muted-gold/10 hover:bg-muted-gold/20 text-dark-carbon font-manrope rounded-lg transition-colors"
                >
                  KVKK Aydınlatma Metni
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
