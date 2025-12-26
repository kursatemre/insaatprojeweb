# 🗄️ Supabase Backend Kurulum Rehberi

Bu doküman, Ekip Proje web sitesi için Supabase backend entegrasyonunu adım adım açıklar.

## 📋 Gereksinimler

- Supabase hesabı (ücretsiz plan yeterli)
- Node.js 18+ yüklü olmalı
- Git

## 🚀 Adım 1: Supabase Projesi Oluşturma

1. **Supabase'e Git:**
   - https://supabase.com adresine gidin
   - "Start your project" butonuna tıklayın
   - GitHub veya email ile giriş yapın

2. **Yeni Proje Oluştur:**
   - "New Project" butonuna tıklayın
   - Proje adı: `ekip-proje-web`
   - Database password: Güçlü bir şifre oluşturun (kaydedin!)
   - Region: `Europe (Frankfurt)` (en yakın)
   - Plan: `Free` (başlangıç için yeterli)
   - "Create new project" butonuna tıklayın

3. **API Credentials'ı Kopyalayın:**
   - Sol menüden "Settings" > "API" sekmesine gidin
   - `Project URL` ve `anon public` key'i kopyalayın

## 🔑 Adım 2: Environment Variables Ayarlama

1. **Local Development:**
   ```bash
   # .env.local dosyası oluşturun (proje root'unda)
   cp .env.example .env.local
   ```

2. **.env.local dosyasını düzenleyin:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Vercel'de Environment Variables:**
   - Vercel Dashboard > Your Project > Settings > Environment Variables
   - Yukarıdaki 2 değeri ekleyin
   - "Production", "Preview", "Development" hepsini seçin
   - Save

## 📊 Adım 3: Database Schema Oluşturma

1. **SQL Editor'ü Açın:**
   - Supabase Dashboard > SQL Editor
   - "New query" butonuna tıklayın

2. **Schema SQL'i Çalıştırın:**
   ```bash
   # Projedeki schema.sql dosyasını kopyalayın
   cat supabase/schema.sql
   ```
   - SQL'i kopyalayıp Supabase SQL Editor'e yapıştırın
   - "Run" butonuna tıklayın
   - ✅ Success mesajını görmelisiniz

3. **Tabloları Kontrol Edin:**
   - Table Editor'e gidin
   - Şu tabloları görmelisiniz:
     - ✅ `projects` (6 demo proje)
     - ✅ `messages` (2 demo mesaj)
     - ✅ `site_settings` (1 default ayar)

## 🔐 Adım 4: Row Level Security (RLS) Kontrol

Tablolar otomatik olarak RLS ile korunuyor:

- **Projects:** Public okuma, Admin yazma
- **Messages:** Public oluşturma (form), Admin okuma/yazma
- **Site Settings:** Public okuma, Admin yazma

## 🧪 Adım 5: Test Etme

### Local'de Test:
```bash
npm run dev
```

### Supabase Connection Test:
```bash
# Browser console'da test
const { data, error } = await supabase.from('projects').select('*');
console.log(data);
```

### Admin Panel Test:
1. `/admin/login` sayfasına gidin
2. Demo credentials ile giriş yapın
3. Dashboard'da istatistikleri görmelisiniz
4. Projeler sayfasında demo projeleri görmelisiniz

## 📋 Adım 6: API Fonksiyonları Kullanımı

### Projects API:
```typescript
import { getAllProjects, createProject, updateProject, deleteProject } from '@/lib/api/projects';

// Tüm projeleri getir
const result = await getAllProjects();
if (result.success) {
  console.log(result.data);
}

// Yeni proje ekle
const newProject = await createProject({
  title: 'Yeni Proje',
  category: 'ozel',
  location: 'İstanbul',
  year: '2024',
  area: '1000 m²',
  description: 'Açıklama',
  status: 'Planlama',
  budget: '₺5M',
  duration: '12 ay',
  services: ['Mimari', 'Statik']
});
```

