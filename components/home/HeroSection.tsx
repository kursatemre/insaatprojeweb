'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSiteSettings } from '@/lib/api/settings';

const HeroSection = () => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [heroData, setHeroData] = useState({
    title: 'Ekip Proje',
    subtitle: 'MİMARLIK & MÜHENDİSLİK',
    tagline: 'Sadece proje çizmiyoruz; geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz.',
  });

  useEffect(() => {
    const loadHeroData = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.hero) {
        setHeroData(result.data.hero);
      }
    };
    loadHeroData();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-warm-concrete via-slate-light to-warm-concrete">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-topo-pattern opacity-30"></div>
      <div className="absolute inset-0 bg-blueprint-pattern opacity-20"></div>

      {/* Geometric Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-muted-gold to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-muted-gold to-transparent"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-28">
        {/* Top Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair font-bold text-5xl md:text-7xl text-night-blue mb-4">
            {heroData.title}
          </h1>
          <p className="font-roboto-mono text-muted-gold tracking-[0.3em] text-sm md:text-base">
            {heroData.subtitle}
          </p>
        </motion.div>

        {/* Split Interactive Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Left Side - Hizmet Alımı & Proje */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
            className="relative group"
          >
            <Link href="/hizmetler#proje">
              <div
                className={`relative overflow-hidden rounded-lg border-2 transition-all duration-500 ${
                  hoveredSide === 'left'
                    ? 'border-muted-gold shadow-2xl shadow-muted-gold/30 scale-105'
                    : 'border-dark-carbon/20 hover:border-muted-gold/50'
                }`}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-carbon to-night-blue opacity-95"></div>
                <div className="absolute inset-0 bg-blueprint-pattern opacity-10"></div>

                {/* Technical Lines Decoration */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#b89150" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="#b89150" strokeWidth="1" />
                    <circle cx="50%" cy="50%" r="60" stroke="#b89150" fill="none" strokeWidth="1" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-0.5 bg-muted-gold mr-4"></div>
                      <span className="text-muted-gold font-roboto-mono text-xs tracking-widest">
                        01
                      </span>
                    </div>
                    <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4">
                      Hizmet Alımı
                      <br />& Proje
                    </h2>
                    <p className="text-white/70 font-manrope text-base leading-relaxed mb-6">
                      Eksiksiz ve uygulanabilir teslimat. Mimari, Statik ve Tesisat projelerinde
                      profesyonel çözümler.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 font-roboto-mono text-sm">
                      <span className="text-muted-gold mr-2">▸</span> Mimari Projeler
                    </div>
                    <div className="flex items-center text-white/60 font-roboto-mono text-sm">
                      <span className="text-muted-gold mr-2">▸</span> Statik Hesaplamalar
                    </div>
                    <div className="flex items-center text-white/60 font-roboto-mono text-sm">
                      <span className="text-muted-gold mr-2">▸</span> Tesisat Projeleri
                    </div>
                  </div>

                  <motion.div
                    className="mt-6 flex items-center text-muted-gold font-manrope font-semibold"
                    whileHover={{ x: 10 }}
                  >
                    Detaylı İncele
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right Side - Danışmanlık & Müşavirlik */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
            className="relative group"
          >
            <Link href="/hizmetler#danismanlik">
              <div
                className={`relative overflow-hidden rounded-lg border-2 transition-all duration-500 ${
                  hoveredSide === 'right'
                    ? 'border-muted-gold shadow-2xl shadow-muted-gold/30 scale-105'
                    : 'border-dark-carbon/20 hover:border-muted-gold/50'
                }`}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-night-blue to-dark-carbon opacity-95"></div>
                <div className="absolute inset-0 bg-topo-pattern opacity-10"></div>

                {/* Data Visualization Decoration */}
                <div className="absolute top-0 right-0 w-full h-full">
                  <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10%" y="30%" width="15%" height="40%" stroke="#b89150" fill="none" strokeWidth="1" />
                    <rect x="30%" y="20%" width="15%" height="60%" stroke="#b89150" fill="none" strokeWidth="1" />
                    <rect x="50%" y="35%" width="15%" height="35%" stroke="#b89150" fill="none" strokeWidth="1" />
                    <rect x="70%" y="25%" width="15%" height="50%" stroke="#b89150" fill="none" strokeWidth="1" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-0.5 bg-muted-gold mr-4"></div>
                      <span className="text-muted-gold font-roboto-mono text-xs tracking-widest">
                        02
                      </span>
                    </div>
                    <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4">
                      Danışmanlık
                      <br />& Müşavirlik
                    </h2>
                    <p className="text-white/70 font-manrope text-base leading-relaxed mb-6">
                      Veri odaklı ve uzmanlık merkezli rehberlik. Teknik analiz ve performans
                      değerlendirmesi.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 font-roboto-mono text-sm">
                      <span className="text-muted-gold mr-2">▸</span> Deprem Analizi
                    </div>
                    <div className="flex items-center text-white/60 font-roboto-mono text-sm">
                      <span className="text-muted-gold mr-2">▸</span> Kontrollük Hizmetleri
                    </div>
                    <div className="flex items-center text-white/60 font-roboto-mono text-sm">
                      <span className="text-muted-gold mr-2">▸</span> Teknik Raporlama
                    </div>
                  </div>

                  <motion.div
                    className="mt-6 flex items-center text-muted-gold font-manrope font-semibold"
                    whileHover={{ x: 10 }}
                  >
                    Detaylı İncele
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Main Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="font-playfair text-2xl md:text-3xl text-dark-carbon leading-relaxed italic">
            "{heroData.tagline}"
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-dark-carbon/50"
          >
            <span className="font-roboto-mono text-xs mb-2 tracking-widest">SCROLL</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
