import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "linear-gradient(135deg, #c5a55a 0%, #d4af6a 100%)",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#0a0a0c",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
          }}
        >
          E
        </span>
      </div>
    ),
    { ...size }
  );
}
