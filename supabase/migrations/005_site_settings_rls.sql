-- Site ayarları tablosu için RLS politikaları
-- Bu migration, site_settings tablosuna Row Level Security ekler

-- RLS'i etkinleştir
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Herkese okuma izni ver (SELECT)
CREATE POLICY "Anyone can read site settings"
  ON site_settings
  FOR SELECT
  USING (true);

-- Herkese güncelleme izni ver (UPDATE)
-- Not: Production'da bu politikayı daha güvenli hale getirmek için
-- authenticated kullanıcılar veya admin rolleri ile sınırlandırabilirsiniz
CREATE POLICY "Anyone can update site settings"
  ON site_settings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- INSERT politikası (ilk kurulum için)
CREATE POLICY "Anyone can insert site settings"
  ON site_settings
  FOR INSERT
  WITH CHECK (true);
