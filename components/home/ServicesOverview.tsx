'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

const ServicesOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<'proje' | 'danismanlik'>('proje');

  const projeServices = [
    {
      title: 'Mimari Projeler',
      description: 'Estetik ve fonksiyonelliği birleştiren yaratıcı tasarımlar',
      features: [
        'Ön Fizibilite Çalışmaları',
        'Vaziyet ve Mimari Projeler',
        'Ruhsat ve Uygulama Projeleri',
        '3D Görselleştirme ve Maket',
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Statik Projeler',
      description: 'Güvenli ve dayanıklı yapılar için hassas hesaplamalar',
      features: [
        'Taşıyıcı Sistem Tasarımı',
        'Deprem ve Rüzgar Analizleri',
        'Zemin Etüdü ve Temel Tasarımı',
        'Betonarme ve Çelik Yapı Hesapları',
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Tesisat Projeleri',
      description: 'Konforlu ve verimli altyapı sistemleri',
      features: [
        'Elektrik Tesisat Projeleri',
        'Mekanik Tesisat (Isıtma/Soğutma)',
        'Sıhhi Tesisat ve Yangın',
        'Enerji Verimliliği Analizi',
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  const danismanlikServices = [
    {
      title: 'Deprem Performans Analizi',
      description: 'Yapıların deprem güvenliğinin değerlendirilmesi',
      features: [
        'Mevcut Yapı Değerlendirmesi',
        'Performans Hesapları (TBDY 2018)',
        'Güçlendirme Önerileri',
        'Raporlama ve Onay Süreçleri',
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Kontrollük Hizmetleri',
      description: 'İnşaat sürecinde teknik gözetim ve kalite kontrolü',
      features: [
        'Uygulama Kontrolü',
        'Malzeme Kontrol Testleri',
        'Hakedişlerin İncelenmesi',
        'İş Güvenliği Denetimi',
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Teknik Raporlama',
      description: 'Profesyonel değerlendirme ve ekspertiz hizmetleri',
      features: [
        'Hasar Tespit Raporları',
        'Keşif ve Mahal Listeleri',
        'Enerji Kimlik Belgesi',
        'Teknik Due Diligence',
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

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
              Proje Hizmetleri
            </button>
            <button
              onClick={() => setActiveTab('danismanlik')}
              className={`px-8 py-4 rounded-md font-manrope font-semibold text-base transition-all duration-300 ${
                activeTab === 'danismanlik'
                  ? 'bg-gradient-to-r from-night-blue to-dark-carbon text-white shadow-lg'
                  : 'text-dark-carbon/60 hover:text-dark-carbon'
              }`}
            >
              Danışmanlık Hizmetleri
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
          {activeServices.map((service, index) => (
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
                    {service.features.map((feature, idx) => (
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
