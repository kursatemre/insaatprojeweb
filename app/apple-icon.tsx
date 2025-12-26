import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Apple Touch Icon component
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: '#B89150',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1A1D29',
          fontFamily: 'serif',
          fontWeight: 'bold',
          borderRadius: '20%',
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
            borderRadius: '15%',
            color: '#B89150',
            fontSize: 90,
            letterSpacing: '2px',
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
