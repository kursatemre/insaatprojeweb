declare module 'react-turkey-map' {
  import { FC } from 'react';

  interface CityData {
    name: string;
    plateNumber: string;
    [key: string]: any;
  }

  interface TurkeyMapProps {
    customStyle?: {
      idleColor?: string;
      hoverColor?: string;
      activeColor?: string;
      [key: string]: any;
    };
    cityWrapper?: (cityComponent: any, cityData: CityData) => JSX.Element;
    onClick?: (city: CityData) => void;
    onHover?: (city: CityData) => void;
    hoverable?: boolean;
    [key: string]: any;
  }

  const TurkeyMap: FC<TurkeyMapProps>;
  export default TurkeyMap;
}
