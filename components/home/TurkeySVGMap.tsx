'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import with no SSR to avoid hydration issues
const TurkeyMap = dynamic(() => import('react-turkey-map'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center">
    <div className="text-muted-gold">Harita yükleniyor...</div>
  </div>
});

interface TurkeySVGMapProps {
  onCityClick?: (cityName: string, cityCode: string) => void;
  cityData?: Record<string, { projects: number; type: string }>;
  hoveredCity?: string | null;
  setHoveredCity?: (city: string | null) => void;
}

// İl isimlerini kodlara eşleme
const cityNameToCode: Record<string, string> = {
  'Adana': '01', 'Adıyaman': '02', 'Afyonkarahisar': '03', 'Ağrı': '04',
  'Amasya': '05', 'Ankara': '06', 'Antalya': '07', 'Artvin': '08',
  'Aydın': '09', 'Balıkesir': '10', 'Bilecik': '11', 'Bingöl': '12',
  'Bitlis': '13', 'Bolu': '14', 'Burdur': '15', 'Bursa': '16',
  'Çanakkale': '17', 'Çankırı': '18', 'Çorum': '19', 'Denizli': '20',
  'Diyarbakır': '21', 'Edirne': '22', 'Elazığ': '23', 'Erzincan': '24',
  'Erzurum': '25', 'Eskişehir': '26', 'Gaziantep': '27', 'Giresun': '28',
  'Gümüşhane': '29', 'Hakkari': '30', 'Hatay': '31', 'Isparta': '32',
  'Mersin': '33', 'İstanbul': '34', 'İzmir': '35', 'Kars': '36',
  'Kastamonu': '37', 'Kayseri': '38', 'Kırklareli': '39', 'Kırşehir': '40',
  'Kocaeli': '41', 'Konya': '42', 'Kütahya': '43', 'Malatya': '44',
  'Manisa': '45', 'Kahramanmaraş': '46', 'Mardin': '47', 'Muğla': '48',
  'Muş': '49', 'Nevşehir': '50', 'Niğde': '51', 'Ordu': '52',
  'Rize': '53', 'Sakarya': '54', 'Samsun': '55', 'Siirt': '56',
  'Sinop': '57', 'Sivas': '58', 'Tekirdağ': '59', 'Tokat': '60',
  'Trabzon': '61', 'Tunceli': '62', 'Şanlıurfa': '63', 'Uşak': '64',
  'Van': '65', 'Yozgat': '66', 'Zonguldak': '67', 'Aksaray': '68',
  'Bayburt': '69', 'Karaman': '70', 'Kırıkkale': '71', 'Batman': '72',
  'Şırnak': '73', 'Bartın': '74', 'Ardahan': '75', 'Iğdır': '76',
  'Yalova': '77', 'Karabük': '78', 'Kilis': '79', 'Osmaniye': '80',
  'Düzce': '81'
};

const TurkeySVGMap: React.FC<TurkeySVGMapProps> = ({
  onCityClick,
  cityData = {},
  hoveredCity,
  setHoveredCity
}) => {
  const [hoveredCityName, setHoveredCityName] = useState<string>('');

  const getCityColor = (cityName: string) => {
    const cityCode = cityNameToCode[cityName];
    if (!cityCode) return 'rgba(184, 145, 80, 0.1)';

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

  const handleCityClick = (cityName: string) => {
    const cityCode = cityNameToCode[cityName];
    if (cityCode && onCityClick) {
      onCityClick(cityName, cityCode);
    }
  };

  const handleHover = (cityName: string) => {
    const cityCode = cityNameToCode[cityName];
    if (cityCode) {
      setHoveredCity?.(cityCode);
      setHoveredCityName(cityName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCity?.(null);
    setHoveredCityName('');
  };

  return (
    <div className="w-full h-full">
      <TurkeyMap
        customStyle={{
          idleColor: 'rgba(184, 145, 80, 0.1)',
          hoverColor: 'rgba(184, 145, 80, 0.6)',
        }}
        cityWrapper={(cityComponent: any, cityData: any) => {
          const cityName = cityData.name;
          const fillColor = getCityColor(cityName);

          return (
            <g
              onMouseEnter={() => handleHover(cityName)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCityClick(cityName)}
              style={{
                cursor: 'pointer',
                fill: fillColor,
                stroke: hoveredCityName === cityName ? 'rgba(184, 145, 80, 1)' : 'rgba(184, 145, 80, 0.3)',
                strokeWidth: hoveredCityName === cityName ? '2' : '1',
                transition: 'all 0.2s ease'
              }}
            >
              {cityComponent}
            </g>
          );
        }}
      />
    </div>
  );
};

export default TurkeySVGMap;
