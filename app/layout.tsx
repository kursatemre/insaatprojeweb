import type { Metadata } from 'next';
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import { defaultMetadata } from "@/lib/metadata";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
