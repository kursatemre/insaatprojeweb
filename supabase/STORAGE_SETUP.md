# Supabase Storage Kurulumu

Bu döküman, proje resimlerini yüklemek için Supabase Storage'ın nasıl kurulacağını açıklar.

## 1. Storage Bucket Oluşturma

Supabase Dashboard'da şu adımları izleyin:

### Adım 1: Storage Sayfasına Git
1. Supabase Dashboard'u aç: https://supabase.com/dashboard
2. Projenizi seçin
3. Sol menüden **Storage** sekmesine tıklayın

### Adım 2: Yeni Bucket Oluştur
1. **"New bucket"** butonuna tıklayın
2. Bucket bilgilerini girin:
   - **Name**: `project-images`
   - **Public bucket**: ✅ **AÇIK** (Resimlerin herkese açık olması için)
   - **File size limit**: 5MB
   - **Allowed MIME types**: `image/*`

3. **"Create bucket"** butonuna tıklayın

### Adım 3: Bucket Policies Ayarla

Bucket oluşturulduktan sonra, aşağıdaki RLS (Row Level Security) politikalarını ekleyin:

#### SQL Editor'de Çalıştırılacak Komutlar:

```sql
-- 1. Herkes bucket'taki resimleri okuyabilir
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'project-images');

-- 2. Herkes resim yükleyebilir (veya sadece authenticated kullanıcılar için TO authenticated)
CREATE POLICY "Allow Upload" ON storage.objects
  FOR INSERT TO public
  WITH CHECK (bucket_id = 'project-images');

-- 3. Herkes resim silebilir (veya sadece authenticated kullanıcılar için TO authenticated)
CREATE POLICY "Allow Delete" ON storage.objects
  FOR DELETE TO public
  USING (bucket_id = 'project-images');
```

**GÜVENLİK NOTU**: Production ortamında, upload ve delete politikalarını `TO authenticated` olarak değiştirmeniz önerilir. Bu şekilde sadece giriş yapmış kullanıcılar resim yükleyip silebilir.

### Production İçin Önerilen Politikalar:

```sql
-- Herkes okuyabilir
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'project-images');

-- Sadece authenticated kullanıcılar yükleyebilir
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-images');

-- Sadece authenticated kullanıcılar silebilir
CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'project-images');
```

## 2. Bucket URL'ini Kontrol Etme

Bucket oluşturulduktan sonra, public URL formatı şöyle olacak:

```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/project-images/[FILE_PATH]
```

## 3. Test Etme

### 3.1. Manuel Test (Supabase Dashboard)

1. Storage > `project-images` bucket'ına git
2. **"Upload file"** butonuna tıkla
3. Bir test resmi yükle
4. Yüklenen resmin üzerine tıkla
5. **"Get URL"** butonuna tıkla
6. URL'i kopyala ve tarayıcıda aç - resim görünmeli

### 3.2. Admin Panel'den Test

1. Admin panel'e gir: `/admin`
2. **Projeler** sekmesine git
3. **"Yeni Proje Ekle"** butonuna tıkla
4. Form'da **"Proje Görseli"** bölümünden bir resim seç
5. Resim otomatik olarak yüklenecek ve önizleme gösterilecek
6. Formu doldur ve **"Kaydet"** butonuna tıkla
7. Proje kartında resim görünmeli

## 4. Hata Giderme

### Hata: "new row violates row-level security policy"

**Çözüm**: Storage bucket'ın RLS politikalarının doğru ayarlandığından emin olun (Yukarıdaki SQL komutları).

### Hata: "Failed to upload image"

**Çözüm**:
1. Bucket isminin `project-images` olduğunu kontrol edin
2. Bucket'ın **public** olarak işaretlendiğini kontrol edin
3. Dosya boyutunun 5MB'dan küçük olduğunu kontrol edin
4. Dosya tipinin image/* (JPG, PNG, WebP vb.) olduğunu kontrol edin

### Hata: "Image not displaying"

**Çözüm**:
1. Storage > project-images bucket'ında dosyanın var olduğunu kontrol edin
2. Bucket'ın public olduğunu kontrol edin
3. Public Access policy'sinin aktif olduğunu kontrol edin

## 5. Dosya Organizasyonu

Resimler otomatik olarak şu şekilde organize edilir:

```
project-images/
  └── projects/
      ├── 1234567890-abc123.jpg
      ├── 1234567891-def456.png
      └── ...
```

- Dosya adları benzersiz (timestamp + random string)
- Dosyalar `projects/` klasörü altında saklanır
- Eski dosyalar manuel olarak silinebilir

## 6. Bakım ve Temizlik

Kullanılmayan resimleri temizlemek için:

1. Storage > project-images bucket'ına git
2. Kullanılmayan dosyaları seç
3. **"Delete"** butonuna tıkla

**ÖNEMLİ**: Bir projeyi silerken, ilişkili resim dosyası otomatik olarak silinmez. Manuel olarak temizlemeniz gerekir.

## 7. Gelecek Geliştirmeler

- [ ] Resim silme otomasyonu (proje silindiğinde resmi de sil)
- [ ] Resim optimizasyonu (boyut, kalite)
- [ ] Çoklu resim upload (galeri)
- [ ] Resim crop/resize özelliği
- [ ] CDN entegrasyonu
