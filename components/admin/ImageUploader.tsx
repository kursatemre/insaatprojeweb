'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  label: string;
  aspectRatio?: string;
}

export default function ImageUploader({
  currentImage,
  onImageChange,
  label,
  aspectRatio = '1:1',
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Dosya tipini kontrol et
    if (!file.type.startsWith('image/')) {
      alert('Lütfen sadece resim dosyası yükleyin');
      return;
    }

    // Dosya boyutunu kontrol et (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır');
      return;
    }

    setIsUploading(true);

    // Preview oluştur
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageChange(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // TODO: Gerçek upload için Cloudinary veya Supabase Storage kullan
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('/api/upload', { method: 'POST', body: formData });
    // const data = await response.json();
    // onImageChange(data.url);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange('');
  };

  return (
    <div className="space-y-3">
      <label className="block font-manrope font-semibold text-dark-carbon">{label}</label>

      {/* Upload Area */}
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-muted-gold bg-muted-gold/5 scale-105'
              : 'border-dark-carbon/20 hover:border-muted-gold/50 hover:bg-dark-carbon/5'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="space-y-4">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-muted-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-dark-carbon/60 font-manrope">Yükleniyor...</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <svg
                    className="w-16 h-16 text-dark-carbon/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-dark-carbon font-manrope font-semibold mb-1">
                    Dosyayı sürükleyip bırakın veya tıklayın
                  </p>
                  <p className="text-dark-carbon/50 text-sm font-manrope">
                    PNG, JPG, SVG (max. 5MB)
                  </p>
                  <p className="text-dark-carbon/40 text-xs font-manrope mt-2">
                    Önerilen oran: {aspectRatio}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        // Preview
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-xl overflow-hidden border-2 border-dark-carbon/10 group"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-contain bg-dark-carbon/5"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
            <button
              onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
              className="px-4 py-2 bg-white text-dark-carbon rounded-lg font-manrope font-semibold hover:bg-warm-concrete transition-colors"
            >
              Değiştir
            </button>
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-manrope font-semibold hover:bg-red-600 transition-colors"
            >
              Kaldır
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </motion.div>
      )}
    </div>
  );
}
