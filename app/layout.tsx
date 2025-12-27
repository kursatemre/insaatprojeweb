import type { Metadata } from 'next';
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import Analytics from "@/components/Analytics";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* DNS Prefetch for faster connection */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://faavqdgnlmubkbgzghem.supabase.co" />
      </head>
      <body className="antialiased">
        <Analytics />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
