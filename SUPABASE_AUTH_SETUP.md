# Supabase Authentication Kurulum Rehberi

Bu proje artık Supabase Authentication kullanmaktadır. Aşağıdaki adımları takip ederek admin kullanıcısını oluşturabilirsiniz.

## 1. Migration'ı Çalıştırın

Supabase Dashboard'a gidin ve SQL Editor'de şu migration'ı çalıştırın:

```bash
# Dosya: supabase/migrations/014_setup_admin_auth.sql
```

Bu script Row Level Security (RLS) politikalarını aktif eder ve admin yetkilerini ayarlar.

## 2. Admin Kullanıcısı Oluşturma

### Yöntem A: Supabase Dashboard (Önerilen)

1. [Supabase Dashboard](https://supabase.com/dashboard) > Projeniz > **Authentication** > **Users**
2. **Add User** butonuna tıklayın
3. Bilgileri girin:
   - **Email:** `admin@ekipproje.com` (veya istediğiniz email)
   - **Password:** Güçlü bir şifre belirleyin (min. 8 karakter)
   - **Auto Confirm User:** ✅ İşaretleyin
4. **Create User** tıklayın

### Yöntem B: SQL ile Kullanıcı Oluşturma

Supabase SQL Editor'de:

```sql
-- NOT: Bu yöntem güvenlik nedeniyle önerilmez
-- Supabase Dashboard kullanın
```

## 3. Kullanıcı Doğrulama (Email Confirmation)

Eğer "Auto Confirm User" seçeneğini işaretlemezseniz:

1. Authentication > Users > kullanıcınızı bulun
2. **...** menüsü > **Send Magic Link** veya **Confirm Email**
3. Kullanıcı emailini doğrulayın

## 4. Test Etme

1. Uygulamanızı açın: `http://localhost:3000/admin/login`
2. Oluşturduğunuz email ve şifre ile giriş yapın
3. Başarılı giriş sonrası `/admin/dashboard` sayfasına yönlendirilmelisiniz

## 5. Güvenlik Notları

### ✅ Yapılması Gerekenler:
- Güçlü şifre kullanın (min. 12 karakter, büyük/küçük harf, rakam, özel karakter)
- Şifrenizi kimseyle paylaşmayın
- 2FA (Two-Factor Authentication) aktif edin (Supabase Dashboard > Authentication > Policies)
- Production'da email doğrulamasını zorunlu tutun

### ⚠️ Güvenlik Ayarları:
Supabase Dashboard > Authentication > Policies:

```yaml
Email Auth:
  Confirm email: enabled
  Secure email change: enabled

Security:
  Enable email confirmations: true
  Disable signup: true (tek admin varsa)
```

## 6. Şifre Sıfırlama

Kullanıcı şifresini unutursa:

### Manuel Şifre Değiştirme:
1. Supabase Dashboard > Authentication > Users
2. Kullanıcıyı bulun > **...** > **Reset Password**
3. Kullanıcıya sıfırlama linki gönderilir

### Kod ile Şifre Sıfırlama:
```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase.auth.resetPasswordForEmail(
  'admin@ekipproje.com',
  {
    redirectTo: 'http://localhost:3000/admin/reset-password',
  }
);
```

## 7. Rol ve Permissions

Şu anda tüm authenticated kullanıcılar admin yetkisine sahip. Gelecekte rol bazlı yetkilendirme eklenebilir:

```sql
-- Custom roles için tablo
CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Superadmin, Editor, Viewer gibi roller
```

## 8. Production Ortamı

### Vercel Environment Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

### Supabase Production Settings:
1. Authentication > URL Configuration
   - Site URL: `https://insaatprojeweb.vercel.app`
   - Redirect URLs: `https://insaatprojeweb.vercel.app/admin/dashboard`

2. Authentication > Email Templates
   - Confirm signup: Kendi email template'inizi ekleyin
   - Reset password: Şifre sıfırlama email'i özelleştirin

## 9. Sorun Giderme

### "Invalid login credentials" hatası:
- Email doğru mu?
- Şifre doğru mu?
- Email doğrulandı mı? (Supabase Dashboard'da kontrol edin)
- Kullanıcı suspended değil mi?

### "Email not confirmed" hatası:
- Dashboard > Authentication > Users > Kullanıcıyı bulun
- **...** > **Confirm Email** yapın

### Session sürekli kapanıyor:
- Supabase > Authentication > Settings
- JWT Expiry: Default 3600s (1 saat)
- Refresh Token Expiry: Default 604800s (7 gün)

## 10. Test Kullanıcısı (Development)

Development ortamında test için:

```
Email: admin@ekipproje.com
Password: [Supabase Dashboard'dan belirlediğiniz şifre]
```

**ÖNEMLİ:** Production'da bu bilgileri değiştirin!

---

## Destek

Sorunlarla karşılaşırsanız:
1. Supabase Dashboard > Logs > Auth Logs'u kontrol edin
2. Browser Console'da hata mesajlarını kontrol edin
3. [Supabase Docs](https://supabase.com/docs/guides/auth)

---

**Geliştirici:** OrionSoft.dev
**Lisans:** MIT
