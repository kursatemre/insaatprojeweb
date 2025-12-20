'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getAllProjects } from '@/lib/api/projects';
import type { Project } from '@/lib/supabase';

export default function FeaturedProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const timer = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }, 6000);

      return () => clearInterval(timer);
    }
  }, [projects.length]);

  const loadProjects = async () => {
    try {
      const result = await getAllProjects();

      if (result.success && result.data) {
        setProjects(result.data.slice(0, 6));
      }
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % projects.length;
      }
      return (prev - 1 + projects.length) % projects.length;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  if (isLoading) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted-gold border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-b from-muted-gold/5 via-transparent to-muted-gold/5"
        ></motion.div>
      </div>

      {/* Floating Geometric Shapes - Hidden on mobile */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden lg:block absolute top-20 right-10 w-64 h-64 border border-muted-gold/20 rounded-lg rotate-12"
      ></motion.div>
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden lg:block absolute bottom-20 left-10 w-48 h-48 border border-muted-gold/10 rounded-full"
      ></motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-0.5 bg-muted-gold origin-right"
            ></motion.div>
            <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
              REFERanslaRIMIZ
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-0.5 bg-muted-gold origin-left"
            ></motion.div>
          </div>

          <h2 className="font-playfair font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6">
            Öne Çıkan Projelerimiz
          </h2>

          <p className="text-white/70 font-manrope text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Türkiye genelinde gerçekleştirdiğimiz başarılı projelerden bazıları
          </p>
        </motion.div>

        {/* Cinematic Project Showcase */}
        <div className="relative min-h-[850px] md:min-h-[900px] lg:min-h-[800px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
              }}
              className="absolute inset-0 pb-24 md:pb-28 lg:pb-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-full">
                {/* Left: Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative group cursor-pointer h-[350px] md:h-[450px] lg:h-[600px]"
                  onClick={() => router.push(`/projeler/${activeProject.id}`)}
                >
                  <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden border-2 border-muted-gold/30 shadow-2xl">
                    {activeProject.image_url ? (
                      <img
                        src={activeProject.image_url}
                        alt={activeProject.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-dark-carbon to-night-blue flex items-center justify-center">
                        <div className="absolute inset-0 bg-blueprint-pattern opacity-20"></div>
                        <svg
                          className="w-32 h-32 text-white/20 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-night-blue/80 via-night-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* View Project Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-muted-gold text-night-blue font-manrope font-bold rounded-lg shadow-2xl flex items-center gap-3"
                      >
                        <span>Projeyi İncele</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 flex gap-2">
                      <span className="px-3 py-1.5 md:px-4 md:py-2 bg-muted-gold/95 backdrop-blur-sm text-night-blue rounded-full text-xs font-manrope font-bold uppercase">
                        {activeProject.category === 'kamu' && 'Kamu'}
                        {activeProject.category === 'ozel' && 'Özel Sektör'}
                        {activeProject.category === 'konut' && 'Konut'}
                        {activeProject.category === 'ticari' && 'Ticari'}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 md:top-6 md:right-6">
                      <span
                        className={`px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm rounded-full text-xs font-roboto-mono font-semibold ${
                          activeProject.status === 'Tamamlandı'
                            ? 'bg-green-500/95 text-white'
                            : activeProject.status === 'Devam Ediyor'
                            ? 'bg-blue-500/95 text-white'
                            : 'bg-yellow-500/95 text-night-blue'
                        }`}
                      >
                        {activeProject.status}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8"
                >
                  {/* Counter */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="font-playfair text-5xl md:text-6xl lg:text-8xl font-bold text-muted-gold/30">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-muted-gold/50 to-transparent"></div>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h3 className="font-playfair font-bold text-2xl md:text-3xl lg:text-5xl text-white mb-3 md:mb-4 leading-tight">
                      {activeProject.title}
                    </h3>
                    <div className="flex items-center gap-2 md:gap-3 text-white/60 font-manrope text-sm md:text-base lg:text-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{activeProject.location}</span>
                      <span className="text-muted-gold">•</span>
                      <span>{activeProject.year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 font-manrope text-sm md:text-base lg:text-lg leading-relaxed">
                    {activeProject.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                    <div className="border-l-2 border-muted-gold pl-2 md:pl-3 lg:pl-4">
                      <p className="text-white/50 text-xs md:text-sm font-manrope mb-1 uppercase tracking-wide">Alan</p>
                      <p className="text-white font-roboto-mono text-sm md:text-base lg:text-xl font-bold">{activeProject.area}</p>
                    </div>
                    <div className="border-l-2 border-muted-gold pl-2 md:pl-3 lg:pl-4">
                      <p className="text-white/50 text-xs md:text-sm font-manrope mb-1 uppercase tracking-wide">Süre</p>
                      <p className="text-white font-roboto-mono text-sm md:text-base lg:text-xl font-bold">{activeProject.duration}</p>
                    </div>
                    <div className="border-l-2 border-muted-gold pl-2 md:pl-3 lg:pl-4">
                      <p className="text-white/50 text-xs md:text-sm font-manrope mb-1 uppercase tracking-wide">Bütçe</p>
                      <p className="text-white font-roboto-mono text-sm md:text-base lg:text-xl font-bold">{activeProject.budget}</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-white/50 text-xs md:text-sm font-manrope mb-2 md:mb-3 uppercase tracking-wide">Hizmetler</p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.services.slice(0, 4).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 md:px-4 md:py-2 border border-muted-gold/30 text-muted-gold rounded-lg text-xs md:text-sm font-manrope hover:bg-muted-gold/10 transition-colors"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 md:px-0 z-20">
            {/* Prev Button */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-muted-gold/50 bg-night-blue/80 backdrop-blur-md text-muted-gold hover:bg-muted-gold hover:text-night-blue transition-all duration-300 flex items-center justify-center shadow-xl"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2 md:gap-3">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 md:w-12 h-1.5 md:h-2 bg-muted-gold rounded-full'
                      : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/30 rounded-full hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                ></motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-muted-gold/50 bg-night-blue/80 backdrop-blur-md text-muted-gold hover:bg-muted-gold hover:text-night-blue transition-all duration-300 flex items-center justify-center shadow-xl"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <motion.button
            onClick={() => router.push('/projeler')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-muted-gold text-night-blue font-manrope font-bold text-sm md:text-base lg:text-lg rounded-lg shadow-2xl hover:shadow-muted-gold/50 transition-all duration-300"
          >
            <span>Tüm Projeleri Keşfet</span>
            <svg
              className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>

          <p className="mt-4 md:mt-6 text-white/50 font-manrope text-sm md:text-base">
            {projects.length} Öne Çıkan Proje • 320+ Başarılı Referans
          </p>
        </motion.div>
      </div>
    </section>
  );
}
