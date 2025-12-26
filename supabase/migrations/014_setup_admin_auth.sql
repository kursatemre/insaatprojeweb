-- Migration: Setup Admin Authentication
-- Description: Creates admin user and enables Row Level Security

-- IMPORTANT: This script creates the admin user structure
-- You need to create the actual user via Supabase Dashboard > Authentication > Add User
-- Or use Supabase CLI: supabase functions deploy

-- Enable Row Level Security on admin tables
ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS project_images ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admins)
-- Projects table policies
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON projects;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON projects;

CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Messages table policies
DROP POLICY IF EXISTS "Enable read for all users" ON messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON messages;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON messages;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON messages;

CREATE POLICY "Enable read for all users" ON messages
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON messages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- Site settings policies
DROP POLICY IF EXISTS "Enable read for all users" ON site_settings;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON site_settings;

CREATE POLICY "Enable read for all users" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Enable update for authenticated users" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Project images policies
DROP POLICY IF EXISTS "Enable read for all users" ON project_images;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON project_images;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON project_images;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON project_images;

CREATE POLICY "Enable read for all users" ON project_images
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON project_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON project_images
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON project_images
  FOR DELETE USING (auth.role() = 'authenticated');
