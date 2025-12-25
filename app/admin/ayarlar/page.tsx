'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getSiteSettings, updateSiteSettings } from '@/lib/api/settings';

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
    leftCard: {
      title: string;
      description: string;
      features: string[];
    };
    rightCard: {
      title: string;
      description: string;
      features: string[];
    };
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
  // SEO Ayarları
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
  // Hakkımızda
  about?: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  // CTA Section
  cta?: {
    title: string;
    subtitle: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  // Navigation
  navigation?: {
    logo: {
      text: string;
      subtitle: string;
      imageUrl?: string;
      showImage: boolean;
    };
    colors: {
      default: {
        background: string;
        text: string;
        border: string;
      };
      scrolled: {
        background: string;
        text: string;
        border: string;
      };
    };
    topBar: {
      enabled: boolean;
      stats: string[];
      showLanguageSwitcher: boolean;
      showEkapBadge: boolean;
      colors: {
        background: string;
        text: string;
        border: string;
      };
    };
    menuItems: any[];
    ctaButton: {
      enabled: boolean;
      text: string;
      href: string;
    };
  };
}

export default function AdminAyarlarPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'tema' | 'icerik' | 'hakkimizda' | 'iletisim' | 'sosyal' | 'seo' | 'cta' | 'navigation' | 'istatistikler'>('tema');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
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
      leftCard: {
        title: 'Hizmet Alımı\n& Proje',
        description: 'Eksiksiz ve uygulanabilir teslimat. Mimari, Statik ve Tesisat projelerinde profesyonel çözümler.',
        features: ['Mimari Projeler', 'Statik Hesaplamalar', 'Tesisat Projeleri'],
      },
      rightCard: {
        title: 'Danışmanlık\n& Müşavirlik',
        description: 'Veri odaklı ve uzmanlık merkezli rehberlik. Teknik analiz ve performans değerlendirmesi.',
        features: ['Deprem Analizi', 'Kontrollük Hizmetleri', 'Teknik Raporlama'],
      },
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
    seo: {
      title: 'Ekip Proje | Mimarlık & Mühendislik',
      description: 'Ankara merkezli mimarlık ve mühendislik hizmetleri. Proje tasarımı, danışmanlık ve teknik çözümler.',
      keywords: 'mimarlık, mühendislik, proje tasarımı, danışmanlık, Ankara',
    },
    about: {
      title: 'Ekip Proje Hakkında',
      description: 'Ekip Proje, yılların deneyimi ve uzmanlığıyla mimarlık ve mühendislik alanında hizmet vermektedir.',
      mission: 'Müşterilerimize en yüksek kalitede mimarlık ve mühendislik hizmetleri sunarak, projelerini hayata geçirmelerine yardımcı olmak.',
      vision: 'Türkiye\'nin en güvenilir ve yenilikçi mimarlık ve mühendislik şirketi olmak.',
    },
    cta: {
      title: 'Hayalinizdeki Projeyi',
      subtitle: 'Gerçeğe Dönüştürün',
      description: 'Ekip Proje ile profesyonel mühendislik hizmetleri alın. EKAP uyumlu, kamu standartlarında projeler için hemen teklif isteyin.',
      primaryButtonText: 'Ücretsiz Teklif Al',
      secondaryButtonText: 'Projelerimizi İnceleyin',
    },
    navigation: {
      logo: {
        text: 'EKİP PROJE',
        subtitle: 'MİMARLIK & MÜHENDİSLİK',
        imageUrl: '',
        showImage: false,
      },
      colors: {
        default: {
          background: 'rgba(26, 26, 26, 0.9)',
          text: '#ffffff',
          border: 'rgba(184, 145, 80, 0.2)',
        },
        scrolled: {
          background: 'rgba(244, 244, 242, 0.95)',
          text: '#0f172a',
          border: 'rgba(26, 26, 26, 0.1)',
        },
      },
      topBar: {
        enabled: true,
        stats: [
          '2.4M+ m² İnşaat Alanı',
          '110+ Onaylı Kamu Projesi',
          '50+ Deprem Analizi',
          '81 İl Hizmet Ağı',
          'EKAP Uyumlu Projeler',
        ],
        showLanguageSwitcher: true,
        showEkapBadge: true,
        colors: {
          background: 'rgba(26, 26, 26, 0.95)',
          text: 'rgba(184, 145, 80, 0.8)',
          border: 'rgba(184, 145, 80, 0.1)',
        },
      },
      menuItems: [],
      ctaButton: {
        enabled: true,
        text: 'Projeyi Başlat',
        href: '/iletisim',
      },
    },
  });

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const result = await getSiteSettings();
      console.log('📥 Database Result:', result);

      if (result.success && result.data) {
        console.log('✅ Setting state with:', result.data);
        setSettings({
          colors: result.data.colors,
          hero: result.data.hero,
          stats: result.data.stats,
          contact: result.data.contact,
          social: result.data.social,
          seo: result.data.seo || {
            title: 'Ekip Proje | Mimarlık & Mühendislik',
            description: 'Ankara merkezli mimarlık ve mühendislik hizmetleri.',
            keywords: 'mimarlık, mühendislik, proje tasarımı, danışmanlık, Ankara',
          },
          about: result.data.about || {
            title: 'Ekip Proje Hakkında',
            description: 'Ekip Proje, yılların deneyimi ve uzmanlığıyla hizmet vermektedir.',
            mission: 'En yüksek kalitede mimarlık ve mühendislik hizmetleri sunmak.',
            vision: 'Türkiye\'nin en güvenilir mimarlık ve mühendislik şirketi olmak.',
          },
          cta: result.data.cta || {
            title: 'Hayalinizdeki Projeyi',
            subtitle: 'Gerçeğe Dönüştürün',
            description: 'Ekip Proje ile profesyonel mühendislik hizmetleri alın. EKAP uyumlu, kamu standartlarında projeler için hemen teklif isteyin.',
            primaryButtonText: 'Ücretsiz Teklif Al',
            secondaryButtonText: 'Projelerimizi İnceleyin',
          },
          navigation: result.data.navigation || {
            logo: {
              text: 'EKİP PROJE',
              subtitle: 'MİMARLIK & MÜHENDİSLİK',
              imageUrl: '',
              showImage: false,
            },
            colors: {
              default: {
                background: 'rgba(26, 26, 26, 0.9)',
                text: '#ffffff',
                border: 'rgba(184, 145, 80, 0.2)',
              },
              scrolled: {
                background: 'rgba(244, 244, 242, 0.95)',
                text: '#0f172a',
                border: 'rgba(26, 26, 26, 0.1)',
              },
            },
            topBar: {
              enabled: true,
              stats: [
                '2.4M+ m² İnşaat Alanı',
                '110+ Onaylı Kamu Projesi',
                '50+ Deprem Analizi',
                '81 İl Hizmet Ağı',
                'EKAP Uyumlu Projeler',
              ],
              showLanguageSwitcher: true,
              showEkapBadge: true,
              colors: {
                background: 'rgba(26, 26, 26, 0.95)',
                text: 'rgba(184, 145, 80, 0.8)',
                border: 'rgba(184, 145, 80, 0.1)',
              },
            },
            menuItems: [],
            ctaButton: {
              enabled: true,
              text: 'Projeyi Başlat',
              href: '/iletisim',
            },
          },
        });
      } else {
        showToast('Ayarlar yüklenemedi: ' + result.error, 'error');
      }
    } catch (error) {
      showToast('Ayarlar yüklenirken beklenmeyen bir hata oluştu', 'error');
    }
  }, [showToast]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, [router, loadSettings]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const result = await updateSiteSettings(settings);

      if (result.success) {
        showToast('Ayarlar başarıyla kaydedildi!', 'success');
        // Güncellenmiş verileri tekrar yükle
        await loadSettings();
      } else {
        showToast('Ayarlar kaydedilemedi: ' + result.error, 'error');
      }
    } catch (error) {
      showToast('Beklenmeyen bir hata oluştu', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Tüm ayarları varsayılan değerlere döndürmek istediğinizden emin misiniz?')) {
      // Varsayılan ayarları yükle
      const defaultSettings = {
        colors: {
          primary: '#0f172a',
          secondary: '#1a1a1a',
          accent: '#b89150',
          background: '#f4f4f2',
        },
        hero: {
          title: 'Ekip Proje',
          subtitle: 'MİMARLIK & MÜHENDİSLİK',
          tagline: 'Sadece proje çizmiyoruz; geleceğin yapılarını teknik rehberlik ve uzmanlığımızla inşa ediyoruz.',
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
      };

      setSettings(defaultSettings);

      // Supabase'e kaydet
      const result = await updateSiteSettings(defaultSettings);

      if (result.success) {
        showToast('Ayarlar varsayılan değerlere sıfırlandı!', 'success');
      } else {
        showToast('Ayarlar sıfırlanırken bir hata oluştu: ' + result.error, 'error');
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'tema', label: 'Tema & Renkler', icon: '🎨' },
    { id: 'icerik', label: 'İçerik Düzenleme', icon: '📝' },
    { id: 'navigation', label: 'Header / Navigation', icon: '🧭' },
    { id: 'cta', label: 'Call To Action', icon: '🎯' },
    { id: 'hakkimizda', label: 'Hakkımızda', icon: 'ℹ️' },
    { id: 'iletisim', label: 'İletişim Bilgileri', icon: '📞' },
    { id: 'sosyal', label: 'Sosyal Medya', icon: '🌐' },
    { id: 'seo', label: 'SEO Ayarları', icon: '🔍' },
  ];

  return (
    <div className="flex min-h-screen bg-warm-concrete">
      <AdminSidebar />

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 left-4 sm:left-auto z-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-2xl ${
            toast.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-xl sm:text-2xl">{toast.type === 'success' ? '✅' : '❌'}</span>
            <span className="font-manrope font-semibold text-sm sm:text-base">{toast.message}</span>
          </div>
        </motion.div>
      )}

      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b border-dark-carbon/10 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-playfair font-bold text-2xl sm:text-3xl text-night-blue">Site Ayarları</h1>
              <p className="text-dark-carbon/60 font-manrope mt-1 text-sm sm:text-base">
                Site içeriğini ve temasını düzenleyin
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
              <button
                onClick={handleReset}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500/10 text-red-600 font-manrope font-semibold rounded-lg hover:bg-red-500/20 transition-all border-2 border-red-500/20 text-sm sm:text-base"
              >
                Sıfırla
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
              >
                {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-dark-carbon/10 px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-6 py-3 sm:py-4 font-manrope font-semibold text-xs sm:text-sm whitespace-nowrap transition-all border-b-2 ${
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
        <div className="p-4 sm:p-6 lg:p-8">
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

              {/* Hero Cards Section */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Hero Kartları
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sol Kart */}
                  <div className="bg-gradient-to-br from-night-blue/5 to-muted-gold/5 p-6 rounded-xl border-2 border-muted-gold/20">
                    <h3 className="font-playfair font-bold text-lg text-night-blue mb-4">
                      Sol Kart (Hizmet Alımı)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Başlık
                        </label>
                        <textarea
                          value={settings.hero.leftCard.title}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              hero: {
                                ...settings.hero,
                                leftCard: { ...settings.hero.leftCard, title: e.target.value },
                              },
                            })
                          }
                          rows={2}
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-playfair"
                          placeholder="Hizmet Alımı & Proje"
                        />
                        <p className="text-xs text-dark-carbon/50 mt-1">
                          İpucu: Alt satıra geçmek için \n kullanın
                        </p>
                      </div>
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Açıklama
                        </label>
                        <textarea
                          value={settings.hero.leftCard.description}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              hero: {
                                ...settings.hero,
                                leftCard: { ...settings.hero.leftCard, description: e.target.value },
                              },
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                          placeholder="Eksiksiz ve uygulanabilir teslimat..."
                        />
                      </div>
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Özellikler (Her satıra bir özellik)
                        </label>
                        <textarea
                          value={settings.hero.leftCard.features.join('\n')}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              hero: {
                                ...settings.hero,
                                leftCard: {
                                  ...settings.hero.leftCard,
                                  features: e.target.value.split('\n').filter(f => f.trim()),
                                },
                              },
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                          placeholder="Mimari Projeler&#10;Statik Hesaplamalar&#10;Tesisat Projeleri"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sağ Kart */}
                  <div className="bg-gradient-to-br from-night-blue/5 to-muted-gold/5 p-6 rounded-xl border-2 border-muted-gold/20">
                    <h3 className="font-playfair font-bold text-lg text-night-blue mb-4">
                      Sağ Kart (Danışmanlık)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Başlık
                        </label>
                        <textarea
                          value={settings.hero.rightCard.title}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              hero: {
                                ...settings.hero,
                                rightCard: { ...settings.hero.rightCard, title: e.target.value },
                              },
                            })
                          }
                          rows={2}
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-playfair"
                          placeholder="Danışmanlık & Müşavirlik"
                        />
                        <p className="text-xs text-dark-carbon/50 mt-1">
                          İpucu: Alt satıra geçmek için \n kullanın
                        </p>
                      </div>
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Açıklama
                        </label>
                        <textarea
                          value={settings.hero.rightCard.description}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              hero: {
                                ...settings.hero,
                                rightCard: { ...settings.hero.rightCard, description: e.target.value },
                              },
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                          placeholder="Veri odaklı ve uzmanlık merkezli rehberlik..."
                        />
                      </div>
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Özellikler (Her satıra bir özellik)
                        </label>
                        <textarea
                          value={settings.hero.rightCard.features.join('\n')}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              hero: {
                                ...settings.hero,
                                rightCard: {
                                  ...settings.hero.rightCard,
                                  features: e.target.value.split('\n').filter(f => f.trim()),
                                },
                              },
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                          placeholder="Deprem Analizi&#10;Kontrollük Hizmetleri&#10;Teknik Raporlama"
                        />
                      </div>
                    </div>
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

          {/* Hakkımızda Tab */}
          {activeTab === 'hakkimizda' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Hakkımızda Bilgileri
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Başlık
                    </label>
                    <input
                      type="text"
                      value={settings.about?.title || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about: { ...settings.about!, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-playfair text-lg"
                      placeholder="Ekip Proje Hakkında"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={settings.about?.description || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about: { ...settings.about!, description: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Şirket hakkında genel bilgi..."
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Misyonumuz
                    </label>
                    <textarea
                      value={settings.about?.mission || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about: { ...settings.about!, mission: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Misyonunuz nedir?"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Vizyonumuz
                    </label>
                    <textarea
                      value={settings.about?.vision || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about: { ...settings.about!, vision: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Vizyonunuz nedir?"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* İstatistikler Tab */}
          {activeTab === 'istatistikler' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  İstatistikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
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
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
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
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
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
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="180+"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Section Tab */}
          {activeTab === 'cta' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Call To Action Bölümü
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Ana Başlık
                    </label>
                    <input
                      type="text"
                      value={settings.cta?.title || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta: { ...settings.cta!, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Hayalinizdeki Projeyi"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Alt Başlık (Vurgu)
                    </label>
                    <input
                      type="text"
                      value={settings.cta?.subtitle || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta: { ...settings.cta!, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Gerçeğe Dönüştürün"
                    />
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={settings.cta?.description || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          cta: { ...settings.cta!, description: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Ekip Proje ile profesyonel mühendislik hizmetleri alın..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Birincil Buton Metni
                      </label>
                      <input
                        type="text"
                        value={settings.cta?.primaryButtonText || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            cta: { ...settings.cta!, primaryButtonText: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                        placeholder="Ücretsiz Teklif Al"
                      />
                    </div>
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        İkincil Buton Metni
                      </label>
                      <input
                        type="text"
                        value={settings.cta?.secondaryButtonText || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            cta: { ...settings.cta!, secondaryButtonText: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                        placeholder="Projelerimizi İnceleyin"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  SEO Ayarları
                </h2>
                <p className="text-dark-carbon/60 font-manrope mb-6">
                  Arama motorları için meta bilgilerini düzenleyin
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Sayfa Başlığı (Title)
                    </label>
                    <input
                      type="text"
                      value={settings.seo?.title || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...settings.seo!, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Ekip Proje | Mimarlık & Mühendislik"
                    />
                    <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                      Google arama sonuçlarında görünen başlık (50-60 karakter önerilir)
                    </p>
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Meta Açıklama (Description)
                    </label>
                    <textarea
                      value={settings.seo?.description || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...settings.seo!, description: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Ankara merkezli mimarlık ve mühendislik hizmetleri..."
                    />
                    <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                      Arama sonuçlarında görünen açıklama (150-160 karakter önerilir)
                    </p>
                  </div>
                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Anahtar Kelimeler (Keywords)
                    </label>
                    <input
                      type="text"
                      value={settings.seo?.keywords || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...settings.seo!, keywords: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="mimarlık, mühendislik, proje tasarımı, danışmanlık, Ankara"
                    />
                    <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                      Virgülle ayrılmış anahtar kelimeler (5-10 kelime önerilir)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Tab */}
          {activeTab === 'navigation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Logo Settings */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Logo Ayarları
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.navigation?.logo.showImage || false}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, logo: { ...settings.navigation!.logo, showImage: e.target.checked } },
                        })
                      }
                      className="w-5 h-5"
                    />
                    <label className="font-manrope font-semibold text-dark-carbon">
                      Logo Görseli Kullan (Metin yerine)
                    </label>
                  </div>

                  {settings.navigation?.logo.showImage && (
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Logo Görsel URL
                      </label>
                      <input
                        type="url"
                        value={settings.navigation?.logo.imageUrl || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            navigation: { ...settings.navigation!, logo: { ...settings.navigation!.logo, imageUrl: e.target.value } },
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                        placeholder="https://example.com/logo.png"
                      />
                      <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                        Logo görselinin URL'sini girin (PNG, SVG önerilir)
                      </p>
                    </div>
                  )}

                  {!settings.navigation?.logo.showImage && (
                    <>
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Logo Metni
                        </label>
                        <input
                          type="text"
                          value={settings.navigation?.logo.text || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, logo: { ...settings.navigation!.logo, text: e.target.value } },
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-cinzel text-lg"
                          placeholder="EKİP PROJE"
                        />
                      </div>
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Alt Başlık
                        </label>
                        <input
                          type="text"
                          value={settings.navigation?.logo.subtitle || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, logo: { ...settings.navigation!.logo, subtitle: e.target.value } },
                            })
                          }
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="MİMARLIK & MÜHENDİSLİK"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation Colors */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Navigation Renkleri
                </h2>

                {/* Default (Not Scrolled) Colors */}
                <div className="mb-8">
                  <h3 className="font-playfair font-semibold text-lg text-night-blue mb-4">
                    Sabit Durum (Scroll Olmadan)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Arkaplan Rengi
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.navigation?.colors.default.background || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, default: { ...settings.navigation!.colors.default, background: e.target.value } } },
                            })
                          }
                          className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="rgba(26, 26, 26, 0.9)"
                        />
                        <input
                          type="color"
                          value={settings.navigation?.colors.default.background?.startsWith('#') ? settings.navigation.colors.default.background : '#1a1a1a'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, default: { ...settings.navigation!.colors.default, background: e.target.value } } },
                            })
                          }
                          className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                          title="Renk Seçici"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Metin Rengi
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.navigation?.colors.default.text || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, default: { ...settings.navigation!.colors.default, text: e.target.value } } },
                            })
                          }
                          className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="#ffffff"
                        />
                        <input
                          type="color"
                          value={settings.navigation?.colors.default.text || '#ffffff'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, default: { ...settings.navigation!.colors.default, text: e.target.value } } },
                            })
                          }
                          className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                          title="Renk Seçici"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Border Rengi
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.navigation?.colors.default.border || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, default: { ...settings.navigation!.colors.default, border: e.target.value } } },
                            })
                          }
                          className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="rgba(184, 145, 80, 0.2)"
                        />
                        <input
                          type="color"
                          value={settings.navigation?.colors.default.border?.startsWith('#') ? settings.navigation.colors.default.border : '#b89150'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, default: { ...settings.navigation!.colors.default, border: e.target.value } } },
                            })
                          }
                          className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                          title="Renk Seçici"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview - Default State */}
                  <div className="p-6 rounded-lg border-2 border-dark-carbon/10" style={{ backgroundColor: settings.navigation?.colors.default.background }}>
                    <div className="flex items-center justify-between">
                      <div style={{ color: settings.navigation?.colors.default.text }} className="font-manrope font-semibold">
                        {settings.navigation?.logo.text} - Önizleme
                      </div>
                      <div style={{
                        borderColor: settings.navigation?.colors.default.border,
                        color: settings.navigation?.colors.default.text
                      }} className="px-4 py-2 border-2 rounded font-manrope text-sm">
                        Menu Item
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrolled Colors */}
                <div>
                  <h3 className="font-playfair font-semibold text-lg text-night-blue mb-4">
                    Scroll Durumu
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Arkaplan Rengi
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.navigation?.colors.scrolled.background || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, scrolled: { ...settings.navigation!.colors.scrolled, background: e.target.value } } },
                            })
                          }
                          className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="rgba(244, 244, 242, 0.95)"
                        />
                        <input
                          type="color"
                          value={settings.navigation?.colors.scrolled.background?.startsWith('#') ? settings.navigation.colors.scrolled.background : '#f4f4f2'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, scrolled: { ...settings.navigation!.colors.scrolled, background: e.target.value } } },
                            })
                          }
                          className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                          title="Renk Seçici"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Metin Rengi
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.navigation?.colors.scrolled.text || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, scrolled: { ...settings.navigation!.colors.scrolled, text: e.target.value } } },
                            })
                          }
                          className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="#0f172a"
                        />
                        <input
                          type="color"
                          value={settings.navigation?.colors.scrolled.text || '#0f172a'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, scrolled: { ...settings.navigation!.colors.scrolled, text: e.target.value } } },
                            })
                          }
                          className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                          title="Renk Seçici"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                        Border Rengi
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.navigation?.colors.scrolled.border || ''}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, scrolled: { ...settings.navigation!.colors.scrolled, border: e.target.value } } },
                            })
                          }
                          className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                          placeholder="rgba(26, 26, 26, 0.1)"
                        />
                        <input
                          type="color"
                          value={settings.navigation?.colors.scrolled.border?.startsWith('#') ? settings.navigation.colors.scrolled.border : '#1a1a1a'}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, colors: { ...settings.navigation!.colors, scrolled: { ...settings.navigation!.colors.scrolled, border: e.target.value } } },
                            })
                          }
                          className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                          title="Renk Seçici"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview - Scrolled State */}
                  <div className="p-6 rounded-lg border-2 border-dark-carbon/10" style={{ backgroundColor: settings.navigation?.colors.scrolled.background }}>
                    <div className="flex items-center justify-between">
                      <div style={{ color: settings.navigation?.colors.scrolled.text }} className="font-manrope font-semibold">
                        {settings.navigation?.logo.text} - Önizleme (Scroll)
                      </div>
                      <div style={{
                        borderColor: settings.navigation?.colors.scrolled.border,
                        color: settings.navigation?.colors.scrolled.text
                      }} className="px-4 py-2 border-2 rounded font-manrope text-sm">
                        Menu Item
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Bar Settings */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Üst Çubuk Ayarları
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.navigation?.topBar.enabled || false}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, topBar: { ...settings.navigation!.topBar, enabled: e.target.checked } },
                        })
                      }
                      className="w-5 h-5"
                    />
                    <label className="font-manrope font-semibold text-dark-carbon">
                      Üst Çubuğu Göster
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.navigation?.topBar.showEkapBadge || false}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, topBar: { ...settings.navigation!.topBar, showEkapBadge: e.target.checked } },
                        })
                      }
                      className="w-5 h-5"
                    />
                    <label className="font-manrope font-semibold text-dark-carbon">
                      EKAP Rozetini Göster
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.navigation?.topBar.showLanguageSwitcher || false}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, topBar: { ...settings.navigation!.topBar, showLanguageSwitcher: e.target.checked } },
                        })
                      }
                      className="w-5 h-5"
                    />
                    <label className="font-manrope font-semibold text-dark-carbon">
                      Dil Değiştiricisini Göster
                    </label>
                  </div>

                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      İstatistikler (Her satır bir istatistik)
                    </label>
                    <textarea
                      value={settings.navigation?.topBar.stats.join('\n') || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, topBar: { ...settings.navigation!.topBar, stats: e.target.value.split('\n').filter(s => s.trim()) } },
                        })
                      }
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                      placeholder="2.4M+ m² İnşaat Alanı
110+ Onaylı Kamu Projesi
50+ Deprem Analizi"
                    />
                    <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                      Her satıra bir istatistik yazın. Bu istatistikler üst çubukta dönüşümlü olarak gösterilecek.
                    </p>
                  </div>

                  {/* Top Bar Renk Ayarları */}
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-night-blue mb-4">
                      Top Bar Renk Ayarları
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Arka Plan Rengi
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settings.navigation?.topBar.colors?.background || 'rgba(26, 26, 26, 0.95)'}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                navigation: {
                                  ...settings.navigation!,
                                  topBar: {
                                    ...settings.navigation!.topBar,
                                    colors: {
                                      ...settings.navigation!.topBar.colors,
                                      background: e.target.value
                                    }
                                  }
                                },
                              })
                            }
                            className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                            placeholder="rgba(26, 26, 26, 0.95)"
                          />
                          <input
                            type="color"
                            value={settings.navigation?.topBar.colors?.background?.replace(/rgba?\([^)]+\)/, '#1a1a1a') || '#1a1a1a'}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                navigation: {
                                  ...settings.navigation!,
                                  topBar: {
                                    ...settings.navigation!.topBar,
                                    colors: {
                                      ...settings.navigation!.topBar.colors,
                                      background: e.target.value
                                    }
                                  }
                                },
                              })
                            }
                            className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                            title="Renk Seçici"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Yazı Rengi
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settings.navigation?.topBar.colors?.text || 'rgba(184, 145, 80, 0.8)'}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                navigation: {
                                  ...settings.navigation!,
                                  topBar: {
                                    ...settings.navigation!.topBar,
                                    colors: {
                                      ...settings.navigation!.topBar.colors,
                                      text: e.target.value
                                    }
                                  }
                                },
                              })
                            }
                            className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                            placeholder="rgba(184, 145, 80, 0.8)"
                          />
                          <input
                            type="color"
                            value={settings.navigation?.topBar.colors?.text?.replace(/rgba?\([^)]+\)/, '#b89150') || '#b89150'}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                navigation: {
                                  ...settings.navigation!,
                                  topBar: {
                                    ...settings.navigation!.topBar,
                                    colors: {
                                      ...settings.navigation!.topBar.colors,
                                      text: e.target.value
                                    }
                                  }
                                },
                              })
                            }
                            className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                            title="Renk Seçici"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Border Rengi
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settings.navigation?.topBar.colors?.border || 'rgba(184, 145, 80, 0.1)'}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                navigation: {
                                  ...settings.navigation!,
                                  topBar: {
                                    ...settings.navigation!.topBar,
                                    colors: {
                                      ...settings.navigation!.topBar.colors,
                                      border: e.target.value
                                    }
                                  }
                                },
                              })
                            }
                            className="flex-1 px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-sm"
                            placeholder="rgba(184, 145, 80, 0.1)"
                          />
                          <input
                            type="color"
                            value={settings.navigation?.topBar.colors?.border?.replace(/rgba?\([^)]+\)/, '#b89150') || '#b89150'}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                navigation: {
                                  ...settings.navigation!,
                                  topBar: {
                                    ...settings.navigation!.topBar,
                                    colors: {
                                      ...settings.navigation!.topBar.colors,
                                      border: e.target.value
                                    }
                                  }
                                },
                              })
                            }
                            className="w-14 h-12 border-2 border-dark-carbon/20 rounded-lg cursor-pointer"
                            title="Renk Seçici"
                          />
                        </div>
                      </div>

                      {/* Top Bar Renk Önizlemesi */}
                      <div className="mt-6">
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Önizleme
                        </label>
                        <div
                          className="p-4 rounded-lg"
                          style={{
                            backgroundColor: settings.navigation?.topBar.colors?.background || 'rgba(26, 26, 26, 0.95)',
                            borderBottom: `1px solid ${settings.navigation?.topBar.colors?.border || 'rgba(184, 145, 80, 0.1)'}`
                          }}
                        >
                          <div
                            className="font-roboto-mono text-xs text-center"
                            style={{ color: settings.navigation?.topBar.colors?.text || 'rgba(184, 145, 80, 0.8)' }}
                          >
                            {settings.navigation?.topBar.stats[0] || 'İstatistik Önizleme'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button Settings */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Header CTA Butonu
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.navigation?.ctaButton.enabled || false}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, ctaButton: { ...settings.navigation!.ctaButton, enabled: e.target.checked } },
                        })
                      }
                      className="w-5 h-5"
                    />
                    <label className="font-manrope font-semibold text-dark-carbon">
                      CTA Butonunu Göster
                    </label>
                  </div>

                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Buton Metni
                    </label>
                    <input
                      type="text"
                      value={settings.navigation?.ctaButton.text || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, ctaButton: { ...settings.navigation!.ctaButton, text: e.target.value } },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="Projeyi Başlat"
                    />
                  </div>

                  <div>
                    <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                      Buton Linki
                    </label>
                    <input
                      type="text"
                      value={settings.navigation?.ctaButton.href || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          navigation: { ...settings.navigation!, ctaButton: { ...settings.navigation!.ctaButton, href: e.target.value } },
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                      placeholder="/iletisim"
                    />
                  </div>
                </div>
              </div>

              {/* Menu Items - Form Based Editor */}
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-8">
                <h2 className="font-playfair font-bold text-2xl text-night-blue mb-6">
                  Menü Öğeleri
                </h2>
                <div className="space-y-6">
                  <div className="bg-muted-gold/5 border-l-4 border-muted-gold p-4 rounded">
                    <p className="text-sm text-dark-carbon/70 font-manrope">
                      <strong>Not:</strong> Menü öğelerini buradan ekleyebilir, düzenleyebilir veya silebilirsiniz. Mega menü öğeleri için hizmet kategorileri ekleyebilirsiniz.
                    </p>
                  </div>

                  {/* Menu Items List */}
                  {settings.navigation?.menuItems?.map((menuItem: any, index: number) => (
                    <div key={index} className="border-2 border-dark-carbon/10 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-manrope font-bold text-lg text-night-blue">
                          Menü Öğesi #{index + 1}
                        </h3>
                        <button
                          onClick={() => {
                            const newMenuItems = [...(settings.navigation?.menuItems || [])];
                            newMenuItems.splice(index, 1);
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, menuItems: newMenuItems },
                            });
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-manrope text-sm"
                        >
                          Sil
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                            Menü Adı
                          </label>
                          <input
                            type="text"
                            value={menuItem.label || ''}
                            onChange={(e) => {
                              const newMenuItems = [...(settings.navigation?.menuItems || [])];
                              newMenuItems[index] = { ...newMenuItems[index], label: e.target.value };
                              setSettings({
                                ...settings,
                                navigation: { ...settings.navigation!, menuItems: newMenuItems },
                              });
                            }}
                            className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                            placeholder="Ana Sayfa"
                          />
                        </div>

                        <div>
                          <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                            Link (href)
                          </label>
                          <input
                            type="text"
                            value={menuItem.href || ''}
                            onChange={(e) => {
                              const newMenuItems = [...(settings.navigation?.menuItems || [])];
                              newMenuItems[index] = { ...newMenuItems[index], href: e.target.value };
                              setSettings({
                                ...settings,
                                navigation: { ...settings.navigation!, menuItems: newMenuItems },
                              });
                            }}
                            className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                            placeholder="/"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                          Menü Tipi
                        </label>
                        <select
                          value={menuItem.type || 'link'}
                          onChange={(e) => {
                            const newMenuItems = [...(settings.navigation?.menuItems || [])];
                            newMenuItems[index] = { ...newMenuItems[index], type: e.target.value };
                            setSettings({
                              ...settings,
                              navigation: { ...settings.navigation!, menuItems: newMenuItems },
                            });
                          }}
                          className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-manrope"
                        >
                          <option value="link">Normal Link</option>
                          <option value="megamenu">Mega Menu (Alt Kategoriler)</option>
                        </select>
                      </div>

                      {/* Mega Menu Items Editor (JSON) - Advanced */}
                      {menuItem.type === 'megamenu' && (
                        <div className="bg-dark-carbon/5 p-4 rounded-lg">
                          <label className="block font-manrope font-semibold text-dark-carbon mb-2">
                            Mega Menu Kategorileri (JSON - İleri Düzey)
                          </label>
                          <textarea
                            value={JSON.stringify(menuItem.megaMenuItems || [], null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                const newMenuItems = [...(settings.navigation?.menuItems || [])];
                                newMenuItems[index] = { ...newMenuItems[index], megaMenuItems: parsed };
                                setSettings({
                                  ...settings,
                                  navigation: { ...settings.navigation!, menuItems: newMenuItems },
                                });
                              } catch (err) {
                                // Invalid JSON
                              }
                            }}
                            rows={10}
                            className="w-full px-4 py-3 border-2 border-dark-carbon/20 rounded-lg font-roboto-mono text-xs"
                            placeholder='[{"category": "...", "categoryDesc": "...", "items": [...]}]'
                          />
                          <p className="text-xs text-dark-carbon/50 mt-2 font-manrope">
                            Icon isimleri: Building2, Ruler, Zap, LineChart, ShieldCheck, ClipboardCheck, Home, Briefcase, Info, Mail
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add New Menu Item Button */}
                  <button
                    onClick={() => {
                      const newMenuItems = [...(settings.navigation?.menuItems || [])];
                      newMenuItems.push({
                        label: 'Yeni Menü',
                        href: '/',
                        type: 'link',
                      });
                      setSettings({
                        ...settings,
                        navigation: { ...settings.navigation!, menuItems: newMenuItems },
                      });
                    }}
                    className="w-full px-6 py-4 border-2 border-dashed border-muted-gold/40 rounded-lg hover:border-muted-gold hover:bg-muted-gold/5 transition font-manrope font-semibold text-dark-carbon"
                  >
                    + Yeni Menü Öğesi Ekle
                  </button>

                  <p className="text-xs text-dark-carbon/50 font-manrope">
                    Menü öğelerini sürükle-bırak ile sıralayamazsınız, ancak dilediğiniz öğeyi silebilir ve yeni öğe ekleyebilirsiniz.
                  </p>

                  <div className="bg-night-blue/5 p-4 rounded-lg">
                    <h3 className="font-manrope font-semibold text-sm text-night-blue mb-2">Örnek Menü Yapısı:</h3>
                    <pre className="text-xs font-roboto-mono text-dark-carbon/70 overflow-x-auto">
{`[
  {
    "label": "Ana Sayfa",
    "href": "/",
    "type": "link"
  },
  {
    "label": "Hizmetler",
    "href": "/hizmetler",
    "type": "megamenu",
    "megaMenuItems": [
      {
        "category": "Kategori Adı",
        "categoryDesc": "Açıklama",
        "items": [
          {
            "title": "Başlık",
            "desc": "Kısa açıklama",
            "href": "/link",
            "icon": "Building2"
          }
        ]
      }
    ]
  }
]`}
                    </pre>
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
