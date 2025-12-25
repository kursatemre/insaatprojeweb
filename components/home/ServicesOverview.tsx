'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/api/settings';

const ServicesOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<'proje' | 'danismanlik'>('proje');
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

  // Default services (fallback)
  const defaultProjeServices = [
    {
      id: 'mimari',
      title: 'Mimari Projeler',
      subtitle: 'Estetik ve fonksiyonelliği birleştiren yaratıcı tasarımlar',
      features: [
        { title: 'Ön Fizibilite Çalışmaları', desc: '' },
        { title: 'Vaziyet ve Mimari Projeler', desc: '' },
        { title: 'Ruhsat ve Uygulama Projeleri', desc: '' },
        { title: '3D Görselleştirme ve Maket', desc: '' },
      ],
    },
    {
      id: 'statik',
      title: 'Statik Projeler',
      subtitle: 'Güvenli ve dayanıklı yapılar için hassas hesaplamalar',
      features: [
        { title: 'Taşıyıcı Sistem Tasarımı', desc: '' },
        { title: 'Deprem ve Rüzgar Analizleri', desc: '' },
        { title: 'Zemin Etüdü ve Temel Tasarımı', desc: '' },
        { title: 'Betonarme ve Çelik Yapı Hesapları', desc: '' },
      ],
    },
    {
      id: 'tesisat',
      title: 'Tesisat Projeleri',
      subtitle: 'Konforlu ve verimli altyapı sistemleri',
      features: [
        { title: 'Elektrik Tesisat Projeleri', desc: '' },
        { title: 'Mekanik Tesisat (Isıtma/Soğutma)', desc: '' },
        { title: 'Sıhhi Tesisat ve Yangın', desc: '' },
        { title: 'Enerji Verimliliği Analizi', desc: '' },
      ],
    },
  ];

  const defaultDanismanlikServices = [
    {
      id: 'deprem',
      title: 'Deprem Performans Analizi',
      subtitle: 'Yapıların deprem güvenliğinin değerlendirilmesi',
      features: [
        { title: 'Mevcut Yapı Değerlendirmesi', desc: '' },
        { title: 'Performans Hesapları (TBDY 2018)', desc: '' },
        { title: 'Güçlendirme Önerileri', desc: '' },
        { title: 'Raporlama ve Onay Süreçleri', desc: '' },
      ],
    },
    {
      id: 'kontrolluk',
      title: 'Kontrollük Hizmetleri',
      subtitle: 'İnşaat sürecinde teknik gözetim ve kalite kontrolü',
      features: [
        { title: 'Uygulama Kontrolü', desc: '' },
        { title: 'Malzeme Kontrol Testleri', desc: '' },
        { title: 'Hakedişlerin İncelenmesi', desc: '' },
        { title: 'İş Güvenliği Denetimi', desc: '' },
      ],
    },
    {
      id: 'raporlama',
      title: 'Teknik Raporlama',
      subtitle: 'Profesyonel değerlendirme ve ekspertiz hizmetleri',
      features: [
        { title: 'Hasar Tespit Raporları', desc: '' },
        { title: 'Keşif ve Mahal Listeleri', desc: '' },
        { title: 'Enerji Kimlik Belgesi', desc: '' },
        { title: 'Teknik Due Diligence', desc: '' },
      ],
    },
  ];

  // Helper function to get icon based on service id
  const getIcon = (id: string) => {
    const icons: { [key: string]: JSX.Element } = {
      mimari: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      statik: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      tesisat: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      deprem: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      kontrolluk: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      raporlama: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    };
    return icons[id] || icons['mimari'];
  };

  // Merge dynamic data with defaults and add icons
  const projeServices = (servicesData?.proje?.items || defaultProjeServices).map((service: any) => ({
    id: service.id,
    title: service.title,
    description: service.subtitle,
    features: service.features.map((f: any) => f.title || f),
    icon: getIcon(service.id),
  }));

  const danismanlikServices = (servicesData?.danismanlik?.items || defaultDanismanlikServices).map((service: any) => ({
    id: service.id,
    title: service.title,
    description: service.subtitle,
    features: service.features.map((f: any) => f.title || f),
    icon: getIcon(service.id),
  }));

  const projeTabLabel = servicesData?.proje?.title || 'Proje Hizmetleri';
  const danismanlikTabLabel = servicesData?.danismanlik?.title || 'Danışmanlık Hizmetleri';

  const activeServices = activeTab === 'proje' ? projeServices : danismanlikServices;

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-warm-concrete to-slate-light overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-0.5 bg-muted-gold"></div>
            <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
              HİZMETLERİMİZ
            </span>
            <div className="w-16 h-0.5 bg-muted-gold"></div>
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-night-blue mb-4">
            Hizmet Gruplarımız
          </h2>
          <p className="text-dark-carbon/70 font-manrope text-lg max-w-2xl mx-auto">
            Projeden danışmanlığa, kapsamlı mühendislik çözümleri
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex bg-white rounded-lg shadow-lg p-2 border border-dark-carbon/10">
            <button
              onClick={() => setActiveTab('proje')}
              className={`px-8 py-4 rounded-md font-manrope font-semibold text-base transition-all duration-300 ${
                activeTab === 'proje'
                  ? 'bg-gradient-to-r from-night-blue to-dark-carbon text-white shadow-lg'
                  : 'text-dark-carbon/60 hover:text-dark-carbon'
              }`}
            >
              {projeTabLabel}
            </button>
            <button
              onClick={() => setActiveTab('danismanlik')}
              className={`px-8 py-4 rounded-md font-manrope font-semibold text-base transition-all duration-300 ${
                activeTab === 'danismanlik'
                  ? 'bg-gradient-to-r from-night-blue to-dark-carbon text-white shadow-lg'
                  : 'text-dark-carbon/60 hover:text-dark-carbon'
              }`}
            >
              {danismanlikTabLabel}
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activeServices.map((service: any, index: number) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-lg border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all duration-300 overflow-hidden h-full">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/0 via-muted-gold/0 to-muted-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div className="mb-6 text-muted-gold group-hover:text-bronze transition-colors duration-300">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair font-bold text-2xl text-night-blue mb-3 group-hover:text-muted-gold transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-dark-carbon/60 font-manrope text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature: any, idx: number) => (
                      <li key={idx} className="flex items-start text-dark-carbon/70 font-manrope text-sm">
                        <span className="text-muted-gold mr-2 mt-1">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <Link
                    href={`/hizmetler#${activeTab}`}
                    className="inline-flex items-center text-muted-gold hover:text-bronze font-manrope font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300"
                  >
                    Detaylı Bilgi
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-muted-gold to-bronze group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/hizmetler"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-night-blue to-dark-carbon text-white font-manrope font-semibold rounded-lg hover:shadow-xl hover:shadow-night-blue/30 transition-all duration-300 group"
          >
            Tüm Hizmetleri Keşfet
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
