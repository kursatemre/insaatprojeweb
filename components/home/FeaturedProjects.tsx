'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getAllProjects } from '@/lib/api/projects';
import type { Project } from '@/lib/supabase';

export default function FeaturedProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await getAllProjects();

      if (result.success && result.data) {
        // En son 6 projeyi al
        setProjects(result.data.slice(0, 6));
      }
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-warm-concrete to-slate-light overflow-hidden">
        <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>
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

  return (
    <section className="relative py-20 bg-gradient-to-b from-warm-concrete to-slate-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>

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
            <div className="w-16 h-0.5 bg-muted-gold"></div>
            <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
              PROJELERİMİZ
            </span>
            <div className="w-16 h-0.5 bg-muted-gold"></div>
          </div>

          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-night-blue mb-6">
            Öne Çıkan Projelerimiz
          </h2>

          <p className="text-dark-carbon/70 font-manrope text-lg max-w-3xl mx-auto leading-relaxed">
            Türkiye genelinde gerçekleştirdiğimiz başarılı projelerden bazıları.
            320+ proje deneyimi ile kalite ve güven sunuyoruz.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => router.push(`/projeler/${project.id}`)}
              className="group bg-white rounded-xl overflow-hidden border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
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
                          className="w-16 h-16 mx-auto mb-2"
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
                        : project.status === 'Devam Ediyor'
                        ? 'bg-blue-500/90 text-white'
                        : 'bg-yellow-500/90 text-white'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-muted-gold/90 text-white rounded-full text-xs font-manrope font-semibold uppercase">
                    {project.category === 'kamu' && 'Kamu'}
                    {project.category === 'ozel' && 'Özel Sektör'}
                    {project.category === 'konut' && 'Konut'}
                    {project.category === 'ticari' && 'Ticari'}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-playfair font-bold text-xl text-night-blue mb-2 group-hover:text-muted-gold transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <div className="flex items-center text-dark-carbon/60 font-manrope text-sm mb-3">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {project.location} • {project.year}
                </div>

                <p className="text-dark-carbon/70 font-manrope text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark-carbon/10">
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
                </div>

                {/* View Details Button */}
                <div className="mt-4 flex items-center justify-between text-muted-gold font-manrope text-sm font-semibold group-hover:text-night-blue transition-colors">
                  <span>Detayları Gör</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/projeler')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-night-blue to-dark-carbon text-white font-manrope font-semibold rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span>Tüm Projeleri Görüntüle</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="mt-4 text-dark-carbon/60 font-manrope text-sm">
            {projects.length} proje görüntüleniyor • Toplam 320+ başarılı proje
          </p>
        </motion.div>
      </div>
    </section>
  );
}
