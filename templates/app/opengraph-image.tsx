import { ImageResponse } from "next/og";
import { palette, ogGradients } from "@/lib/palette";

export const runtime = "edge";
export const alt = "{{BUSINESS_NAME}}";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end",
        width: "100%", height: "100%", padding: "60px",
        background: ogGradients.background,
        color: "white", fontFamily: "sans-serif",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: "-10%", right: "10%", width: "400px", height: "400px",
          background: ogGradients.glow,
          borderRadius: "50%",
        }} />
        <div style={{
          fontSize: 20, fontWeight: 700, letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          color: ogGradients.accentText,
          marginBottom: 16, position: "relative",
        }}>
          {"{{TAGLINE}}"}
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, position: "relative" }}>
          {"{{BUSINESS_NAME}}"}
        </div>
        <div style={{ fontSize: 28, opacity: 0.7, marginTop: 16, position: "relative" }}>
          {"{{LOCATION}}"}
        </div>
      </div>
    ),
    { ...size }
  );
}
