'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getSiteSettings } from '@/lib/api/settings';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState({
    linkedin: 'https://linkedin.com/company/ekipproje',
    instagram: 'https://instagram.com/ekipproje',
    facebook: 'https://facebook.com/ekipproje',
    twitter: 'https://twitter.com/ekipproje',
  });

  useEffect(() => {
    const loadSocialLinks = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.social) {
        setSocialLinks(result.data.social);
      }
    };
    loadSocialLinks();
  }, []);

  const footerSections = [
    {
      title: 'Hizmetler',
      links: [
        { name: 'Mimari Projeler', href: '/hizmetler#mimari' },
        { name: 'Statik Projeler', href: '/hizmetler#statik' },
        { name: 'Tesisat Projeleri', href: '/hizmetler#tesisat' },
        { name: 'Danışmanlık', href: '/hizmetler#danismanlik' },
      ],
    },
    {
      title: 'Kurumsal',
      links: [
        { name: 'Hakkımızda', href: '/hakkimizda' },
        { name: 'Projelerimiz', href: '/projeler' },
        { name: 'Referanslar', href: '/hakkimizda#referanslar' },
        { name: 'Kariyer', href: '/kariyer' },
      ],
    },
    {
      title: 'İletişim',
      links: [
        { name: 'Bize Ulaşın', href: '/iletisim' },
        { name: 'Teklif Al', href: '/iletisim#teklif' },
        { name: 'S.S.S.', href: '/sss' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-night-blue to-dark-carbon text-white/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-muted-gold to-bronze rounded-sm flex items-center justify-center">
                <span className="text-white font-cinzel font-bold text-xl">EP</span>
              </div>
              <div>
                <h3 className="text-white font-playfair font-bold text-xl">Ekip Proje</h3>
                <p className="text-muted-gold text-xs font-roboto-mono tracking-widest">
                  MİMARLIK & MÜHENDİSLİK
                </p>
              </div>
            </div>
            <p className="text-white/60 font-manrope text-sm leading-relaxed mb-6">
              Geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz.
              EKAP uyumlu, kamu standartlarında projeler.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'facebook', url: socialLinks.facebook },
                { name: 'twitter', url: socialLinks.twitter },
                { name: 'linkedin', url: socialLinks.linkedin },
                { name: 'instagram', url: socialLinks.instagram },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 hover:bg-muted-gold/20 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-white/60 hover:text-muted-gold transition-colors capitalize text-xs">
                    {social.name[0].toUpperCase()}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-playfair font-semibold text-lg mb-4 border-b border-muted-gold/20 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-muted-gold font-manrope text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="mr-2 text-muted-gold/50 group-hover:text-muted-gold transition-colors">›</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded border border-muted-gold/20">
              <svg className="w-5 h-5 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/70 font-roboto-mono text-xs">EKAP Uyumlu</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded border border-muted-gold/20">
              <svg className="w-5 h-5 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white/70 font-roboto-mono text-xs">Kamu Onaylı</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded border border-muted-gold/20">
              <svg className="w-5 h-5 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white/70 font-roboto-mono text-xs">ISO 9001</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 font-roboto-mono text-xs mb-4 md:mb-0">
            © {currentYear} Ekip Proje Mimarlık ve Mühendislik. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6">
            <Link href="/gizlilik" className="text-white/50 hover:text-muted-gold font-manrope text-xs transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-kosullari" className="text-white/50 hover:text-muted-gold font-manrope text-xs transition-colors">
              Kullanım Koşulları
            </Link>
            <Link href="/kvkk" className="text-white/50 hover:text-muted-gold font-manrope text-xs transition-colors">
              KVKK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
