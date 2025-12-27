'use client';

import { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/api/settings';

export default function AdminHizmetlerPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [projeTitle, setProjeTitle] = useState('Proje Hizmetleri');
  const [projeSubtitle, setProjeSubtitle] = useState('Eksiksiz ve uygulanabilir teslimat');
  const [danismanlikTitle, setDanismanlikTitle] = useState('Danışmanlık Hizmetleri');
  const [danismanlikSubtitle, setDanismanlikSubtitle] = useState('Uzmanlık ve rehberlik merkezli');

  const [projeServices, setProjeServices] = useState([
    {
      id: 'mimari',
      title: 'Mimari Projeler',
      subtitle: 'Estetik ve fonksiyonelliği birleştiren yaratıcı tasarımlar',
      description: '',
      features: [{ title: '', desc: '' }],
      deliverables: [''],
    },
  ]);

  const [danismanlikServices, setDanismanlikServices] = useState([
    {
      id: 'deprem',
      title: 'Deprem Performans Analizi',
      subtitle: 'Yapıların deprem güvenliğinin değerlendirilmesi',
      description: '',
      features: [{ title: '', desc: '' }],
      deliverables: [''],
    },
  ]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const result = await getSiteSettings();

    if (result.success && result.data?.services) {
      const services = result.data.services;

      if (services.proje) {
        setProjeTitle(services.proje.title);
        setProjeSubtitle(services.proje.subtitle);
        if (services.proje.items) {
          setProjeServices(services.proje.items);
        }
      }

      if (services.danismanlik) {
        setDanismanlikTitle(services.danismanlik.title);
        setDanismanlikSubtitle(services.danismanlik.subtitle);
        if (services.danismanlik.items) {
          setDanismanlikServices(services.danismanlik.items);
        }
      }
    }

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const servicesData = {
      proje: {
        title: projeTitle,
        subtitle: projeSubtitle,
        items: projeServices,
      },
      danismanlik: {
        title: danismanlikTitle,
        subtitle: danismanlikSubtitle,
        items: danismanlikServices,
      },
    };

    const result = await updateSiteSettings({ services: servicesData });

    if (result.success) {
      showToast('Hizmetler başarıyla kaydedildi!', 'success');
    } else {
      showToast('Kayıt sırasında hata oluştu', 'error');
    }

    setSaving(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateProjeService = (index: number, field: string, value: any) => {
    const updated = [...projeServices];
    (updated[index] as any)[field] = value;
    setProjeServices(updated);
  };

  const updateDanismanlikService = (index: number, field: string, value: any) => {
    const updated = [...danismanlikServices];
    (updated[index] as any)[field] = value;
    setDanismanlikServices(updated);
  };

  const addProjeFeature = (serviceIndex: number) => {
    const updated = [...projeServices];
    updated[serviceIndex].features.push({ title: '', desc: '' });
    setProjeServices(updated);
  };

  const removeProjeFeature = (serviceIndex: number, featureIndex: number) => {
    const updated = [...projeServices];
    updated[serviceIndex].features.splice(featureIndex, 1);
    setProjeServices(updated);
  };

  const updateProjeFeature = (serviceIndex: number, featureIndex: number, field: 'title' | 'desc', value: string) => {
    const updated = [...projeServices];
    updated[serviceIndex].features[featureIndex][field] = value;
    setProjeServices(updated);
  };

  const addDanismanlikFeature = (serviceIndex: number) => {
    const updated = [...danismanlikServices];
    updated[serviceIndex].features.push({ title: '', desc: '' });
    setDanismanlikServices(updated);
  };

  const removeDanismanlikFeature = (serviceIndex: number, featureIndex: number) => {
    const updated = [...danismanlikServices];
    updated[serviceIndex].features.splice(featureIndex, 1);
    setDanismanlikServices(updated);
  };

  const updateDanismanlikFeature = (serviceIndex: number, featureIndex: number, field: 'title' | 'desc', value: string) => {
    const updated = [...danismanlikServices];
    updated[serviceIndex].features[featureIndex][field] = value;
    setDanismanlikServices(updated);
  };

  const addProjeDeliverable = (serviceIndex: number) => {
    const updated = [...projeServices];
    updated[serviceIndex].deliverables.push('');
    setProjeServices(updated);
  };

  const removeProjeDeliverable = (serviceIndex: number, deliverableIndex: number) => {
    const updated = [...projeServices];
    updated[serviceIndex].deliverables.splice(deliverableIndex, 1);
    setProjeServices(updated);
  };

  const updateProjeDeliverable = (serviceIndex: number, deliverableIndex: number, value: string) => {
    const updated = [...projeServices];
    updated[serviceIndex].deliverables[deliverableIndex] = value;
    setProjeServices(updated);
  };

  const addDanismanlikDeliverable = (serviceIndex: number) => {
    const updated = [...danismanlikServices];
    updated[serviceIndex].deliverables.push('');
    setDanismanlikServices(updated);
  };

  const removeDanismanlikDeliverable = (serviceIndex: number, deliverableIndex: number) => {
    const updated = [...danismanlikServices];
    updated[serviceIndex].deliverables.splice(deliverableIndex, 1);
    setDanismanlikServices(updated);
  };

  const updateDanismanlikDeliverable = (serviceIndex: number, deliverableIndex: number, value: string) => {
    const updated = [...danismanlikServices];
    updated[serviceIndex].deliverables[deliverableIndex] = value;
    setDanismanlikServices(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-concrete">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-muted-gold border-t-transparent"></div>
          <p className="mt-4 text-dark-carbon/60 font-manrope">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-concrete pt-20 lg:pt-8 p-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white font-manrope`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <a
          href="/admin/dashboard"
          className="flex items-center text-dark-carbon/70 hover:text-night-blue mb-4 font-manrope transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard'a Dön
        </a>
        <h1 className="text-3xl font-playfair font-bold text-night-blue mb-2">Hizmetler Yönetimi</h1>
        <p className="text-dark-carbon/70 font-manrope">
          Proje ve danışmanlık hizmetlerinizi buradan düzenleyebilirsiniz.
        </p>
      </div>

      {/* Proje Hizmetleri Section */}
      <div className="mb-12 bg-white rounded-xl shadow-lg p-6 border border-dark-carbon/10">
        <h2 className="text-2xl font-playfair font-bold text-night-blue mb-6 pb-4 border-b border-dark-carbon/10">
          Proje Hizmetleri
        </h2>

        {/* Proje Başlıkları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={projeTitle}
              onChange={(e) => setProjeTitle(e.target.value)}
              className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
              Alt Başlık
            </label>
            <input
              type="text"
              value={projeSubtitle}
              onChange={(e) => setProjeSubtitle(e.target.value)}
              className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
            />
          </div>
        </div>

        {/* Proje Hizmet Kartları */}
        {projeServices.map((service, serviceIndex) => (
          <div key={service.id} className="mb-8 p-6 bg-warm-concrete/30 rounded-lg border border-muted-gold/20">
            <h3 className="text-xl font-playfair font-bold text-night-blue mb-4">
              {service.id === 'mimari' ? 'Mimari Projeler' : service.id === 'statik' ? 'Statik Projeler' : 'Tesisat Projeleri'}
            </h3>

            <div className="space-y-4">
              {/* Başlık */}
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  Hizmet Başlığı
                </label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateProjeService(serviceIndex, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
                />
              </div>

              {/* Alt Başlık */}
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  Alt Başlık
                </label>
                <input
                  type="text"
                  value={service.subtitle}
                  onChange={(e) => updateProjeService(serviceIndex, 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  Açıklama
                </label>
                <textarea
                  value={service.description}
                  onChange={(e) => updateProjeService(serviceIndex, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
                />
              </div>

              {/* Özellikler */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-manrope font-semibold text-dark-carbon">
                    Özellikler
                  </label>
                  <button
                    onClick={() => addProjeFeature(serviceIndex)}
                    className="px-3 py-1 bg-muted-gold text-white rounded-lg text-sm font-manrope hover:bg-bronze transition-colors"
                  >
                    + Ekle
                  </button>
                </div>
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Özellik başlığı"
                      value={feature.title}
                      onChange={(e) => updateProjeFeature(serviceIndex, featureIndex, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Açıklama"
                      value={feature.desc}
                      onChange={(e) => updateProjeFeature(serviceIndex, featureIndex, 'desc', e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => removeProjeFeature(serviceIndex, featureIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Teslimatlar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-manrope font-semibold text-dark-carbon">
                    Teslim Edilenler
                  </label>
                  <button
                    onClick={() => addProjeDeliverable(serviceIndex)}
                    className="px-3 py-1 bg-muted-gold text-white rounded-lg text-sm font-manrope hover:bg-bronze transition-colors"
                  >
                    + Ekle
                  </button>
                </div>
                {service.deliverables.map((deliverable, deliverableIndex) => (
                  <div key={deliverableIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Teslimat"
                      value={deliverable}
                      onChange={(e) => updateProjeDeliverable(serviceIndex, deliverableIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => removeProjeDeliverable(serviceIndex, deliverableIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Danışmanlık Hizmetleri Section */}
      <div className="mb-12 bg-white rounded-xl shadow-lg p-6 border border-dark-carbon/10">
        <h2 className="text-2xl font-playfair font-bold text-night-blue mb-6 pb-4 border-b border-dark-carbon/10">
          Danışmanlık Hizmetleri
        </h2>

        {/* Danışmanlık Başlıkları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={danismanlikTitle}
              onChange={(e) => setDanismanlikTitle(e.target.value)}
              className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
              Alt Başlık
            </label>
            <input
              type="text"
              value={danismanlikSubtitle}
              onChange={(e) => setDanismanlikSubtitle(e.target.value)}
              className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
            />
          </div>
        </div>

        {/* Danışmanlık Hizmet Kartları */}
        {danismanlikServices.map((service, serviceIndex) => (
          <div key={service.id} className="mb-8 p-6 bg-warm-concrete/30 rounded-lg border border-muted-gold/20">
            <h3 className="text-xl font-playfair font-bold text-night-blue mb-4">
              {service.id === 'deprem' ? 'Deprem Performans Analizi' : service.id === 'kontrolluk' ? 'Kontrollük Hizmetleri' : 'Teknik Raporlama'}
            </h3>

            <div className="space-y-4">
              {/* Başlık */}
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  Hizmet Başlığı
                </label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateDanismanlikService(serviceIndex, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
                />
              </div>

              {/* Alt Başlık */}
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  Alt Başlık
                </label>
                <input
                  type="text"
                  value={service.subtitle}
                  onChange={(e) => updateDanismanlikService(serviceIndex, 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  Açıklama
                </label>
                <textarea
                  value={service.description}
                  onChange={(e) => updateDanismanlikService(serviceIndex, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent"
                />
              </div>

              {/* Özellikler */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-manrope font-semibold text-dark-carbon">
                    Özellikler
                  </label>
                  <button
                    onClick={() => addDanismanlikFeature(serviceIndex)}
                    className="px-3 py-1 bg-muted-gold text-white rounded-lg text-sm font-manrope hover:bg-bronze transition-colors"
                  >
                    + Ekle
                  </button>
                </div>
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Özellik başlığı"
                      value={feature.title}
                      onChange={(e) => updateDanismanlikFeature(serviceIndex, featureIndex, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Açıklama"
                      value={feature.desc}
                      onChange={(e) => updateDanismanlikFeature(serviceIndex, featureIndex, 'desc', e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => removeDanismanlikFeature(serviceIndex, featureIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Teslimatlar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-manrope font-semibold text-dark-carbon">
                    Teslim Edilenler
                  </label>
                  <button
                    onClick={() => addDanismanlikDeliverable(serviceIndex)}
                    className="px-3 py-1 bg-muted-gold text-white rounded-lg text-sm font-manrope hover:bg-bronze transition-colors"
                  >
                    + Ekle
                  </button>
                </div>
                {service.deliverables.map((deliverable, deliverableIndex) => (
                  <div key={deliverableIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Teslimat"
                      value={deliverable}
                      onChange={(e) => updateDanismanlikDeliverable(serviceIndex, deliverableIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg focus:ring-2 focus:ring-muted-gold focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => removeDanismanlikDeliverable(serviceIndex, deliverableIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="sticky bottom-6 z-10 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-muted-gold/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>
    </div>
  );
}
