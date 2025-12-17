# 📋 GitHub'a Push Etme - Hızlı Kılavuz

## ✅ Tamamlanan Adımlar

1. ✅ Git repository başlatıldı
2. ✅ Tüm dosyalar commit edildi (26 dosya, 5596 satır)
3. ✅ Branch 'main' olarak ayarlandı

## 🔄 Şimdi Yapılması Gerekenler

### Adım 1: GitHub'da Repository Oluştur

1. Tarayıcıda aç: **https://github.com/new**
2. Repository bilgileri:
   - **Repository name:** `ekipprojecom` veya `ekip-proje`
   - **Description:** "Ekip Proje - Modern Mimarlık ve Mühendislik Web Sitesi"
   - **Visibility:** Public (önerilir) veya Private
   - ⚠️ **ÖNEMLİ:** "Add a README file", "Add .gitignore", "Choose a license" seçeneklerini **IŞARETLEME**
3. **Create repository** butonuna tıkla

### Adım 2: Remote Ekle ve Push Et

GitHub'da repository oluşturduktan sonra, gösterilen URL'yi kopyala ve aşağıdaki komutları çalıştır:

```bash
# Remote repository ekle (URL'yi kendi GitHub username'inle değiştir)
git remote add origin https://github.com/KULLANICI_ADINIZ/ekipprojecom.git

# Main branch'i push et
git push -u origin main
```

### Örnek:
Eğer GitHub kullanıcı adınız `emre5` ise:

```bash
git remote add origin https://github.com/emre5/ekipprojecom.git
git push -u origin main
```

## 🎉 Push Sonrası

Push başarılı olduktan sonra:

1. ✅ Tüm kod GitHub'da olacak
2. ✅ Vercel'e deploy için hazır
3. ✅ README.md otomatik görünecek

## 🚀 Vercel'e Deploy

GitHub'a push'ladıktan sonra:

1. **https://vercel.com** adresine git
2. **Import Git Repository** seç
3. GitHub'dan `ekipprojecom` repository'sini seç
4. **Deploy** butonuna tıkla
5. ✅ Deploy tamamlandığında URL'yi al

## 📝 Sonraki Commitler

Değişiklik yaptıktan sonra:

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

Vercel otomatik olarak yeni versiyonu deploy eder!

---

## 🆘 Sorun Giderme

### "Permission denied" hatası alıyorsanız:

**SSH Key Ekle:**
```bash
# SSH key oluştur
ssh-keygen -t ed25519 -C "email@example.com"

# Public key'i kopyala
cat ~/.ssh/id_ed25519.pub

# GitHub Settings → SSH Keys → Add SSH key
```

**Veya HTTPS ile:**
```bash
# GitHub Personal Access Token kullan
# Settings → Developer settings → Personal access tokens → Generate new token
```

### "Remote already exists" hatası:

```bash
# Mevcut remote'u kaldır
git remote remove origin

# Yeni remote ekle
git remote add origin https://github.com/KULLANICI_ADINIZ/ekipprojecom.git
```

---

## 📞 Yardım

Detaylı bilgi için: [DEPLOYMENT.md](DEPLOYMENT.md) dosyasına bakın.
