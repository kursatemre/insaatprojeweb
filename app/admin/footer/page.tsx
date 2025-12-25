'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getSiteSettings, updateSiteSettings } from '@/lib/api/settings';
import Link from 'next/link';

export default function AdminFooterPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Company Info
  const [logoText, setLogoText] = useState('EP');
  const [companyName, setCompanyName] = useState('Ekip Proje');
  const [companySubtitle, setCompanySubtitle] = useState('MİMARLIK & MÜHENDİSLİK');
  const [companyDescription, setCompanyDescription] = useState('');

  // Footer Sections
  const [sections, setSections] = useState([
    {
      title: 'Hizmetler',
      links: [
        { name: 'Mimari Projeler', href: '/hizmetler#mimari' },
        { name: 'Statik Projeler', href: '/hizmetler#statik' },
        { name: 'Tesisat Projeleri', href: '/hizmetler#tesisat' },
        { name: 'Danışmanlık', href: '/hizmetler#danismanlik' },
      ],
    },
    {
      title: 'Kurumsal',
      links: [
        { name: 'Hakkımızda', href: '/hakkimizda' },
        { name: 'Projelerimiz', href: '/projeler' },
        { name: 'Referanslar', href: '/hakkimizda#referanslar' },
        { name: 'Kariyer', href: '/kariyer' },
      ],
    },
    {
      title: 'İletişim',
      links: [
        { name: 'Bize Ulaşın', href: '/iletisim' },
        { name: 'Teklif Al', href: '/iletisim#teklif' },
        { name: 'S.S.S.', href: '/sss' },
      ],
    },
  ]);

  // Certifications
  const [certifications, setCertifications] = useState([
    { label: 'EKAP Uyumlu', icon: 'star' },
    { label: 'Kamu Onaylı', icon: 'badge' },
    { label: 'ISO 9001', icon: 'check' },
  ]);

  // Legal Links
  const [legalLinks, setLegalLinks] = useState([
    { name: 'Gizlilik Politikası', href: '/gizlilik' },
    { name: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
    { name: 'KVKK', href: '/kvkk' },
  ]);

  // Copyright
  const [copyright, setCopyright] = useState('Ekip Proje Mimarlık ve Mühendislik. Tüm hakları saklıdır.');

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, [router]);

  // Load settings from database
  const loadSettings = async () => {
    const result = await getSiteSettings();
    if (result.success && result.data?.footer) {
      const footer = result.data.footer;

      // Company info
      setLogoText(footer.company.logoText);
      setCompanyName(footer.company.name);
      setCompanySubtitle(footer.company.subtitle);
      setCompanyDescription(footer.company.description);

      // Sections
      setSections(footer.sections);

      // Certifications
      setCertifications(footer.certifications);

      // Legal Links
      setLegalLinks(footer.legalLinks);

      // Copyright
      setCopyright(footer.copyright);
    }
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);

    const footerData = {
      company: {
        logoText,
        name: companyName,
        subtitle: companySubtitle,
        description: companyDescription,
      },
      sections,
      certifications: certifications.map((cert: any) => ({
        label: cert.label,
        icon: cert.icon as 'star' | 'badge' | 'check',
      })),
      legalLinks,
      copyright,
    };

    const result = await updateSiteSettings({ footer: footerData });

    if (result.success) {
      alert('Footer ayarları başarıyla kaydedildi!');
    } else {
      alert('Hata: ' + result.error);
    }

    setIsSaving(false);
  };

  // Add/Remove functions for sections
  const addSection = () => {
    setSections([...sections, { title: '', links: [] }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_: any, i: number) => i !== index));
  };

  const updateSection = (index: number, field: string, value: any) => {
    const updated = [...sections];
    (updated[index] as any)[field] = value;
    setSections(updated);
  };

  const addLink = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].links.push({ name: '', href: '' });
    setSections(updated);
  };

  const removeLink = (sectionIndex: number, linkIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].links = updated[sectionIndex].links.filter((_: any, i: number) => i !== linkIndex);
    setSections(updated);
  };

  const updateLink = (sectionIndex: number, linkIndex: number, field: string, value: string) => {
    const updated = [...sections];
    (updated[sectionIndex].links[linkIndex] as any)[field] = value;
    setSections(updated);
  };

  // Add/Remove functions for certifications
  const addCertification = () => {
    setCertifications([...certifications, { label: '', icon: 'star' }]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_: any, i: number) => i !== index));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = [...certifications];
    (updated[index] as any)[field] = value;
    setCertifications(updated);
  };

  // Add/Remove functions for legal links
  const addLegalLink = () => {
    setLegalLinks([...legalLinks, { name: '', href: '' }]);
  };

  const removeLegalLink = (index: number) => {
    setLegalLinks(legalLinks.filter((_: any, i: number) => i !== index));
  };

  const updateLegalLink = (index: number, field: string, value: string) => {
    const updated = [...legalLinks];
    (updated[index] as any)[field] = value;
    setLegalLinks(updated);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-warm-concrete">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-playfair font-bold text-night-blue">Footer Ayarları</h1>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-dark-carbon/10 hover:bg-dark-carbon/20 text-dark-carbon font-manrope rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard'a Dön
            </Link>
          </div>
          <p className="text-dark-carbon/70 font-manrope">
            Footer alanındaki şirket bilgilerini, menü bölümlerini, sertifikaları ve yasal linkleri düzenleyin.
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-lg shadow-sm border border-dark-carbon/10 p-6 mb-6">
          <h2 className="text-xl font-playfair font-semibold text-night-blue mb-4">Şirket Bilgileri</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                Logo Metni
              </label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                placeholder="EP"
              />
            </div>

            <div>
              <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
                Şirket Adı
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                placeholder="Ekip Proje"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
              Alt Başlık
            </label>
            <input
              type="text"
              value={companySubtitle}
              onChange={(e) => setCompanySubtitle(e.target.value)}
              className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
              placeholder="MİMARLIK & MÜHENDİSLİK"
            />
          </div>

          <div>
            <label className="block text-sm font-manrope font-medium text-dark-carbon mb-2">
              Açıklama
            </label>
            <textarea
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
              placeholder="Şirket açıklaması..."
            />
          </div>
        </div>

        {/* Footer Sections */}
        <div className="bg-white rounded-lg shadow-sm border border-dark-carbon/10 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-playfair font-semibold text-night-blue">Menü Bölümleri</h2>
            <button
              onClick={addSection}
              className="px-4 py-2 bg-muted-gold hover:bg-bronze text-white font-manrope rounded-lg transition-colors"
            >
              + Bölüm Ekle
            </button>
          </div>

          {sections.map((section: any, sectionIndex: number) => (
            <div key={sectionIndex} className="mb-6 p-4 bg-warm-concrete/50 rounded-lg border border-dark-carbon/10">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                  className="flex-1 px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope font-semibold text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                  placeholder="Bölüm Başlığı"
                />
                <button
                  onClick={() => removeSection(sectionIndex)}
                  className="ml-4 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Sil
                </button>
              </div>

              {/* Links */}
              <div className="space-y-2 mb-3">
                {section.links.map((link: any, linkIndex: number) => (
                  <div key={linkIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => updateLink(sectionIndex, linkIndex, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-sm text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                      placeholder="Link Adı"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => updateLink(sectionIndex, linkIndex, 'href', e.target.value)}
                      className="flex-1 px-3 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-sm text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeLink(sectionIndex, linkIndex)}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-700 rounded-lg transition-colors text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addLink(sectionIndex)}
                className="px-3 py-1 bg-dark-carbon/10 hover:bg-dark-carbon/20 text-dark-carbon font-manrope text-sm rounded transition-colors"
              >
                + Link Ekle
              </button>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg shadow-sm border border-dark-carbon/10 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-playfair font-semibold text-night-blue">Sertifikalar / Rozetler</h2>
            <button
              onClick={addCertification}
              className="px-4 py-2 bg-muted-gold hover:bg-bronze text-white font-manrope rounded-lg transition-colors"
            >
              + Sertifika Ekle
            </button>
          </div>

          <div className="space-y-3">
            {certifications.map((cert: any, index: number) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={cert.label}
                  onChange={(e) => updateCertification(index, 'label', e.target.value)}
                  className="flex-1 px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                  placeholder="Sertifika Adı"
                />
                <select
                  value={cert.icon}
                  onChange={(e) => updateCertification(index, 'icon', e.target.value)}
                  className="px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                >
                  <option value="star">Yıldız</option>
                  <option value="badge">Rozet</option>
                  <option value="check">Onay</option>
                </select>
                <button
                  onClick={() => removeCertification(index)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="bg-white rounded-lg shadow-sm border border-dark-carbon/10 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-playfair font-semibold text-night-blue">Yasal Linkler</h2>
            <button
              onClick={addLegalLink}
              className="px-4 py-2 bg-muted-gold hover:bg-bronze text-white font-manrope rounded-lg transition-colors"
            >
              + Link Ekle
            </button>
          </div>

          <div className="space-y-3">
            {legalLinks.map((link: any, index: number) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateLegalLink(index, 'name', e.target.value)}
                  className="flex-1 px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                  placeholder="Link Adı"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateLegalLink(index, 'href', e.target.value)}
                  className="flex-1 px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
                  placeholder="URL"
                />
                <button
                  onClick={() => removeLegalLink(index)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-white rounded-lg shadow-sm border border-dark-carbon/10 p-6 mb-24">
          <h2 className="text-xl font-playfair font-semibold text-night-blue mb-4">Telif Hakkı Metni</h2>
          <input
            type="text"
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            className="w-full px-4 py-2 border border-dark-carbon/20 rounded-lg font-manrope text-dark-carbon focus:outline-none focus:ring-2 focus:ring-muted-gold"
            placeholder="© 2024 Ekip Proje..."
          />
          <p className="mt-2 text-sm text-dark-carbon/60 font-manrope">
            Not: Yıl otomatik olarak eklenecektir, sadece şirket adını ve telif hakkı metnini girin.
          </p>
        </div>

        {/* Sticky Save Button */}
        <div className="fixed bottom-6 right-6 z-10 flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-4 bg-gradient-to-r from-muted-gold to-bronze text-white font-manrope font-semibold rounded-lg hover:shadow-xl hover:shadow-muted-gold/30 transition-all duration-300 disabled:opacity-50"
          >
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
