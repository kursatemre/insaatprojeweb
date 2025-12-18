'use client';

import { useState, useEffect } from 'react';
import { createProject, updateProject } from '@/lib/api/projects';
import type { Project } from '@/lib/supabase';
import ImageUpload from './ImageUpload';

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'kamu' as 'kamu' | 'ozel' | 'konut' | 'ticari',
    location: '',
    year: new Date().getFullYear().toString(),
    area: '',
    description: '',
    status: 'Planlama' as 'Tamamlandı' | 'Devam Ediyor' | 'Planlama',
    budget: '',
    duration: '',
    services: [] as string[],
    image_url: '',
  });

  const [serviceInput, setServiceInput] = useState('');

  // Edit modunda mevcut proje verilerini yükle
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        location: project.location,
        year: project.year,
        area: project.area,
        description: project.description,
        status: project.status,
        budget: project.budget,
        duration: project.duration,
        services: project.services,
        image_url: project.image_url || '',
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Form data:', formData);
      // Validation
      if (!formData.title || !formData.location || !formData.area || !formData.description || !formData.budget || !formData.duration) {
        console.error('Validation failed:', {
          title: !formData.title,
          location: !formData.location,
          area: !formData.area,
          description: !formData.description,
          budget: !formData.budget,
          duration: !formData.duration,
        });
        setError('Lütfen tüm zorunlu alanları doldurun (Başlık, Lokasyon, Alan, Açıklama, Bütçe, Süre)');
        setIsSubmitting(false);
        return;
      }

      if (formData.services.length === 0) {
        setError('En az bir hizmet eklemelisiniz');
        setIsSubmitting(false);
        return;
      }

      const projectData = {
        ...formData,
        image_url: formData.image_url || undefined,
      };

      console.log('Submitting project:', projectData);

      let result;
      if (project) {
        // Güncelleme
        result = await updateProject(project.id, projectData);
      } else {
        // Yeni ekleme
        result = await createProject(projectData);
      }

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error || 'Bir hata oluştu');
      }
    } catch (err) {
      setError('Beklenmeyen bir hata oluştu');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData({
        ...formData,
        services: [...formData.services, serviceInput.trim()],
      });
      setServiceInput('');
    }
  };

  const removeService = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== service),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="border-b border-dark-carbon/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair font-bold text-2xl text-night-blue">
              {project ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
            </h2>
            <button
              onClick={onClose}
              className="text-dark-carbon/60 hover:text-dark-carbon transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-700 font-manrope font-semibold">{error}</p>
            </div>
          )}

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Proje Başlığı */}
            <div className="md:col-span-2">
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Proje Başlığı *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                placeholder="Örn: Milli Eğitim Bakanlığı İlkokul Binası"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
              >
                <option value="kamu">Kamu</option>
                <option value="ozel">Özel Sektör</option>
                <option value="konut">Konut</option>
                <option value="ticari">Ticari</option>
              </select>
            </div>

            {/* Durum */}
            <div>
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Durum *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
              >
                <option value="Planlama">Planlama</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
                <option value="Tamamlandı">Tamamlandı</option>
              </select>
            </div>

            {/* Lokasyon */}
            <div>
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Lokasyon *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                placeholder="Örn: Ankara"
              />
            </div>

            {/* Yıl */}
            <div>
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Yıl *
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                placeholder="2024"
              />
            </div>

            {/* Alan */}
            <div>
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Alan *
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                placeholder="Örn: 4,500 m²"
              />
            </div>

            {/* Bütçe */}
            <div>
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Bütçe *
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                placeholder="Örn: ₺12.5M"
              />
            </div>

            {/* Süre */}
            <div>
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Süre *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                placeholder="Örn: 18 ay"
              />
            </div>

            {/* Açıklama */}
            <div className="md:col-span-2">
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Açıklama *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope resize-none"
                placeholder="Proje hakkında kısa açıklama..."
              />
            </div>

            {/* Hizmetler */}
            <div className="md:col-span-2">
              <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                Hizmetler *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                  className="flex-1 px-4 py-3 border-2 border-dark-carbon/10 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                  placeholder="Örn: Mimari, Statik, Tesisat"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="px-6 py-3 bg-muted-gold text-white font-manrope font-semibold rounded-lg hover:bg-muted-gold/90 transition-colors"
                >
                  Ekle
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-night-blue/10 text-night-blue rounded-full text-sm font-manrope flex items-center gap-2"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="text-night-blue hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Resim Upload */}
            <div className="md:col-span-2">
              <ImageUpload
                currentImageUrl={formData.image_url}
                onUploadSuccess={(url) => setFormData({ ...formData, image_url: url })}
                onRemove={() => setFormData({ ...formData, image_url: '' })}
                label="Proje Görseli (Opsiyonel)"
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex gap-3 pt-4 border-t border-dark-carbon/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-dark-carbon/20 text-dark-carbon font-manrope font-semibold rounded-lg hover:bg-dark-carbon/5 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Kaydediliyor...' : project ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
