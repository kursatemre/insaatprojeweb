-- Migration: Add FAQ (S.S.S) configuration to site_settings
-- Description: Adds faq JSONB column with categories and questions

-- First, add the faq column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'site_settings'
    AND column_name = 'faq'
  ) THEN
    ALTER TABLE site_settings ADD COLUMN faq JSONB;
  END IF;
END $$;

-- Then, populate with default FAQ data
DO $$
DECLARE
  current_settings RECORD;
BEGIN
  SELECT * INTO current_settings FROM site_settings WHERE id = 1;

  IF NOT FOUND THEN
    -- If no settings exist, insert with faq data
    INSERT INTO site_settings (id, faq) VALUES (
      1,
      jsonb_build_object(
        'hero', jsonb_build_object(
          'title', 'Sıkça Sorulan Sorular',
          'description', 'Mimarlık ve mühendislik hizmetlerimiz hakkında merak ettikleriniz'
        ),
        'categories', jsonb_build_array(
          jsonb_build_object(
            'id', 'genel',
            'name', 'Genel Sorular',
            'icon', 'help',
            'questions', jsonb_build_array(
              jsonb_build_object(
                'question', 'Hangi alanlarda hizmet veriyorsunuz?',
                'answer', 'Mimari projeler, statik hesaplamalar, tesisat projeleri, deprem performans analizi, kontrollük hizmetleri ve teknik raporlama alanlarında profesyonel hizmet sunuyoruz.'
              ),
              jsonb_build_object(
                'question', 'Proje süresi ne kadar?',
                'answer', 'Proje süreleri, projenin büyüklüğü ve karmaşıklığına göre değişiklik göstermektedir. Küçük ölçekli projeler 2-4 hafta, orta ölçekli projeler 1-2 ay, büyük ölçekli projeler ise 3-6 ay sürebilir.'
              ),
              jsonb_build_object(
                'question', 'EKAP üzerinden çalışıyor musunuz?',
                'answer', 'Evet, EKAP (Elektronik Kamu Alımları Platformu) kayıtlı firmayız ve kamu projelerinde EKAP üzerinden hizmet verebiliyoruz.'
              )
            )
          ),
          jsonb_build_object(
            'id', 'proje',
            'name', 'Proje Hizmetleri',
            'icon', 'document',
            'questions', jsonb_build_array(
              jsonb_build_object(
                'question', 'Mimari proje teslimatında neler bulunur?',
                'answer', 'Vaziyet planı, kat planları, kesitler, görünüşler, detay çizimleri, 3D görseller ve gerekli tüm teknik raporlar mimari proje teslimatı kapsamındadır.'
              ),
              jsonb_build_object(
                'question', 'Statik proje zorunlu mudur?',
                'answer', 'Evet, tüm yapılar için statik proje zorunludur. Yapının güvenliği ve dayanıklılığı için statik hesaplamalar ve projeler mutlaka hazırlanmalıdır.'
              ),
              jsonb_build_object(
                'question', 'Tesisat projeleri nelerdir?',
                'answer', 'Elektrik, mekanik (ısıtma-soğutma-havalandırma), sıhhi tesisat, yangın ve doğalgaz projeleri tesisat projeleri kapsamındadır.'
              )
            )
          ),
          jsonb_build_object(
            'id', 'danismanlik',
            'name', 'Danışmanlık Hizmetleri',
            'icon', 'support',
            'questions', jsonb_build_array(
              jsonb_build_object(
                'question', 'Deprem performans analizi nedir?',
                'answer', 'Mevcut yapıların deprem yönetmeliğine (TBDY 2018) göre güvenlik durumunun belirlenmesi ve gerekli güçlendirme önerilerinin sunulması hizmetidir.'
              ),
              jsonb_build_object(
                'question', 'Kontrollük hizmeti nedir?',
                'answer', 'İnşaat sürecinde projenin uygulanmasının teknik kontrolü, malzeme testleri, hakedişlerin incelenmesi ve iş güvenliği denetimi hizmetlerini kapsar.'
              ),
              jsonb_build_object(
                'question', 'Teknik rapor ne zaman gerekir?',
                'answer', 'Hasar tespiti, ekspertiz, enerji kimlik belgesi, keşif hazırlanması gibi durumlarda teknik raporlara ihtiyaç duyulur.'
              )
            )
          ),
          jsonb_build_object(
            'id', 'ucret',
            'name', 'Ücretlendirme',
            'icon', 'money',
            'questions', jsonb_build_array(
              jsonb_build_object(
                'question', 'Proje ücretleri nasıl belirlenir?',
                'answer', 'Proje ücretleri; inşaat alanı, proje türü, karmaşıklık düzeyi ve teslimat süresi gibi faktörlere göre belirlenir. Ücretsiz ön görüşme için bizimle iletişime geçebilirsiniz.'
              ),
              jsonb_build_object(
                'question', 'Ödeme planı yapılabiliyor mu?',
                'answer', 'Evet, projelerimizde esnek ödeme planları sunuyoruz. Detaylı bilgi için teklif aşamasında görüşebiliriz.'
              ),
              jsonb_build_object(
                'question', 'Revizyon ücreti var mı?',
                'answer', 'Sözleşme kapsamındaki normal revizyonlar ücretsizdir. Sözleşme dışı büyük değişiklikler için ek ücret talep edilebilir.'
              )
            )
          )
        )
      )
    );
  ELSE
    -- If settings exist, update only the faq field
    UPDATE site_settings
    SET faq = jsonb_build_object(
      'hero', jsonb_build_object(
        'title', 'Sıkça Sorulan Sorular',
        'description', 'Mimarlık ve mühendislik hizmetlerimiz hakkında merak ettikleriniz'
      ),
      'categories', jsonb_build_array(
        jsonb_build_object(
          'id', 'genel',
          'name', 'Genel Sorular',
          'icon', 'help',
          'questions', jsonb_build_array(
            jsonb_build_object(
              'question', 'Hangi alanlarda hizmet veriyorsunuz?',
              'answer', 'Mimari projeler, statik hesaplamalar, tesisat projeleri, deprem performans analizi, kontrollük hizmetleri ve teknik raporlama alanlarında profesyonel hizmet sunuyoruz.'
            ),
            jsonb_build_object(
              'question', 'Proje süresi ne kadar?',
              'answer', 'Proje süreleri, projenin büyüklüğü ve karmaşıklığına göre değişiklik göstermektedir. Küçük ölçekli projeler 2-4 hafta, orta ölçekli projeler 1-2 ay, büyük ölçekli projeler ise 3-6 ay sürebilir.'
            ),
            jsonb_build_object(
              'question', 'EKAP üzerinden çalışıyor musunuz?',
              'answer', 'Evet, EKAP (Elektronik Kamu Alımları Platformu) kayıtlı firmayız ve kamu projelerinde EKAP üzerinden hizmet verebiliyoruz.'
            )
          )
        ),
        jsonb_build_object(
          'id', 'proje',
          'name', 'Proje Hizmetleri',
          'icon', 'document',
          'questions', jsonb_build_array(
            jsonb_build_object(
              'question', 'Mimari proje teslimatında neler bulunur?',
              'answer', 'Vaziyet planı, kat planları, kesitler, görünüşler, detay çizimleri, 3D görseller ve gerekli tüm teknik raporlar mimari proje teslimatı kapsamındadır.'
            ),
            jsonb_build_object(
              'question', 'Statik proje zorunlu mudur?',
              'answer', 'Evet, tüm yapılar için statik proje zorunludur. Yapının güvenliği ve dayanıklılığı için statik hesaplamalar ve projeler mutlaka hazırlanmalıdır.'
            ),
            jsonb_build_object(
              'question', 'Tesisat projeleri nelerdir?',
              'answer', 'Elektrik, mekanik (ısıtma-soğutma-havalandırma), sıhhi tesisat, yangın ve doğalgaz projeleri tesisat projeleri kapsamındadır.'
            )
          )
        ),
        jsonb_build_object(
          'id', 'danismanlik',
          'name', 'Danışmanlık Hizmetleri',
          'icon', 'support',
          'questions', jsonb_build_array(
            jsonb_build_object(
              'question', 'Deprem performans analizi nedir?',
              'answer', 'Mevcut yapıların deprem yönetmeliğine (TBDY 2018) göre güvenlik durumunun belirlenmesi ve gerekli güçlendirme önerilerinin sunulması hizmetidir.'
            ),
            jsonb_build_object(
              'question', 'Kontrollük hizmeti nedir?',
              'answer', 'İnşaat sürecinde projenin uygulanmasının teknik kontrolü, malzeme testleri, hakedişlerin incelenmesi ve iş güvenliği denetimi hizmetlerini kapsar.'
            ),
            jsonb_build_object(
              'question', 'Teknik rapor ne zaman gerekir?',
              'answer', 'Hasar tespiti, ekspertiz, enerji kimlik belgesi, keşif hazırlanması gibi durumlarda teknik raporlara ihtiyaç duyulur.'
            )
          )
        ),
        jsonb_build_object(
          'id', 'ucret',
          'name', 'Ücretlendirme',
          'icon', 'money',
          'questions', jsonb_build_array(
            jsonb_build_object(
              'question', 'Proje ücretleri nasıl belirlenir?',
              'answer', 'Proje ücretleri; inşaat alanı, proje türü, karmaşıklık düzeyi ve teslimat süresi gibi faktörlere göre belirlenir. Ücretsiz ön görüşme için bizimle iletişime geçebilirsiniz.'
            ),
            jsonb_build_object(
              'question', 'Ödeme planı yapılabiliyor mu?',
              'answer', 'Evet, projelerimizde esnek ödeme planları sunuyoruz. Detaylı bilgi için teklif aşamasında görüşebiliriz.'
            ),
            jsonb_build_object(
              'question', 'Revizyon ücreti var mı?',
              'answer', 'Sözleşme kapsamındaki normal revizyonlar ücretsizdir. Sözleşme dışı büyük değişiklikler için ek ücret talep edilebilir.'
            )
          )
        )
      )
    )
    WHERE id = 1;
  END IF;
END $$;
