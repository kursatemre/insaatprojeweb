# 🚀 Deployment Rehberi

## GitHub'a Push Etme

### 1. GitHub'da Repository Oluştur

1. GitHub'a git: https://github.com/new
2. Repository adı: `ekip-proje` veya `ekipprojecom`
3. **Public** veya **Private** seç
4. **ÖNEMLİ:** README, .gitignore veya lisans ekleme! (Zaten var)
5. "Create repository" butonuna tıkla

### 2. Remote Ekle ve Push Et

GitHub'da yeni oluşturduğunuz repository'nin URL'sini kopyalayın ve aşağıdaki komutları çalıştırın:

```bash
# Remote ekle (URL'yi kendi repository URL'niz ile değiştirin)
git remote add origin https://github.com/KULLANICI_ADINIZ/ekip-proje.git

# Push et
git push -u origin main
```

**Örnek:**
```bash
git remote add origin https://github.com/emre5/ekipprojecom.git
git push -u origin main
```

---

## Vercel'e Deploy Etme

### Yöntem 1: Vercel Dashboard (Önerilen)

1. **Vercel'e Git:** https://vercel.com
2. **Sign in** yap (GitHub hesabınla)
3. **Add New Project** butonuna tıkla
4. **Import Git Repository** seç
5. GitHub repository'nizi seçin (`ekip-proje`)
6. **Framework Preset:** Next.js (otomatik algılanır)
7. **Build Settings** (varsayılan değerler):
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
8. **Environment Variables** (şimdilik boş bırakın)
9. **Deploy** butonuna tıkla

### Yöntem 2: Vercel CLI

```bash
# Vercel CLI'ı yükle (global)
npm i -g vercel

# Deploy et
vercel

# Production deploy
vercel --prod
```

---

## Deployment Sonrası

### Vercel Domain
Deploy sonrası Vercel otomatik bir domain verir:
- `ekip-proje.vercel.app` veya
- `ekipprojecom.vercel.app`

### Custom Domain Ekleme (Opsiyonel)

1. Vercel Dashboard → Project Settings → Domains
2. Custom domain ekle: `ekipproje.com`
3. DNS kayıtlarını güncelle:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

---

## Environment Variables (Backend İçin)

Backend (Supabase) entegre edildiğinde:

1. Vercel Dashboard → Settings → Environment Variables
2. Şu değişkenleri ekle:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

---

## Continuous Deployment

✅ Artık her `git push` yaptığınızda Vercel otomatik deploy eder!

### Workflow:
1. Kod değişikliği yap
2. `git add .`
3. `git commit -m "Mesajınız"`
4. `git push`
5. Vercel otomatik build ve deploy eder
6. Deploy URL'sini kontrol et

---

## Build Hatalarını Çözme

### Sık Karşılaşılan Hatalar:

**1. TypeScript Hataları:**
```bash
# Lokal build test et
npm run build
```

**2. Missing Dependencies:**
```bash
# package.json'da tüm bağımlılıkları kontrol et
npm install
```

**3. Environment Variables:**
- `.env.example` dosyasını kontrol et
- Vercel'de env variables'ı ekle

---

## Performance Optimization

Deploy sonrası yapılabilecekler:

1. **Image Optimization:**
   - Gerçek proje fotoğrafları ekle
   - Next.js Image component kullan

2. **Analytics:**
   - Vercel Analytics ekle
   - Google Analytics entegrasyonu

3. **SEO:**
   - `metadata` güncellemeleri
   - sitemap.xml ekle
   - robots.txt yapılandır

---

## Domain SSL

✅ Vercel otomatik SSL sertifikası sağlar (Let's Encrypt)
- Hem `ekip-proje.vercel.app` hem custom domain için

---

## Monitoring

Vercel Dashboard'da:
- **Analytics:** Ziyaretçi istatistikleri
- **Logs:** Runtime logları
- **Performance:** Core Web Vitals
- **Deployments:** Deploy geçmişi

---

## Support

**Vercel Docs:** https://vercel.com/docs
**Next.js Docs:** https://nextjs.org/docs

---

**Not:** İlk deploy'dan sonra `README.md` dosyasına canlı site linkini ekleyin:

```markdown
## 🌐 Live Demo
https://ekip-proje.vercel.app
```
