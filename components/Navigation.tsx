'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hizmetAlimi = [
    {
      title: 'Mimari Projeler',
      desc: 'Estetik ve fonksiyonel tasarımlar',
      href: '/hizmetler#mimari',
      icon: '🏛️',
    },
    {
      title: 'Statik Projeler',
      desc: 'Güvenli taşıyıcı sistem tasarımı',
      href: '/hizmetler#statik',
      icon: '🏗️',
    },
    {
      title: 'Tesisat Projeleri',
      desc: 'Elektrik, mekanik, sıhhi tesisat',
      href: '/hizmetler#tesisat',
      icon: '⚡',
    },
  ];

  const danismanlik = [
    {
      title: 'Deprem Performans Analizi',
      desc: 'TBDY 2018 uyumlu hesaplamalar',
      href: '/hizmetler#deprem',
      icon: '📊',
    },
    {
      title: 'Kontrollük Hizmetleri',
      desc: 'İnşaat gözetim ve kalite kontrolü',
      href: '/hizmetler#kontrolluk',
      icon: '✓',
    },
    {
      title: 'Teknik Raporlama',
      desc: 'Ekspertiz ve değerlendirme',
      href: '/hizmetler#raporlama',
      icon: '📋',
    },
  ];

  const stats = [
    '2.4M+ m² İnşaat Alanı',
    '110+ Onaylı Kamu Projesi',
    '50+ Deprem Analizi',
    '81 İl Hizmet Ağı',
    'EKAP Uyumlu Projeler',
  ];

  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <>
      {/* Top Bar - Stats Ticker */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark-carbon/95 backdrop-blur-sm border-b border-muted-gold/10 nav-fixed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-xs">
            {/* Animated Stats */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStat}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-muted-gold/80 font-roboto-mono flex items-center"
                >
                  <span className="mr-2">▸</span>
                  {stats[currentStat]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-4 text-white/60">
              <Link
                href="/hizmetler"
                className="hover:text-muted-gold transition-colors flex items-center"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                EKAP Uyumlu
              </Link>
              <span className="text-white/20">|</span>
              <button className="hover:text-muted-gold transition-colors">
                TR / EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 nav-fixed ${
          isScrolled
            ? 'bg-warm-concrete/95 backdrop-blur-xl shadow-2xl border-b border-dark-carbon/10'
            : 'bg-dark-carbon/90 backdrop-blur-md border-b border-muted-gold/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group relative z-50">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-muted-gold/20 to-bronze/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Logo Square */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue rounded border-2 border-muted-gold/30 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <span className="text-muted-gold font-cinzel font-bold text-2xl">E</span>
                  <span className="text-white font-cinzel font-bold text-2xl">P</span>
                </div>
              </div>

              <div>
                <h1 className={`font-cinzel font-bold text-2xl tracking-wider transition-colors ${
                  isScrolled ? 'text-night-blue' : 'text-white'
                }`}>
                  EKİP PROJE
                </h1>
                <p className="text-muted-gold text-xs font-roboto-mono tracking-[0.2em] -mt-1">
                  MİMARLIK & MÜHENDİSLİK
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                href="/"
                className={`px-4 py-2 font-manrope text-sm font-medium transition-colors relative group ${
                  isScrolled ? 'text-dark-carbon/80 hover:text-dark-carbon' : 'text-white hover:text-muted-gold'
                }`}
              >
                Ana Sayfa
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-muted-gold group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Mega Menu - Hizmetler */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('hizmetler')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  className={`px-4 py-2 font-manrope text-sm font-medium transition-colors relative group ${
                    isScrolled ? 'text-dark-carbon/80 hover:text-dark-carbon' : 'text-white hover:text-muted-gold'
                  }`}
                >
                  Hizmetler
                  <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-muted-gold group-hover:w-full transition-all duration-300"></span>
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMegaMenu === 'hizmetler' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-[600px] bg-white backdrop-blur-xl rounded-lg shadow-2xl border-2 border-muted-gold/20 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 divide-x divide-dark-carbon/10">
                        {/* Hizmet Alımı */}
                        <div className="p-6">
                          <h3 className="font-playfair font-bold text-lg text-night-blue mb-1 flex items-center">
                            <span className="w-2 h-2 bg-muted-gold rounded-full mr-2"></span>
                            Hizmet Alımı
                          </h3>
                          <p className="text-xs text-dark-carbon/60 font-manrope mb-4">Proje Üretimi</p>
                          <div className="space-y-2">
                            {hizmetAlimi.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="block p-3 rounded-lg hover:bg-muted-gold/10 transition-all group"
                              >
                                <div className="flex items-start">
                                  <span className="text-2xl mr-3">{item.icon}</span>
                                  <div>
                                    <h4 className="font-manrope font-semibold text-sm text-night-blue group-hover:text-muted-gold transition-colors">
                                      {item.title}
                                    </h4>
                                    <p className="text-xs text-dark-carbon/60">{item.desc}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Danışmanlık */}
                        <div className="p-6 bg-gradient-to-br from-night-blue/5 to-muted-gold/5">
                          <h3 className="font-playfair font-bold text-lg text-night-blue mb-1 flex items-center">
                            <span className="w-2 h-2 bg-bronze rounded-full mr-2"></span>
                            Danışmanlık
                          </h3>
                          <p className="text-xs text-dark-carbon/60 font-manrope mb-4">Teknik Müşavirlik</p>
                          <div className="space-y-2">
                            {danismanlik.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="block p-3 rounded-lg hover:bg-white/50 transition-all group"
                              >
                                <div className="flex items-start">
                                  <span className="text-2xl mr-3">{item.icon}</span>
                                  <div>
                                    <h4 className="font-manrope font-semibold text-sm text-night-blue group-hover:text-bronze transition-colors">
                                      {item.title}
                                    </h4>
                                    <p className="text-xs text-dark-carbon/60">{item.desc}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Link */}
                      <div className="bg-gradient-to-r from-night-blue to-dark-carbon px-6 py-3 text-center">
                        <Link href="/hizmetler" className="text-white hover:text-muted-gold transition-colors text-sm font-manrope">
                          Tüm Hizmetleri Görüntüle →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/projeler"
                className={`px-4 py-2 font-manrope text-sm font-medium transition-colors relative group ${
                  isScrolled ? 'text-dark-carbon/80 hover:text-dark-carbon' : 'text-white hover:text-muted-gold'
                }`}
              >
                Projeler
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-muted-gold group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/hakkimizda"
                className={`px-4 py-2 font-manrope text-sm font-medium transition-colors relative group ${
                  isScrolled ? 'text-dark-carbon/80 hover:text-dark-carbon' : 'text-white hover:text-muted-gold'
                }`}
              >
                Hakkımızda
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-muted-gold group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/iletisim"
                className={`px-4 py-2 font-manrope text-sm font-medium transition-colors relative group ${
                  isScrolled ? 'text-dark-carbon/80 hover:text-dark-carbon' : 'text-white hover:text-muted-gold'
                }`}
              >
                İletişim
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-muted-gold group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Search Icon */}
              <button className={`p-2 rounded-lg transition-all ${
                isScrolled ? 'text-dark-carbon/60 hover:text-dark-carbon hover:bg-dark-carbon/5' : 'text-white hover:text-muted-gold hover:bg-white/10'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* CTA Button */}
              <Link href="/iletisim">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-night-blue to-dark-carbon text-white font-manrope font-semibold text-sm rounded-lg border-2 border-muted-gold/30 hover:border-muted-gold hover:shadow-xl hover:shadow-muted-gold/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Projeyi Başlat</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-muted-gold to-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded transition-colors ${
                isScrolled ? 'text-dark-carbon' : 'text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>

            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white p-2 z-50"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="relative h-full overflow-y-auto pt-20 pb-32 px-6">
              <div className="max-w-md mx-auto">
                {/* Logo */}
                <div className="text-center mb-12">
                  <h2 className="font-cinzel font-bold text-3xl text-white mb-2">EKİP PROJE</h2>
                  <p className="text-muted-gold text-xs font-roboto-mono tracking-widest">MİMARLIK & MÜHENDİSLİK</p>
                </div>

                {/* Menu Items */}
                <div className="space-y-4">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-4 text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg font-manrope text-lg transition-all"
                  >
                    Ana Sayfa
                  </Link>

                  {/* Accordion - Proje İşleri */}
                  <div className="bg-white/5 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === 'proje' ? null : 'proje')}
                      className="w-full px-6 py-4 text-white/90 hover:text-white font-manrope text-lg flex items-center justify-between"
                    >
                      <span>Proje İşleri</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${mobileAccordion === 'proje' ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'proje' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 space-y-2">
                            {hizmetAlimi.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-white/70 hover:text-muted-gold bg-white/5 hover:bg-muted-gold/10 rounded transition-all"
                              >
                                <div className="flex items-center">
                                  <span className="text-xl mr-3">{item.icon}</span>
                                  <div>
                                    <div className="font-manrope font-medium text-sm">{item.title}</div>
                                    <div className="text-xs text-white/50">{item.desc}</div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Accordion - Danışmanlık */}
                  <div className="bg-white/5 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === 'danismanlik' ? null : 'danismanlik')}
                      className="w-full px-6 py-4 text-white/90 hover:text-white font-manrope text-lg flex items-center justify-between"
                    >
                      <span>Danışmanlık</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${mobileAccordion === 'danismanlik' ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileAccordion === 'danismanlik' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 space-y-2">
                            {danismanlik.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-white/70 hover:text-bronze bg-white/5 hover:bg-bronze/10 rounded transition-all"
                              >
                                <div className="flex items-center">
                                  <span className="text-xl mr-3">{item.icon}</span>
                                  <div>
                                    <div className="font-manrope font-medium text-sm">{item.title}</div>
                                    <div className="text-xs text-white/50">{item.desc}</div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/projeler"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-4 text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg font-manrope text-lg transition-all"
                  >
                    Projeler
                  </Link>

                  <Link
                    href="/hakkimizda"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-4 text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg font-manrope text-lg transition-all"
                  >
                    Hakkımızda
                  </Link>

                  <Link
                    href="/iletisim"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-4 text-white/90 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg font-manrope text-lg transition-all"
                  >
                    İletişim
                  </Link>
                </div>

                {/* CTA Button */}
                <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-bold text-lg rounded-lg shadow-2xl shadow-muted-gold/30">
                    Projeyi Başlat
                  </button>
                </Link>
              </div>

              {/* Quick Contact - Fixed Bottom */}
              <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-dark-carbon to-transparent p-6">
                <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                  <a
                    href="tel:+903121234567"
                    className="flex items-center justify-center px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-sm font-manrope">Doğrudan Ara</span>
                  </a>
                  <a
                    href="https://wa.me/905551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-green-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-green-600 transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="text-sm font-manrope">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
