'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TurkeySVGMapProps {
  onCityClick?: (cityName: string, cityCode: string) => void;
  cityData?: Record<string, { projects: number; type: string }>;
  hoveredCity?: string | null;
  setHoveredCity?: (city: string | null) => void;
}

// İl kod ve isim eşleştirmesi
const cityCodeToName: Record<string, string> = {
  '01': 'Adana', '02': 'Adıyaman', '03': 'Afyonkarahisar', '04': 'Ağrı',
  '05': 'Amasya', '06': 'Ankara', '07': 'Antalya', '08': 'Artvin',
  '09': 'Aydın', '10': 'Balıkesir', '11': 'Bilecik', '12': 'Bingöl',
  '13': 'Bitlis', '14': 'Bolu', '15': 'Burdur', '16': 'Bursa',
  '17': 'Çanakkale', '18': 'Çankırı', '19': 'Çorum', '20': 'Denizli',
  '21': 'Diyarbakır', '22': 'Edirne', '23': 'Elazığ', '24': 'Erzincan',
  '25': 'Erzurum', '26': 'Eskişehir', '27': 'Gaziantep', '28': 'Giresun',
  '29': 'Gümüşhane', '30': 'Hakkari', '31': 'Hatay', '32': 'Isparta',
  '33': 'Mersin', '34': 'İstanbul', '35': 'İzmir', '36': 'Kars',
  '37': 'Kastamonu', '38': 'Kayseri', '39': 'Kırklareli', '40': 'Kırşehir',
  '41': 'Kocaeli', '42': 'Konya', '43': 'Kütahya', '44': 'Malatya',
  '45': 'Manisa', '46': 'Kahramanmaraş', '47': 'Mardin', '48': 'Muğla',
  '49': 'Muş', '50': 'Nevşehir', '51': 'Niğde', '52': 'Ordu',
  '53': 'Rize', '54': 'Sakarya', '55': 'Samsun', '56': 'Siirt',
  '57': 'Sinop', '58': 'Sivas', '59': 'Tekirdağ', '60': 'Tokat',
  '61': 'Trabzon', '62': 'Tunceli', '63': 'Şanlıurfa', '64': 'Uşak',
  '65': 'Van', '66': 'Yozgat', '67': 'Zonguldak', '68': 'Aksaray',
  '69': 'Bayburt', '70': 'Karaman', '71': 'Kırıkkale', '72': 'Batman',
  '73': 'Şırnak', '74': 'Bartın', '75': 'Ardahan', '76': 'Iğdır',
  '77': 'Yalova', '78': 'Karabük', '79': 'Kilis', '80': 'Osmaniye',
  '81': 'Düzce'
};

const TurkeySVGMap: React.FC<TurkeySVGMapProps> = ({
  onCityClick,
  cityData = {},
  hoveredCity,
  setHoveredCity
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    // SVG dosyasını yükle
    fetch('/turkey-map.svg')
      .then(res => res.text())
      .then(text => setSvgContent(text))
      .catch(err => console.error('SVG yükleme hatası:', err));
  }, []);

  useEffect(() => {
    if (!svgRef.current || !svgContent) return;

    // SVG içindeki tüm path elementlerini bul
    const paths = svgRef.current.querySelectorAll('path');

    paths.forEach((path) => {
      const pathId = path.getAttribute('id');
      if (!pathId) return;

      // ID'den il kodunu çıkar (örn: "TR-01" -> "01")
      const cityCode = pathId.replace('TR-', '');
      if (!cityCodeToName[cityCode]) return;

      const cityName = cityCodeToName[cityCode];
      const data = cityData[cityCode];

      // Renk belirleme
      let fillColor = 'rgba(184, 145, 80, 0.1)';
      if (data && data.projects > 0) {
        if (data.projects < 5) {
          fillColor = 'rgba(184, 145, 80, 0.3)';
        } else if (data.projects < 15) {
          fillColor = 'rgba(184, 145, 80, 0.5)';
        } else {
          fillColor = 'rgba(184, 145, 80, 0.8)';
        }
      }

      // Stil uygula
      path.style.fill = fillColor;
      path.style.stroke = hoveredCity === cityCode ? 'rgba(184, 145, 80, 1)' : 'rgba(184, 145, 80, 0.3)';
      path.style.strokeWidth = hoveredCity === cityCode ? '2' : '0.5';
      path.style.cursor = 'pointer';
      path.style.transition = 'all 0.2s ease';

      // Event listeners
      const handleMouseEnter = () => setHoveredCity?.(cityCode);
      const handleMouseLeave = () => setHoveredCity?.(null);
      const handleClick = () => onCityClick?.(cityName, cityCode);

      path.addEventListener('mouseenter', handleMouseEnter);
      path.addEventListener('mouseleave', handleMouseLeave);
      path.addEventListener('click', handleClick);

      // Cleanup
      return () => {
        path.removeEventListener('mouseenter', handleMouseEnter);
        path.removeEventListener('mouseleave', handleMouseLeave);
        path.removeEventListener('click', handleClick);
      };
    });
  }, [svgContent, cityData, hoveredCity, onCityClick, setHoveredCity]);

  if (!svgContent) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-muted-gold">Harita yükleniyor...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 700"
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: svgContent.replace(/<svg[^>]*>|<\/svg>/g, '') }}
      />
    </motion.div>
  );
};

export default TurkeySVGMap;
