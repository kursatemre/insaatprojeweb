import { Metadata } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kariyer - Ekip Proje',
  description: 'Ekip Proje ailesine katılın. Mimarlık ve mühendislik alanında kariyer fırsatları.',
};

export default function KariyerPage() {
  return (
    <div className="min-h-screen bg-warm-concrete">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue py-24 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-topo-pattern opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              Kariyer Fırsatları
            </h1>
            <p className="font-manrope text-xl text-white/80 leading-relaxed">
              Türkiye'nin önde gelen mühendislik ve mimarlık firmalarından birinde kariyer yapın
            </p>
          </div>
        </div>
      </section>

      {/* Şirket Kültürü */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair font-bold text-4xl text-dark-carbon mb-4">
                Neden Ekip Proje?
              </h2>
              <div className="w-24 h-1 bg-muted-gold mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-muted-gold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="font-playfair font-bold text-2xl text-dark-carbon mb-4">
                  Profesyonel Gelişim
                </h3>
                <p className="font-manrope text-dark-carbon/70 leading-relaxed">
                  Sürekli eğitim programları, sertifikasyon destekleri ve mentorluk olanakları ile kariyerinizi ilerletin.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-muted-gold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="font-playfair font-bold text-2xl text-dark-carbon mb-4">
                  Büyük Projeler
                </h3>
                <p className="font-manrope text-dark-carbon/70 leading-relaxed">
                  81 ilde 200+ projeyle Türkiye'nin dört bir yanında prestijli projelerde yer alın.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-muted-gold/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="font-playfair font-bold text-2xl text-dark-carbon mb-4">
                  Takım Ruhu
                </h3>
                <p className="font-manrope text-dark-carbon/70 leading-relaxed">
                  İşbirliğine dayalı çalışma ortamı, deneyimli ekip arkadaşları ve pozitif şirket kültürü.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Açık Pozisyonlar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair font-bold text-4xl text-dark-carbon mb-4">
                Açık Pozisyonlar
              </h2>
              <div className="w-24 h-1 bg-muted-gold mx-auto"></div>
            </div>

            <div className="space-y-6">
              {/* Pozisyon 1 */}
              <div className="bg-warm-concrete p-8 rounded-xl border-2 border-muted-gold/20 hover:border-muted-gold/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-playfair font-bold text-2xl text-dark-carbon mb-2">
                      İnşaat Mühendisi
                    </h3>
                    <p className="font-manrope text-dark-carbon/70 mb-4">
                      Yapı projeleri ve şantiye yönetimi deneyimi olan, tercihen LEED/BREEAM sertifikalı mühendis aranıyor.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        Tam Zamanlı
                      </span>
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        5+ Yıl Deneyim
                      </span>
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        İstanbul
                      </span>
                    </div>
                  </div>
                  <a
                    href="mailto:kariyer@ekipproje.com?subject=Başvuru: İnşaat Mühendisi"
                    className="px-8 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl hover:shadow-muted-gold/30 transition-all whitespace-nowrap"
                  >
                    Başvur
                  </a>
                </div>
              </div>

              {/* Pozisyon 2 */}
              <div className="bg-warm-concrete p-8 rounded-xl border-2 border-muted-gold/20 hover:border-muted-gold/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-playfair font-bold text-2xl text-dark-carbon mb-2">
                      Proje Mimarı
                    </h3>
                    <p className="font-manrope text-dark-carbon/70 mb-4">
                      AutoCAD, Revit ve 3ds Max konusunda yetkin, yaratıcı çözümler üreten mimar aranıyor.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        Tam Zamanlı
                      </span>
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        3+ Yıl Deneyim
                      </span>
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        İstanbul/Ankara
                      </span>
                    </div>
                  </div>
                  <a
                    href="mailto:kariyer@ekipproje.com?subject=Başvuru: Proje Mimarı"
                    className="px-8 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl hover:shadow-muted-gold/30 transition-all whitespace-nowrap"
                  >
                    Başvur
                  </a>
                </div>
              </div>

              {/* Pozisyon 3 */}
              <div className="bg-warm-concrete p-8 rounded-xl border-2 border-muted-gold/20 hover:border-muted-gold/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-playfair font-bold text-2xl text-dark-carbon mb-2">
                      Elektrik Mühendisi
                    </h3>
                    <p className="font-manrope text-dark-carbon/70 mb-4">
                      Güçlü akım, zayıf akım ve yenilenebilir enerji sistemleri konusunda deneyimli mühendis aranıyor.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        Tam Zamanlı
                      </span>
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        4+ Yıl Deneyim
                      </span>
                      <span className="px-3 py-1 bg-muted-gold/10 text-dark-carbon font-manrope text-sm rounded-full">
                        İstanbul
                      </span>
                    </div>
                  </div>
                  <a
                    href="mailto:kariyer@ekipproje.com?subject=Başvuru: Elektrik Mühendisi"
                    className="px-8 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl hover:shadow-muted-gold/30 transition-all whitespace-nowrap"
                  >
                    Başvur
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Başvuru Süreci */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair font-bold text-4xl text-dark-carbon mb-4">
                Başvuru Süreci
              </h2>
              <div className="w-24 h-1 bg-muted-gold mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-muted-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-playfair font-bold text-3xl text-white">1</span>
                </div>
                <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">Başvuru</h3>
                <p className="font-manrope text-dark-carbon/70 text-sm">
                  CV ve portföyünüzü gönderin
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-muted-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-playfair font-bold text-3xl text-white">2</span>
                </div>
                <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">Değerlendirme</h3>
                <p className="font-manrope text-dark-carbon/70 text-sm">
                  İK ekibimiz başvurunuzu inceler
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-muted-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-playfair font-bold text-3xl text-white">3</span>
                </div>
                <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">Görüşme</h3>
                <p className="font-manrope text-dark-carbon/70 text-sm">
                  Teknik ve kültürel uyum görüşmesi
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-muted-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-playfair font-bold text-3xl text-white">4</span>
                </div>
                <h3 className="font-manrope font-bold text-xl text-dark-carbon mb-2">Teklif</h3>
                <p className="font-manrope text-dark-carbon/70 text-sm">
                  İş teklifi ve işe başlama
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6">
              Hayalinizdeki Kariyer Burada Başlıyor
            </h2>
            <p className="font-manrope text-xl text-white/80 mb-8">
              Aradığınız pozisyonu bulamadınız mı? Özgeçmişinizi gönderin, uygun pozisyon açıldığında sizi bilgilendirelim.
            </p>
            <a
              href="mailto:kariyer@ekipproje.com?subject=Genel Başvuru"
              className="inline-block px-12 py-4 bg-muted-gold text-white font-manrope font-bold rounded-lg hover:bg-bronze transition-colors"
            >
              Özgeçmiş Gönder
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
