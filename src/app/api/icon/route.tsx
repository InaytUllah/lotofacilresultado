import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sizeParam = parseInt(searchParams.get('size') || '192', 10);
  const size = sizeParam === 512 ? 512 : 192;

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
          borderRadius: size * 0.2,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: size * 0.03,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: size * 0.04,
            }}
          >
            {[7, 14, 21].map((n) => (
              <div
                key={n}
                style={{
                  width: size * 0.16,
                  height: size * 0.16,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: size * 0.08,
                  fontWeight: 700,
                  color: '#059669',
                }}
              >
                {n}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: size * 0.22,
              fontWeight: 700,
              color: 'white',
              display: 'flex',
              marginTop: size * 0.02,
            }}
          >
            LR
          </div>
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
