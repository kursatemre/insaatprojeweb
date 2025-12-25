-- Migration: Update about section in site_settings
-- Description: Adds values, team, and certifications to about JSONB

DO $$
DECLARE
  current_settings RECORD;
  updated_about JSONB;
BEGIN
  -- Get current settings
  SELECT * INTO current_settings FROM site_settings WHERE id = 1;

  IF NOT FOUND THEN
    -- If no settings exist, insert with full about data
    INSERT INTO site_settings (id, about) VALUES (
      1,
      jsonb_build_object(
        'title', '15 Yıllık Deneyim',
        'description', 'Türkiye''nin dört bir yanında 320+ başarılı proje ile mühendislik sektörünün güvenilir ortağıyız',
        'mission', 'Mühendislik ve mimarlık alanında en yüksek kalite standartlarında hizmet sunarak, müşterilerimizin hayallerini gerçeğe dönüştürmek. Her projede güvenlik, sürdürülebilirlik ve estetik mükemmelliği sağlamak.',
        'vision', 'Türkiye''de mühendislik ve danışmanlık sektörünün lider kuruluşlarından biri olmak. Teknolojik yenilikleri ve sürdürülebilir çözümleri kullanarak sektörde öncü rol oynamak.',
        'values', jsonb_build_array(
          jsonb_build_object(
            'title', 'Teknik Mükemmellik',
            'description', 'Her projede en yüksek mühendislik standartlarını koruyoruz',
            'icon', 'shield'
          ),
          jsonb_build_object(
            'title', 'Güvenilirlik',
            'description', 'Taahhütlerimizi zamanında ve eksiksiz yerine getiriyoruz',
            'icon', 'lock'
          ),
          jsonb_build_object(
            'title', 'İnovasyon',
            'description', 'Sürekli gelişen teknolojileri projelerimize entegre ediyoruz',
            'icon', 'lightbulb'
          ),
          jsonb_build_object(
            'title', 'Şeffaflık',
            'description', 'Müşterilerimizle açık ve net iletişim önceliğimizdir',
            'icon', 'eye'
          )
        ),
        'team', jsonb_build_array(
          jsonb_build_object(
            'name', 'Mehmet Kaya',
            'role', 'Kurucu Ortak / Mimar',
            'credentials', 'YMM, MSc Mimarlık',
            'experience', '18 yıl',
            'projects', '150+'
          ),
          jsonb_build_object(
            'name', 'Ayşe Demir',
            'role', 'Ortak / İnşaat Mühendisi',
            'credentials', 'İnşaat Müh., Statik Uzmanı',
            'experience', '15 yıl',
            'projects', '120+'
          ),
          jsonb_build_object(
            'name', 'Ali Yılmaz',
            'role', 'Proje Koordinatörü / Makine Mühendisi',
            'credentials', 'Makine Müh., Enerji Uzmanı',
            'experience', '12 yıl',
            'projects', '90+'
          ),
          jsonb_build_object(
            'name', 'Zeynep Arslan',
            'role', 'Elektrik Proje Şefi',
            'credentials', 'Elektrik-Elektronik Müh.',
            'experience', '10 yıl',
            'projects', '85+'
          )
        ),
        'certifications', jsonb_build_array(
          'EKAP Kayıtlı Firma',
          'Çevre ve Şehircilik Bakanlığı Yeterlilik',
          'ISO 9001 Kalite Yönetim Sistemi',
          'İnşaat Mühendisleri Odası Üyelik',
          'Mimarlar Odası Üyelik',
          'Makine Mühendisleri Odası Üyelik'
        )
      )
    );
  ELSE
    -- If settings exist, update the about field by merging with existing data
    updated_about := jsonb_build_object(
      'title', COALESCE(current_settings.about->>'title', '15 Yıllık Deneyim'),
      'description', COALESCE(current_settings.about->>'description', 'Türkiye''nin dört bir yanında 320+ başarılı proje ile mühendislik sektörünün güvenilir ortağıyız'),
      'mission', COALESCE(current_settings.about->>'mission', 'Mühendislik ve mimarlık alanında en yüksek kalite standartlarında hizmet sunarak, müşterilerimizin hayallerini gerçeğe dönüştürmek. Her projede güvenlik, sürdürülebilirlik ve estetik mükemmelliği sağlamak.'),
      'vision', COALESCE(current_settings.about->>'vision', 'Türkiye''de mühendislik ve danışmanlık sektörünün lider kuruluşlarından biri olmak. Teknolojik yenilikleri ve sürdürülebilir çözümleri kullanarak sektörde öncü rol oynamak.'),
      'values', jsonb_build_array(
        jsonb_build_object(
          'title', 'Teknik Mükemmellik',
          'description', 'Her projede en yüksek mühendislik standartlarını koruyoruz',
          'icon', 'shield'
        ),
        jsonb_build_object(
          'title', 'Güvenilirlik',
          'description', 'Taahhütlerimizi zamanında ve eksiksiz yerine getiriyoruz',
          'icon', 'lock'
        ),
        jsonb_build_object(
          'title', 'İnovasyon',
          'description', 'Sürekli gelişen teknolojileri projelerimize entegre ediyoruz',
          'icon', 'lightbulb'
        ),
        jsonb_build_object(
          'title', 'Şeffaflık',
          'description', 'Müşterilerimizle açık ve net iletişim önceliğimizdir',
          'icon', 'eye'
        )
      ),
      'team', jsonb_build_array(
        jsonb_build_object(
          'name', 'Mehmet Kaya',
          'role', 'Kurucu Ortak / Mimar',
          'credentials', 'YMM, MSc Mimarlık',
          'experience', '18 yıl',
          'projects', '150+'
        ),
        jsonb_build_object(
          'name', 'Ayşe Demir',
          'role', 'Ortak / İnşaat Mühendisi',
          'credentials', 'İnşaat Müh., Statik Uzmanı',
          'experience', '15 yıl',
          'projects', '120+'
        ),
        jsonb_build_object(
          'name', 'Ali Yılmaz',
          'role', 'Proje Koordinatörü / Makine Mühendisi',
          'credentials', 'Makine Müh., Enerji Uzmanı',
          'experience', '12 yıl',
          'projects', '90+'
        ),
        jsonb_build_object(
          'name', 'Zeynep Arslan',
          'role', 'Elektrik Proje Şefi',
          'credentials', 'Elektrik-Elektronik Müh.',
          'experience', '10 yıl',
          'projects', '85+'
        )
      ),
      'certifications', jsonb_build_array(
        'EKAP Kayıtlı Firma',
        'Çevre ve Şehircilik Bakanlığı Yeterlilik',
        'ISO 9001 Kalite Yönetim Sistemi',
        'İnşaat Mühendisleri Odası Üyelik',
        'Mimarlar Odası Üyelik',
        'Makine Mühendisleri Odası Üyelik'
      )
    );

    UPDATE site_settings
    SET about = updated_about
    WHERE id = 1;
  END IF;
END $$;
