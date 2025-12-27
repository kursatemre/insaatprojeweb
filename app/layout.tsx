import type { Metadata } from 'next';
import { Playfair_Display, Manrope, Roboto_Mono } from 'next/font/google';
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import Analytics from "@/components/Analytics";
import { defaultMetadata } from "@/lib/metadata";

// Optimize font loading with next/font
const playfair = Playfair_Display({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const manrope = Manrope({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
});

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  preload: false, // Less critical, don't preload
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${manrope.variable} ${robotoMono.variable}`}>
      <head>
        {/* Preconnect for Supabase images */}
        <link rel="preconnect" href="https://faavqdgnlmubkbgzghem.supabase.co" />
      </head>
      <body className="antialiased">
        <Analytics />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
