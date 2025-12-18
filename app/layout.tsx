'use client';

import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

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
