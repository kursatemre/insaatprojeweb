import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Projelerimiz',
  description:
    'Türkiye genelinde tamamladığımız 2.4M+ m² inşaat alanındaki mimarlık ve mühendislik projeleri. Kamu binaları, özel projeler, deprem güçlendirme ve teknik danışmanlık referanslarımız.',
  path: '/projeler',
  keywords: [
    'tamamlanan projeler',
    'referans projeler',
    'mimari projeler portföy',
    'mühendislik projeleri',
    'kamu projeleri',
    'özel sektör projeleri',
  ],
});

export default function ProjelerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
