'use client';

import { motion } from 'framer-motion';

interface TurkeySVGMapProps {
  onCityClick?: (cityName: string, cityCode: string) => void;
  cityData?: Record<string, { projects: number; type: string }>;
  hoveredCity?: string | null;
  setHoveredCity?: (city: string | null) => void;
}

// Türkiye bölgeleri ve illeri
const turkeyRegions = [
  // Marmara Bölgesi
  { code: '34', name: 'İstanbul', x: 420, y: 180, region: 'marmara' },
  { code: '16', name: 'Bursa', x: 380, y: 220, region: 'marmara' },
  { code: '41', name: 'Kocaeli', x: 450, y: 170, region: 'marmara' },
  { code: '54', name: 'Sakarya', x: 480, y: 160, region: 'marmara' },
  { code: '59', name: 'Tekirdağ', x: 350, y: 180, region: 'marmara' },
  { code: '22', name: 'Edirne', x: 300, y: 170, region: 'marmara' },
  { code: '39', name: 'Kırklareli', x: 330, y: 160, region: 'marmara' },
  { code: '10', name: 'Balıkesir', x: 350, y: 240, region: 'marmara' },
  { code: '17', name: 'Çanakkale', x: 310, y: 240, region: 'marmara' },
  { code: '77', name: 'Yalova', x: 400, y: 200, region: 'marmara' },
  { code: '11', name: 'Bilecik', x: 420, y: 210, region: 'marmara' },

  // Ege Bölgesi
  { code: '35', name: 'İzmir', x: 320, y: 290, region: 'ege' },
  { code: '09', name: 'Aydın', x: 340, y: 320, region: 'ege' },
  { code: '48', name: 'Muğla', x: 360, y: 350, region: 'ege' },
  { code: '20', name: 'Denizli', x: 390, y: 320, region: 'ege' },
  { code: '45', name: 'Manisa', x: 340, y: 270, region: 'ege' },
  { code: '03', name: 'Afyonkarahisar', x: 430, y: 280, region: 'ege' },
  { code: '64', name: 'Uşak', x: 380, y: 290, region: 'ege' },
  { code: '43', name: 'Kütahya', x: 410, y: 250, region: 'ege' },

  // Akdeniz Bölgesi
  { code: '07', name: 'Antalya', x: 440, y: 350, region: 'akdeniz' },
  { code: '01', name: 'Adana', x: 540, y: 350, region: 'akdeniz' },
  { code: '33', name: 'Mersin', x: 500, y: 360, region: 'akdeniz' },
  { code: '31', name: 'Hatay', x: 580, y: 370, region: 'akdeniz' },
  { code: '27', name: 'Gaziantep', x: 610, y: 340, region: 'akdeniz' },
  { code: '80', name: 'Osmaniye', x: 570, y: 340, region: 'akdeniz' },
  { code: '46', name: 'Kahramanmaraş', x: 600, y: 320, region: 'akdeniz' },
  { code: '15', name: 'Burdur', x: 410, y: 330, region: 'akdeniz' },
  { code: '32', name: 'Isparta', x: 430, y: 320, region: 'akdeniz' },

  // İç Anadolu Bölgesi
  { code: '06', name: 'Ankara', x: 500, y: 240, region: 'ic_anadolu' },
  { code: '42', name: 'Konya', x: 500, y: 310, region: 'ic_anadolu' },
  { code: '38', name: 'Kayseri', x: 580, y: 280, region: 'ic_anadolu' },
  { code: '58', name: 'Sivas', x: 620, y: 240, region: 'ic_anadolu' },
  { code: '50', name: 'Nevşehir', x: 540, y: 290, region: 'ic_anadolu' },
  { code: '40', name: 'Kırşehir', x: 520, y: 260, region: 'ic_anadolu' },
  { code: '51', name: 'Niğde', x: 540, y: 320, region: 'ic_anadolu' },
  { code: '68', name: 'Aksaray', x: 520, y: 300, region: 'ic_anadolu' },
  { code: '71', name: 'Kırıkkale', x: 530, y: 230, region: 'ic_anadolu' },
  { code: '66', name: 'Yozgat', x: 560, y: 250, region: 'ic_anadolu' },
  { code: '70', name: 'Karaman', x: 510, y: 340, region: 'ic_anadolu' },
  { code: '18', name: 'Çankırı', x: 520, y: 210, region: 'ic_anadolu' },
  { code: '19', name: 'Çorum', x: 560, y: 210, region: 'ic_anadolu' },

  // Karadeniz Bölgesi
  { code: '55', name: 'Samsun', x: 580, y: 170, region: 'karadeniz' },
  { code: '61', name: 'Trabzon', x: 670, y: 160, region: 'karadeniz' },
  { code: '52', name: 'Ordu', x: 620, y: 180, region: 'karadeniz' },
  { code: '28', name: 'Giresun', x: 650, y: 170, region: 'karadeniz' },
  { code: '53', name: 'Rize', x: 690, y: 160, region: 'karadeniz' },
  { code: '08', name: 'Artvin', x: 710, y: 150, region: 'karadeniz' },
  { code: '67', name: 'Zonguldak', x: 500, y: 160, region: 'karadeniz' },
  { code: '78', name: 'Karabük', x: 520, y: 170, region: 'karadeniz' },
  { code: '74', name: 'Bartın', x: 510, y: 150, region: 'karadeniz' },
  { code: '37', name: 'Kastamonu', x: 540, y: 180, region: 'karadeniz' },
  { code: '57', name: 'Sinop', x: 560, y: 150, region: 'karadeniz' },
  { code: '05', name: 'Amasya', x: 580, y: 200, region: 'karadeniz' },
  { code: '60', name: 'Tokat', x: 610, y: 210, region: 'karadeniz' },
  { code: '29', name: 'Gümüşhane', x: 660, y: 190, region: 'karadeniz' },
  { code: '69', name: 'Bayburt', x: 680, y: 180, region: 'karadeniz' },
  { code: '14', name: 'Bolu', x: 480, y: 190, region: 'karadeniz' },
  { code: '81', name: 'Düzce', x: 490, y: 170, region: 'karadeniz' },

  // Doğu Anadolu Bölgesi
  { code: '25', name: 'Erzurum', x: 710, y: 200, region: 'dogu_anadolu' },
  { code: '04', name: 'Ağrı', x: 740, y: 210, region: 'dogu_anadolu' },
  { code: '36', name: 'Kars', x: 730, y: 170, region: 'dogu_anadolu' },
  { code: '75', name: 'Ardahan', x: 730, y: 150, region: 'dogu_anadolu' },
  { code: '76', name: 'Iğdır', x: 760, y: 200, region: 'dogu_anadolu' },
  { code: '65', name: 'Van', x: 750, y: 260, region: 'dogu_anadolu' },
  { code: '30', name: 'Hakkari', x: 760, y: 300, region: 'dogu_anadolu' },
  { code: '13', name: 'Bitlis', x: 720, y: 270, region: 'dogu_anadolu' },
  { code: '49', name: 'Muş', x: 700, y: 250, region: 'dogu_anadolu' },
  { code: '12', name: 'Bingöl', x: 680, y: 230, region: 'dogu_anadolu' },
  { code: '62', name: 'Tunceli', x: 660, y: 240, region: 'dogu_anadolu' },
  { code: '23', name: 'Elazığ', x: 650, y: 260, region: 'dogu_anadolu' },
  { code: '24', name: 'Erzincan', x: 680, y: 210, region: 'dogu_anadolu' },

  // Güneydoğu Anadolu Bölgesi
  { code: '44', name: 'Malatya', x: 640, y: 280, region: 'guneydogu' },
  { code: '02', name: 'Adıyaman', x: 640, y: 310, region: 'guneydogu' },
  { code: '21', name: 'Diyarbakır', x: 690, y: 310, region: 'guneydogu' },
  { code: '63', name: 'Şanlıurfa', x: 660, y: 340, region: 'guneydogu' },
  { code: '47', name: 'Mardin', x: 710, y: 340, region: 'guneydogu' },
  { code: '72', name: 'Batman', x: 710, y: 310, region: 'guneydogu' },
  { code: '73', name: 'Şırnak', x: 730, y: 320, region: 'guneydogu' },
  { code: '56', name: 'Siirt', x: 720, y: 290, region: 'guneydogu' },
  { code: '79', name: 'Kilis', x: 620, y: 360, region: 'guneydogu' },
];

