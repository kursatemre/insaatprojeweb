-- Site ayarlarına SEO ve Hakkımızda alanları ekleme
-- Bu migration, mevcut site_settings tablosuna yeni JSONB kolonları ekler

-- SEO ayarları kolonu ekle
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT jsonb_build_object(
  'title', 'Ekip Proje | Mimarlık & Mühendislik',
  'description', 'Ankara merkezli mimarlık ve mühendislik hizmetleri. Proje tasarımı, danışmanlık ve teknik çözümler.',
  'keywords', 'mimarlık, mühendislik, proje tasarımı, danışmanlık, Ankara'
);

-- Hakkımızda kolonu ekle
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS about JSONB DEFAULT jsonb_build_object(
  'title', 'Ekip Proje Hakkında',
  'description', 'Ekip Proje, yılların deneyimi ve uzmanlığıyla mimarlık ve mühendislik alanında hizmet vermektedir.',
  'mission', 'Müşterilerimize en yüksek kalitede mimarlık ve mühendislik hizmetleri sunarak, projelerini hayata geçirmelerine yardımcı olmak.',
  'vision', 'Türkiye''nin en güvenilir ve yenilikçi mimarlık ve mühendislik şirketi olmak.'
);

-- Mevcut kayıtları güncelle (eğer varsa ve null ise)
UPDATE site_settings
SET
  seo = jsonb_build_object(
    'title', 'Ekip Proje | Mimarlık & Mühendislik',
    'description', 'Ankara merkezli mimarlık ve mühendislik hizmetleri. Proje tasarımı, danışmanlık ve teknik çözümler.',
    'keywords', 'mimarlık, mühendislik, proje tasarımı, danışmanlık, Ankara'
  ),
  about = jsonb_build_object(
    'title', 'Ekip Proje Hakkında',
    'description', 'Ekip Proje, yılların deneyimi ve uzmanlığıyla mimarlık ve mühendislik alanında hizmet vermektedir.',
    'mission', 'Müşterilerimize en yüksek kalitede mimarlık ve mühendislik hizmetleri sunarak, projelerini hayata geçirmelerine yardımcı olmak.',
    'vision', 'Türkiye''nin en güvenilir ve yenilikçi mimarlık ve mühendislik şirketi olmak.'
  )
WHERE seo IS NULL OR about IS NULL;
