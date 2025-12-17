'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface CityData {
  name: string;
  projects: number;
  type: string;
  x: number;
  y: number;
}

const TurkeyMap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);

  // Sample city data with approximate positions (as percentages)
  const cities: CityData[] = [
    { name: 'İstanbul', projects: 45, type: 'Karma', x: 28, y: 41 },
    { name: 'Ankara', projects: 38, type: 'Kamu', x: 33, y: 40 },
    { name: 'İzmir', projects: 32, type: 'Karma', x: 27, y: 38 },
    { name: 'Antalya', projects: 28, type: 'Özel', x: 31, y: 37 },
    { name: 'Bursa', projects: 25, type: 'Karma', x: 29, y: 40 },
    { name: 'Konya', projects: 22, type: 'Kamu', x: 33, y: 38 },
    { name: 'Adana', projects: 20, type: 'Karma', x: 35, y: 37 },
    { name: 'Gaziantep', projects: 18, type: 'Kamu', x: 37, y: 37 },
    { name: 'Kayseri', projects: 16, type: 'Kamu', x: 35, y: 39 },
    { name: 'Trabzon', projects: 14, type: 'Kamu', x: 40, y: 41 },
    { name: 'Eskişehir', projects: 12, type: 'Karma', x: 31, y: 40 },
    { name: 'Samsun', projects: 15, type: 'Kamu', x: 36, y: 41 },
  ];

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
          {/* Turkey Map SVG Simplified */}
          <div className="relative w-full aspect-[2/1] bg-dark-carbon/30 rounded-lg border border-muted-gold/10 overflow-hidden">
            {/* Grid Background */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(184, 145, 80, 0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simplified Turkey Outline */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 15 25 Q 20 20, 30 22 Q 40 24, 50 23 Q 60 22, 70 24 Q 80 26, 85 25 L 87 28 Q 85 32, 82 34 Q 75 36, 68 37 Q 60 38, 50 38 Q 40 38, 32 36 Q 24 34, 18 32 Q 13 30, 12 27 Z"
                fill="none"
                stroke="rgba(184, 145, 80, 0.3)"
                strokeWidth="0.5"
                className="animate-pulse"
              />
            </svg>

            {/* City Markers */}
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="absolute cursor-pointer group"
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                {/* Pulse Animation */}
                <div className="absolute -inset-2 bg-muted-gold/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>

                {/* City Dot */}
                <div className="relative w-3 h-3 bg-gradient-to-br from-muted-gold to-bronze rounded-full shadow-lg shadow-muted-gold/50 transform group-hover:scale-150 transition-transform duration-300">
                  <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-50"></div>
                </div>

                {/* Tooltip */}
                {hoveredCity?.name === city.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-48 bg-white rounded-lg shadow-2xl border border-muted-gold/30 p-4 pointer-events-none z-50"
                  >
                    <h4 className="font-playfair font-bold text-lg text-night-blue mb-2">
                      {city.name}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-dark-carbon/60 font-manrope">Proje Sayısı:</span>
                        <span className="text-muted-gold font-roboto-mono font-bold">{city.projects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-dark-carbon/60 font-manrope">Proje Tipi:</span>
                        <span className="text-night-blue font-manrope font-semibold">{city.type}</span>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-br from-muted-gold to-bronze rounded-full"></div>
              <span className="text-white/70 font-manrope text-sm">Aktif Proje Şehri</span>
            </div>
            <div className="flex items-center space-x-3 text-white/50 font-roboto-mono text-xs">
              <span>Toplam:</span>
              <span className="text-muted-gold font-bold text-base">
                {cities.reduce((sum, city) => sum + city.projects, 0)}+ Proje
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
