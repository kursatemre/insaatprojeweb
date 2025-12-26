-- Migration: Add Turkey Map configuration to site_settings
-- Description: Adds turkey_map JSONB column with city project data

-- First, add the turkey_map column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_settings'
    AND column_name = 'turkey_map'
  ) THEN
    ALTER TABLE site_settings ADD COLUMN turkey_map JSONB;
  END IF;
END $$;

-- Then, populate with default Turkey Map data (16 cities with projects)
DO $$
DECLARE
  current_settings RECORD;
BEGIN
  SELECT * INTO current_settings FROM site_settings WHERE id = 1;

  IF NOT FOUND THEN
    -- If no settings exist, insert with turkey_map data
    INSERT INTO site_settings (id, turkey_map) VALUES (
      1,
      jsonb_build_object(
        '01', jsonb_build_object('projects', 20, 'type', 'Karma'),
        '06', jsonb_build_object('projects', 38, 'type', 'Kamu'),
        '07', jsonb_build_object('projects', 28, 'type', 'Özel'),
        '10', jsonb_build_object('projects', 15, 'type', 'Karma'),
        '16', jsonb_build_object('projects', 25, 'type', 'Karma'),
        '20', jsonb_build_object('projects', 12, 'type', 'Özel'),
        '21', jsonb_build_object('projects', 18, 'type', 'Kamu'),
        '26', jsonb_build_object('projects', 12, 'type', 'Karma'),
        '27', jsonb_build_object('projects', 18, 'type', 'Kamu'),
        '34', jsonb_build_object('projects', 45, 'type', 'Karma'),
        '35', jsonb_build_object('projects', 32, 'type', 'Karma'),
        '38', jsonb_build_object('projects', 16, 'type', 'Kamu'),
        '41', jsonb_build_object('projects', 14, 'type', 'Karma'),
        '42', jsonb_build_object('projects', 22, 'type', 'Kamu'),
        '55', jsonb_build_object('projects', 15, 'type', 'Kamu'),
        '61', jsonb_build_object('projects', 14, 'type', 'Kamu')
      )
    );
  ELSE
    -- If settings exist, update only the turkey_map field
    UPDATE site_settings
    SET turkey_map = jsonb_build_object(
      '01', jsonb_build_object('projects', 20, 'type', 'Karma'),
      '06', jsonb_build_object('projects', 38, 'type', 'Kamu'),
      '07', jsonb_build_object('projects', 28, 'type', 'Özel'),
      '10', jsonb_build_object('projects', 15, 'type', 'Karma'),
      '16', jsonb_build_object('projects', 25, 'type', 'Karma'),
      '20', jsonb_build_object('projects', 12, 'type', 'Özel'),
      '21', jsonb_build_object('projects', 18, 'type', 'Kamu'),
      '26', jsonb_build_object('projects', 12, 'type', 'Karma'),
      '27', jsonb_build_object('projects', 18, 'type', 'Kamu'),
      '34', jsonb_build_object('projects', 45, 'type', 'Karma'),
      '35', jsonb_build_object('projects', 32, 'type', 'Karma'),
      '38', jsonb_build_object('projects', 16, 'type', 'Kamu'),
      '41', jsonb_build_object('projects', 14, 'type', 'Karma'),
      '42', jsonb_build_object('projects', 22, 'type', 'Kamu'),
      '55', jsonb_build_object('projects', 15, 'type', 'Kamu'),
      '61', jsonb_build_object('projects', 14, 'type', 'Kamu')
    )
    WHERE id = 1;
  END IF;
END $$;
