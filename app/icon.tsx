import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Icon component
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#B89150',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1A1D29',
          fontFamily: 'serif',
          fontWeight: 'bold',
          borderRadius: '50%',
        }}
      >
        <div
          style={{
            background: '#1A1D29',
            width: '87.5%',
            height: '87.5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: '#B89150',
            fontSize: 16,
          }}
        >
          EP
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
