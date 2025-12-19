'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '@/lib/storage';
import { addProjectImage, deleteProjectImage, getProjectImages } from '@/lib/api/projectImages';
import type { ProjectImage } from '@/lib/supabase';

interface MultiImageUploadProps {
  projectId: number;
  images: ProjectImage[];
  onImagesChange: () => void;
}

export default function MultiImageUpload({ projectId, images, onImagesChange }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setIsUploading(true);

    try {
      // Her bir dosyayı yükle
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Dosya tipi kontrolü
        if (!file.type.startsWith('image/')) {
          setError(`${file.name} bir resim dosyası değil`);
          continue;
        }

        // Dosya boyutu kontrolü (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name} boyutu 5MB'dan büyük`);
          continue;
        }

        // Storage'a yükle
        const uploadResult = await uploadImage(file, 'projects');

        if (uploadResult.success && uploadResult.data) {
          // Veritabanına kaydet
          const addResult = await addProjectImage(projectId, uploadResult.data);

          if (!addResult.success) {
            setError(`${file.name} kaydedilemedi: ${addResult.error}`);
          }
        } else {
          setError(`${file.name} yüklenemedi: ${uploadResult.error}`);
        }
      }

      // Görseller yüklendi, parent component'i bilgilendir
      onImagesChange();

      // Input'u temizle
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setError('Beklenmeyen bir hata oluştu: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Bu görseli silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const result = await deleteProjectImage(imageId);

      if (result.success) {
        onImagesChange();
      } else {
        alert('Görsel silinemedi: ' + result.error);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Beklenmeyen bir hata oluştu');
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-manrope font-semibold text-dark-carbon">
        Proje Görselleri
      </label>

      {/* Upload Button */}
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="multi-image-upload"
        />
        <label
          htmlFor="multi-image-upload"
          className={`px-6 py-3 border-2 border-dark-carbon/20 text-dark-carbon font-manrope font-semibold rounded-lg hover:bg-dark-carbon/5 transition-colors cursor-pointer flex items-center gap-2 ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-dark-carbon border-t-transparent"></div>
              Yükleniyor...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Görsel Ekle
            </>
          )}
        </label>

        <span className="text-sm text-dark-carbon/60 font-manrope">
          {images.length} görsel
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-red-700 font-manrope text-sm">{error}</p>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group rounded-lg overflow-hidden border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all"
            >
              {/* Image */}
              <div className="aspect-square relative">
                <img
                  src={image.image_url}
                  alt={image.caption || `Görsel ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Order Badge */}
              <div className="absolute top-2 left-2 bg-night-blue/90 text-white px-2 py-1 rounded text-xs font-roboto-mono">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="border-2 border-dashed border-dark-carbon/20 rounded-lg p-8 text-center">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-dark-carbon/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-dark-carbon/60 font-manrope text-sm">
            Henüz görsel eklenmemiş
          </p>
          <p className="text-dark-carbon/40 font-manrope text-xs mt-1">
            Birden fazla görsel seçebilirsiniz
          </p>
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-dark-carbon/50 font-manrope">
        JPG, PNG veya WebP. Her bir görsel maksimum 5MB olabilir. Birden fazla görsel seçebilirsiniz.
      </p>
    </div>
  );
}
