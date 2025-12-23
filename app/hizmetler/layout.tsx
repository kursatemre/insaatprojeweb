import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Hizmetlerimiz',
  description:
    'Mimari proje, statik hesap, tesisat projeleri, deprem analizi, kontrollük ve teknik müşavirlik hizmetleri. TBDY 2018 uyumlu, profesyonel mühendislik çözümleri.',
  path: '/hizmetler',
  keywords: [
    'mimari proje hizmeti',
    'statik proje hizmeti',
    'tesisat projesi hizmeti',
    'deprem analizi hizmeti',
    'kontrollük hizmeti',
    'teknik müşavirlik',
    'mühendislik hizmetleri',
  ],
});

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
