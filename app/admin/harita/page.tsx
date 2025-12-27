'use client';

import { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/api/settings';
import { motion } from 'framer-motion';

interface CityData {
  code: string;
  name: string;
  projects: number;
  type: 'Kamu' | 'Özel' | 'Karma';
}

const CITIES = [
  { code: '01', name: 'Adana' }, { code: '02', name: 'Adıyaman' }, { code: '03', name: 'Afyonkarahisar' },
  { code: '04', name: 'Ağrı' }, { code: '05', name: 'Amasya' }, { code: '06', name: 'Ankara' },
  { code: '07', name: 'Antalya' }, { code: '08', name: 'Artvin' }, { code: '09', name: 'Aydın' },
  { code: '10', name: 'Balıkesir' }, { code: '11', name: 'Bilecik' }, { code: '12', name: 'Bingöl' },
  { code: '13', name: 'Bitlis' }, { code: '14', name: 'Bolu' }, { code: '15', name: 'Burdur' },
  { code: '16', name: 'Bursa' }, { code: '17', name: 'Çanakkale' }, { code: '18', name: 'Çankırı' },
  { code: '19', name: 'Çorum' }, { code: '20', name: 'Denizli' }, { code: '21', name: 'Diyarbakır' },
  { code: '22', name: 'Edirne' }, { code: '23', name: 'Elazığ' }, { code: '24', name: 'Erzincan' },
  { code: '25', name: 'Erzurum' }, { code: '26', name: 'Eskişehir' }, { code: '27', name: 'Gaziantep' },
  { code: '28', name: 'Giresun' }, { code: '29', name: 'Gümüşhane' }, { code: '30', name: 'Hakkari' },
  { code: '31', name: 'Hatay' }, { code: '32', name: 'Isparta' }, { code: '33', name: 'Mersin' },
  { code: '34', name: 'İstanbul' }, { code: '35', name: 'İzmir' }, { code: '36', name: 'Kars' },
  { code: '37', name: 'Kastamonu' }, { code: '38', name: 'Kayseri' }, { code: '39', name: 'Kırklareli' },
  { code: '40', name: 'Kırşehir' }, { code: '41', name: 'Kocaeli' }, { code: '42', name: 'Konya' },
  { code: '43', name: 'Kütahya' }, { code: '44', name: 'Malatya' }, { code: '45', name: 'Manisa' },
  { code: '46', name: 'Kahramanmaraş' }, { code: '47', name: 'Mardin' }, { code: '48', name: 'Muğla' },
  { code: '49', name: 'Muş' }, { code: '50', name: 'Nevşehir' }, { code: '51', name: 'Niğde' },
  { code: '52', name: 'Ordu' }, { code: '53', name: 'Rize' }, { code: '54', name: 'Sakarya' },
  { code: '55', name: 'Samsun' }, { code: '56', name: 'Siirt' }, { code: '57', name: 'Sinop' },
  { code: '58', name: 'Sivas' }, { code: '59', name: 'Tekirdağ' }, { code: '60', name: 'Tokat' },
  { code: '61', name: 'Trabzon' }, { code: '62', name: 'Tunceli' }, { code: '63', name: 'Şanlıurfa' },
  { code: '64', name: 'Uşak' }, { code: '65', name: 'Van' }, { code: '66', name: 'Yozgat' },
  { code: '67', name: 'Zonguldak' }, { code: '68', name: 'Aksaray' }, { code: '69', name: 'Bayburt' },
  { code: '70', name: 'Karaman' }, { code: '71', name: 'Kırıkkale' }, { code: '72', name: 'Batman' },
  { code: '73', name: 'Şırnak' }, { code: '74', name: 'Bartın' }, { code: '75', name: 'Ardahan' },
  { code: '76', name: 'Iğdır' }, { code: '77', name: 'Yalova' }, { code: '78', name: 'Karabük' },
  { code: '79', name: 'Kilis' }, { code: '80', name: 'Osmaniye' }, { code: '81', name: 'Düzce' },
];

export default function AdminHaritaPage() {
  const [cityData, setCityData] = useState<Record<string, { projects: number; type: string }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Kamu' | 'Özel' | 'Karma'>('all');

  useEffect(() => {
    const loadData = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data) {
        // Database'de turkey_map olarak saklanıyor
        const mapData = (result.data as any).turkey_map || result.data.turkeyMap;
        if (mapData) {
          setCityData(mapData);
        }
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleCityUpdate = (code: string, field: 'projects' | 'type', value: number | string) => {
    setCityData(prev => ({
      ...prev,
      [code]: {
        ...prev[code],
        projects: prev[code]?.projects || 0,
        type: prev[code]?.type || 'Karma',
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateSiteSettings({ turkeyMap: cityData });
    setIsSaving(false);

    if (result.success) {
      alert('Harita verileri başarıyla kaydedildi!');
    } else {
      alert('Hata: ' + result.error);
    }
  };

  const filteredCities = CITIES.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.code.includes(searchTerm);
    const matchesType = filterType === 'all' || cityData[city.code]?.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTotalProjects = () => {
    return Object.values(cityData).reduce((sum, city) => sum + (city.projects || 0), 0);
  };

  const getCityCountByType = (type: string) => {
    return Object.values(cityData).filter(city => city.type === type).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-concrete">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-carbon/70 font-manrope">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-concrete pt-20 lg:pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-dark-carbon/10 p-8 mb-8"
          >
            <h1 className="text-3xl font-playfair font-bold text-night-blue mb-2">
              Türkiye Haritası Yönetimi
            </h1>
            <p className="text-dark-carbon/70 font-manrope">
              81 il için proje sayısı ve tipi bilgilerini düzenleyin
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-br from-muted-gold/10 to-bronze/10 rounded-xl p-4 border border-muted-gold/20">
                <div className="text-2xl font-playfair font-bold text-night-blue">{getTotalProjects()}</div>
                <div className="text-sm text-dark-carbon/60 font-manrope">Toplam Proje</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                <div className="text-2xl font-playfair font-bold text-night-blue">{getCityCountByType('Kamu')}</div>
                <div className="text-sm text-dark-carbon/60 font-manrope">Kamu Projesi İli</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-500/20">
                <div className="text-2xl font-playfair font-bold text-night-blue">{getCityCountByType('Özel')}</div>
                <div className="text-sm text-dark-carbon/60 font-manrope">Özel Proje İli</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                <div className="text-2xl font-playfair font-bold text-night-blue">{getCityCountByType('Karma')}</div>
                <div className="text-sm text-dark-carbon/60 font-manrope">Karma Proje İli</div>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-dark-carbon/10 p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  İl Ara
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="İl adı veya plaka kodu..."
                  className="w-full px-4 py-2 border-2 border-dark-carbon/20 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                />
              </div>
              <div>
                <label className="block text-sm font-manrope font-semibold text-dark-carbon mb-2">
                  Proje Tipi Filtrele
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full px-4 py-2 border-2 border-dark-carbon/20 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                >
                  <option value="all">Tümü</option>
                  <option value="Kamu">Kamu</option>
                  <option value="Özel">Özel</option>
                  <option value="Karma">Karma</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* City List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-dark-carbon/10 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-night-blue to-dark-carbon text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-playfair">Plaka</th>
                    <th className="px-6 py-4 text-left font-playfair">İl Adı</th>
                    <th className="px-6 py-4 text-left font-playfair">Proje Sayısı</th>
                    <th className="px-6 py-4 text-left font-playfair">Proje Tipi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-carbon/10">
                  {filteredCities.map((city, index) => (
                    <motion.tr
                      key={city.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.01 }}
                      className="hover:bg-warm-concrete transition-colors"
                    >
                      <td className="px-6 py-4 font-roboto-mono font-bold text-muted-gold">{city.code}</td>
                      <td className="px-6 py-4 font-manrope font-semibold text-night-blue">{city.name}</td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          min="0"
                          value={cityData[city.code]?.projects || 0}
                          onChange={(e) => handleCityUpdate(city.code, 'projects', parseInt(e.target.value) || 0)}
                          className="w-24 px-3 py-2 border-2 border-dark-carbon/20 rounded-lg focus:border-muted-gold focus:outline-none font-manrope text-center"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={cityData[city.code]?.type || 'Karma'}
                          onChange={(e) => handleCityUpdate(city.code, 'type', e.target.value)}
                          className="px-3 py-2 border-2 border-dark-carbon/20 rounded-lg focus:border-muted-gold focus:outline-none font-manrope"
                        >
                          <option value="Kamu">Kamu</option>
                          <option value="Özel">Özel</option>
                          <option value="Karma">Karma</option>
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-muted-gold to-bronze hover:from-bronze hover:to-muted-gold text-white font-playfair font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </motion.div>
      </div>
    </div>
  );
}
