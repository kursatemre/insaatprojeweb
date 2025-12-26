'use client';

import { motion } from 'framer-motion';

interface TurkeySVGMapProps {
  onCityClick?: (cityName: string, cityCode: string) => void;
  cityData?: Record<string, { projects: number; type: string }>;
  hoveredCity?: string | null;
  setHoveredCity?: (city: string | null) => void;
}

const TurkeySVGMap: React.FC<TurkeySVGMapProps> = ({
  onCityClick,
  cityData = {},
  hoveredCity,
  setHoveredCity
}) => {
  const cities = [
    { name: 'Adana', code: '01', path: 'M 520 380 L 560 380 L 570 400 L 550 420 L 520 410 Z' },
    { name: 'Adıyaman', code: '02', path: 'M 580 360 L 610 360 L 620 380 L 600 390 L 580 380 Z' },
    { name: 'Afyonkarahisar', code: '03', path: 'M 350 340 L 380 340 L 390 360 L 370 370 L 350 360 Z' },
    { name: 'Ağrı', code: '04', path: 'M 700 300 L 730 300 L 740 320 L 720 330 L 700 320 Z' },
    { name: 'Amasya', code: '05', path: 'M 480 260 L 510 260 L 520 280 L 500 290 L 480 280 Z' },
    { name: 'Ankara', code: '06', path: 'M 420 320 L 460 320 L 470 350 L 440 360 L 420 350 Z' },
    { name: 'Antalya', code: '07', path: 'M 380 420 L 420 420 L 430 450 L 400 460 L 380 450 Z' },
    { name: 'Artvin', code: '08', path: 'M 660 200 L 690 200 L 700 220 L 680 230 L 660 220 Z' },
    { name: 'Aydın', code: '09', path: 'M 280 380 L 310 380 L 320 400 L 300 410 L 280 400 Z' },
    { name: 'Balıkesir', code: '10', path: 'M 280 310 L 320 310 L 330 340 L 300 350 L 280 340 Z' },
    { name: 'Bilecik', code: '11', path: 'M 350 290 L 380 290 L 390 310 L 370 320 L 350 310 Z' },
    { name: 'Bingöl', code: '12', path: 'M 650 320 L 680 320 L 690 340 L 670 350 L 650 340 Z' },
    { name: 'Bitlis', code: '13', path: 'M 680 340 L 710 340 L 720 360 L 700 370 L 680 360 Z' },
    { name: 'Bolu', code: '14', path: 'M 400 270 L 430 270 L 440 290 L 420 300 L 400 290 Z' },
    { name: 'Burdur', code: '15', path: 'M 350 390 L 380 390 L 390 410 L 370 420 L 350 410 Z' },
    { name: 'Bursa', code: '16', path: 'M 320 280 L 360 280 L 370 310 L 340 320 L 320 310 Z' },
    { name: 'Çanakkale', code: '17', path: 'M 220 310 L 260 310 L 270 340 L 240 350 L 220 340 Z' },
    { name: 'Çankırı', code: '18', path: 'M 440 280 L 470 280 L 480 300 L 460 310 L 440 300 Z' },
    { name: 'Çorum', code: '19', path: 'M 480 290 L 520 290 L 530 310 L 500 320 L 480 310 Z' },
    { name: 'Denizli', code: '20', path: 'M 320 370 L 350 370 L 360 390 L 340 400 L 320 390 Z' },
    { name: 'Diyarbakır', code: '21', path: 'M 640 360 L 680 360 L 690 380 L 660 390 L 640 380 Z' },
    { name: 'Edirne', code: '22', path: 'M 220 230 L 250 230 L 260 250 L 240 260 L 220 250 Z' },
    { name: 'Elazığ', code: '23', path: 'M 620 340 L 650 340 L 660 360 L 640 370 L 620 360 Z' },
    { name: 'Erzincan', code: '24', path: 'M 620 280 L 650 280 L 660 300 L 640 310 L 620 300 Z' },
    { name: 'Erzurum', code: '25', path: 'M 660 270 L 700 270 L 710 290 L 680 300 L 660 290 Z' },
    { name: 'Eskişehir', code: '26', path: 'M 370 310 L 410 310 L 420 330 L 390 340 L 370 330 Z' },
    { name: 'Gaziantep', code: '27', path: 'M 580 390 L 620 390 L 630 410 L 600 420 L 580 410 Z' },
    { name: 'Giresun', code: '28', path: 'M 580 230 L 610 230 L 620 250 L 600 260 L 580 250 Z' },
    { name: 'Gümüşhane', code: '29', path: 'M 620 250 L 650 250 L 660 270 L 640 280 L 620 270 Z' },
    { name: 'Hakkari', code: '30', path: 'M 740 380 L 770 380 L 780 400 L 760 410 L 740 400 Z' },
    { name: 'Hatay', code: '31', path: 'M 560 420 L 590 420 L 600 440 L 580 450 L 560 440 Z' },
    { name: 'Isparta', code: '32', path: 'M 360 380 L 390 380 L 400 400 L 380 410 L 360 400 Z' },
    { name: 'Mersin', code: '33', path: 'M 480 400 L 520 400 L 530 420 L 500 430 L 480 420 Z' },
    { name: 'İstanbul', code: '34', path: 'M 280 250 L 310 250 L 320 270 L 300 280 L 280 270 Z' },
    { name: 'İzmir', code: '35', path: 'M 250 350 L 290 350 L 300 380 L 270 390 L 250 380 Z' },
    { name: 'Kars', code: '36', path: 'M 700 230 L 730 230 L 740 250 L 720 260 L 700 250 Z' },
    { name: 'Kastamonu', code: '37', path: 'M 450 240 L 490 240 L 500 260 L 470 270 L 450 260 Z' },
    { name: 'Kayseri', code: '38', path: 'M 500 340 L 540 340 L 550 360 L 520 370 L 500 360 Z' },
    { name: 'Kırklareli', code: '39', path: 'M 240 240 L 270 240 L 280 260 L 260 270 L 240 260 Z' },
    { name: 'Kırşehir', code: '40', path: 'M 470 320 L 500 320 L 510 340 L 490 350 L 470 340 Z' },
    { name: 'Kocaeli', code: '41', path: 'M 320 260 L 350 260 L 360 280 L 340 290 L 320 280 Z' },
    { name: 'Konya', code: '42', path: 'M 410 360 L 460 360 L 470 390 L 430 400 L 410 390 Z' },
    { name: 'Kütahya', code: '43', path: 'M 340 320 L 370 320 L 380 340 L 360 350 L 340 340 Z' },
    { name: 'Malatya', code: '44', path: 'M 590 330 L 630 330 L 640 350 L 610 360 L 590 350 Z' },
    { name: 'Manisa', code: '45', path: 'M 280 330 L 320 330 L 330 360 L 300 370 L 280 360 Z' },
    { name: 'Kahramanmaraş', code: '46', path: 'M 560 370 L 600 370 L 610 390 L 580 400 L 560 390 Z' },
    { name: 'Mardin', code: '47', path: 'M 660 390 L 700 390 L 710 410 L 680 420 L 660 410 Z' },
    { name: 'Muğla', code: '48', path: 'M 280 400 L 320 400 L 330 430 L 300 440 L 280 430 Z' },
    { name: 'Muş', code: '49', path: 'M 690 320 L 720 320 L 730 340 L 710 350 L 690 340 Z' },
    { name: 'Nevşehir', code: '50', path: 'M 480 350 L 510 350 L 520 370 L 500 380 L 480 370 Z' },
    { name: 'Niğde', code: '51', path: 'M 490 370 L 520 370 L 530 390 L 510 400 L 490 390 Z' },
    { name: 'Ordu', code: '52', path: 'M 550 240 L 580 240 L 590 260 L 570 270 L 550 260 Z' },
    { name: 'Rize', code: '53', path: 'M 640 220 L 670 220 L 680 240 L 660 250 L 640 240 Z' },
    { name: 'Sakarya', code: '54', path: 'M 350 270 L 380 270 L 390 290 L 370 300 L 350 290 Z' },
    { name: 'Samsun', code: '55', path: 'M 510 240 L 560 240 L 570 260 L 530 270 L 510 260 Z' },
    { name: 'Siirt', code: '56', path: 'M 680 370 L 710 370 L 720 390 L 700 400 L 680 390 Z' },
    { name: 'Sinop', code: '57', path: 'M 480 210 L 510 210 L 520 230 L 500 240 L 480 230 Z' },
    { name: 'Sivas', code: '58', path: 'M 540 300 L 590 300 L 600 320 L 560 330 L 540 320 Z' },
    { name: 'Tekirdağ', code: '59', path: 'M 250 260 L 280 260 L 290 280 L 270 290 L 250 280 Z' },
    { name: 'Tokat', code: '60', path: 'M 520 280 L 560 280 L 570 300 L 540 310 L 520 300 Z' },
    { name: 'Trabzon', code: '61', path: 'M 610 220 L 650 220 L 660 240 L 630 250 L 610 240 Z' },
    { name: 'Tunceli', code: '62', path: 'M 620 310 L 650 310 L 660 330 L 640 340 L 620 330 Z' },
    { name: 'Şanlıurfa', code: '63', path: 'M 610 380 L 650 380 L 660 400 L 630 410 L 610 400 Z' },
    { name: 'Uşak', code: '64', path: 'M 320 350 L 350 350 L 360 370 L 340 380 L 320 370 Z' },
    { name: 'Van', code: '65', path: 'M 720 340 L 760 340 L 770 360 L 740 370 L 720 360 Z' },
    { name: 'Yozgat', code: '66', path: 'M 490 310 L 530 310 L 540 330 L 510 340 L 490 330 Z' },
    { name: 'Zonguldak', code: '67', path: 'M 400 240 L 430 240 L 440 260 L 420 270 L 400 260 Z' },
    { name: 'Aksaray', code: '68', path: 'M 460 360 L 490 360 L 500 380 L 480 390 L 460 380 Z' },
    { name: 'Bayburt', code: '69', path: 'M 640 260 L 670 260 L 680 280 L 660 290 L 640 280 Z' },
    { name: 'Karaman', code: '70', path: 'M 450 390 L 480 390 L 490 410 L 470 420 L 450 410 Z' },
    { name: 'Kırıkkale', code: '71', path: 'M 460 300 L 490 300 L 500 320 L 480 330 L 460 320 Z' },
    { name: 'Batman', code: '72', path: 'M 670 360 L 700 360 L 710 380 L 690 390 L 670 380 Z' },
    { name: 'Şırnak', code: '73', path: 'M 710 390 L 740 390 L 750 410 L 730 420 L 710 410 Z' },
    { name: 'Bartın', code: '74', path: 'M 420 240 L 450 240 L 460 260 L 440 270 L 420 260 Z' },
    { name: 'Ardahan', code: '75', path: 'M 690 230 L 720 230 L 730 250 L 710 260 L 690 250 Z' },
    { name: 'Iğdır', code: '76', path: 'M 730 280 L 760 280 L 770 300 L 750 310 L 730 300 Z' },
    { name: 'Yalova', code: '77', path: 'M 310 270 L 330 270 L 340 285 L 325 295 L 310 285 Z' },
    { name: 'Karabük', code: '78', path: 'M 420 250 L 450 250 L 460 270 L 440 280 L 420 270 Z' },
    { name: 'Kilis', code: '79', path: 'M 590 400 L 610 400 L 620 415 L 605 425 L 590 415 Z' },
    { name: 'Osmaniye', code: '80', path: 'M 550 400 L 580 400 L 590 420 L 570 430 L 550 420 Z' },
    { name: 'Düzce', code: '81', path: 'M 380 260 L 410 260 L 420 280 L 400 290 L 380 280 Z' },
  ];

  const getCityColor = (cityCode: string) => {
    const data = cityData[cityCode];
    if (!data || data.projects === 0) {
      return 'rgba(184, 145, 80, 0.1)'; // Muted gold low opacity
    }
    if (data.projects < 5) {
      return 'rgba(184, 145, 80, 0.3)';
    }
    if (data.projects < 15) {
      return 'rgba(184, 145, 80, 0.5)';
    }
    return 'rgba(184, 145, 80, 0.8)';
  };

  const getCityStroke = (cityCode: string) => {
    const cityKey = `${cityCode}`;
    return hoveredCity === cityKey ? 'rgba(184, 145, 80, 1)' : 'rgba(184, 145, 80, 0.3)';
  };

  const getCityStrokeWidth = (cityCode: string) => {
    const cityKey = `${cityCode}`;
    return hoveredCity === cityKey ? '2' : '1';
  };

  return (
    <svg
      viewBox="0 0 1000 600"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid Background */}
      <defs>
        <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(184, 145, 80, 0.05)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#map-grid)" />

      {/* City Paths */}
      {cities.map((city) => {
        const cityKey = `${city.code}`;
        const data = cityData[cityKey] || { projects: 0, type: '' };

        return (
          <g key={city.code}>
            <motion.path
              d={city.path}
              fill={getCityColor(city.code)}
              stroke={getCityStroke(city.code)}
              strokeWidth={getCityStrokeWidth(city.code)}
              className="cursor-pointer transition-all duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: parseInt(city.code) * 0.01 }}
              onMouseEnter={() => setHoveredCity?.(cityKey)}
              onMouseLeave={() => setHoveredCity?.(null)}
              onClick={() => onCityClick?.(city.name, city.code)}
              whileHover={{
                scale: 1.05,
                filter: 'drop-shadow(0 0 8px rgba(184, 145, 80, 0.6))'
              }}
            />
            {/* City Name Label (for cities with projects) */}
            {data.projects > 0 && (
              <text
                x={city.path.match(/M (\d+)/)?.[1]}
                y={city.path.match(/M \d+ (\d+)/)?.[1]}
                className="text-xs font-manrope fill-white/40 pointer-events-none select-none"
                textAnchor="middle"
                dy="-5"
              >
                {city.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default TurkeySVGMap;
