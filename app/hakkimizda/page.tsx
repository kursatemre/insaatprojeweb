'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HakkimizdaPage() {
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.2 });

  const values = [
    {
      title: 'Teknik Mükemmellik',
      description: 'Her projede en yüksek mühendislik standartlarını koruyoruz',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: 'Güvenilirlik',
      description: 'Taahhütlerimizi zamanında ve eksiksiz yerine getiriyoruz',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: 'İnovasyon',
      description: 'Sürekli gelişen teknolojileri projelerimize entegre ediyoruz',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: 'Şeffaflık',
      description: 'Müşterilerimizle açık ve net iletişim önceliğimizdir',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
  ];

  const team = [
    {
      name: 'Mehmet Kaya',
      role: 'Kurucu Ortak / Mimar',
      credentials: 'YMM, MSc Mimarlık',
      experience: '18 yıl',
      projects: '150+',
    },
    {
      name: 'Ayşe Demir',
      role: 'Ortak / İnşaat Mühendisi',
      credentials: 'İnşaat Müh., Statik Uzmanı',
      experience: '15 yıl',
      projects: '120+',
    },
    {
      name: 'Ali Yılmaz',
      role: 'Proje Koordinatörü / Makine Mühendisi',
      credentials: 'Makine Müh., Enerji Uzmanı',
      experience: '12 yıl',
      projects: '90+',
    },
    {
      name: 'Zeynep Arslan',
      role: 'Elektrik Proje Şefi',
      credentials: 'Elektrik-Elektronik Müh.',
      experience: '10 yıl',
      projects: '85+',
    },
  ];

  const certifications = [
    'EKAP Kayıtlı Firma',
    'Çevre ve Şehircilik Bakanlığı Yeterlilik',
    'ISO 9001 Kalite Yönetim Sistemi',
    'İnşaat Mühendisleri Odası Üyelik',
    'Mimarlar Odası Üyelik',
    'Makine Mühendisleri Odası Üyelik',
  ];

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
                HAKKIMIZDA
              </span>
              <div className="w-16 h-0.5 bg-muted-gold"></div>
            </div>
            <h1 className="font-playfair font-bold text-5xl md:text-6xl text-white mb-6">
              15 Yıllık Deneyim
            </h1>
            <p className="text-white/70 font-manrope text-xl max-w-3xl mx-auto leading-relaxed">
              Türkiye'nin dört bir yanında 320+ başarılı proje ile mühendislik sektörünün
              güvenilir ortağıyız
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="relative py-24 bg-warm-concrete">
        <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl border-2 border-dark-carbon/10 p-10 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-muted-gold to-bronze rounded-lg flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="font-playfair font-bold text-3xl text-night-blue mb-4">Misyonumuz</h2>
              <p className="text-dark-carbon/70 font-manrope leading-relaxed">
                Mühendislik ve mimarlık alanında en yüksek kalite standartlarında hizmet sunarak,
                müşterilerimizin hayallerini gerçeğe dönüştürmek. Her projede güvenlik,
                sürdürülebilirlik ve estetik mükemmelliği sağlamak.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-night-blue to-dark-carbon rounded-2xl p-10 shadow-lg"
            >
              <div className="w-16 h-16 bg-muted-gold/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 border border-muted-gold/30">
                <svg className="w-10 h-10 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="font-playfair font-bold text-3xl text-white mb-4">Vizyonumuz</h2>
              <p className="text-white/70 font-manrope leading-relaxed">
                Türkiye'de mühendislik ve danışmanlık sektörünün lider kuruluşlarından biri olmak.
                Teknolojik yenilikleri ve sürdürülebilir çözümleri kullanarak sektörde öncü rol
                oynamak.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 bg-gradient-to-b from-slate-light to-warm-concrete">
        <div className="absolute inset-0 bg-blueprint-pattern opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair font-bold text-4xl text-night-blue mb-4">
              Değerlerimiz
            </h2>
            <p className="text-dark-carbon/70 font-manrope text-lg">
              İş yapış şeklimizi şekillendiren temel prensipler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 hover:border-muted-gold/50 p-8 transition-all duration-300 group shadow-lg hover:shadow-2xl"
              >
                <div className="text-muted-gold group-hover:text-bronze transition-colors mb-6">
                  {value.icon}
                </div>
                <h3 className="font-playfair font-bold text-xl text-night-blue mb-3 group-hover:text-muted-gold transition-colors">
                  {value.title}
                </h3>
                <p className="text-dark-carbon/70 font-manrope text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="relative py-24 bg-warm-concrete">
        <div className="absolute inset-0 bg-topo-pattern opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair font-bold text-4xl text-night-blue mb-4">
              Uzman Ekibimiz
            </h2>
            <p className="text-dark-carbon/70 font-manrope text-lg">
              Alanında deneyimli mühendis ve mimarlarımız
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Avatar Placeholder */}
                <div className="h-48 bg-gradient-to-br from-night-blue to-dark-carbon flex items-center justify-center">
                  <div className="w-24 h-24 bg-muted-gold/20 rounded-full flex items-center justify-center border-2 border-muted-gold/50">
                    <span className="text-muted-gold font-playfair font-bold text-3xl">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-playfair font-bold text-xl text-night-blue mb-1 group-hover:text-muted-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-muted-gold font-manrope font-semibold text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-dark-carbon/60 font-roboto-mono text-xs mb-4">
                    {member.credentials}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-carbon/10">
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Deneyim</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">
                        {member.experience}
                      </p>
                    </div>
                    <div>
                      <p className="text-dark-carbon/50 text-xs font-manrope mb-1">Projeler</p>
                      <p className="text-night-blue font-roboto-mono font-semibold text-sm">
                        {member.projects}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="referanslar" className="relative py-24 bg-gradient-to-br from-night-blue to-dark-carbon">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair font-bold text-4xl text-white mb-4">
              Belge ve Sertifikalarımız
            </h2>
            <p className="text-white/70 font-manrope text-lg">
              Profesyonelliğimizin resmi tescili
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-muted-gold/30 rounded-lg p-6 hover:border-muted-gold/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <svg className="w-8 h-8 text-muted-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-white font-manrope">{cert}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
