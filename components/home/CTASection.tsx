'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/api/settings';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const [ctaData, setCtaData] = useState({
    title: 'Hayalinizdeki Projeyi',
    subtitle: 'Gerçeğe Dönüştürün',
    description: 'Ekip Proje ile profesyonel mühendislik hizmetleri alın. EKAP uyumlu, kamu standartlarında projeler için hemen teklif isteyin.',
    primaryButtonText: 'Ücretsiz Teklif Al',
    secondaryButtonText: 'Projelerimizi İnceleyin',
  });

  useEffect(() => {
    const loadCtaData = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.cta) {
        setCtaData(result.data.cta);
      }
    };
    loadCtaData();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-br from-warm-concrete to-slate-light overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-night-blue to-dark-carbon rounded-2xl overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-topo-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-muted-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-bronze/10 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-block mb-6 px-6 py-2 bg-muted-gold/20 rounded-full border border-muted-gold/30">
                <span className="text-muted-gold font-roboto-mono text-xs tracking-widest">
                  PROJENIZE BAŞLAYIN
                </span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            >
              {ctaData.title}
              <br />
              <span className="text-muted-gold">{ctaData.subtitle}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 font-manrope text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              {ctaData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/iletisim"
                className="group px-8 py-4 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-muted-gold/50 transition-all duration-300 flex items-center"
              >
                {ctaData.primaryButtonText}
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
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
              </Link>

              <Link
                href="/projeler"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-manrope font-semibold text-lg rounded-lg border-2 border-white/20 hover:border-muted-gold/50 hover:bg-white/20 transition-all duration-300"
              >
                {ctaData.secondaryButtonText}
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-12 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: '✓', text: 'EKAP Uyumlu' },
                  { icon: '✓', text: 'Kamu Onaylı' },
                  { icon: '✓', text: '15+ Yıl Deneyim' },
                  { icon: '✓', text: '7/24 Destek' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2">
                    <span className="text-muted-gold text-xl">{item.icon}</span>
                    <span className="text-white/70 font-manrope text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
