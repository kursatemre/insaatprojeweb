'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectImage } from '@/lib/supabase';

interface ImageGalleryProps {
  images: ProjectImage[];
  coverImage?: string;
}

export default function ImageGallery({ images, coverImage }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Tüm görselleri birleştir (kapak + galeri)
  const allImages = [
    ...(coverImage ? [{ id: -1, image_url: coverImage, caption: 'Kapak Görseli', display_order: -1 }] : []),
    ...images,
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Klavye navigasyonu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;

    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  };

  if (allImages.length === 0) {
    return (
      <div className="bg-gradient-to-br from-night-blue/90 to-dark-carbon/90 rounded-xl p-12 text-center">
        <svg
          className="w-20 h-20 mx-auto mb-4 text-white/20"
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
        <p className="text-white/60 font-manrope">Henüz görsel eklenmemiş</p>
      </div>
    );
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-video rounded-xl overflow-hidden mb-6 cursor-pointer group"
        onClick={() => openLightbox(0)}
      >
        <img
          src={allImages[0].image_url}
          alt={allImages[0].caption || 'Ana görsel'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Zoom Icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-3 rounded-full">
            <svg className="w-6 h-6 text-night-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-night-blue/90 text-white px-3 py-1 rounded-full text-sm font-roboto-mono">
          {allImages.length} Görsel
        </div>
      </motion.div>

      {/* Thumbnail Grid */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {allImages.slice(1).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group border-2 border-dark-carbon/10 hover:border-muted-gold/50 transition-all"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={image.image_url}
                alt={image.caption || `Görsel ${index + 2}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-muted-gold transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-white/10 text-white px-4 py-2 rounded-lg font-roboto-mono text-sm z-10">
              {lightboxIndex + 1} / {allImages.length}
            </div>

            {/* Main Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl max-h-[90vh] mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[lightboxIndex].image_url}
                alt={allImages[lightboxIndex].caption || `Görsel ${lightboxIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />

              {/* Caption */}
              {allImages[lightboxIndex].caption && (
                <div className="mt-4 text-center">
                  <p className="text-white font-manrope text-sm">
                    {allImages[lightboxIndex].caption}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Keyboard Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 font-manrope text-xs flex gap-4">
              <span>← → Gezin</span>
              <span>ESC Kapat</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
