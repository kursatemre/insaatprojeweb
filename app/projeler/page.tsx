'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function ProjelerPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Tüm Projeler' },
    { id: 'kamu', label: 'Kamu Projeleri' },
    { id: 'ozel', label: 'Özel Sektör' },
    { id: 'konut', label: 'Konut' },
    { id: 'ticari', label: 'Ticari' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Milli Eğitim Bakanlığı İlkokul Binası',
      category: 'kamu',
      location: 'Ankara',
      year: '2023',
      area: '4,500 m²',
      description: 'EKAP ihalesinden alınan 32 derslikli modern eğitim kompleksi',
      services: ['Mimari', 'Statik', 'Tesisat'],
      image: '/projects/school.jpg',
      stats: {
        duration: '18 ay',
        budget: '₺12.5M',
        status: 'Tamamlandı',
      },
    },
    {
      id: 2,
      title: 'Sağlık Ocağı ve Ek Hizmet Binası',
      category: 'kamu',
      location: 'İzmir',
      year: '2023',
      area: '2,800 m²',
      description: 'Deprem sonrası yenilenen modern sağlık tesisi',
      services: ['Mimari', 'Statik', 'Mekanik Tesisat'],
      image: '/projects/health.jpg',
      stats: {
        duration: '14 ay',
        budget: '₺8.2M',
        status: 'Tamamlandı',
      },
    },
    {
      id: 3,
      title: 'Lüks Rezidans Kompleksi',
      category: 'ozel',
      location: 'İstanbul',
      year: '2024',
      area: '12,000 m²',
      description: 'Premium konut projesi - 64 daire',
      services: ['Mimari', 'Statik', 'Tesisat', 'Deprem Analizi'],
      image: '/projects/residence.jpg',
      stats: {
        duration: '24 ay',
        budget: '₺45M',
        status: 'Devam Ediyor',
      },
    },
    {
      id: 4,
      title: 'Plaza ve İş Merkezi',
      category: 'ticari',
      location: 'Bursa',
      year: '2023',
      area: '8,500 m²',
      description: 'A+ ofis binası - LEED sertifikalı',
      services: ['Mimari', 'Statik', 'Elektrik', 'Mekanik'],
      image: '/projects/plaza.jpg',
      stats: {
        duration: '20 ay',
        budget: '₺28M',
        status: 'Tamamlandı',
      },
    },
    {
      id: 5,
      title: 'Villa Kompleksi',
      category: 'konut',
      location: 'Antalya',
      year: '2024',
      area: '6,200 m²',
      description: 'Deniz manzaralı 12 villa projesi',
      services: ['Mimari', 'Statik', 'Peyzaj'],
      image: '/projects/villa.jpg',
      stats: {
        duration: '16 ay',
        budget: '₺22M',
        status: 'Devam Ediyor',
      },
    },
    {
      id: 6,
      title: 'Belediye Hizmet Binası Güçlendirme',
      category: 'kamu',
      location: 'Kocaeli',
      year: '2022',
      area: '3,400 m²',
      description: 'Deprem performans analizi ve güçlendirme projesi',
      services: ['Deprem Analizi', 'Güçlendirme', 'Kontrollük'],
      image: '/projects/strengthen.jpg',
      stats: {
        duration: '10 ay',
        budget: '₺5.8M',
        status: 'Tamamlandı',
      },
    },
  ];

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-20">
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
                {/* Project Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-night-blue/90 to-dark-carbon/90 overflow-hidden">
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

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-roboto-mono ${
                        project.stats.status === 'Tamamlandı'
                          ? 'bg-green-500/90 text-white'
                          : 'bg-yellow-500/90 text-white'
                      }`}
                    >
                      {project.stats.status}
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
                        {project.stats.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Bütçe</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">
                        {project.stats.budget}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
