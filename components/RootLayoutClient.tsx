'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSiteSettings } from "@/lib/api/settings";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [colors, setColors] = useState({
    primary: '#0f172a',
    secondary: '#1a1a1a',
    accent: '#b89150',
    background: '#f4f4f2',
  });

  // İlk render'da CSS değişkenlerini ayarla
  useEffect(() => {
    // Default değerleri hemen ayarla
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-secondary', colors.secondary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    document.documentElement.style.setProperty('--color-background', colors.background);

    // Veritabanından yükle
    const loadColors = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.colors) {
        setColors(result.data.colors);
      }
    };
    loadColors();
  }, []);

  useEffect(() => {
    // Renk değiştiğinde CSS değişkenlerini güncelle
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-secondary', colors.secondary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    document.documentElement.style.setProperty('--color-background', colors.background);
  }, [colors]);

  return (
    <>
      {!isAdminRoute && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Ekip Proje',
                alternateName: 'Ekip Proje Mimarlık ve Mühendislik',
                url: 'https://ekipproje.com',
                logo: 'https://ekipproje.com/logo.png',
                description:
                  'Türkiye genelinde mimari proje, statik hesap, tesisat projeleri, deprem analizi ve teknik müşavirlik hizmetleri.',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'TR',
                  addressLocality: 'Türkiye',
                },
                sameAs: [
                  'https://www.linkedin.com/company/ekipproje',
                  'https://www.instagram.com/ekipproje',
                  'https://www.facebook.com/ekipproje',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+90-312-123-4567',
                  contactType: 'customer service',
                  areaServed: 'TR',
                  availableLanguage: ['Turkish'],
                },
              }),
            }}
          />
          <Navigation />
        </>
      )}
      <main className="min-h-screen">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
