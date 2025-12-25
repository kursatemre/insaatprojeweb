-- Migration: Add services to site_settings
-- Description: Adds proje and danismanlik services sections for admin editing

-- First, add the services column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_settings'
    AND column_name = 'services'
  ) THEN
    ALTER TABLE site_settings ADD COLUMN services JSONB;
  END IF;
END $$;

-- Then, populate the services data
DO $$
DECLARE
  current_settings RECORD;
  updated_services JSONB;
BEGIN
  -- Get current settings
  SELECT * INTO current_settings FROM site_settings WHERE id = 1;

  -- If no row exists, insert default row with services
  IF NOT FOUND THEN
    INSERT INTO site_settings (id, services)
    VALUES (
      1,
      jsonb_build_object(
        'proje', jsonb_build_object(
          'title', 'Proje Hizmetleri',
          'subtitle', 'Eksiksiz ve uygulanabilir teslimat',
          'items', jsonb_build_array(
            jsonb_build_object(
              'id', 'mimari',
              'title', 'Mimari Projeler',
              'subtitle', 'Estetik ve fonksiyonelliği birleştiren yaratıcı tasarımlar',
              'description', 'Mimari tasarım sürecinde estetik, fonksiyonellik ve sürdürülebilirliği bir araya getiriyoruz. Her proje, müşterinin ihtiyaçları ve arazinin potansiyeli göz önünde bulundurularak özel olarak tasarlanır.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Ön Fizibilite Çalışmaları', 'desc', 'Arazi analizi, yasal izinler ve maliyet değerlendirmesi'),
                jsonb_build_object('title', 'Vaziyet ve Mimari Projeler', 'desc', 'Detaylı yerleşim planları ve 3 boyutlu görselleştirmeler'),
                jsonb_build_object('title', 'Ruhsat ve Uygulama Projeleri', 'desc', 'Belediye onayı için tam set teknik çizimler'),
                jsonb_build_object('title', '3D Görselleştirme ve Maket', 'desc', 'Fotorealistik render ve fiziksel maket hizmetleri')
              ),
              'deliverables', jsonb_build_array(
                'Ön Tasarım Sunumu',
                'Kesin Proje Seti (1/100 - 1/50)',
                'Uygulama Projeleri (1/50 - 1/20)',
                'Detay Çizimleri',
                'Malzeme ve Renk Katalogları'
              )
            ),
            jsonb_build_object(
              'id', 'statik',
              'title', 'Statik Projeler',
              'subtitle', 'Güvenli ve dayanıklı yapılar için hassas hesaplamalar',
              'description', 'Yapısal güvenlik ve dayanıklılık, her inşaatın temel önceliğidir. Statik projelerimizde en güncel deprem yönetmelikleri ve mühendislik standartlarını kullanarak yapılarınızın uzun ömürlü olmasını sağlıyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Taşıyıcı Sistem Tasarımı', 'desc', 'Betonarme, çelik ve ahşap taşıyıcı sistemler'),
                jsonb_build_object('title', 'Deprem ve Rüzgar Analizleri', 'desc', 'TBDY 2018 uyumlu deprem performans hesapları'),
                jsonb_build_object('title', 'Zemin Etüdü ve Temel Tasarımı', 'desc', 'Jeoteknik raporlar ve temel sistemleri'),
                jsonb_build_object('title', 'Betonarme ve Çelik Yapı Hesapları', 'desc', 'SAP2000, ETABS ile ileri seviye analiz')
              ),
              'deliverables', jsonb_build_array(
                'Statik Hesap Raporu',
                'Kalıp Planları',
                'Donatı Planları ve Detayları',
                'Metraj ve Keşif',
                'Deprem Performans Raporu'
              )
            ),
            jsonb_build_object(
              'id', 'tesisat',
              'title', 'Tesisat Projeleri',
              'subtitle', 'Konforlu ve verimli altyapı sistemleri',
              'description', 'Modern yaşam standartları için gerekli tüm mekanik ve elektrik altyapı sistemlerini tasarlıyor, enerji verimliliği ve kullanıcı konforu odaklı çözümler sunuyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Elektrik Tesisat Projeleri', 'desc', 'Aydınlatma, priz, paratoner ve topraklama sistemleri'),
                jsonb_build_object('title', 'Mekanik Tesisat (Isıtma/Soğutma)', 'desc', 'Kombi, klima, VRV/VRF sistemleri ve havalandırma'),
                jsonb_build_object('title', 'Sıhhi Tesisat ve Yangın', 'desc', 'Temiz su, atık su, yangın söndürme sistemleri'),
                jsonb_build_object('title', 'Enerji Verimliliği Analizi', 'desc', 'BEP hesaplamaları ve enerji kimlik belgesi')
              ),
              'deliverables', jsonb_build_array(
                'Elektrik Proje Seti',
                'Mekanik Tesisat Projeleri',
                'Sıhhi Tesisat Planları',
                'Yangın Güvenlik Sistemleri',
                'Enerji Performans Raporu'
              )
            )
          )
        ),
        'danismanlik', jsonb_build_object(
          'title', 'Danışmanlık Hizmetleri',
          'subtitle', 'Uzmanlık ve rehberlik merkezli',
          'items', jsonb_build_array(
            jsonb_build_object(
              'id', 'deprem',
              'title', 'Deprem Performans Analizi',
              'subtitle', 'Yapıların deprem güvenliğinin değerlendirilmesi',
              'description', 'Mevcut binaların deprem dayanımını değerlendiriyor, güçlendirme ihtiyaçlarını belirliyoruz. TBDY 2018 yönetmeliğine uygun detaylı performans analizleri sunuyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Mevcut Yapı Değerlendirmesi', 'desc', 'Rölöve çalışması ve malzeme testleri'),
                jsonb_build_object('title', 'Performans Hesapları (TBDY 2018)', 'desc', 'Doğrusal ve doğrusal olmayan analiz yöntemleri'),
                jsonb_build_object('title', 'Güçlendirme Önerileri', 'desc', 'Mantlet, perde, FRP ile güçlendirme çözümleri'),
                jsonb_build_object('title', 'Raporlama ve Onay Süreçleri', 'desc', 'Belediye ve Çevre Şehircilik Bakanlığı onayları')
              ),
              'deliverables', jsonb_build_array(
                'Deprem Performans Raporu',
                'Güçlendirme Projesi',
                'Malzeme Test Raporları',
                'Maliyet Analizi',
                'Onay Belgeleri'
              )
            ),
            jsonb_build_object(
              'id', 'kontrolluk',
              'title', 'Kontrollük Hizmetleri',
              'subtitle', 'İnşaat sürecinde teknik gözetim ve kalite kontrolü',
              'description', 'İnşaat sürecinin her aşamasında projeye uygunluk ve kalite standartlarını kontrol ediyor, şantiye güvenliğini sağlıyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Uygulama Kontrolü', 'desc', 'Projeye uygunluk ve işçilik kalitesi denetimi'),
                jsonb_build_object('title', 'Malzeme Kontrol Testleri', 'desc', 'Beton, demir, agregalar için numune alımı'),
                jsonb_build_object('title', 'Hakedişlerin İncelenmesi', 'desc', 'Metraj kontrolleri ve ödeme onayları'),
                jsonb_build_object('title', 'İş Güvenliği Denetimi', 'desc', 'İSG mevzuatına uygunluk kontrolü')
              ),
              'deliverables', jsonb_build_array(
                'Haftalık Kontrollük Raporları',
                'Fotoğraflı Şantiye Günlükleri',
                'Test Sonuç Raporları',
                'Hakediş Onay Tutanakları',
                'İş Bitirme Raporu'
              )
            ),
            jsonb_build_object(
              'id', 'raporlama',
              'title', 'Teknik Raporlama',
              'subtitle', 'Profesyonel değerlendirme ve ekspertiz hizmetleri',
              'description', 'Yasal süreçler, satış-kiralama işlemleri ve yatırım kararları için detaylı teknik raporlar hazırlıyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Hasar Tespit Raporları', 'desc', 'İnşaat hataları, deprem hasarı değerlendirmesi'),
                jsonb_build_object('title', 'Keşif ve Mahal Listeleri', 'desc', 'Tadilat, restorasyon için detaylı metrajlar'),
                jsonb_build_object('title', 'Enerji Kimlik Belgesi', 'desc', 'Binalarda enerji verimliliği sınıflandırması'),
                jsonb_build_object('title', 'Teknik Due Diligence', 'desc', 'Gayrimenkul yatırımları için teknik değerlendirme')
              ),
              'deliverables', jsonb_build_array(
                'Teknik Değerlendirme Raporu',
                'Fotoğraflı Hasar Tespit Tutanağı',
                'Metraj ve Maliyet Analizi',
                'Enerji Performans Belgesi',
                'Ekspertiz Raporu'
              )
            )
          )
        )
      )
    );
  ELSE
    -- Update existing row by adding services field
    UPDATE site_settings
    SET services = jsonb_build_object(
        'proje', jsonb_build_object(
          'title', 'Proje Hizmetleri',
          'subtitle', 'Eksiksiz ve uygulanabilir teslimat',
          'items', jsonb_build_array(
            jsonb_build_object(
              'id', 'mimari',
              'title', 'Mimari Projeler',
              'subtitle', 'Estetik ve fonksiyonelliği birleştiren yaratıcı tasarımlar',
              'description', 'Mimari tasarım sürecinde estetik, fonksiyonellik ve sürdürülebilirliği bir araya getiriyoruz. Her proje, müşterinin ihtiyaçları ve arazinin potansiyeli göz önünde bulundurularak özel olarak tasarlanır.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Ön Fizibilite Çalışmaları', 'desc', 'Arazi analizi, yasal izinler ve maliyet değerlendirmesi'),
                jsonb_build_object('title', 'Vaziyet ve Mimari Projeler', 'desc', 'Detaylı yerleşim planları ve 3 boyutlu görselleştirmeler'),
                jsonb_build_object('title', 'Ruhsat ve Uygulama Projeleri', 'desc', 'Belediye onayı için tam set teknik çizimler'),
                jsonb_build_object('title', '3D Görselleştirme ve Maket', 'desc', 'Fotorealistik render ve fiziksel maket hizmetleri')
              ),
              'deliverables', jsonb_build_array(
                'Ön Tasarım Sunumu',
                'Kesin Proje Seti (1/100 - 1/50)',
                'Uygulama Projeleri (1/50 - 1/20)',
                'Detay Çizimleri',
                'Malzeme ve Renk Katalogları'
              )
            ),
            jsonb_build_object(
              'id', 'statik',
              'title', 'Statik Projeler',
              'subtitle', 'Güvenli ve dayanıklı yapılar için hassas hesaplamalar',
              'description', 'Yapısal güvenlik ve dayanıklılık, her inşaatın temel önceliğidir. Statik projelerimizde en güncel deprem yönetmelikleri ve mühendislik standartlarını kullanarak yapılarınızın uzun ömürlü olmasını sağlıyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Taşıyıcı Sistem Tasarımı', 'desc', 'Betonarme, çelik ve ahşap taşıyıcı sistemler'),
                jsonb_build_object('title', 'Deprem ve Rüzgar Analizleri', 'desc', 'TBDY 2018 uyumlu deprem performans hesapları'),
                jsonb_build_object('title', 'Zemin Etüdü ve Temel Tasarımı', 'desc', 'Jeoteknik raporlar ve temel sistemleri'),
                jsonb_build_object('title', 'Betonarme ve Çelik Yapı Hesapları', 'desc', 'SAP2000, ETABS ile ileri seviye analiz')
              ),
              'deliverables', jsonb_build_array(
                'Statik Hesap Raporu',
                'Kalıp Planları',
                'Donatı Planları ve Detayları',
                'Metraj ve Keşif',
                'Deprem Performans Raporu'
              )
            ),
            jsonb_build_object(
              'id', 'tesisat',
              'title', 'Tesisat Projeleri',
              'subtitle', 'Konforlu ve verimli altyapı sistemleri',
              'description', 'Modern yaşam standartları için gerekli tüm mekanik ve elektrik altyapı sistemlerini tasarlıyor, enerji verimliliği ve kullanıcı konforu odaklı çözümler sunuyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Elektrik Tesisat Projeleri', 'desc', 'Aydınlatma, priz, paratoner ve topraklama sistemleri'),
                jsonb_build_object('title', 'Mekanik Tesisat (Isıtma/Soğutma)', 'desc', 'Kombi, klima, VRV/VRF sistemleri ve havalandırma'),
                jsonb_build_object('title', 'Sıhhi Tesisat ve Yangın', 'desc', 'Temiz su, atık su, yangın söndürme sistemleri'),
                jsonb_build_object('title', 'Enerji Verimliliği Analizi', 'desc', 'BEP hesaplamaları ve enerji kimlik belgesi')
              ),
              'deliverables', jsonb_build_array(
                'Elektrik Proje Seti',
                'Mekanik Tesisat Projeleri',
                'Sıhhi Tesisat Planları',
                'Yangın Güvenlik Sistemleri',
                'Enerji Performans Raporu'
              )
            )
          )
        ),
        'danismanlik', jsonb_build_object(
          'title', 'Danışmanlık Hizmetleri',
          'subtitle', 'Uzmanlık ve rehberlik merkezli',
          'items', jsonb_build_array(
            jsonb_build_object(
              'id', 'deprem',
              'title', 'Deprem Performans Analizi',
              'subtitle', 'Yapıların deprem güvenliğinin değerlendirilmesi',
              'description', 'Mevcut binaların deprem dayanımını değerlendiriyor, güçlendirme ihtiyaçlarını belirliyoruz. TBDY 2018 yönetmeliğine uygun detaylı performans analizleri sunuyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Mevcut Yapı Değerlendirmesi', 'desc', 'Rölöve çalışması ve malzeme testleri'),
                jsonb_build_object('title', 'Performans Hesapları (TBDY 2018)', 'desc', 'Doğrusal ve doğrusal olmayan analiz yöntemleri'),
                jsonb_build_object('title', 'Güçlendirme Önerileri', 'desc', 'Mantlet, perde, FRP ile güçlendirme çözümleri'),
                jsonb_build_object('title', 'Raporlama ve Onay Süreçleri', 'desc', 'Belediye ve Çevre Şehircilik Bakanlığı onayları')
              ),
              'deliverables', jsonb_build_array(
                'Deprem Performans Raporu',
                'Güçlendirme Projesi',
                'Malzeme Test Raporları',
                'Maliyet Analizi',
                'Onay Belgeleri'
              )
            ),
            jsonb_build_object(
              'id', 'kontrolluk',
              'title', 'Kontrollük Hizmetleri',
              'subtitle', 'İnşaat sürecinde teknik gözetim ve kalite kontrolü',
              'description', 'İnşaat sürecinin her aşamasında projeye uygunluk ve kalite standartlarını kontrol ediyor, şantiye güvenliğini sağlıyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Uygulama Kontrolü', 'desc', 'Projeye uygunluk ve işçilik kalitesi denetimi'),
                jsonb_build_object('title', 'Malzeme Kontrol Testleri', 'desc', 'Beton, demir, agregalar için numune alımı'),
                jsonb_build_object('title', 'Hakedişlerin İncelenmesi', 'desc', 'Metraj kontrolleri ve ödeme onayları'),
                jsonb_build_object('title', 'İş Güvenliği Denetimi', 'desc', 'İSG mevzuatına uygunluk kontrolü')
              ),
              'deliverables', jsonb_build_array(
                'Haftalık Kontrollük Raporları',
                'Fotoğraflı Şantiye Günlükleri',
                'Test Sonuç Raporları',
                'Hakediş Onay Tutanakları',
                'İş Bitirme Raporu'
              )
            ),
            jsonb_build_object(
              'id', 'raporlama',
              'title', 'Teknik Raporlama',
              'subtitle', 'Profesyonel değerlendirme ve ekspertiz hizmetleri',
              'description', 'Yasal süreçler, satış-kiralama işlemleri ve yatırım kararları için detaylı teknik raporlar hazırlıyoruz.',
              'features', jsonb_build_array(
                jsonb_build_object('title', 'Hasar Tespit Raporları', 'desc', 'İnşaat hataları, deprem hasarı değerlendirmesi'),
                jsonb_build_object('title', 'Keşif ve Mahal Listeleri', 'desc', 'Tadilat, restorasyon için detaylı metrajlar'),
                jsonb_build_object('title', 'Enerji Kimlik Belgesi', 'desc', 'Binalarda enerji verimliliği sınıflandırması'),
                jsonb_build_object('title', 'Teknik Due Diligence', 'desc', 'Gayrimenkul yatırımları için teknik değerlendirme')
              ),
              'deliverables', jsonb_build_array(
                'Teknik Değerlendirme Raporu',
                'Fotoğraflı Hasar Tespit Tutanağı',
                'Metraj ve Maliyet Analizi',
                'Enerji Performans Belgesi',
                'Ekspertiz Raporu'
              )
            )
          )
        )
      ),
      updated_at = TIMEZONE('utc', NOW())
    WHERE id = 1;
  END IF;
END $$;

-- Add comment
COMMENT ON COLUMN site_settings.services IS 'Service categories (proje and danismanlik) with detailed service items';
