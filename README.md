# Ekip Proje - Mimarlık & Mühendislik Web Sitesi

Türkiye'nin prestijli mimarlık ve mühendislik firması Ekip Proje için geliştirilmiş modern, lüks ve teknik otorite yansıtan kurumsal web sitesi.

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Renkler:**
  - Koyu Karbon (#1a1a1a)
  - Gece Mavisi (#0f172a)
  - Warm Concrete (#f4f4f2) - Arka plan

- **Aksan Renkleri:**
  - Muted Gold (#b89150)
  - Bronze (#cd7f32)

### Tipografi
- **Başlıklar:** Playfair Display, Cinzel (Serif - Lüks görünüm)
- **Metin:** Manrope (Sans-serif - Modern ve okunabilir)
- **Teknik:** Roboto Mono (Monospace - Profesyonel kod/veri görünümü)

### Doku ve Desenler
- Blueprint (mavi baskı/mühendislik kareleri) deseni
- Topoğrafik çizgiler
- Teknik çizim izleri
- Gradient ve blur efektleri

## 🚀 Teknoloji Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3.4
- **Animasyonlar:** Framer Motion 11
- **Language:** TypeScript 5
- **İkonlar:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage (görseller için)

## 📁 Proje Yapısı

```
ekipprojecom/
├── app/
│   ├── layout.tsx              # Ana layout ve metadata
│   ├── page.tsx                # Ana sayfa
│   ├── globals.css             # Global stiller ve fontlar
│   ├── hizmetler/
│   │   └── page.tsx            # Hizmetler sayfası
│   ├── projeler/
│   │   └── page.tsx            # Projeler/Portfolio sayfası
│   ├── hakkimizda/
│   │   └── page.tsx            # Hakkımızda sayfası
│   ├── iletisim/
│   │   └── page.tsx            # İletişim sayfası
│   └── admin/
│       ├── login/page.tsx      # Admin giriş sayfası
│       ├── dashboard/page.tsx  # Admin dashboard
│       ├── projeler/page.tsx   # Proje yönetimi
│       ├── mesajlar/page.tsx   # Mesaj yönetimi
│       └── ayarlar/page.tsx    # Site ayarları
├── components/
│   ├── Navigation.tsx          # Dinamik navbar bileşeni
│   ├── Footer.tsx              # Footer bileşeni
│   ├── admin/
│   │   ├── AdminSidebar.tsx   # Mobil responsive sidebar
│   │   └── ImageUploader.tsx  # Görsel yükleme
│   └── home/
│       ├── HeroSection.tsx     # Hero bölümü (İnteraktif split)
│       ├── StatsSection.tsx    # Teknik kapasite metrikleri
│       ├── ServicesOverview.tsx # Hizmet grupları
│       ├── TurkeyMap.tsx       # İnteraktif Türkiye haritası
│       └── CTASection.tsx      # Call-to-action bölümü
├── lib/
│   ├── supabase.ts             # Supabase client ve types
│   └── api/
│       ├── settings.ts         # Site ayarları API
│       ├── projects.ts         # Proje CRUD işlemleri
│       └── messages.ts         # Mesaj yönetimi
├── supabase/
│   └── migrations/             # Database migration'ları
│       ├── 001_create_projects.sql
│       ├── 002_create_messages.sql
│       ├── 003_create_site_settings.sql
│       ├── 004_create_project_images.sql
│       ├── 005_add_cta_column.sql
│       ├── 006_add_about_column.sql
│       └── 007_add_navigation_column.sql
├── tailwind.config.ts          # Tailwind yapılandırması
├── tsconfig.json               # TypeScript yapılandırması
├── next.config.ts              # Next.js yapılandırması
└── package.json                # Proje bağımlılıkları
```

## 🌟 Özellikler

### Ana Sayfa
- ✅ İnteraktif split hero section (Hizmet Alımı vs Danışmanlık)
- ✅ Animasyonlu teknik kapasite metrikleri
- ✅ Tab-based hizmet grupları
- ✅ İnteraktif Türkiye haritası (12 şehir marker'ı)
- ✅ Modern CTA section

### Hizmetler Sayfası
- ✅ Proje Hizmetleri (Mimari, Statik, Tesisat)
- ✅ Danışmanlık Hizmetleri (Deprem, Kontrollük, Raporlama)
- ✅ Detaylı servis kartları
- ✅ Teslim edilenler listesi
- ✅ Her hizmet için özellikler

### Projeler Sayfası
- ✅ Filtrelenebilir proje portfolyosu
- ✅ 6 örnek proje (Kamu, Özel, Konut, Ticari)
- ✅ Proje detayları (alan, süre, bütçe)
- ✅ Kategori badge'leri
- ✅ Durum göstergeleri

### Hakkımızda Sayfası
- ✅ Misyon ve vizyon bölümleri
- ✅ 4 temel değer kartı
- ✅ Uzman ekip profilleri (4 kişi)
- ✅ Sertifika ve belgeler bölümü

### İletişim Sayfası
- ✅ İletişim bilgileri kartları
- ✅ Detaylı teklif formu
- ✅ Proje türü seçimi
- ✅ SSS bölümü
- ✅ Acil destek banner'ı

### Genel Özellikler
- ✅ Tam responsive tasarım (mobile, tablet, desktop)
- ✅ Smooth scroll animasyonlar
- ✅ Framer Motion ile fade-in/slide efektleri
- ✅ Hover efektleri ve interaktif elemanlar
- ✅ SEO optimize edilmiş
- ✅ Hızlı sayfa yükleme
- ✅ Accessibility uyumlu
- ✅ iOS Safari optimizasyonları

## 🎯 Dinamik İçerik Yönetimi

### Navigation (Header) Sistemi
**Veritabanı-Driven Dinamik Header:**

#### Logo Ayarları
- ✅ Logo metni (EKİP PROJE)
- ✅ Alt başlık (MİMARLIK & MÜHENDİSLİK)
- ✅ Logo görseli yükleme (opsiyonel)
- ✅ Görsel/metin toggle

#### Renk Tema Sistemi
**Default (Scroll Öncesi):**
- ✅ Background rengi
- ✅ Metin rengi
- ✅ Border rengi

**Scrolled (Scroll Sonrası):**
- ✅ Background rengi (daha açık, glassmorphism)
- ✅ Metin rengi (karşıt kontrast)
- ✅ Border rengi

#### Top Bar Ayarları
- ✅ Enable/disable toggle
- ✅ Animasyonlu istatistik ticker (5 adet)
- ✅ EKAP rozet gösterimi
- ✅ Dil değiştirici (TR/EN)
- ✅ **Top Bar renkleri:**
  - Background color
  - Text color
  - Border color

#### Menü Yapısı
**Basit Linkler:**
- Ana Sayfa
- Projeler
- Hakkımızda
- İletişim

**Mega Menu (Hizmetler):**
- ✅ 2 kategori (Hizmet Alımı, Danışmanlık)
- ✅ Her kategoride 3 alt hizmet
- ✅ İkon desteği (Lucide React)
- ✅ Açıklama metinleri
- ✅ Hover efektleri

#### CTA Button
- ✅ Enable/disable
- ✅ Buton metni
- ✅ Hedef URL

### Site Ayarları (`/admin/ayarlar`)

#### Tab 1: Tema & Renkler
- ✅ Primary renk (Color picker + Hex input)
- ✅ Secondary renk
- ✅ Accent renk
- ✅ Background renk
- ✅ Canlı önizleme
- ✅ Varsayılan değerlere dönüş

#### Tab 2: Hero İçeriği
- ✅ Ana başlık
- ✅ Alt başlık
- ✅ Slogan
- ✅ Karakter sayısı göstergesi

#### Tab 3: İstatistikler
- ✅ Toplam Proje sayısı
- ✅ İnşaat Alanı (m²)
- ✅ Aktif Şantiye sayısı
- ✅ Müşteri sayısı

#### Tab 4: İletişim Bilgileri
- ✅ E-posta
- ✅ Telefon
- ✅ Adres (Textarea)
- ✅ Çalışma saatleri

#### Tab 5: Sosyal Medya
- ✅ LinkedIn URL
- ✅ Instagram URL
- ✅ Facebook URL
- ✅ Twitter URL
- ✅ URL validation

#### Tab 6: Hakkımızda
- ✅ Başlık
- ✅ Açıklama (Textarea)
- ✅ Misyon
- ✅ Vizyon
- ✅ Karakter sayacı

#### Tab 7: CTA Bölümü
- ✅ Başlık
- ✅ Alt başlık
- ✅ Açıklama
- ✅ Primary buton metni
- ✅ Secondary buton metni

#### Tab 8: Navigation (Header)
- ✅ **Logo Ayarları:**
  - Logo metni
  - Alt başlık
  - Logo görseli URL
  - Görsel göster/gizle toggle

- ✅ **Renk Ayarları:**
  - Default: Background, Text, Border
  - Scrolled: Background, Text, Border
  - Color picker interface

- ✅ **Top Bar:**
  - Enable/disable
  - 5 istatistik metni (editable array)
  - Dil değiştirici toggle
  - EKAP rozeti toggle
  - Top bar renkleri (background, text, border)

- ✅ **Menü Öğeleri:**
  - JSON editor (syntax highlighting)
  - Link/Megamenu type support
  - Lucide icon desteği
  - Preview

- ✅ **CTA Button:**
  - Enable/disable
  - Buton metni
  - Hedef URL

### Responsive Özellikler

#### Admin Panel
- ✅ **Mobil sidebar:**
  - Hamburger/X toggle butonu
  - Slide-in/out animasyon
  - Overlay background
  - Otomatik kapanma (menü tıklandığında)

- ✅ **Desktop sidebar:**
  - Her zaman görünür
  - Fixed pozisyon
  - Smooth animations

- ✅ **Ayarlar sayfası:**
  - Top bar: flex-col (mobile) → flex-row (tablet+)
  - Responsive buttons: w-full (mobile) → w-auto (desktop)
  - Tab bar: Yatay kaydırma (mobile), scrollbar gizli
  - Toast notifications: Full-width (mobile) → sağ üst (desktop)
  - Input alanları: Responsive padding ve font boyutları

#### Frontend Navigation
- ✅ **Top Bar:**
  - Animasyonlu istatistik ticker
  - Dinamik renkler (database-driven)
  - Responsive quick actions

- ✅ **Main Header:**
  - Smooth scroll detection
  - Glassmorphism efekt
  - Renk geçişleri (scroll ile)

- ✅ **Mega Menu:**
  - Desktop: Hover açılır
  - Mobile: Full-screen akordeon
  - İkon-metin kombinasyonu

- ✅ **Mobile Menu:**
  - Full-screen overlay
  - Blueprint background pattern
  - Smooth animations
  - Quick contact buttons

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı (backend için)

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment variables oluşturun (`.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Supabase migration'ları çalıştırın:
```bash
npx supabase db push
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda açın:
```
http://localhost:3000
```

### Build ve Production

Production build oluşturmak için:
```bash
npm run build
npm run start
```

## 🔐 Admin Panel Sistemi

### Giriş Bilgileri:
```
URL: https://insaatprojeweb.vercel.app/admin/login
Email: admin@ekipproje.com
Password: admin123
```

### Admin Panel Özellikleri:

#### 📊 Dashboard (`/admin/dashboard`)
- 4 istatistik kartı (Projeler, Şantiyeler, Mesajlar, Gelir)
- Son projeler tablosu
- Son mesajlar listesi
- Gerçek zamanlı bildirimler

#### 🏗️ Proje Yönetimi (`/admin/projeler`)
- CRUD operasyonları (Create, Read, Update, Delete)
- Kategori filtreleme (Kamu, Özel Sektör, Konut, Ticari)
- Proje detay kartları
- Durum takibi (Tamamlandı, Devam Ediyor, Planlama)

#### 📧 Mesaj Yönetimi (`/admin/mesajlar`)
- Inbox tarzı mesaj listesi
- Okundu/Okunmadı filtreleme
- Öncelik etiketleri (Yüksek, Orta, Düşük)
- E-posta gönder ve ara butonları
- Mesaj silme özelliği

#### ⚙️ Site Ayarları (`/admin/ayarlar`)

**8 Sekme ile Tam Kontrol:**

1. **Tema & Renkler**
   - Primary, Secondary, Accent, Background
   - Color picker + Hex input
   - Canlı önizleme

2. **Hero İçeriği**
   - Başlık, Alt başlık, Slogan
   - Karakter sayacı

3. **İstatistikler**
   - 4 metrik düzenleme

4. **İletişim**
   - E-posta, telefon, adres, çalışma saatleri

5. **Sosyal Medya**
   - 4 platform URL'leri

6. **Hakkımızda**
   - Başlık, açıklama, misyon, vizyon

7. **CTA Bölümü**
   - Başlık, alt başlık, buton metinleri

8. **Navigation (Header)**
   - Logo ayarları
   - Renk temaları (default/scrolled)
   - Top bar yapılandırması
   - Menü öğeleri (JSON editor)
   - CTA button

#### 🖼️ Görsel Yönetimi
- **ImageUploader Component**
  - Drag & drop interface
  - File type validation (PNG, JPG, SVG)
  - Size validation (5MB limit)
  - Real-time preview
  - Supabase Storage için hazır

### Güvenlik:
- LocalStorage token authentication
- Protected routes (token kontrolü)
- Automatic redirect to login
- Session management
- Route guards

### Veri Yönetimi:
- ✅ Supabase PostgreSQL
- ✅ JSONB columns (esnek veri yapısı)
- ✅ Real-time subscriptions için hazır
- ✅ Row Level Security (RLS) için hazır

## 📊 Database Schema

### Tables

#### `projects`
```sql
- id (int, primary key)
- created_at (timestamp)
- title (text)
- category (enum: kamu, ozel, konut, ticari)
- location (text)
- year (text)
- area (text)
- description (text)
- status (enum: Tamamlandı, Devam Ediyor, Planlama)
- budget (text)
- duration (text)
- services (text[])
- image_url (text)
```

#### `messages`
```sql
- id (int, primary key)
- created_at (timestamp)
- name (text)
- email (text)
- phone (text)
- project_type (text)
- company (text)
- location (text)
- message (text)
- is_read (boolean)
- priority (enum: low, medium, high)
```

#### `project_images`
```sql
- id (int, primary key)
- project_id (int, foreign key)
- image_url (text)
- caption (text)
- display_order (int)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `site_settings`
```sql
- id (int, primary key)
- created_at (timestamp)
- updated_at (timestamp)
- colors (jsonb) - Tema renkleri
- hero (jsonb) - Hero bölümü içeriği
- stats (jsonb) - İstatistik değerleri
- contact (jsonb) - İletişim bilgileri
- social (jsonb) - Sosyal medya linkleri
- seo (jsonb) - SEO ayarları
- about (jsonb) - Hakkımızda metinleri
- cta (jsonb) - CTA bölümü
- navigation (jsonb) - Header/Navigation ayarları
```

### Migration Dosyaları
1. `001_create_projects.sql` - Proje tablosu
2. `002_create_messages.sql` - Mesaj tablosu
3. `003_create_site_settings.sql` - Site ayarları
4. `004_create_project_images.sql` - Proje görselleri
5. `005_add_cta_column.sql` - CTA bölümü
6. `006_add_about_column.sql` - Hakkımızda bölümü
7. `007_add_navigation_column.sql` - Navigation ayarları

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl, 2xl)

### Tailwind Breakpoints Kullanımı
```tsx
// Mobile first approach
className="flex-col sm:flex-row"      // Mobile: column, Tablet+: row
className="text-sm md:text-base"      // Mobile: small, Desktop: base
className="p-4 lg:p-8"                // Mobile: 4, Desktop: 8
className="hidden md:block"           // Mobile: hidden, Desktop: visible
```

## 🎨 Tasarım Prensipleri

1. **Minimalist ama Dokulu:** Sade ama depth veren desenler
2. **Ağır ve Güven Verici:** Koyu renkler, serif fontlar
3. **Teknik Otorite:** Blueprint desenler, monospace fontlar
4. **Lüks Görünüm:** Gold aksanlar, smooth animasyonlar
5. **Profesyonellik:** EKAP uyumlu, kamu standartları vurgusu

## 🔄 Son Güncellemeler (Aralık 2024)

### v3.0.0 - Dinamik Navigation Sistemi
- ✅ Veritabanı-driven header
- ✅ Top bar renk ayarları
- ✅ Mega menu JSON editor
- ✅ Logo ve tema özelleştirme
- ✅ Lucide React icon entegrasyonu
- ✅ Emoji'den icon'a geçiş

### v2.5.0 - Responsive İyileştirmeler
- ✅ Admin sidebar mobil toggle
- ✅ Ayarlar sayfası responsive
- ✅ Top bar responsive renk sistemi
- ✅ Toast notification responsive
- ✅ Tab bar horizontal scroll (mobile)

### v2.0.0 - Admin Panel
- ✅ Full-featured admin panel
- ✅ 8 sekmeli ayarlar sayfası
- ✅ CRUD operasyonları
- ✅ Image upload component
- ✅ Supabase entegrasyonu

### v1.0.0 - Initial Release
- ✅ 5 sayfa frontend
- ✅ Responsive design
- ✅ Framer Motion animations
- ✅ SEO optimization

## 📊 Proje Metrikleri

```
Toplam Satır:        ~18,000+
Component:           30+
Admin Component:     7
Public Sayfa:        5 (Ana, Hizmetler, Projeler, Hakkımızda, İletişim)
Admin Sayfa:         5 (Login, Dashboard, Projeler, Mesajlar, Ayarlar)
Database Tables:     4 (Projects, Messages, Project Images, Site Settings)
Migration Files:     7
Geliştirme Süresi:   3 gün
Tech Stack:          Next.js 15, React 18, TypeScript, Tailwind, Framer Motion
Responsive:          ✅ Mobile, Tablet, Desktop
iOS Uyumlu:          ✅ Safari optimizasyonları
Admin Panel:         ✅ Tam fonksiyonel
Dinamik İçerik:      ✅ Database-driven
Icon Sistemi:        ✅ Lucide React
```

## 🚀 Deployment

**Live URL:** https://insaatprojeweb.vercel.app
**Admin Panel:** https://insaatprojeweb.vercel.app/admin/login

**Deployment Platform:** Vercel
- Otomatik deployment (git push)
- Environment variables desteği
- Edge Functions
- Analytics
- Supabase entegrasyonu

### Environment Variables (Vercel)
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 🔮 Gelecek Özellikler

### Planlanan
- [ ] SEO ayarları (Tab 9)
- [ ] Blog/Haberler sistemi
- [ ] Multi-language support (TR/EN)
- [ ] Proje detay sayfaları (slug-based)
- [ ] E-posta bildirimleri (Resend/SendGrid)
- [ ] Analytics dashboard
- [ ] File upload (Supabase Storage)
- [ ] Real-time notifications
- [ ] Advanced search & filtering
- [ ] Export data (CSV, PDF)

### Teknik İyileştirmeler
- [ ] Server-side rendering (SSR) optimization
- [ ] Image optimization (Next.js Image)
- [ ] Lazy loading components
- [ ] Performance monitoring
- [ ] Error boundaries
- [ ] Unit tests
- [ ] E2E tests

## 📄 Lisans

Bu proje Ekip Proje Mimarlık ve Mühendislik için özel olarak geliştirilmiştir.

## 👨‍💻 Geliştirici Notları

### Best Practices
- ✅ TypeScript strict mode
- ✅ ESLint rules
- ✅ Prettier formatting
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Mobile-first design
- ✅ Performance optimization

### Kullanılan Paketler
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "framer-motion": "^11.0.0",
    "tailwindcss": "^3.4.0",
    "@supabase/supabase-js": "^2.38.0",
    "lucide-react": "latest",
    "typescript": "^5.0.0"
  }
}
```

### Önemli Notlar
- Tüm bileşenler TypeScript ile yazılmıştır
- Framer Motion kullanımında performans optimize edilmiştir
- Custom Tailwind renkleri ve desenler tanımlanmıştır
- Google Fonts üzerinden font yükleme yapılmaktadır
- Image optimization için Next.js Image component kullanıma hazır
- Supabase RLS (Row Level Security) aktif edilebilir
- Admin token sistemi production'da JWT ile değiştirilmelidir

### Database Backup
```bash
# Supabase CLI ile backup
npx supabase db dump > backup.sql

# Restore
npx supabase db reset
```

---

**Geliştirme Tarihi:** Aralık 2024
**Versiyon:** 3.0.0
**Status:** ✅ Production Ready - Full Dynamic Content Management
**GitHub:** https://github.com/kursatemre/insaatprojeweb
**Developer:** Claude Code + Kürşat Emre
