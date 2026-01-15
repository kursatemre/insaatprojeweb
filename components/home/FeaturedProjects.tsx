'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
      className="relative py-12 md:py-16 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-b from-muted-gold/5 via-transparent to-muted-gold/5"
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="text-muted-gold font-roboto-mono text-xs tracking-widest uppercase">
            Referanslarımız
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mt-2 mb-2">
            Öne Çıkan Projelerimiz
          </h2>
          <p className="text-white/60 font-manrope text-sm md:text-base max-w-2xl mx-auto">
            Türkiye genelinde gerçekleştirdiğimiz başarılı projelerden bazıları
          </p>
        </motion.div>

        {/* Compact Project Showcase */}
        <div className="relative min-h-[520px] sm:min-h-[500px] md:min-h-[480px] lg:min-h-[420px]">
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
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0 pb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 h-full">
                {/* Left: Image - Kompakt */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-3 relative group cursor-pointer h-[280px] md:h-[350px]"
                  onClick={() => router.push(`/projeler/${activeProject.id}`)}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-muted-gold/20 shadow-xl">
                    {activeProject.image_url ? (
                      <Image
                        src={activeProject.image_url}
                        alt={activeProject.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                        priority={activeIndex === 0}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-night-blue/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* View Project Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-muted-gold text-night-blue font-manrope font-semibold rounded-lg shadow-xl flex items-center gap-2 text-sm"
                      >
                        <span>İncele</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Compact Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 bg-muted-gold/90 backdrop-blur-sm text-night-blue rounded-full text-xs font-manrope font-semibold">
                        {activeProject.category === 'kamu' && 'Kamu'}
                        {activeProject.category === 'ozel' && 'Özel'}
                        {activeProject.category === 'konut' && 'Konut'}
                        {activeProject.category === 'ticari' && 'Ticari'}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-1 backdrop-blur-sm rounded-full text-xs font-roboto-mono ${
                          activeProject.status === 'Tamamlandı'
                            ? 'bg-green-500/90 text-white'
                            : activeProject.status === 'Devam Ediyor'
                            ? 'bg-blue-500/90 text-white'
                            : 'bg-yellow-500/90 text-night-blue'
                        }`}
                      >
                        {activeProject.status}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Compact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-2 flex flex-col justify-center space-y-3"
                >
                  {/* Title & Location */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-playfair text-2xl font-bold text-muted-gold/40">
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-muted-gold/20"></div>
                    </div>
                    <h3 className="font-playfair font-bold text-xl md:text-2xl text-white mb-2 leading-tight">
                      {activeProject.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/50 font-manrope text-xs">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

                  {/* Description - Truncated */}
                  <p className="text-white/70 font-manrope text-sm leading-relaxed line-clamp-2">
                    {activeProject.description}
                  </p>

                  {/* Compact Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border-l-2 border-muted-gold pl-2">
                      <p className="text-white/40 text-xs font-manrope mb-0.5 uppercase">Alan</p>
                      <p className="text-white font-roboto-mono text-sm font-semibold">{activeProject.area}</p>
                    </div>
                    <div className="border-l-2 border-muted-gold pl-2">
                      <p className="text-white/40 text-xs font-manrope mb-0.5 uppercase">Süre</p>
                      <p className="text-white font-roboto-mono text-sm font-semibold">{activeProject.duration}</p>
                    </div>
                    <div className="border-l-2 border-muted-gold pl-2">
                      <p className="text-white/40 text-xs font-manrope mb-0.5 uppercase">Bütçe</p>
                      <p className="text-white font-roboto-mono text-sm font-semibold">{activeProject.budget}</p>
                    </div>
                  </div>

                  {/* Compact Services */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.services.slice(0, 3).map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 border border-muted-gold/20 text-muted-gold rounded text-xs font-manrope"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile: Arrows on Image */}
          <div className="lg:hidden absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-2 z-20 pointer-events-none">
            {/* Prev Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="pointer-events-auto w-10 h-10 rounded-full border border-muted-gold/60 bg-night-blue/80 backdrop-blur-md text-muted-gold hover:bg-muted-gold hover:text-night-blue transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              className="pointer-events-auto w-10 h-10 rounded-full border border-muted-gold/60 bg-night-blue/80 backdrop-blur-md text-muted-gold hover:bg-muted-gold hover:text-night-blue transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Desktop: Full Navigation at Bottom */}
          <div className="hidden lg:flex absolute bottom-0 left-0 right-0 items-center justify-between z-20">
            {/* Prev Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-muted-gold/40 bg-night-blue/70 backdrop-blur-sm text-muted-gold hover:bg-muted-gold hover:text-night-blue transition-all duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`transition-all duration-200 ${
                    index === activeIndex
                      ? 'w-8 h-1.5 bg-muted-gold rounded-full'
                      : 'w-1.5 h-1.5 bg-white/30 rounded-full hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                ></motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-muted-gold/40 bg-night-blue/70 backdrop-blur-sm text-muted-gold hover:bg-muted-gold hover:text-night-blue transition-all duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Compact Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4"
        >
          <p className="text-white/40 font-manrope text-xs sm:text-sm text-center sm:text-left">
            <span className="inline-block">{projects.length} Öne Çıkan Proje</span>
            <span className="mx-1 sm:mx-2">•</span>
            <span className="inline-block">320+ Başarılı Referans</span>
          </p>
          <motion.button
            onClick={() => router.push('/projeler')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-muted-gold text-night-blue font-manrope font-semibold text-xs sm:text-sm rounded-lg hover:shadow-lg hover:shadow-muted-gold/30 transition-all duration-200 flex-shrink-0"
          >
            <span>Tümünü Gör</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
