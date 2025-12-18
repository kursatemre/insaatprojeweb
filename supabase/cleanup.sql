-- Cleanup Script - Önce mevcut tabloları temizle
-- Bu script'i önce çalıştır, sonra schema.sql'i çalıştır

-- Drop policies first
DROP POLICY IF EXISTS "Projects are publicly readable" ON projects;
DROP POLICY IF EXISTS "Admin can insert projects" ON projects;
DROP POLICY IF EXISTS "Admin can update projects" ON projects;
DROP POLICY IF EXISTS "Admin can delete projects" ON projects;

DROP POLICY IF EXISTS "Only admin can read messages" ON messages;
DROP POLICY IF EXISTS "Anyone can create messages" ON messages;
DROP POLICY IF EXISTS "Admin can update messages" ON messages;
DROP POLICY IF EXISTS "Admin can delete messages" ON messages;

DROP POLICY IF EXISTS "Settings are publicly readable" ON site_settings;
DROP POLICY IF EXISTS "Admin can update settings" ON site_settings;

-- Drop triggers
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop views
DROP VIEW IF EXISTS project_stats;
DROP VIEW IF EXISTS message_stats;

-- Drop tables
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- Success message
SELECT 'Cleanup completed! Now run schema.sql' as status;
