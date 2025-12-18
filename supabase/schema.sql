-- Ekip Proje - Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Project Info
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('kamu', 'ozel', 'konut', 'ticari')),
    location TEXT NOT NULL,
    year TEXT NOT NULL,
    area TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Tamamlandı', 'Devam Ediyor', 'Planlama')),
    budget TEXT NOT NULL,
    duration TEXT NOT NULL,
    services TEXT[] NOT NULL DEFAULT '{}',

    -- Images
    image_url TEXT,
    gallery_urls TEXT[] DEFAULT '{}'
);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- =====================================================
-- MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact Info
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    location TEXT,

    -- Message Info
    project_type TEXT NOT NULL,
    message TEXT NOT NULL,

    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high'))
);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_priority ON messages(priority);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- =====================================================
-- SITE_SETTINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Settings stored as JSONB for flexibility
    colors JSONB NOT NULL DEFAULT '{
        "primary": "#0f172a",
        "secondary": "#1a1a1a",
        "accent": "#b89150",
        "background": "#f4f4f2"
    }',

    hero JSONB NOT NULL DEFAULT '{
        "title": "Ekip Proje",
        "subtitle": "MİMARLIK & MÜHENDİSLİK",
        "tagline": "Sadece proje çizmiyoruz; geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz."
    }',

    stats JSONB NOT NULL DEFAULT '{
        "totalProjects": "320+",
        "constructionArea": "2.4M m²",
        "activeSites": "45",
        "clients": "180+"
    }',

    contact JSONB NOT NULL DEFAULT '{
        "email": "info@ekipproje.com",
        "phone": "+90 (312) 123 4567",
        "address": "Çankaya, Ankara, Türkiye",
        "workingHours": "Pazartesi - Cuma: 09:00 - 18:00"
    }',

    social JSONB NOT NULL DEFAULT '{
        "linkedin": "https://linkedin.com/company/ekipproje",
        "instagram": "https://instagram.com/ekipproje",
        "facebook": "https://facebook.com/ekipproje",
        "twitter": "https://twitter.com/ekipproje"
    }'
);

-- Ensure only one settings row exists
CREATE UNIQUE INDEX IF NOT EXISTS idx_site_settings_single_row ON site_settings ((id IS NOT NULL));

-- Insert default settings if not exists
INSERT INTO site_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Projects policies (Public read, Admin write)
CREATE POLICY "Projects are publicly readable"
    ON projects FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Admin can insert projects"
    ON projects FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admin can update projects"
    ON projects FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Admin can delete projects"
    ON projects FOR DELETE
    TO authenticated
    USING (true);

-- Messages policies (Admin only)
CREATE POLICY "Only admin can read messages"
    ON messages FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anyone can create messages"
    ON messages FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Admin can update messages"
    ON messages FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Admin can delete messages"
    ON messages FOR DELETE
    TO authenticated
    USING (true);

-- Site Settings policies (Public read, Admin write)
CREATE POLICY "Settings are publicly readable"
    ON site_settings FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Admin can update settings"
    ON site_settings FOR UPDATE
    TO authenticated
    USING (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for projects
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for site_settings
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DEMO DATA (Optional)
-- =====================================================

-- Insert demo projects
INSERT INTO projects (title, category, location, year, area, description, status, budget, duration, services)
VALUES
    ('Milli Eğitim Bakanlığı İlkokul Binası', 'kamu', 'Ankara', '2023', '4,500 m²',
     'EKAP ihalesinden alınan 32 derslikli modern eğitim kompleksi',
     'Tamamlandı', '₺12.5M', '18 ay',
     ARRAY['Mimari', 'Statik', 'Tesisat']),

    ('Lüks Rezidans Kompleksi', 'ozel', 'İstanbul', '2024', '12,000 m²',
     'Premium konut projesi - 64 daire',
     'Devam Ediyor', '₺45M', '24 ay',
     ARRAY['Mimari', 'Statik', 'Tesisat', 'Deprem Analizi']),

    ('Plaza ve İş Merkezi', 'ticari', 'Bursa', '2023', '8,500 m²',
     'A+ ofis binası - LEED sertifikalı',
     'Tamamlandı', '₺28M', '20 ay',
     ARRAY['Mimari', 'Statik', 'Elektrik', 'Mekanik']);

-- Insert demo messages
INSERT INTO messages (name, email, phone, project_type, message, is_read, priority)
VALUES
    ('Ahmet Yılmaz', 'ahmet@example.com', '+90 532 123 4567', 'Mimari Proje',
     'Merhaba, 500 m² arazim için villa projesi yaptırmak istiyorum. Detaylı bilgi alabilir miyim?',
     false, 'high'),

    ('Ayşe Demir', 'ayse@example.com', '+90 533 987 6543', 'Güçlendirme Projesi',
     '3 katlı bina için deprem güçlendirme analizi yaptırmak istiyorum.',
     false, 'high');

-- =====================================================
-- VIEWS FOR ADMIN DASHBOARD
-- =====================================================

-- View: Project statistics
CREATE OR REPLACE VIEW project_stats AS
SELECT
    COUNT(*) as total_projects,
    COUNT(*) FILTER (WHERE status = 'Devam Ediyor') as active_projects,
    COUNT(*) FILTER (WHERE status = 'Tamamlandı') as completed_projects,
    COUNT(*) FILTER (WHERE category = 'kamu') as kamu_projects,
    COUNT(*) FILTER (WHERE category = 'ozel') as ozel_projects
FROM projects;

-- View: Message statistics
CREATE OR REPLACE VIEW message_stats AS
SELECT
    COUNT(*) as total_messages,
    COUNT(*) FILTER (WHERE NOT is_read) as unread_messages,
    COUNT(*) FILTER (WHERE priority = 'high') as high_priority
FROM messages;

-- Grant permissions
GRANT SELECT ON project_stats TO public;
GRANT SELECT ON message_stats TO authenticated;
