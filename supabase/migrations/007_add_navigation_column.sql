-- Site ayarları tablosuna Navigation kolonu ekle
-- Bu migration, site_settings tablosuna navigation (Header/Nav) alanı ekler

-- Navigation kolonu ekle
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS navigation JSONB DEFAULT '{
  "logo": {
    "text": "EKİP PROJE",
    "subtitle": "MİMARLIK & MÜHENDİSLİK",
    "imageUrl": "",
    "showImage": false
  },
  "colors": {
    "default": {
      "background": "rgba(26, 26, 26, 0.9)",
      "text": "#ffffff",
      "border": "rgba(184, 145, 80, 0.2)"
    },
    "scrolled": {
      "background": "rgba(244, 244, 242, 0.95)",
      "text": "#0f172a",
      "border": "rgba(26, 26, 26, 0.1)"
    }
  },
  "topBar": {
    "enabled": true,
    "stats": [
      "2.4M+ m² İnşaat Alanı",
      "110+ Onaylı Kamu Projesi",
      "50+ Deprem Analizi",
      "81 İl Hizmet Ağı",
      "EKAP Uyumlu Projeler"
    ],
    "showLanguageSwitcher": true,
    "showEkapBadge": true,
    "colors": {
      "background": "rgba(26, 26, 26, 0.95)",
      "text": "rgba(184, 145, 80, 0.8)",
      "border": "rgba(184, 145, 80, 0.1)"
    }
  },
  "menuItems": [
    {
      "label": "Ana Sayfa",
      "href": "/",
      "type": "link"
    },
    {
      "label": "Hizmetler",
      "href": "/hizmetler",
      "type": "megamenu",
      "megaMenuItems": [
        {
          "category": "Hizmet Alımı",
          "categoryDesc": "Proje Üretimi",
          "items": [
            {
              "title": "Mimari Projeler",
              "desc": "Estetik ve fonksiyonel tasarımlar",
              "href": "/hizmetler#mimari",
              "icon": "Building2"
            },
            {
              "title": "Statik Projeler",
              "desc": "Güvenli taşıyıcı sistem tasarımı",
              "href": "/hizmetler#statik",
              "icon": "Ruler"
            },
            {
              "title": "Tesisat Projeleri",
              "desc": "Elektrik, mekanik, sıhhi tesisat",
              "href": "/hizmetler#tesisat",
              "icon": "Zap"
            }
          ]
        },
        {
          "category": "Danışmanlık",
          "categoryDesc": "Teknik Müşavirlik",
          "items": [
            {
              "title": "Deprem Performans Analizi",
              "desc": "TBDY 2018 uyumlu hesaplamalar",
              "href": "/hizmetler#deprem",
              "icon": "LineChart"
            },
            {
              "title": "Kontrollük Hizmetleri",
              "desc": "İnşaat gözetim ve kalite kontrolü",
              "href": "/hizmetler#kontrolluk",
              "icon": "ClipboardCheck"
            },
            {
              "title": "Teknik Raporlama",
              "desc": "Ekspertiz ve değerlendirme",
              "href": "/hizmetler#raporlama",
              "icon": "ShieldCheck"
            }
          ]
        }
      ]
    },
    {
      "label": "Projeler",
      "href": "/projeler",
      "type": "link"
    },
    {
      "label": "Hakkımızda",
      "href": "/hakkimizda",
      "type": "link"
    },
    {
      "label": "İletişim",
      "href": "/iletisim",
      "type": "link"
    }
  ],
  "ctaButton": {
    "enabled": true,
    "text": "Projeyi Başlat",
    "href": "/iletisim"
  }
}'::jsonb;

-- Mevcut kayıtları güncelle (eğer null ise)
UPDATE site_settings
SET navigation = '{
  "logo": {
    "text": "EKİP PROJE",
    "subtitle": "MİMARLIK & MÜHENDİSLİK",
    "imageUrl": "",
    "showImage": false
  },
  "colors": {
    "default": {
      "background": "rgba(26, 26, 26, 0.9)",
      "text": "#ffffff",
      "border": "rgba(184, 145, 80, 0.2)"
    },
    "scrolled": {
      "background": "rgba(244, 244, 242, 0.95)",
      "text": "#0f172a",
      "border": "rgba(26, 26, 26, 0.1)"
    }
  },
  "topBar": {
    "enabled": true,
    "stats": [
      "2.4M+ m² İnşaat Alanı",
      "110+ Onaylı Kamu Projesi",
      "50+ Deprem Analizi",
      "81 İl Hizmet Ağı",
      "EKAP Uyumlu Projeler"
    ],
    "showLanguageSwitcher": true,
    "showEkapBadge": true,
    "colors": {
      "background": "rgba(26, 26, 26, 0.95)",
      "text": "rgba(184, 145, 80, 0.8)",
      "border": "rgba(184, 145, 80, 0.1)"
    }
  },
  "menuItems": [
    {
      "label": "Ana Sayfa",
      "href": "/",
      "type": "link"
    },
    {
      "label": "Hizmetler",
      "href": "/hizmetler",
      "type": "megamenu",
      "megaMenuItems": [
        {
          "category": "Hizmet Alımı",
          "categoryDesc": "Proje Üretimi",
          "items": [
            {
              "title": "Mimari Projeler",
              "desc": "Estetik ve fonksiyonel tasarımlar",
              "href": "/hizmetler#mimari",
              "icon": "Building2"
            },
            {
              "title": "Statik Projeler",
              "desc": "Güvenli taşıyıcı sistem tasarımı",
              "href": "/hizmetler#statik",
              "icon": "Ruler"
            },
            {
              "title": "Tesisat Projeleri",
              "desc": "Elektrik, mekanik, sıhhi tesisat",
              "href": "/hizmetler#tesisat",
              "icon": "Zap"
            }
          ]
        },
        {
          "category": "Danışmanlık",
          "categoryDesc": "Teknik Müşavirlik",
          "items": [
            {
              "title": "Deprem Performans Analizi",
              "desc": "TBDY 2018 uyumlu hesaplamalar",
              "href": "/hizmetler#deprem",
              "icon": "LineChart"
            },
            {
              "title": "Kontrollük Hizmetleri",
              "desc": "İnşaat gözetim ve kalite kontrolü",
              "href": "/hizmetler#kontrolluk",
              "icon": "ClipboardCheck"
            },
            {
              "title": "Teknik Raporlama",
              "desc": "Ekspertiz ve değerlendirme",
              "href": "/hizmetler#raporlama",
              "icon": "ShieldCheck"
            }
          ]
        }
      ]
    },
    {
      "label": "Projeler",
      "href": "/projeler",
      "type": "link"
    },
    {
      "label": "Hakkımızda",
      "href": "/hakkimizda",
      "type": "link"
    },
    {
      "label": "İletişim",
      "href": "/iletisim",
      "type": "link"
    }
  ],
  "ctaButton": {
    "enabled": true,
    "text": "Projeyi Başlat",
    "href": "/iletisim"
  }
}'::jsonb
WHERE navigation IS NULL;
