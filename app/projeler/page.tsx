'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllProjects } from '@/lib/api/projects';
import type { Project } from '@/lib/supabase';

export default function ProjelerPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tüm Projeler' },
    { id: 'kamu', label: 'Kamu Projeleri' },
    { id: 'ozel', label: 'Özel Sektör' },
    { id: 'konut', label: 'Konut' },
    { id: 'ticari', label: 'Ticari' },
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllProjects();

      if (result.success && result.data) {
        setProjects(result.data);
      } else {
        setError(result.error || 'Projeler yüklenirken bir hata oluştu');
        console.error('Projeler yüklenemedi:', result.error);
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-32 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-0.5 bg-muted-gold"></div>
              <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
                PROJELERİMİZ
              </span>
              <div className="w-16 h-0.5 bg-muted-gold"></div>
            </div>
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              Tamamlanan Projeler
            </h1>
            <p className="text-white/70 font-manrope text-xl max-w-3xl mx-auto leading-relaxed">
              2.4M+ m² inşaat alanı, 320+ başarılı proje
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-12 bg-warm-concrete">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-manrope font-semibold text-sm transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-night-blue to-dark-carbon text-white shadow-lg'
                    : 'bg-white text-dark-carbon border-2 border-dark-carbon/10 hover:border-muted-gold/50'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-16 bg-gradient-to-b from-warm-concrete to-slate-light">
        <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-muted-gold border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-2 text-red-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-manrope font-semibold">{error}</span>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && !error && (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-night-blue/90 to-dark-carbon/90">
                      <div className="absolute inset-0 bg-blueprint-pattern opacity-20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/40">
                          <svg
                            className="w-20 h-20 mx-auto mb-2"
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
                          <p className="font-roboto-mono text-xs">PROJE GÖRSELI</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-roboto-mono ${
                        project.status === 'Tamamlandı'
                          ? 'bg-green-500/90 text-white'
                          : 'bg-yellow-500/90 text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-muted-gold/90 text-white rounded-full text-xs font-manrope font-semibold uppercase">
                      {categories.find((c) => c.id === project.category)?.label}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-playfair font-bold text-xl text-night-blue mb-2 group-hover:text-muted-gold transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center text-dark-carbon/60 font-manrope text-sm mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.location} • {project.year}
                  </div>

                  <p className="text-dark-carbon/70 font-manrope text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted-gold/10 text-muted-gold rounded text-xs font-manrope"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-dark-carbon/10">
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Alan</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">
                        {project.area}
                      </p>
                    </div>
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Süre</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">
                        {project.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Bütçe</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">
                        {project.budget}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              ))}

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 text-dark-carbon/30"
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
                  <h3 className="font-playfair font-bold text-xl text-dark-carbon/60 mb-2">
                    Proje Bulunamadı
                  </h3>
                  <p className="text-dark-carbon/50 font-manrope">
                    Bu kategoride henüz proje bulunmamaktadır
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Summary */}
      <section className="relative py-20 bg-gradient-to-br from-night-blue to-dark-carbon">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Toplam Proje', value: '320', unit: '+' },
              { label: 'İnşaat Alanı', value: '2.4', unit: 'M m²' },
              { label: 'Aktif Şantiye', value: '45', unit: '' },
              { label: 'Memnun Müşteri', value: '180', unit: '+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-playfair font-bold text-5xl text-white mb-2">
                  {stat.value}
                  <span className="text-muted-gold text-3xl ml-1">{stat.unit}</span>
                </div>
                <div className="text-white/60 font-manrope">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
