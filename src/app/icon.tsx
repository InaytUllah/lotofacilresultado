import { ImageResponse } from 'next/og';

// Required under output: 'export' so /icon is emitted as a static file.
export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #059669, #047857)',
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'white',
            display: 'flex',
          }}
        >
          L
        </div>
      </div>
    ),
    { ...size }
  );
}
