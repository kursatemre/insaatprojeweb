'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface SiteSettings {
  // Tema Renkleri
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  // Ana Sayfa İçerik
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  // İstatistikler
  stats: {
    totalProjects: string;
    constructionArea: string;
    activeSites: string;
    clients: string;
  };
  // İletişim Bilgileri
  contact: {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
  };
  // Sosyal Medya
  social: {
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

export default function AdminAyarlarPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'tema' | 'icerik' | 'iletisim' | 'sosyal'>('tema');
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    colors: {
      primary: '#0f172a', // night-blue
      secondary: '#1a1a1a', // dark-carbon
      accent: '#b89150', // muted-gold
      background: '#f4f4f2', // warm-concrete
    },
    hero: {
      title: 'Ekip Proje',
      subtitle: 'MİMARLIK & MÜHENDİSLİK',
      tagline:
        'Sadece proje çizmiyoruz; geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz.',
    },
    stats: {
      totalProjects: '320+',
      constructionArea: '2.4M m²',
      activeSites: '45',
      clients: '180+',
    },
    contact: {
      email: 'info@ekipproje.com',
      phone: '+90 (312) 123 4567',
      address: 'Çankaya, Ankara, Türkiye',
      workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
    },
    social: {
      linkedin: 'https://linkedin.com/company/ekipproje',
      instagram: 'https://instagram.com/ekipproje',
      facebook: 'https://facebook.com/ekipproje',
      twitter: 'https://twitter.com/ekipproje',
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, [router]);

  const loadSettings = () => {
    // TODO: Supabase'den ayarları yükle
    // Şimdilik localStorage'dan yükleyelim
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Supabase'e kaydet
    // Şimdilik localStorage'a kaydet
    localStorage.setItem('siteSettings', JSON.stringify(settings));

    setTimeout(() => {
      setIsSaving(false);
      alert('Ayarlar başarıyla kaydedildi!');
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('Tüm ayarları varsayılan değerlere döndürmek istediğinizden emin misiniz?')) {
      localStorage.removeItem('siteSettings');
      loadSettings();
      alert('Ayarlar sıfırlandı!');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'tema', label: 'Tema & Renkler', icon: '🎨' },
    { id: 'icerik', label: 'İçerik Düzenleme', icon: '📝' },
    { id: 'iletisim', label: 'İletişim Bilgileri', icon: '📞' },
    { id: 'sosyal', label: 'Sosyal Medya', icon: '🌐' },
  ];

  return (
    <div className="flex min-h-screen bg-warm-concrete">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-dark-carbon/10 p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair font-bold text-3xl text-night-blue">Site Ayarları</h1>
              <p className="text-dark-carbon/60 font-manrope mt-1">
                Site içeriğini ve temasını düzenleyin
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-red-500/10 text-red-600 font-manrope font-semibold rounded-lg hover:bg-red-500/20 transition-all border-2 border-red-500/20"
              >
                Sıfırla
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-dark-carbon/10 px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-manrope font-semibold text-sm whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-muted-gold border-muted-gold'
                    : 'text-dark-carbon/60 border-transparent hover:text-dark-carbon'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Tema & Renkler Tab */}
          {activeTab === 'tema' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Tema Renkleri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Color */}
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-3">
                      Ana Renk (Primary)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={settings.colors.primary}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            colors: { ...settings.colors, primary: e.target.value },
                          })
                        }
                        className="w-20 h-20 rounded-lg border-2 border-dark-carbon/20 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={settings.colors.primary}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              colors: { ...settings.colors, primary: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="#0f172a"
                        />
                        <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                          Ana başlıklar ve önemli elementler
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-3">
                      İkincil Renk (Secondary)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={settings.colors.secondary}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            colors: { ...settings.colors, secondary: e.target.value },
                          })
                        }
                        className="w-20 h-20 rounded-lg border-2 border-dark-carbon/20 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={settings.colors.secondary}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              colors: { ...settings.colors, secondary: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="#1a1a1a"
                        />
                        <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                          Alt başlıklar ve gölgeler
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-3">
                      Vurgu Rengi (Accent)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={settings.colors.accent}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            colors: { ...settings.colors, accent: e.target.value },
                          })
                        }
                        className="w-20 h-20 rounded-lg border-2 border-dark-carbon/20 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={settings.colors.accent}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              colors: { ...settings.colors, accent: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="#b89150"
                        />
                        <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                          Butonlar, linkler ve öne çıkan elementler
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Background Color */}
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-3">
                      Arkaplan Rengi (Background)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={settings.colors.background}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            colors: { ...settings.colors, background: e.target.value },
                          })
                        }
                        className="w-20 h-20 rounded-lg border-2 border-dark-carbon/20 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={settings.colors.background}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              colors: { ...settings.colors, background: e.target.value },
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="#f4f4f2"
                        />
                        <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                          Sayfa arkaplan rengi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="mt-8 p-6 rounded-xl border-2 border-dark-carbon/10 bg-warm-concrete/30">
                  <h3 className="font-playfair font-bold text-lg mb-4">Renk Önizleme</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      className="h-24 rounded-lg shadow-lg flex items-center justify-center text-white font-manrope font-semibold"
                      style={{ backgroundColor: settings.colors.primary }}
                    >
                      Primary
                    </div>
                    <div
                      className="h-24 rounded-lg shadow-lg flex items-center justify-center text-white font-manrope font-semibold"
                      style={{ backgroundColor: settings.colors.secondary }}
                    >
                      Secondary
                    </div>
                    <div
                      className="h-24 rounded-lg shadow-lg flex items-center justify-center text-white font-manrope font-semibold"
                      style={{ backgroundColor: settings.colors.accent }}
                    >
                      Accent
                    </div>
                    <div
                      className="h-24 rounded-lg shadow-lg flex items-center justify-center text-dark-carbon font-manrope font-semibold border-2"
                      style={{ backgroundColor: settings.colors.background }}
                    >
                      Background
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* İçerik Düzenleme Tab */}
          {activeTab === 'icerik' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Hero Section */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Ana Sayfa Hero Bölümü
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Ana Başlık
                    </label>
                    <input
                      type="text"
                      value={settings.hero.title}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-playfair text-lg"
                      placeholder="Ekip Proje"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Alt Başlık
                    </label>
                    <input
                      type="text"
                      value={settings.hero.subtitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="MİMARLIK & MÜHENDİSLİK"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Slogan
                    </label>
                    <textarea
                      value={settings.hero.tagline}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, tagline: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Sadece proje çizmiyoruz..."
                    />
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  İstatistikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Toplam Proje
                    </label>
                    <input
                      type="text"
                      value={settings.stats.totalProjects}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, totalProjects: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono"
                      placeholder="320+"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      İnşaat Alanı
                    </label>
                    <input
                      type="text"
                      value={settings.stats.constructionArea}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, constructionArea: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono"
                      placeholder="2.4M m²"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Aktif Şantiye
                    </label>
                    <input
                      type="text"
                      value={settings.stats.activeSites}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, activeSites: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono"
                      placeholder="45"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Müşteri Sayısı
                    </label>
                    <input
                      type="text"
                      value={settings.stats.clients}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          stats: { ...settings.stats, clients: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono"
                      placeholder="180+"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* İletişim Tab */}
          {activeTab === 'iletisim' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  İletişim Bilgileri
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, email: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="info@ekipproje.com"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={settings.contact.phone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, phone: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="+90 (312) 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Adres
                    </label>
                    <input
                      type="text"
                      value={settings.contact.address}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, address: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Çankaya, Ankara, Türkiye"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Çalışma Saatleri
                    </label>
                    <input
                      type="text"
                      value={settings.contact.workingHours}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, workingHours: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Pazartesi - Cuma: 09:00 - 18:00"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sosyal Medya Tab */}
          {activeTab === 'sosyal' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Sosyal Medya Hesapları
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2 flex items-center">
                      <span className="mr-2">🔗</span> LinkedIn
                    </label>
                    <input
                      type="url"
                      value={settings.social.linkedin}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          social: { ...settings.social, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="https://linkedin.com/company/ekipproje"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2 flex items-center">
                      <span className="mr-2">📷</span> Instagram
                    </label>
                    <input
                      type="url"
                      value={settings.social.instagram}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          social: { ...settings.social, instagram: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="https://instagram.com/ekipproje"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2 flex items-center">
                      <span className="mr-2">👍</span> Facebook
                    </label>
                    <input
                      type="url"
                      value={settings.social.facebook}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          social: { ...settings.social, facebook: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="https://facebook.com/ekipproje"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2 flex items-center">
                      <span className="mr-2">🐦</span> Twitter
                    </label>
                    <input
                      type="url"
                      value={settings.social.twitter}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          social: { ...settings.social, twitter: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="https://twitter.com/ekipproje"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
