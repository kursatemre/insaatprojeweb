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

### Backend (Hazır Altyapı)
- **Runtime:** Node.js
- **Framework:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

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
│   └── iletisim/
│       └── page.tsx            # İletişim sayfası
├── components/
│   ├── Navigation.tsx          # Navbar bileşeni
│   ├── Footer.tsx              # Footer bileşeni
│   └── home/
│       ├── HeroSection.tsx     # Hero bölümü (İnteraktif split)
│       ├── StatsSection.tsx    # Teknik kapasite metrikleri
│       ├── ServicesOverview.tsx # Hizmet grupları
│       ├── TurkeyMap.tsx       # İnteraktif Türkiye haritası
│       └── CTASection.tsx      # Call-to-action bölümü
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
- ✅ Tam responsive tasarım
- ✅ Smooth scroll animasyonlar
- ✅ Framer Motion ile fade-in/slide efektleri
- ✅ Hover efektleri ve interaktif elemanlar
- ✅ SEO optimize edilmiş
- ✅ Hızlı sayfa yükleme
- ✅ Accessibility uyumlu

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda açın:
```
http://localhost:3000
```

### Build ve Production

Production build oluşturmak için:
```bash
npm run build
npm run start
```

## 🎯 Gelecek Geliştirmeler (Backend Entegrasyonu)

### Supabase Entegrasyonu
- [ ] Veritabanı şeması oluşturma
- [ ] API endpoints
- [ ] İletişim formu backend entegrasyonu
- [ ] Proje yönetim paneli
- [ ] Dosya yükleme (proje görselleri)

### Özellikler
- [ ] Admin paneli
- [ ] Blog/Haberler sistemi
- [ ] Proje detay sayfaları
- [ ] Dinamik içerik yönetimi
- [ ] E-posta bildirimleri
- [ ] Analytics entegrasyonu

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🎨 Tasarım Prensipleri

1. **Minimalist ama Dokulu:** Sade ama depth veren desenler
2. **Ağır ve Güven Verici:** Koyu renkler, serif fontlar
3. **Teknik Otorite:** Blueprint desenler, monospace fontlar
4. **Lüks Görünüm:** Gold aksanlar, smooth animasyonlar
5. **Profesyonellik:** EKAP uyumlu, kamu standartları vurgusu

## 📄 Lisans

Bu proje Ekip Proje Mimarlık ve Mühendislik için özel olarak geliştirilmiştir.

## 👨‍💻 Geliştirici Notları

- Tüm bileşenler TypeScript ile yazılmıştır
- Framer Motion kullanımında performans optimize edilmiştir
- Custom Tailwind renkleri ve desenler tanımlanmıştır
- Google Fonts üzerinden font yükleme yapılmaktadır
- Image optimization için Next.js Image component kullanıma hazır

---

**Geliştirme Tarihi:** Aralık 2024
**Versiyon:** 1.0.0
**Status:** ✅ Frontend Tamamlandı - Backend Entegrasyonu Bekliyor
