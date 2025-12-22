'use client';

import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSiteSettings } from "@/lib/api/settings";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="tr">
      <body className="antialiased">
        {!isAdminRoute && <Navigation />}
        <main className="min-h-screen">
          {children}
        </main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
