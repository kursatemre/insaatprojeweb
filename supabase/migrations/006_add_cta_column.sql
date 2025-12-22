-- Site ayarları tablosuna CTA kolonu ekle
-- Bu migration, site_settings tablosuna cta (Call To Action) alanı ekler

-- CTA kolonu ekle
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS cta JSONB DEFAULT '{
  "title": "Hayalinizdeki Projeyi",
  "subtitle": "Gerçeğe Dönüştürün",
  "description": "Ekip Proje ile profesyonel mühendislik hizmetleri alın. EKAP uyumlu, kamu standartlarında projeler için hemen teklif isteyin.",
  "primaryButtonText": "Ücretsiz Teklif Al",
  "secondaryButtonText": "Projelerimizi İnceleyin"
}'::jsonb;

-- Mevcut kayıtları güncelle (eğer null ise)
UPDATE site_settings
SET cta = '{
  "title": "Hayalinizdeki Projeyi",
  "subtitle": "Gerçeğe Dönüştürün",
  "description": "Ekip Proje ile profesyonel mühendislik hizmetleri alın. EKAP uyumlu, kamu standartlarında projeler için hemen teklif isteyin.",
  "primaryButtonText": "Ücretsiz Teklif Al",
  "secondaryButtonText": "Projelerimizi İnceleyin"
}'::jsonb
WHERE cta IS NULL;
