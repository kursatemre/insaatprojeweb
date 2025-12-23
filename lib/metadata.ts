import { Metadata } from 'next';

const baseUrl = 'https://insaatprojeweb.vercel.app';
const siteName = 'Ekip Proje - Mimarlık & Mühendislik';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    'Türkiye genelinde mimari proje, statik hesap, tesisat projeleri, deprem analizi ve teknik müşavirlik hizmetleri. EKAP uyumlu, 2.4M+ m² inşaat alanı deneyimi.',
  keywords: [
    'mimari proje',
    'statik proje',
    'tesisat projesi',
    'deprem analizi',
    'TBDY 2018',
    'kontrollük hizmeti',
    'teknik müşavirlik',
    'EKAP',
    'kamu projeleri',
    'mühendislik',
    'inşaat',
    'Türkiye',
  ],
  authors: [{ name: 'Ekip Proje' }],
  creator: 'Ekip Proje',
  publisher: 'Ekip Proje',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: baseUrl,
    siteName,
    title: siteName,
    description:
      'Türkiye genelinde mimari proje, statik hesap, tesisat projeleri, deprem analizi ve teknik müşavirlik hizmetleri.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ekip Proje - Mimarlık & Mühendislik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description:
      'Türkiye genelinde mimari proje, statik hesap, tesisat projeleri, deprem analizi ve teknik müşavirlik hizmetleri.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Bu değiştirilmeli
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: [...defaultMetadata.keywords as string[], ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName,
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Structured Data (JSON-LD) helpers
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ekip Proje',
    alternateName: 'Ekip Proje Mimarlık ve Mühendislik',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
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
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
  };
}
