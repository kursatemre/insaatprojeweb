import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'İletişim',
  description:
    'Ekip Proje ile iletişime geçin. Mimarlık ve mühendislik projeleri için ücretsiz danışmanlık ve teklif alın. Türkiye genelinde hizmet veriyoruz.',
  path: '/iletisim',
  keywords: [
    'iletişim',
    'teklif al',
    'mimari proje teklifi',
    'mühendislik danışmanlığı',
    'proje teklifi',
    'ücretsiz görüşme',
  ],
});

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
