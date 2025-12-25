# Supabase Migrations

Bu klasör Supabase veritabanı migration dosyalarını içerir.

## Migration Dosyaları

1. **003_project_images.sql** - Proje görselleri için storage bucket ve RLS policies
2. **004_site_settings_seo_about.sql** - Site ayarları, SEO ve Hakkımızda bölümleri
3. **005_site_settings_rls.sql** - Site ayarları için Row Level Security
4. **006_add_cta_column.sql** - CTA (Call to Action) bölümü
5. **007_add_navigation_column.sql** - Dinamik navigasyon menüsü
6. **008_add_hero_cards.sql** - Hero kartları (Sol & Sağ kart)

## Migration Nasıl Çalıştırılır?

### Yöntem 1: Supabase Dashboard (Önerilen)

1. [Supabase Dashboard](https://app.supabase.com)'a gidin
2. Projenizi seçin
3. Sol menüden **SQL Editor**'ü açın
4. Migration dosyasının içeriğini kopyalayın
5. SQL Editor'e yapıştırın
6. **Run** butonuna tıklayın

### Yöntem 2: Supabase CLI

```bash
# CLI'yi yükleyin (ilk defa kullanıyorsanız)
npm install -g supabase

# Projenize bağlanın
supabase link --project-ref your-project-ref

# Tüm migration'ları çalıştırın
supabase db push

# Veya tek bir migration dosyasını çalıştırın
psql -h db.your-project-ref.supabase.co -U postgres -d postgres -f supabase/migrations/008_add_hero_cards.sql
```

### Yöntem 3: Manuel SQL Çalıştırma

1. Supabase Dashboard > SQL Editor
2. New Query
3. Migration dosyasının içeriğini kopyala-yapıştır
4. Run

## Migration Sırası

⚠️ **Önemli:** Migration'ları sırayla çalıştırmanız önerilir:

```
003 → 004 → 005 → 006 → 007 → 008
```

## Son Eklenen Migration: 008_add_hero_cards.sql

Bu migration hero kartlarını ekler:

**Eklenenler:**
- `hero.leftCard` - Sol kart (Hizmet Alımı & Proje)
  - title: Başlık (çok satırlı)
  - description: Açıklama
  - features: Özellikler listesi (array)

- `hero.rightCard` - Sağ kart (Danışmanlık & Müşavirlik)
  - title: Başlık (çok satırlı)
  - description: Açıklama
  - features: Özellikler listesi (array)

**Özellikler:**
- Mevcut veriyi korur (merge yapar)
- Default değerler ile gelir
- Geriye dönük uyumlu
- RLS policies dahil

## Veritabanı Yapısı

### site_settings Tablosu

```sql
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  colors JSONB,
  hero JSONB,              -- 008: leftCard ve rightCard eklendi
  stats JSONB,
  contact JSONB,
  social JSONB,
  seo JSONB,              -- 004'te eklendi
  about JSONB,            -- 004'te eklendi
  cta JSONB,              -- 006'da eklendi
  navigation JSONB,        -- 007'de eklendi
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Hero JSONB Yapısı

```json
{
  "title": "Ekip Proje",
  "subtitle": "MİMARLIK & MÜHENDİSLİK",
  "tagline": "Sadece proje çizmiyoruz...",
  "leftCard": {
    "title": "Hizmet Alımı\\n& Proje",
    "description": "Eksiksiz ve uygulanabilir teslimat...",
    "features": [
      "Mimari Projeler",
      "Statik Hesaplamalar",
      "Tesisat Projeleri"
    ]
  },
  "rightCard": {
    "title": "Danışmanlık\\n& Müşavirlik",
    "description": "Veri odaklı ve uzmanlık merkezli rehberlik...",
    "features": [
      "Deprem Analizi",
      "Kontrollük Hizmetleri",
      "Teknik Raporlama"
    ]
  }
}
```

## Sorun Giderme

### Migration çalışmıyor
- Önceki migration'ların çalıştırılmış olduğundan emin olun
- SQL hatalarını kontrol edin
- Supabase logs'u inceleyin

### Tablo bulunamadı hatası
- Migration sırasını kontrol edin
- 004_site_settings_seo_about.sql'in çalıştırılmış olduğundan emin olun

### RLS hatası
- Supabase Dashboard > Authentication > Policies
- site_settings tablosu için policies'leri kontrol edin

## Yardım

Daha fazla bilgi için:
- [Supabase Docs - Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/sql-editor)
