'use client';

import { useEffect, useRef, useState } from 'react';
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
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    // SVG dosyasını yükle
    fetch('/turkey-map-new.svg')
      .then(res => res.text())
      .then(text => setSvgContent(text))
      .catch(err => console.error('SVG yükleme hatası:', err));
  }, []);

  useEffect(() => {
    if (!svgRef.current || !svgContent) return;

    // SVG içindeki tüm <g> elementlerini bul (her il bir <g> elementi)
    const cityGroups = svgRef.current.querySelectorAll('g[data-plakakodu]');

    cityGroups.forEach((group) => {
      const cityCode = group.getAttribute('data-plakakodu');
      const cityName = group.getAttribute('data-iladi');

      if (!cityCode || !cityName) return;

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

      // <g> içindeki path elementini bul ve stil uygula
      const path = group.querySelector('path');
      if (path) {
        path.style.fill = fillColor;
        path.style.stroke = hoveredCity === cityCode ? 'rgba(184, 145, 80, 1)' : 'rgba(184, 145, 80, 0.3)';
        path.style.strokeWidth = hoveredCity === cityCode ? '2' : '0.5';
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.2s ease';
      }

      // Event listeners <g> elementine ekle
      const handleMouseEnter = () => setHoveredCity?.(cityCode);
      const handleMouseLeave = () => setHoveredCity?.(null);
      const handleClick = () => onCityClick?.(cityName, cityCode);

      group.addEventListener('mouseenter', handleMouseEnter);
      group.addEventListener('mouseleave', handleMouseLeave);
      group.addEventListener('click', handleClick);

      // Cleanup
      return () => {
        group.removeEventListener('mouseenter', handleMouseEnter);
        group.removeEventListener('mouseleave', handleMouseLeave);
        group.removeEventListener('click', handleClick);
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
        viewBox="0 0 1007.478 527.323"
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: svgContent.replace(/<svg[^>]*>|<\/svg>/g, '') }}
      />
    </motion.div>
  );
};

export default TurkeySVGMap;
