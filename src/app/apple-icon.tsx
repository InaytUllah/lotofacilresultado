import { ImageResponse } from 'next/og';

// Required under output: 'export' so /apple-icon is emitted as a static file.
export const dynamic = 'force-static';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: 36,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 6,
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#059669',
                }}
              >
                {n * 7}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: 'white',
              display: 'flex',
              marginTop: 4,
            }}
          >
            LR
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
