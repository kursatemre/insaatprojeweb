import { supabase } from './supabase';

const BUCKET_NAME = 'project-images';

// Resim yükle
export async function uploadImage(file: File, path?: string): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // Dosya adını temizle ve benzersiz yap
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Dosyayı yükle
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }

    // Public URL'i al
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return { success: true, data: urlData.publicUrl };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { success: false, error: error.message || 'Resim yüklenirken bir hata oluştu' };
  }
}

// Resim sil
export async function deleteImage(url: string): Promise<{ success: boolean; error?: string }> {
  try {
    // URL'den path'i çıkar
    const urlParts = url.split(`${BUCKET_NAME}/`);
    if (urlParts.length < 2) {
      return { success: false, error: 'Geçersiz resim URL\'i' };
    }

    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Delete error:', error);
    return { success: false, error: error.message || 'Resim silinirken bir hata oluştu' };
  }
}

// Birden fazla resim yükle
export async function uploadMultipleImages(files: File[], path?: string): Promise<{ success: boolean; data?: string[]; error?: string }> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, path));
    const results = await Promise.all(uploadPromises);

    const errors = results.filter((r) => !r.success);
    if (errors.length > 0) {
      return { success: false, error: `${errors.length} resim yüklenemedi` };
    }

    const urls = results.map((r) => r.data!);
    return { success: true, data: urls };
  } catch (error: any) {
    console.error('Multiple upload error:', error);
    return { success: false, error: error.message || 'Resimler yüklenirken bir hata oluştu' };
  }
}
