-- Migration: Add footer configuration to site_settings
-- Description: Adds footer JSONB column with company info, navigation sections, certifications, and legal links

-- First, add the footer column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_settings'
    AND column_name = 'footer'
  ) THEN
    ALTER TABLE site_settings ADD COLUMN footer JSONB;
  END IF;
END $$;

-- Then, populate with default footer data
DO $$
DECLARE
  current_settings RECORD;
BEGIN
  SELECT * INTO current_settings FROM site_settings WHERE id = 1;

  IF NOT FOUND THEN
    -- If no settings exist, insert with footer data
    INSERT INTO site_settings (id, footer) VALUES (
      1,
      jsonb_build_object(
        'company', jsonb_build_object(
          'logoText', 'EP',
          'logoUrl', '',
          'name', 'Ekip Proje',
          'subtitle', 'MİMARLIK & MÜHENDİSLİK',
          'description', 'Geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz. EKAP uyumlu, kamu standartlarında projeler.'
        ),
        'sections', jsonb_build_array(
          jsonb_build_object(
            'title', 'Hizmetler',
            'links', jsonb_build_array(
              jsonb_build_object('name', 'Mimari Projeler', 'href', '/hizmetler#mimari'),
              jsonb_build_object('name', 'Statik Projeler', 'href', '/hizmetler#statik'),
              jsonb_build_object('name', 'Tesisat Projeleri', 'href', '/hizmetler#tesisat'),
              jsonb_build_object('name', 'Danışmanlık', 'href', '/hizmetler#danismanlik')
            )
          ),
          jsonb_build_object(
            'title', 'Kurumsal',
            'links', jsonb_build_array(
              jsonb_build_object('name', 'Hakkımızda', 'href', '/hakkimizda'),
              jsonb_build_object('name', 'Projelerimiz', 'href', '/projeler'),
              jsonb_build_object('name', 'Referanslar', 'href', '/hakkimizda#referanslar'),
              jsonb_build_object('name', 'Kariyer', 'href', '/kariyer')
            )
          ),
          jsonb_build_object(
            'title', 'İletişim',
            'links', jsonb_build_array(
              jsonb_build_object('name', 'Bize Ulaşın', 'href', '/iletisim'),
              jsonb_build_object('name', 'Teklif Al', 'href', '/iletisim#teklif'),
              jsonb_build_object('name', 'S.S.S.', 'href', '/sss')
            )
          )
        ),
        'certifications', jsonb_build_array(
          jsonb_build_object('label', 'EKAP Uyumlu', 'icon', 'star'),
          jsonb_build_object('label', 'Kamu Onaylı', 'icon', 'badge'),
          jsonb_build_object('label', 'ISO 9001', 'icon', 'check')
        ),
        'legalLinks', jsonb_build_array(
          jsonb_build_object('name', 'Gizlilik Politikası', 'href', '/gizlilik'),
          jsonb_build_object('name', 'Kullanım Koşulları', 'href', '/kullanim-kosullari'),
          jsonb_build_object('name', 'KVKK', 'href', '/kvkk')
        ),
        'copyright', 'Ekip Proje Mimarlık ve Mühendislik. Tüm hakları saklıdır.'
      )
    );
  ELSE
    -- If settings exist, update only the footer field
    UPDATE site_settings
    SET footer = jsonb_build_object(
      'company', jsonb_build_object(
        'logoText', 'EP',
        'logoUrl', '',
        'name', 'Ekip Proje',
        'subtitle', 'MİMARLIK & MÜHENDİSLİK',
        'description', 'Geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz. EKAP uyumlu, kamu standartlarında projeler.'
      ),
      'sections', jsonb_build_array(
        jsonb_build_object(
          'title', 'Hizmetler',
          'links', jsonb_build_array(
            jsonb_build_object('name', 'Mimari Projeler', 'href', '/hizmetler#mimari'),
            jsonb_build_object('name', 'Statik Projeler', 'href', '/hizmetler#statik'),
            jsonb_build_object('name', 'Tesisat Projeleri', 'href', '/hizmetler#tesisat'),
            jsonb_build_object('name', 'Danışmanlık', 'href', '/hizmetler#danismanlik')
          )
        ),
        jsonb_build_object(
          'title', 'Kurumsal',
          'links', jsonb_build_array(
            jsonb_build_object('name', 'Hakkımızda', 'href', '/hakkimizda'),
            jsonb_build_object('name', 'Projelerimiz', 'href', '/projeler'),
            jsonb_build_object('name', 'Referanslar', 'href', '/hakkimizda#referanslar'),
            jsonb_build_object('name', 'Kariyer', 'href', '/kariyer')
          )
        ),
        jsonb_build_object(
          'title', 'İletişim',
          'links', jsonb_build_array(
            jsonb_build_object('name', 'Bize Ulaşın', 'href', '/iletisim'),
            jsonb_build_object('name', 'Teklif Al', 'href', '/iletisim#teklif'),
            jsonb_build_object('name', 'S.S.S.', 'href', '/sss')
          )
        )
      ),
      'certifications', jsonb_build_array(
        jsonb_build_object('label', 'EKAP Uyumlu', 'icon', 'star'),
        jsonb_build_object('label', 'Kamu Onaylı', 'icon', 'badge'),
        jsonb_build_object('label', 'ISO 9001', 'icon', 'check')
      ),
      'legalLinks', jsonb_build_array(
        jsonb_build_object('name', 'Gizlilik Politikası', 'href', '/gizlilik'),
        jsonb_build_object('name', 'Kullanım Koşulları', 'href', '/kullanim-kosullari'),
        jsonb_build_object('name', 'KVKK', 'href', '/kvkk')
      ),
      'copyright', 'Ekip Proje Mimarlık ve Mühendislik. Tüm hakları saklıdır.'
    )
    WHERE id = 1;
  END IF;
END $$;
