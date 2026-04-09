import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Resultados das Loterias";
  const game = searchParams.get("game") || "";
  const numbers = searchParams.get("numbers") || "";
  const color = searchParams.get("color") || "#059669";

  const numberList = numbers
    ? numbers.split(",").map((n) => n.trim())
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Site name */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 600,
            }}
          >
            Lotofácil Resultado
          </div>
        </div>

        {/* Game badge */}
        {game && (
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 9999,
              padding: "8px 24px",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 22, color: "white", fontWeight: 500 }}>
              {game}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Number circles */}
        {numberList.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: 900,
            }}
          >
            {numberList.map((num, i) => (
              <div
                key={i}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 700,
                  color: color,
                }}
              >
                {num}
              </div>
            ))}
          </div>
        )}

        {/* Site URL at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          lotofacilresultado.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
