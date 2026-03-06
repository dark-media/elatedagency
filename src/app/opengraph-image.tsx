import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Elated Agency - Premium OnlyFans Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #0a0a0c 0%, #141418 50%, #0a0a0c 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(ellipse at 50% 30%, rgba(197,165,90,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              border: "4px solid #c5a55a",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
            }}
          >
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#c5a55a",
                fontFamily: "Georgia, serif",
              }}
            >
              E
            </span>
          </div>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "0.05em",
            }}
          >
            ELATED AGENCY
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#c5a55a",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          The #1 AI-Powered OnlyFans Management Agency
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#b8b8c1",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Earn 3-10x more revenue. Only 20% commission. No contracts. AI-powered 24/7 management.
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 48,
          }}
        >
          {[
            { label: "Revenue Managed", value: "$50M+" },
            { label: "Active Creators", value: "500+" },
            { label: "Avg Growth", value: "5x" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 36, fontWeight: 700, color: "#c5a55a" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 14, color: "#747484", marginTop: 4 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 24,
            fontSize: 16,
            color: "#5d5d6c",
          }}
        >
          elatedagency.com
        </div>
      </div>
    ),
    { ...size }
  );
}
