'use client';

import { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/api/settings';

export default function AdminHakkimizdaPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');

  const [values, setValues] = useState<Array<{ title: string; description: string; icon: 'shield' | 'lock' | 'lightbulb' | 'eye' }>>([]);
  const [team, setTeam] = useState<Array<{ name: string; role: string; credentials: string; experience: string; projects: string }>>([]);
  const [certifications, setCertifications] = useState<string[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    setIsLoading(true);
    const result = await getSiteSettings();
    if (result.success && result.data?.about) {
      const about = result.data.about;
      setTitle(about.title || '');
      setDescription(about.description || '');
      setMission(about.mission || '');
      setVision(about.vision || '');
      setValues(about.values || []);
      setTeam(about.team || []);
      setCertifications(about.certifications || []);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const aboutData = {
      title,
      description,
      mission,
      vision,
      values: values.map((v) => ({
        title: v.title,
        description: v.description,
        icon: v.icon as 'shield' | 'lock' | 'lightbulb' | 'eye',
      })),
      team: team.map((t) => ({
        name: t.name,
        role: t.role,
        credentials: t.credentials,
        experience: t.experience,
        projects: t.projects,
      })),
      certifications,
    };

    const result = await updateSiteSettings({ about: aboutData });
    if (result.success) {
      alert('Hakkımızda ayarları başarıyla kaydedildi!');
    } else {
      alert('Hata: ' + (result.error || 'Bilinmeyen hata'));
    }
    setIsSaving(false);
  };

  const addValue = () => {
    setValues([...values, { title: '', description: '', icon: 'shield' }]);
  };

  const updateValue = (index: number, field: keyof typeof values[0], value: string) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [field]: value };
    setValues(newValues);
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const addTeamMember = () => {
    setTeam([...team, { name: '', role: '', credentials: '', experience: '', projects: '' }]);
  };

  const updateTeamMember = (index: number, field: keyof typeof team[0], value: string) => {
    const newTeam = [...team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setTeam(newTeam);
  };

  const removeTeamMember = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, '']);
  };

  const updateCertification = (index: number, value: string) => {
    const newCerts = [...certifications];
    newCerts[index] = value;
    setCertifications(newCerts);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-warm-concrete">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-carbon/70 font-manrope">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-concrete pt-20 lg:pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-dark-carbon/10 p-8">
          {/* Header */}
          <div className="mb-8 pb-6 border-b-2 border-dark-carbon/10">
            <h1 className="text-3xl font-playfair font-bold text-night-blue mb-2">
              Hakkımızda Yönetimi
            </h1>
            <p className="text-dark-carbon/70 font-manrope">
              Hakkımızda sayfası içeriklerini düzenleyin
            </p>
          </div>

          {/* Hero Section */}
          <div className="mb-8">
            <h2 className="text-xl font-playfair font-bold text-night-blue mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Hero Bölümü
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon/80 mb-2">
                  Başlık
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope"
                  placeholder="15 Yıllık Deneyim"
                />
              </div>

              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon/80 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope"
                  placeholder="Türkiye'nin dört bir yanında..."
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-8 pb-8 border-b-2 border-dark-carbon/10">
            <h2 className="text-xl font-playfair font-bold text-night-blue mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Misyon & Vizyon
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon/80 mb-2">
                  Misyon
                </label>
                <textarea
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope"
                  placeholder="Mühendislik ve mimarlık alanında..."
                />
              </div>

              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon/80 mb-2">
                  Vizyon
                </label>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope"
                  placeholder="Türkiye'de mühendislik ve danışmanlık..."
                />
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-8 pb-8 border-b-2 border-dark-carbon/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-playfair font-bold text-night-blue flex items-center">
                <svg className="w-5 h-5 mr-2 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Değerlerimiz
              </h2>
              <button
                onClick={addValue}
                className="px-4 py-2 bg-muted-gold hover:bg-bronze text-white rounded-lg font-manrope text-sm transition-colors"
              >
                + Değer Ekle
              </button>
            </div>

            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="p-4 bg-warm-concrete/50 rounded-lg border border-dark-carbon/10">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-roboto-mono text-dark-carbon/60">Değer #{index + 1}</span>
                    <button
                      onClick={() => removeValue(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-manrope"
                    >
                      Kaldır
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        Başlık
                      </label>
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => updateValue(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                        placeholder="Teknik Mükemmellik"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        Açıklama
                      </label>
                      <textarea
                        value={value.description}
                        onChange={(e) => updateValue(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                        placeholder="Her projede en yüksek standartları koruyoruz"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        İkon
                      </label>
                      <select
                        value={value.icon}
                        onChange={(e) => updateValue(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                      >
                        <option value="shield">Kalkan (Shield)</option>
                        <option value="lock">Kilit (Lock)</option>
                        <option value="lightbulb">Ampul (Lightbulb)</option>
                        <option value="eye">Göz (Eye)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-8 pb-8 border-b-2 border-dark-carbon/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-playfair font-bold text-night-blue flex items-center">
                <svg className="w-5 h-5 mr-2 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Ekip Üyeleri
              </h2>
              <button
                onClick={addTeamMember}
                className="px-4 py-2 bg-muted-gold hover:bg-bronze text-white rounded-lg font-manrope text-sm transition-colors"
              >
                + Ekip Üyesi Ekle
              </button>
            </div>

            <div className="space-y-4">
              {team.map((member, index) => (
                <div key={index} className="p-4 bg-warm-concrete/50 rounded-lg border border-dark-carbon/10">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-roboto-mono text-dark-carbon/60">Ekip Üyesi #{index + 1}</span>
                    <button
                      onClick={() => removeTeamMember(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-manrope"
                    >
                      Kaldır
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        İsim
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                        placeholder="Mehmet Kaya"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        Rol
                      </label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                        placeholder="Kurucu Ortak / Mimar"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        Yetkinlikler
                      </label>
                      <input
                        type="text"
                        value={member.credentials}
                        onChange={(e) => updateTeamMember(index, 'credentials', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                        placeholder="YMM, MSc Mimarlık"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        Deneyim
                      </label>
                      <input
                        type="text"
                        value={member.experience}
                        onChange={(e) => updateTeamMember(index, 'experience', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                        placeholder="18 yıl"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-manrope font-semibold text-dark-carbon/70 mb-1">
                        Proje Sayısı
                      </label>
                      <input
                        type="text"
                        value={member.projects}
                        onChange={(e) => updateTeamMember(index, 'projects', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope text-sm"
                        placeholder="150+"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-playfair font-bold text-night-blue flex items-center">
                <svg className="w-5 h-5 mr-2 text-muted-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sertifikalar
              </h2>
              <button
                onClick={addCertification}
                className="px-4 py-2 bg-muted-gold hover:bg-bronze text-white rounded-lg font-manrope text-sm transition-colors"
              >
                + Sertifika Ekle
              </button>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => updateCertification(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-dark-carbon/20 focus:border-muted-gold focus:outline-none font-manrope"
                    placeholder="EKAP Kayıtlı Firma"
                  />
                  <button
                    onClick={() => removeCertification(index)}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-manrope text-sm transition-colors"
                  >
                    Kaldır
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="sticky bottom-0 pt-6 bg-white border-t-2 border-dark-carbon/10 -mx-8 px-8 -mb-8 pb-8">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-muted-gold to-bronze hover:from-bronze hover:to-muted-gold text-white font-playfair font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
