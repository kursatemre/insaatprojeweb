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

  const [footerData, setFooterData] = useState({
    company: {
      logoText: 'EP',
      logoUrl: '',
      name: 'Ekip Proje',
      subtitle: 'MİMARLIK & MÜHENDİSLİK',
      description: 'Geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz. EKAP uyumlu, kamu standartlarında projeler.',
    },
    sections: [
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
    ],
    certifications: [
      { label: 'EKAP Uyumlu', icon: 'star' as const },
      { label: 'Kamu Onaylı', icon: 'badge' as const },
      { label: 'ISO 9001', icon: 'check' as const },
    ],
    legalLinks: [
      { name: 'Gizlilik Politikası', href: '/gizlilik' },
      { name: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
      { name: 'KVKK', href: '/kvkk' },
    ],
    copyright: 'Ekip Proje Mimarlık ve Mühendislik. Tüm hakları saklıdır.',
  });

  useEffect(() => {
    const loadFooterData = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data) {
        if (result.data.social) {
          setSocialLinks(result.data.social);
        }
        if (result.data.footer) {
          setFooterData({
            ...result.data.footer,
            company: {
              ...result.data.footer.company,
              logoUrl: result.data.footer.company.logoUrl || '',
            },
          });
        }
      }
    };
    loadFooterData();
  }, []);

  // Helper function to render certification icons
  const getCertificationIcon = (iconType: string) => {
    switch (iconType) {
      case 'star':
        return (
          <svg className="w-5 h-5 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case 'badge':
        return (
          <svg className="w-5 h-5 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-5 h-5 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

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
              {footerData.company.logoUrl ? (
                <div className="w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center bg-white/5">
                  <img
                    src={footerData.company.logoUrl}
                    alt={footerData.company.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-muted-gold to-bronze rounded-sm flex items-center justify-center">
                  <span className="text-white font-cinzel font-bold text-xl">{footerData.company.logoText}</span>
                </div>
              )}
              <div>
                <h3 className="text-white font-playfair font-bold text-xl">{footerData.company.name}</h3>
                <p className="text-muted-gold text-xs font-roboto-mono tracking-widest">
                  {footerData.company.subtitle}
                </p>
              </div>
            </div>
            <p className="text-white/60 font-manrope text-sm leading-relaxed mb-6">
              {footerData.company.description}
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <motion.a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/5 hover:bg-muted-gold/20 rounded-full flex items-center justify-center transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-muted-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>

              {/* Twitter/X */}
              <motion.a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/5 hover:bg-muted-gold/20 rounded-full flex items-center justify-center transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-muted-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/5 hover:bg-muted-gold/20 rounded-full flex items-center justify-center transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-muted-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/5 hover:bg-muted-gold/20 rounded-full flex items-center justify-center transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-muted-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerData.sections.map((section: any) => (
            <div key={section.title}>
              <h4 className="text-white font-playfair font-semibold text-lg mb-4 border-b border-muted-gold/20 pb-2">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link: any) => (
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
            {footerData.certifications.map((cert: any, index: number) => (
              <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded border border-muted-gold/20">
                {getCertificationIcon(cert.icon)}
                <span className="text-white/70 font-roboto-mono text-xs">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <p className="text-white/50 font-roboto-mono text-xs mb-2">
              © {currentYear} {footerData.copyright}
            </p>
            <p className="text-white/30 font-manrope text-xs flex items-center gap-1">
              Developed with <span className="text-red-400">♥</span> by{' '}
              <a
                href="https://orionsoft.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-gold hover:text-muted-gold/80 transition-colors font-semibold"
              >
                OrionSoft.dev
              </a>
            </p>
          </div>
          <div className="flex space-x-6">
            {footerData.legalLinks.map((link: any) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/50 hover:text-muted-gold font-manrope text-xs transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
