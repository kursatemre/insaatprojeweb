'use client';

import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  ogImage,
  canonical,
  structuredData,
}: SEOHeadProps) {
  const baseUrl = 'https://ekipproje.com';
  const fullTitle = `${title} | Ekip Proje - Mimarlık & Mühendislik`;
  const defaultImage = `${baseUrl}/og-image.jpg`;
  const image = ogImage || defaultImage;
  const url = canonical || baseUrl;

  const defaultKeywords = [
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
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Ekip Proje" />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Ekip Proje" />
      <meta name="language" content="Turkish" />
      <meta httpEquiv="content-language" content="tr" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}