### Messages API:
```typescript
import { getAllMessages, createMessage, markMessageAsRead } from '@/lib/api/messages';

// İletişim formu gönderimi
const message = await createMessage({
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  phone: '+90 532 123 4567',
  project_type: 'Mimari Proje',
  message: 'Proje talebi...'
});
```

### Settings API:
```typescript
import { getSiteSettings, updateSiteSettings } from '@/lib/api/settings';

// Ayarları getir
const settings = await getSiteSettings();

// Ayarları güncelle
await updateSiteSettings({
  colors: {
    primary: '#0f172a',
    secondary: '#1a1a1a',
    accent: '#b89150',
    background: '#f4f4f2'
  }
});
```

## 🔄 Adım 7: Realtime Subscriptions (Opsiyonel)

Gerçek zamanlı güncellemeler için:

```typescript
// Yeni mesajları dinle
const subscription = supabase
  .channel('messages')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('Yeni mesaj:', payload.new);
      // UI'ı güncelle
    }
  )
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

## 📦 Adım 8: Storage (İmaj Upload)

### Storage Bucket Oluşturma:
1. Supabase Dashboard > Storage
2. "New bucket" butonuna tıklayın
3. Name: `project-images`
4. Public bucket: ✅ (açık)
5. File size limit: 5MB
6. Allowed MIME types: `image/png, image/jpeg, image/svg+xml`

### Upload Fonksiyonu:
```typescript
// lib/api/storage.ts
export async function uploadProjectImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(filePath, file);

  if (error) return { success: false, error };

  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath);

  return { success: true, url: publicUrl };
}
```

## 🔐 Adım 9: Admin Authentication (Opsiyonel)

LocalStorage yerine Supabase Auth kullanmak için:

### Auth Email Template:
```sql
-- Supabase Dashboard > Authentication > Email Templates
-- Confirm signup template'i düzenleyin
```

### Auth Hook:
```typescript
// lib/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user };
}
```

## 📊 Adım 10: Database Backup

### Otomatik Backup:
- Supabase Free plan: Günlük backup (7 gün)
- Pro plan: Point-in-time recovery

### Manuel Backup:
```bash
# Supabase CLI ile
supabase db dump > backup.sql

# Restore
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

## 🐛 Troubleshooting

### Connection Error:
- ✅ `.env.local` dosyasını kontrol edin
- ✅ Supabase URL'in sonunda `/` olmamalı
- ✅ Anon key'i doğru kopyaladığınızdan emin olun

### RLS Policy Error:
```sql
-- Tüm RLS policy'leri kontrol edin
SELECT * FROM pg_policies WHERE tablename = 'projects';
```

### CORS Error:
- Supabase otomatik CORS yapılandırması yapar
- Sorun varsa: Settings > API > CORS

## 📚 Daha Fazla Kaynak

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)

## ✅ Checklist

- [ ] Supabase projesi oluşturuldu
- [ ] Environment variables ayarlandı (.env.local)
- [ ] Database schema çalıştırıldı
- [ ] Tablolar oluşturuldu (projects, messages, site_settings)
- [ ] Demo data yüklendi
- [ ] RLS policies aktif
- [ ] Local'de test edildi
- [ ] Vercel'de environment variables eklendi
- [ ] Production'da test edildi
- [ ] Storage bucket oluşturuldu (opsiyonel)
- [ ] Supabase Auth yapılandırıldı (opsiyonel)

## 🎉 Tamamlandı!

Backend entegrasyonu tamamlandı. Artık:
- ✅ Projeler veritabanından geliyor
- ✅ İletişim formu mesajları kaydediliyor
- ✅ Admin paneli gerçek verilerle çalışıyor
- ✅ Site ayarları güncelleniyor

**Live URL:** https://ekipproje.com
**Supabase Dashboard:** https://supabase.com/dashboard/project/[your-project-id]
