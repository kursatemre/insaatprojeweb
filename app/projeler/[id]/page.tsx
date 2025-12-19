'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getProjectById } from '@/lib/api/projects';
import { getProjectImages } from '@/lib/api/projectImages';
import type { Project, ProjectImage } from '@/lib/supabase';
import ImageGallery from '@/components/ImageGallery';

export default function ProjeDetayPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const loadProject = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const projectId = parseInt(params.id as string);

      if (isNaN(projectId)) {
        setError('Geçersiz proje ID');
        setIsLoading(false);
        return;
      }

      // Proje bilgilerini yükle
      const projectResult = await getProjectById(projectId);

      if (!projectResult.success || !projectResult.data) {
        setError(projectResult.error || 'Proje bulunamadı');
        setIsLoading(false);
        return;
      }

      setProject(projectResult.data);

      // Proje görsellerini yükle
      const imagesResult = await getProjectImages(projectId);

      if (imagesResult.success && imagesResult.data) {
        setImages(imagesResult.data);
      }
    } catch (err) {
      console.error('Error loading project:', err);
      setError('Beklenmeyen bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-warm-concrete">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-muted-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-dark-carbon/60 font-manrope">Proje yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 bg-warm-concrete">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="font-playfair font-bold text-2xl text-dark-carbon/60 mb-4">
            {error || 'Proje Bulunamadı'}
          </h2>
          <button
            onClick={() => router.push('/projeler')}
            className="px-6 py-3 bg-gradient-to-r from-night-blue to-dark-carbon text-white font-manrope font-semibold rounded-lg hover:shadow-xl transition-all"
          >
            Projelere Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-28 min-h-screen bg-gradient-to-b from-warm-concrete to-slate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push('/projeler')}
          className="flex items-center gap-2 text-dark-carbon/60 hover:text-night-blue transition-colors mb-8 font-manrope"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Projelere Dön
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery - Left Side (2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <ImageGallery images={images} coverImage={project.image_url} />
          </motion.div>

          {/* Project Info - Right Side (1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title & Status */}
            <div className="bg-white rounded-xl p-6 border-2 border-dark-carbon/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="font-playfair font-bold text-3xl text-night-blue mb-2">
                    {project.title}
                  </h1>
                  <div className="flex items-center text-dark-carbon/60 font-manrope text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.location} • {project.year}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-roboto-mono ${
                    project.status === 'Tamamlandı'
                      ? 'bg-green-100 text-green-700'
                      : project.status === 'Devam Ediyor'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {project.status}
                </span>
                <span className="px-3 py-1 bg-muted-gold/10 text-muted-gold rounded-full text-xs font-manrope font-semibold uppercase">
                  {project.category === 'kamu' && 'Kamu Projeleri'}
                  {project.category === 'ozel' && 'Özel Sektör'}
                  {project.category === 'konut' && 'Konut'}
                  {project.category === 'ticari' && 'Ticari'}
                </span>
              </div>

              <p className="text-dark-carbon/80 font-manrope leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Stats */}
            <div className="bg-white rounded-xl p-6 border-2 border-dark-carbon/10">
              <h3 className="font-playfair font-bold text-xl text-night-blue mb-4">
                Proje Bilgileri
              </h3>

              <div className="space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-dark-carbon/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-dark-carbon/60 font-manrope text-sm">Alan</span>
                  </div>
                  <span className="font-roboto-mono font-semibold text-night-blue">{project.area}</span>
                </div>

                <div className="flex items-start justify-between pb-3 border-b border-dark-carbon/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-dark-carbon/60 font-manrope text-sm">Süre</span>
                  </div>
                  <span className="font-roboto-mono font-semibold text-night-blue">{project.duration}</span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-dark-carbon/60 font-manrope text-sm">Bütçe</span>
                  </div>
                  <span className="font-roboto-mono font-semibold text-night-blue">{project.budget}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl p-6 border-2 border-dark-carbon/10">
              <h3 className="font-playfair font-bold text-xl text-night-blue mb-4">
                Verilen Hizmetler
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-gradient-to-br from-night-blue/10 to-dark-carbon/10 text-night-blue rounded-lg text-sm font-manrope font-medium border border-night-blue/20"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-night-blue to-dark-carbon rounded-xl p-6 text-center">
              <h3 className="font-playfair font-bold text-xl text-white mb-2">
                Benzer Bir Proje mi Düşünüyorsunuz?
              </h3>
              <p className="text-white/70 font-manrope text-sm mb-4">
                Size de özel çözümler sunalım
              </p>
              <button
                onClick={() => router.push('/iletisim')}
                className="w-full px-6 py-3 bg-muted-gold hover:bg-muted-gold/90 text-white font-manrope font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                İletişime Geç
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
