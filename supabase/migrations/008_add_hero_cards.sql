-- Migration: Add hero cards to site_settings
-- Description: Adds leftCard and rightCard fields to hero section for admin editing

-- First, check if the site_settings table exists, if not create it
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  colors JSONB DEFAULT '{"primary": "#0f172a", "secondary": "#1a1a1a", "accent": "#b89150", "background": "#f4f4f2"}',
  hero JSONB DEFAULT '{"title": "Ekip Proje", "subtitle": "MİMARLIK & MÜHENDİSLİK", "tagline": "Sadece proje çizmiyoruz; geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz."}',
  stats JSONB DEFAULT '{"totalProjects": "320+", "constructionArea": "2.4M m²", "activeSites": "45", "clients": "180+"}',
  contact JSONB DEFAULT '{"email": "info@ekipproje.com", "phone": "+90 (312) 123 4567", "address": "Çankaya, Ankara, Türkiye", "workingHours": "Pazartesi - Cuma: 09:00 - 18:00"}',
  social JSONB DEFAULT '{"linkedin": "https://linkedin.com/company/ekipproje", "instagram": "https://instagram.com/ekipproje", "facebook": "https://facebook.com/ekipproje", "twitter": "https://twitter.com/ekipproje"}',
  seo JSONB,
  about JSONB,
  cta JSONB,
  navigation JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  CONSTRAINT single_row_check CHECK (id = 1)
);

-- Update hero column to include leftCard and rightCard
-- This will merge the new fields with existing data
DO $$
DECLARE
  current_hero JSONB;
  updated_hero JSONB;
BEGIN
  -- Get current hero data
  SELECT hero INTO current_hero FROM site_settings WHERE id = 1;

  -- If no row exists, insert default row
  IF NOT FOUND THEN
    INSERT INTO site_settings (id, hero)
    VALUES (
      1,
      jsonb_build_object(
        'title', 'Ekip Proje',
        'subtitle', 'MİMARLIK & MÜHENDİSLİK',
        'tagline', 'Sadece proje çizmiyoruz; geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz.',
        'leftCard', jsonb_build_object(
          'title', E'Hizmet Alımı\n& Proje',
          'description', 'Eksiksiz ve uygulanabilir teslimat. Mimari, Statik ve Tesisat projelerinde profesyonel çözümler.',
          'features', jsonb_build_array('Mimari Projeler', 'Statik Hesaplamalar', 'Tesisat Projeleri')
        ),
        'rightCard', jsonb_build_object(
          'title', E'Danışmanlık\n& Müşavirlik',
          'description', 'Veri odaklı ve uzmanlık merkezli rehberlik. Teknik analiz ve performans değerlendirmesi.',
          'features', jsonb_build_array('Deprem Analizi', 'Kontrollük Hizmetleri', 'Teknik Raporlama')
        )
      )
    );
  ELSE
    -- Merge new fields with existing hero data
    updated_hero := current_hero || jsonb_build_object(
      'leftCard', jsonb_build_object(
        'title', E'Hizmet Alımı\n& Proje',
        'description', 'Eksiksiz ve uygulanabilir teslimat. Mimari, Statik ve Tesisat projelerinde profesyonel çözümler.',
        'features', jsonb_build_array('Mimari Projeler', 'Statik Hesaplamalar', 'Tesisat Projeleri')
      ),
      'rightCard', jsonb_build_object(
        'title', E'Danışmanlık\n& Müşavirlik',
        'description', 'Veri odaklı ve uzmanlık merkezli rehberlik. Teknik analiz ve performans değerlendirmesi.',
        'features', jsonb_build_array('Deprem Analizi', 'Kontrollük Hizmetleri', 'Teknik Raporlama')
      )
    );

    -- Update the row
    UPDATE site_settings
    SET hero = updated_hero,
        updated_at = TIMEZONE('utc', NOW())
    WHERE id = 1;
  END IF;
END $$;

-- Add comment to table
COMMENT ON TABLE site_settings IS 'Global site settings including hero cards, colors, stats, contact info, etc.';
COMMENT ON COLUMN site_settings.hero IS 'Hero section data including title, subtitle, tagline, and left/right cards with features';

-- Create or replace the trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS if not already enabled
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated users to update settings" ON site_settings;

-- Create policies for public read and authenticated update
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to update settings" ON site_settings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
