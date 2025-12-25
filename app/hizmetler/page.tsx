'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/api/settings';

export default function HizmetlerPage() {
  const projeRef = useRef(null);
  const danismanlikRef = useRef(null);
  const isProjeInView = useInView(projeRef, { once: true, amount: 0.1 });
  const isDanismanlikInView = useInView(danismanlikRef, { once: true, amount: 0.1 });

  const [servicesData, setServicesData] = useState<any>(null);

  // Load services data from Supabase
  useEffect(() => {
    const loadServices = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.services) {
        setServicesData(result.data.services);
      }
    };
    loadServices();
  }, []);

  const defaultProjeServices = [
    {
      id: 'mimari',
      title: 'Mimari Projeler',
      subtitle: 'Estetik ve fonksiyonelliği birleştiren yaratıcı tasarımlar',
      description:
        'Mimari tasarım sürecinde estetik, fonksiyonellik ve sürdürülebilirliği bir araya getiriyoruz. Her proje, müşterinin ihtiyaçları ve arazinin potansiyeli göz önünde bulundurularak özel olarak tasarlanır.',
      features: [
        {
          title: 'Ön Fizibilite Çalışmaları',
          desc: 'Arazi analizi, yasal izinler ve maliyet değerlendirmesi',
        },
        {
          title: 'Vaziyet ve Mimari Projeler',
          desc: 'Detaylı yerleşim planları ve 3 boyutlu görselleştirmeler',
        },
        {
          title: 'Ruhsat ve Uygulama Projeleri',
          desc: 'Belediye onayı için tam set teknik çizimler',
        },
        {
          title: '3D Görselleştirme ve Maket',
          desc: 'Fotorealistik render ve fiziksel maket hizmetleri',
        },
      ],
      deliverables: [
        'Ön Tasarım Sunumu',
        'Kesin Proje Seti (1/100 - 1/50)',
        'Uygulama Projeleri (1/50 - 1/20)',
        'Detay Çizimleri',
        'Malzeme ve Renk Katalogları',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: 'statik',
      title: 'Statik Projeler',
      subtitle: 'Güvenli ve dayanıklı yapılar için hassas hesaplamalar',
      description:
        'Yapısal güvenlik ve dayanıklılık, her inşaatın temel önceliğidir. Statik projelerimizde en güncel deprem yönetmelikleri ve mühendislik standartlarını kullanarak yapılarınızın uzun ömürlü olmasını sağlıyoruz.',
      features: [
        {
          title: 'Taşıyıcı Sistem Tasarımı',
          desc: 'Betonarme, çelik ve ahşap taşıyıcı sistemler',
        },
        {
          title: 'Deprem ve Rüzgar Analizleri',
          desc: 'TBDY 2018 uyumlu deprem performans hesapları',
        },
        {
          title: 'Zemin Etüdü ve Temel Tasarımı',
          desc: 'Jeoteknik raporlar ve temel sistemleri',
        },
        {
          title: 'Betonarme ve Çelik Yapı Hesapları',
          desc: 'SAP2000, ETABS ile ileri seviye analiz',
        },
      ],
      deliverables: [
        'Statik Hesap Raporu',
        'Kalıp Planları',
        'Donatı Planları ve Detayları',
        'Metraj ve Keşif',
        'Deprem Performans Raporu',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 'tesisat',
      title: 'Tesisat Projeleri',
      subtitle: 'Konforlu ve verimli altyapı sistemleri',
      description:
        'Modern yaşam standartları için gerekli tüm mekanik ve elektrik altyapı sistemlerini tasarlıyor, enerji verimliliği ve kullanıcı konforu odaklı çözümler sunuyoruz.',
      features: [
        {
          title: 'Elektrik Tesisat Projeleri',
          desc: 'Aydınlatma, priz, paratoner ve topraklama sistemleri',
        },
        {
          title: 'Mekanik Tesisat (Isıtma/Soğutma)',
          desc: 'Kombi, klima, VRV/VRF sistemleri ve havalandırma',
        },
        {
          title: 'Sıhhi Tesisat ve Yangın',
          desc: 'Temiz su, atık su, yangın söndürme sistemleri',
        },
        {
          title: 'Enerji Verimliliği Analizi',
          desc: 'BEP hesaplamaları ve enerji kimlik belgesi',
        },
      ],
      deliverables: [
        'Elektrik Proje Seti',
        'Mekanik Tesisat Projeleri',
        'Sıhhi Tesisat Planları',
        'Yangın Güvenlik Sistemleri',
        'Enerji Performans Raporu',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  const defaultDanismanlikServices = [
    {
      id: 'deprem',
      title: 'Deprem Performans Analizi',
      subtitle: 'Yapıların deprem güvenliğinin değerlendirilmesi',
      description:
        'Mevcut binaların deprem dayanımını değerlendiriyor, güçlendirme ihtiyaçlarını belirliyoruz. TBDY 2018 yönetmeliğine uygun detaylı performans analizleri sunuyoruz.',
      features: [
        {
          title: 'Mevcut Yapı Değerlendirmesi',
          desc: 'Rölöve çalışması ve malzeme testleri',
        },
        {
          title: 'Performans Hesapları (TBDY 2018)',
          desc: 'Doğrusal ve doğrusal olmayan analiz yöntemleri',
        },
        {
          title: 'Güçlendirme Önerileri',
          desc: 'Mantlet, perde, FRP ile güçlendirme çözümleri',
        },
        {
          title: 'Raporlama ve Onay Süreçleri',
          desc: 'Belediye ve Çevre Şehircilik Bakanlığı onayları',
        },
      ],
      deliverables: [
        'Deprem Performans Raporu',
        'Güçlendirme Projesi',
        'Malzeme Test Raporları',
        'Maliyet Analizi',
        'Onay Belgeleri',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: 'kontrolluk',
      title: 'Kontrollük Hizmetleri',
      subtitle: 'İnşaat sürecinde teknik gözetim ve kalite kontrolü',
      description:
        'İnşaat sürecinin her aşamasında projeye uygunluk ve kalite standartlarını kontrol ediyor, şantiye güvenliğini sağlıyoruz.',
      features: [
        {
          title: 'Uygulama Kontrolü',
          desc: 'Projeye uygunluk ve işçilik kalitesi denetimi',
        },
        {
          title: 'Malzeme Kontrol Testleri',
          desc: 'Beton, demir, agregalar için numune alımı',
        },
        {
          title: 'Hakedişlerin İncelenmesi',
          desc: 'Metraj kontrolleri ve ödeme onayları',
        },
        {
          title: 'İş Güvenliği Denetimi',
          desc: 'İSG mevzuatına uygunluk kontrolü',
        },
      ],
      deliverables: [
        'Haftalık Kontrollük Raporları',
        'Fotoğraflı Şantiye Günlükleri',
        'Test Sonuç Raporları',
        'Hakediş Onay Tutanakları',
        'İş Bitirme Raporu',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 'raporlama',
      title: 'Teknik Raporlama',
      subtitle: 'Profesyonel değerlendirme ve ekspertiz hizmetleri',
      description:
        'Yasal süreçler, satış-kiralama işlemleri ve yatırım kararları için detaylı teknik raporlar hazırlıyoruz.',
      features: [
        {
          title: 'Hasar Tespit Raporları',
          desc: 'İnşaat hataları, deprem hasarı değerlendirmesi',
        },
        {
          title: 'Keşif ve Mahal Listeleri',
          desc: 'Tadilat, restorasyon için detaylı metrajlar',
        },
        {
          title: 'Enerji Kimlik Belgesi',
          desc: 'Binalarda enerji verimliliği sınıflandırması',
        },
        {
          title: 'Teknik Due Diligence',
          desc: 'Gayrimenkul yatırımları için teknik değerlendirme',
        },
      ],
      deliverables: [
        'Teknik Değerlendirme Raporu',
        'Fotoğraflı Hasar Tespit Tutanağı',
        'Metraj ve Maliyet Analizi',
        'Enerji Performans Belgesi',
        'Ekspertiz Raporu',
      ],
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  // Helper function to get icon based on service id
  const getIcon = (id: string) => {
    const icons: { [key: string]: JSX.Element } = {
      mimari: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      statik: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      tesisat: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      deprem: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      kontrolluk: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      raporlama: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    };
    return icons[id] || icons['mimari'];
  };

  // Merge dynamic data with defaults and add icons
  const projeServices = (servicesData?.proje?.items || defaultProjeServices).map((service: any) => ({
    ...service,
    icon: getIcon(service.id),
  }));

  const danismanlikServices = (servicesData?.danismanlik?.items || defaultDanismanlikServices).map((service: any) => ({
    ...service,
    icon: getIcon(service.id),
  }));

  const projeTitle = servicesData?.proje?.title || 'Proje Hizmetleri';
  const projeSubtitle = servicesData?.proje?.subtitle || 'Eksiksiz ve uygulanabilir teslimat';
  const danismanlikTitle = servicesData?.danismanlik?.title || 'Danışmanlık Hizmetleri';
  const danismanlikSubtitle = servicesData?.danismanlik?.subtitle || 'Uzmanlık ve rehberlik merkezli';

  return (
    <div className="pt-32 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5 pointer-events-none"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-0.5 bg-muted-gold"></div>
              <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
                HİZMETLERİMİZ
              </span>
              <div className="w-16 h-0.5 bg-muted-gold"></div>
            </div>
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              Kapsamlı Mühendislik Çözümleri
            </h1>
            <p className="text-white/70 font-manrope text-xl max-w-3xl mx-auto leading-relaxed">
              Projeden danışmanlığa, inşaat sürecinin her aşamasında profesyonel destek
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proje Hizmetleri */}
      <section id="proje" ref={projeRef} className="relative py-24 bg-warm-concrete overflow-hidden">
        <div className="absolute inset-0 bg-topo-pattern opacity-20 pointer-events-none"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProjeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-night-blue mb-4">
              {projeTitle}
            </h2>
            <p className="text-dark-carbon/70 font-manrope text-lg">
              {projeSubtitle}
            </p>
          </motion.div>

          <div className="space-y-16">
            {projeServices.map((service: any, index: number) => (
              <ServiceCard key={service.id} service={service} index={index} isInView={isProjeInView} />
            ))}
          </div>
        </div>
      </section>

      {/* Danışmanlık Hizmetleri */}
      <section
        id="danismanlik"
        ref={danismanlikRef}
        className="relative py-24 bg-gradient-to-b from-slate-light to-warm-concrete overflow-hidden"
      >
        <div className="absolute inset-0 bg-blueprint-pattern opacity-20 pointer-events-none"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isDanismanlikInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-night-blue mb-4">
              {danismanlikTitle}
            </h2>
            <p className="text-dark-carbon/70 font-manrope text-lg">
              {danismanlikSubtitle}
            </p>
          </motion.div>

          <div className="space-y-16">
            {danismanlikServices.map((service: any, index: number) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isInView={isDanismanlikInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-night-blue to-dark-carbon">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair font-bold text-4xl text-white mb-6">
              Projeniz İçin Hemen Başlayın
            </h2>
            <p className="text-white/70 font-manrope text-lg mb-8 max-w-2xl mx-auto">
              Detaylı bilgi almak ve ücretsiz ön görüşme için bizimle iletişime geçin
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-muted-gold/50 transition-all duration-300"
            >
              Teklif Al
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Service Card Component
const ServiceCard = ({
  service,
  index,
  isInView,
}: {
  service: any;
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative z-10 bg-white rounded-2xl border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column */}
        <div>
          <div className="text-muted-gold mb-6">{service.icon}</div>
          <h3 className="font-playfair font-bold text-3xl text-night-blue mb-2">{service.title}</h3>
          <p className="text-muted-gold font-manrope font-semibold text-lg mb-6">{service.subtitle}</p>
          <p className="text-dark-carbon/70 font-manrope leading-relaxed mb-8">
            {service.description}
          </p>

          <div className="space-y-4">
            {service.features.map((feature: any, idx: number) => (
              <div key={idx} className="flex items-start">
                <div className="w-2 h-2 bg-muted-gold rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-manrope font-semibold text-night-blue mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-dark-carbon/60 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-gradient-to-br from-night-blue/5 to-muted-gold/5 rounded-xl p-8 border border-muted-gold/20">
          <h4 className="font-playfair font-bold text-xl text-night-blue mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Teslim Edilenler
          </h4>
          <ul className="space-y-3">
            {service.deliverables.map((item: string, idx: number) => (
              <li key={idx} className="flex items-center text-dark-carbon/80 font-manrope">
                <svg className="w-5 h-5 mr-3 text-muted-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-dark-carbon/10">
            <Link
              href="/iletisim"
              className="inline-flex items-center text-muted-gold hover:text-bronze font-manrope font-semibold transition-colors group"
            >
              Bu Hizmet İçin Teklif Al
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
