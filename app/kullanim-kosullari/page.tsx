import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları - Ekip Proje',
  description: 'Ekip Proje web sitesi kullanım koşulları ve hizmet şartları.',
};

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-warm-concrete">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue py-24 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-topo-pattern opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              Kullanım Koşulları
            </h1>
            <p className="font-manrope text-xl text-white/80 leading-relaxed">
              Web sitesi kullanım şartları ve hizmet sözleşmesi
            </p>
            <p className="font-roboto-mono text-sm text-white/60 mt-4">
              Yürürlük Tarihi: 26 Aralık 2025
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
                  Bu web sitesini kullanarak, aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız lütfen siteyi kullanmayınız.
                </p>
              </div>
            </div>

            {/* 1. Genel Hükümler */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                1. Genel Hükümler
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                <strong>Ekip Proje Mimarlık ve Mühendislik</strong> ("Ekip Proje", "Biz", "Şirket") web sitesi <a href="https://ekipproje.com" className="text-muted-gold hover:text-bronze transition-colors">ekipproje.com</a> adresinden sunulan hizmetlerin kullanımına ilişkin şartlar ve koşullar bu belgede düzenlenmiştir.
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Bu koşullar, siteyi ziyaret eden tüm kullanıcılar için bağlayıcıdır.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Şirket, bu koşulları önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Güncel koşullar her zaman bu sayfada yayımlanacaktır.
                  </span>
                </li>
              </ul>
            </div>

            {/* 2. Hizmet Kapsamı */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                2. Hizmet Kapsamı
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Ekip Proje web sitesi aşağıdaki hizmetleri sunmaktadır:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-warm-concrete p-4 rounded-lg">
                  <h3 className="font-manrope font-semibold text-dark-carbon mb-2">📐 Proje Danışmanlığı</h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    Mimarlık ve mühendislik projelerinde profesyonel danışmanlık
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <h3 className="font-manrope font-semibold text-dark-carbon mb-2">🏗️ Yapı Denetimi</h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    İnşaat ve yapı projelerinde teknik denetim hizmetleri
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <h3 className="font-manrope font-semibold text-dark-carbon mb-2">📊 Proje Yönetimi</h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    Entegre proje yönetimi ve koordinasyon
                  </p>
                </div>

                <div className="bg-warm-concrete p-4 rounded-lg">
                  <h3 className="font-manrope font-semibold text-dark-carbon mb-2">📧 İletişim</h3>
                  <p className="font-manrope text-dark-carbon/70 text-sm">
                    Bilgi talebi ve teklif alma imkanı
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Kullanıcı Yükümlülükleri */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                3. Kullanıcı Yükümlülükleri
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Web sitemizi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">✗</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Yasalara aykırı, zararlı, tehditkar, kötüye kullanıma yönelik içerik paylaşmamak
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">✗</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Site güvenliğini tehlikeye atacak virüs, kötü amaçlı yazılım göndermemek
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">✗</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Fikri mülkiyet haklarını ihlal etmemek
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">✗</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Doğru ve güncel bilgi vermek (iletişim formlarında)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1 font-bold">✗</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Site içeriğini izinsiz kopyalamamak, dağıtmamak
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Fikri Mülkiyet Hakları */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                4. Fikri Mülkiyet Hakları
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Bu web sitesindeki tüm içerik, tasarım, logo, metin, görsel, yazılım ve diğer materyaller Ekip Proje'nin mülkiyetindedir ve telif hakkı yasalarıyla korunmaktadır.
              </p>
              <div className="bg-warm-concrete p-6 rounded-lg">
                <h3 className="font-manrope font-bold text-dark-carbon mb-3">Korunan İçerikler:</h3>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li className="font-manrope text-dark-carbon/80">© Şirket logosu ve marka</li>
                  <li className="font-manrope text-dark-carbon/80">© Web tasarımı ve arayüz</li>
                  <li className="font-manrope text-dark-carbon/80">© Proje görselleri ve fotoğraflar</li>
                  <li className="font-manrope text-dark-carbon/80">© Yazılı içerik ve makaleler</li>
                  <li className="font-manrope text-dark-carbon/80">© Teknik çizimler ve planlar</li>
                  <li className="font-manrope text-dark-carbon/80">© Videolar ve multimedya</li>
                </ul>
                <p className="font-manrope text-dark-carbon/60 text-xs mt-4">
                  * Ticari kullanım için yazılı izin gerekmektedir.
                </p>
              </div>
            </div>

            {/* 5. Sorumluluk Reddi */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                5. Sorumluluk Sınırlamaları
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Ekip Proje, aşağıdaki konularda sorumluluk kabul etmemektedir:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Kesinti ve Hatalar:</strong> Teknik arızalar, bakım çalışmaları veya üçüncü taraf hizmet sağlayıcılardan kaynaklanan kesintiler
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Dış Bağlantılar:</strong> Üçüncü taraf web sitelerine yönlendiren bağlantıların içeriği ve güvenliği
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Kullanıcı İçeriği:</strong> Kullanıcılar tarafından gönderilen form içerikleri ve mesajlar
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">•</span>
                  <span className="font-manrope text-dark-carbon/80">
                    <strong>Veri Kaybı:</strong> İnternet bağlantısı veya teknik sorunlardan kaynaklanan veri kayıpları
                  </span>
                </li>
              </ul>
            </div>

            {/* 6. Hizmet Değişiklikleri */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                6. Hizmet Değişiklikleri ve Fesih
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Ekip Proje aşağıdaki haklara sahiptir:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">→</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Web sitesinin içeriğini, tasarımını ve işlevlerini değiştirme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">→</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Hizmetleri geçici veya kalıcı olarak durdurma
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">→</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Kullanım koşullarını güncelleme
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-muted-gold mr-3 mt-1">→</span>
                  <span className="font-manrope text-dark-carbon/80">
                    Kural ihlali yapan kullanıcıların erişimini engelleme
                  </span>
                </li>
              </ul>
            </div>

            {/* 7. Gizlilik */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                7. Gizlilik ve Kişisel Veriler
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Kişisel verilerinizin toplanması, işlenmesi ve korunmasına ilişkin detaylı bilgi için <Link href="/gizlilik" className="text-muted-gold hover:text-bronze transition-colors font-semibold">Gizlilik Politikamızı</Link> ve <Link href="/kvkk" className="text-muted-gold hover:text-bronze transition-colors font-semibold">KVKK Aydınlatma Metnimizi</Link> inceleyiniz.
              </p>
              <div className="bg-night-blue/5 border-l-4 border-night-blue p-4 rounded">
                <p className="font-manrope text-dark-carbon/80 text-sm">
                  <strong>Önemli:</strong> Web sitemizi kullanarak, kişisel verilerinizin Gizlilik Politikamızda belirtilen şekilde işlenmesini kabul etmiş olursunuz.
                </p>
              </div>
            </div>

            {/* 8. Uygulanacak Hukuk */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                8. Uygulanacak Hukuk ve Yetki
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed">
                Bu Kullanım Koşulları, <strong>Türkiye Cumhuriyeti</strong> kanunlarına tabidir. Bu sözleşmeden doğacak her türlü uyuşmazlıkta <strong>İstanbul Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
              </p>
            </div>

            {/* 9. İletişim */}
            <div className="mb-12">
              <h2 className="font-playfair font-bold text-3xl text-dark-carbon mb-4">
                9. İletişim Bilgileri
              </h2>
              <p className="font-manrope text-dark-carbon/80 leading-relaxed mb-4">
                Kullanım koşulları ile ilgili sorularınız için:
              </p>
              <div className="bg-warm-concrete p-6 rounded-lg">
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>Şirket:</strong> Ekip Proje Mimarlık ve Mühendislik
                </p>
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>E-posta:</strong> <a href="mailto:info@ekipproje.com" className="text-muted-gold hover:text-bronze transition-colors">info@ekipproje.com</a>
                </p>
                <p className="font-manrope text-dark-carbon/80 mb-2">
                  <strong>Telefon:</strong> <a href="tel:+902121234567" className="text-muted-gold hover:text-bronze transition-colors">+90 212 123 45 67</a>
                </p>
                <p className="font-manrope text-dark-carbon/80">
                  <strong>Adres:</strong> [Şirket Adresi]
                </p>
              </div>
            </div>

            {/* Kabul */}
            <div className="bg-gradient-to-r from-muted-gold/10 to-bronze/10 p-8 rounded-xl border-2 border-muted-gold/30">
              <h3 className="font-playfair font-bold text-2xl text-dark-carbon mb-4 text-center">
                Kullanım Koşullarının Kabulü
              </h3>
              <p className="font-manrope text-dark-carbon/80 text-center leading-relaxed">
                Bu web sitesini kullanmaya devam ederek, yukarıda belirtilen tüm kullanım koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
              </p>
            </div>

            {/* İlgili Sayfalar */}
            <div className="border-t-2 border-dark-carbon/10 pt-8 mt-12">
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
                  href="/kvkk"
                  className="px-6 py-3 bg-muted-gold/10 hover:bg-muted-gold/20 text-dark-carbon font-manrope rounded-lg transition-colors"
                >
                  KVKK Aydınlatma Metni
                </Link>
                <Link
                  href="/iletisim"
                  className="px-6 py-3 bg-muted-gold/10 hover:bg-muted-gold/20 text-dark-carbon font-manrope rounded-lg transition-colors"
                >
                  İletişim
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
