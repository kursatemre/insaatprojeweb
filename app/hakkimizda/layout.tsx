import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Hakkımızda',
  description:
    'Ekip Proje olarak Türkiye genelinde mimarlık ve mühendislik hizmetleri sunuyoruz. Deneyimli ekibimiz, modern teknolojiler ve profesyonel yaklaşımımız hakkında bilgi edinin.',
  path: '/hakkimizda',
  keywords: [
    'ekip proje hakkında',
    'mühendislik firması',
    'mimarlık firması',
    'şirket profili',
    'kurumsal bilgiler',
    'ekip ve referanslar',
  ],
});

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
