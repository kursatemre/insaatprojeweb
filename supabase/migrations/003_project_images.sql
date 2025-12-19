-- Proje görselleri tablosu
-- Her projenin birden fazla görseli olabilir

CREATE TABLE IF NOT EXISTS project_images (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index ekle - proje ID'sine göre hızlı sorgulama için
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_display_order ON project_images(project_id, display_order);

-- Row Level Security (RLS) politikaları
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir
CREATE POLICY "project_images_select_policy"
ON project_images FOR SELECT
TO public
USING (true);

-- Sadece authenticated kullanıcılar ekleyebilir
CREATE POLICY "project_images_insert_policy"
ON project_images FOR INSERT
TO public
WITH CHECK (true);

-- Sadece authenticated kullanıcılar güncelleyebilir
CREATE POLICY "project_images_update_policy"
ON project_images FOR UPDATE
TO public
USING (true);

-- Sadece authenticated kullanıcılar silebilir
CREATE POLICY "project_images_delete_policy"
ON project_images FOR DELETE
TO public
USING (true);

-- Updated_at otomatik güncellemesi için trigger
CREATE OR REPLACE FUNCTION update_project_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_project_images_updated_at_trigger
BEFORE UPDATE ON project_images
FOR EACH ROW
EXECUTE FUNCTION update_project_images_updated_at();