const TurkeySVGMap: React.FC<TurkeySVGMapProps> = ({
  onCityClick,
  cityData = {},
  hoveredCity,
  setHoveredCity
}) => {
  const getCityColor = (cityCode: string) => {
    const data = cityData[cityCode];
    if (!data || data.projects === 0) {
      return 'rgba(184, 145, 80, 0.1)';
    }
    if (data.projects < 5) {
      return 'rgba(184, 145, 80, 0.3)';
    }
    if (data.projects < 15) {
      return 'rgba(184, 145, 80, 0.5)';
    }
    return 'rgba(184, 145, 80, 0.8)';
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 900 500"
        className="w-full h-full"
        style={{ maxHeight: '600px' }}
      >
        {/* Background */}
        <rect width="900" height="500" fill="transparent" />

        {/* Cities as circles */}
        {turkeyRegions.map((city) => {
          const fillColor = getCityColor(city.code);
          const isHovered = hoveredCity === city.code;

          return (
            <motion.g
              key={city.code}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
            >
              <circle
                cx={city.x}
                cy={city.y}
                r={isHovered ? 18 : 12}
                fill={fillColor}
                stroke={isHovered ? 'rgba(184, 145, 80, 1)' : 'rgba(184, 145, 80, 0.3)'}
                strokeWidth={isHovered ? 3 : 1.5}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={() => setHoveredCity?.(city.code)}
                onMouseLeave={() => setHoveredCity?.(null)}
                onClick={() => onCityClick?.(city.name, city.code)}
              />
              {isHovered && (
                <text
                  x={city.x}
                  y={city.y - 25}
                  textAnchor="middle"
                  fill="rgba(184, 145, 80, 1)"
                  fontSize="12"
                  fontWeight="bold"
                  style={{ pointerEvents: 'none' }}
                >
                  {city.name}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default TurkeySVGMap;
