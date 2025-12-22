'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { getSiteSettings } from '@/lib/api/settings';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [statsData, setStatsData] = useState({
    totalProjects: '320+',
    constructionArea: '2.4M m²',
    activeSites: '45',
    clients: '180+',
  });

  useEffect(() => {
    const loadStats = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.stats) {
        setStatsData(result.data.stats);
      }
    };
    loadStats();
  }, []);

  const stats = [
    {
      label: 'Toplam Proje',
      description: statsData.totalProjects,
    },
    {
      label: 'İnşaat Alanı',
      description: statsData.constructionArea,
    },
    {
      label: 'Aktif Şantiye',
      description: statsData.activeSites,
    },
    {
      label: 'Müşteri',
      description: statsData.clients,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-night-blue via-dark-carbon to-night-blue overflow-hidden"
    >
      {/* Background Textures */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-topo-pattern opacity-5"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-muted-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-muted-gold/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-0.5 bg-muted-gold"></div>
            <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
              TEKNİK KAPASİTE
            </span>
            <div className="w-16 h-0.5 bg-muted-gold"></div>
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
            Rakamlarla Ekip Proje
          </h2>
          <p className="text-white/60 font-manrope text-lg max-w-2xl mx-auto">
            Deneyim, uzmanlık ve güvenin somut göstergeleri
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg border border-muted-gold/20 bg-gradient-to-br from-night-blue/50 to-dark-carbon/50 p-8 hover:border-muted-gold/50 transition-all duration-300 backdrop-blur-sm">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/0 via-muted-gold/0 to-muted-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-muted-gold/30 flex items-center justify-center">
                  <span className="text-muted-gold/50 font-roboto-mono text-xs">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <div className="font-playfair font-bold text-5xl md:text-6xl text-white">
                      {stat.description}
                    </div>
                  </div>

                  <h3 className="font-playfair font-semibold text-xl text-white mb-2 group-hover:text-muted-gold transition-colors">
                    {stat.label}
                  </h3>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-muted-gold to-bronze group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Authority Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          <div className="flex items-center space-x-3 px-6 py-4 bg-white/5 rounded-lg border border-muted-gold/30 backdrop-blur-sm">
            <svg className="w-8 h-8 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div>
              <p className="text-white font-playfair font-semibold text-lg">EKAP Uyumlu</p>
              <p className="text-white/50 font-roboto-mono text-xs">İhalelerimiz Tam Uygunluk</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 px-6 py-4 bg-white/5 rounded-lg border border-muted-gold/30 backdrop-blur-sm">
            <svg className="w-8 h-8 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-white font-playfair font-semibold text-lg">Kamu Standartları</p>
              <p className="text-white/50 font-roboto-mono text-xs">Onaylanabilir Projeler</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Count Up Animation Component
const CountUpNumber = ({
  end,
  duration,
  isInView,
  suffix = '',
  unit = '',
}: {
  end: number;
  duration: number;
  isInView: boolean;
  suffix?: string;
  unit?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(end * progress);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <div className="font-playfair font-bold text-5xl md:text-6xl text-white">
      {count.toFixed(end % 1 !== 0 ? 1 : 0)}
      {suffix}
      {unit && <span className="text-muted-gold text-3xl ml-2">{unit}</span>}
    </div>
  );
};

export default StatsSection;
