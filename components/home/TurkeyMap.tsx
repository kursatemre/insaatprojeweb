'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import TurkeySVGMap from './TurkeySVGMap';
import { getSiteSettings } from '@/lib/api/settings';

interface CityData {
  name: string;
  projects: number;
  type: string;
}

const TurkeyMap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<{ name: string; code: string } | null>(null);
  const [cityDataMap, setCityDataMap] = useState<Record<string, { projects: number; type: string }>>({
    // Default sample data
    '01': { projects: 20, type: 'Karma' },
    '06': { projects: 38, type: 'Kamu' },
    '07': { projects: 28, type: 'Özel' },
    '10': { projects: 15, type: 'Karma' },
    '16': { projects: 25, type: 'Karma' },
    '20': { projects: 12, type: 'Özel' },
    '21': { projects: 18, type: 'Kamu' },
    '26': { projects: 12, type: 'Karma' },
    '27': { projects: 18, type: 'Kamu' },
    '34': { projects: 45, type: 'Karma' },
    '35': { projects: 32, type: 'Karma' },
    '38': { projects: 16, type: 'Kamu' },
    '41': { projects: 14, type: 'Karma' },
    '42': { projects: 22, type: 'Kamu' },
    '55': { projects: 15, type: 'Kamu' },
    '61': { projects: 14, type: 'Kamu' },
  });

  useEffect(() => {
    const loadCityData = async () => {
      const result = await getSiteSettings();
      if (result.success && result.data?.turkeyMap) {
        setCityDataMap(result.data.turkeyMap);
      }
    };
    loadCityData();
  }, []);

  const handleCityClick = (cityName: string, cityCode: string) => {
    setSelectedCity({ name: cityName, code: cityCode });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-night-blue via-dark-carbon to-night-blue overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-blueprint-pattern opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-0.5 bg-muted-gold"></div>
            <span className="mx-4 text-muted-gold font-roboto-mono text-xs tracking-widest">
              ULUSAL ETKİ
            </span>
            <div className="w-16 h-0.5 bg-muted-gold"></div>
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
            81 İlde Hizmet Ağımız
          </h2>
          <p className="text-white/60 font-manrope text-lg max-w-2xl mx-auto">
            Türkiye'nin her köşesinde güvenilir mühendislik çözümleri
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-night-blue/50 to-dark-carbon/50 rounded-2xl border border-muted-gold/20 p-8 md:p-12 backdrop-blur-sm"
        >
          {/* Turkey Map SVG */}
          <div className="relative w-full aspect-[5/3] bg-dark-carbon/30 rounded-lg border border-muted-gold/10 overflow-hidden">
            <TurkeySVGMap
              onCityClick={handleCityClick}
              cityData={cityDataMap}
              hoveredCity={hoveredCity}
              setHoveredCity={setHoveredCity}
            />

            {/* Tooltip for hovered city */}
            {hoveredCity && cityDataMap[hoveredCity] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-4 right-4 bg-white rounded-lg shadow-2xl border-2 border-muted-gold/30 p-4 z-50 min-w-[200px]"
              >
                <h4 className="font-playfair font-bold text-lg text-night-blue mb-2">
                  {/* Get city name from code */}
                  İl Kodu: {hoveredCity}
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-carbon/60 font-manrope">Proje Sayısı:</span>
                    <span className="text-muted-gold font-roboto-mono font-bold">
                      {cityDataMap[hoveredCity].projects}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-carbon/60 font-manrope">Proje Tipi:</span>
                    <span className="text-night-blue font-manrope font-semibold">
                      {cityDataMap[hoveredCity].type}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Selected City Info */}
            {selectedCity && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-2xl border-2 border-muted-gold/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-playfair font-bold text-xl text-night-blue">
                      {selectedCity.name}
                    </h4>
                    <p className="text-dark-carbon/60 font-manrope text-sm">
                      İl Kodu: {selectedCity.code}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="text-dark-carbon/40 hover:text-night-blue transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'rgba(184, 145, 80, 0.1)' }}></div>
                <span className="text-white/70 font-manrope text-sm">0 Proje</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'rgba(184, 145, 80, 0.3)' }}></div>
                <span className="text-white/70 font-manrope text-sm">1-4 Proje</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'rgba(184, 145, 80, 0.5)' }}></div>
                <span className="text-white/70 font-manrope text-sm">5-14 Proje</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: 'rgba(184, 145, 80, 0.8)' }}></div>
                <span className="text-white/70 font-manrope text-sm">15+ Proje</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-white/50 font-roboto-mono text-xs">
              <span>Toplam:</span>
              <span className="text-muted-gold font-bold text-base">
                {Object.values(cityDataMap).reduce((sum, city) => sum + city.projects, 0)}+ Proje
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'İl Kapsamı', value: '81', unit: 'İl' },
            { label: 'Toplam Proje', value: '320', unit: '+' },
            { label: 'Aktif Şantiye', value: '45', unit: '' },
            { label: 'Deneyim', value: '15', unit: 'Yıl' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-muted-gold/20 rounded-lg p-6 text-center hover:border-muted-gold/50 transition-all duration-300"
            >
              <div className="font-playfair font-bold text-4xl text-white mb-2">
                {stat.value}
                <span className="text-muted-gold text-2xl ml-1">{stat.unit}</span>
              </div>
              <div className="text-white/60 font-manrope text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TurkeyMap;
