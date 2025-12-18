'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '@/lib/storage';

interface ImageUploadProps {
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  onRemove?: () => void;
  label?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onUploadSuccess,
  onRemove,
  label = 'Proje Görseli',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      setError('Lütfen sadece resim dosyası seçin');
      return;
    }

    // Dosya boyutu kontrolü (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Resim boyutu maksimum 5MB olabilir');
      return;
    }

    setError(null);
    setIsUploading(true);

    // Preview oluştur
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const result = await uploadImage(file, 'projects');

      if (result.success && result.data) {
        onUploadSuccess(result.data);
      } else {
        setError(result.error || 'Resim yüklenemedi');
        setPreview(currentImageUrl || null);
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
      setPreview(currentImageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveClick = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-manrope font-semibold text-dark-carbon">
        {label}
      </label>

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dark-carbon/10">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveClick}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`px-4 py-2 border-2 border-dark-carbon/20 text-dark-carbon font-manrope font-semibold rounded-lg hover:bg-dark-carbon/5 transition-colors cursor-pointer ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-dark-carbon border-t-transparent"></div>
              Yükleniyor...
            </span>
          ) : preview ? (
            'Resmi Değiştir'
          ) : (
            'Resim Seç'
          )}
        </label>

        {preview && (
          <span className="text-sm text-green-600 font-manrope">
            ✓ Resim yüklendi
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-red-700 font-manrope text-sm">{error}</p>
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-dark-carbon/50 font-manrope">
        JPG, PNG veya WebP. Maksimum 5MB.
      </p>
    </div>
  );
}
