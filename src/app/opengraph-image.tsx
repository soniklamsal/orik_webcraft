import { ImageResponse } from "next/og";
import { siteName } from "@/data/site";

// Next serves this at /opengraph-image and adds the og:image and twitter:image
// tags itself, with the right absolute URL and dimensions.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteName} — website design and development`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #00291b 0%, #008454 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, opacity: 0.8 }}>WEBSITE DESIGN &amp; DEVELOPMENT</div>
        <div style={{ fontSize: 86, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>{siteName}</div>
        <div style={{ fontSize: 40, marginTop: 28, opacity: 0.9, maxWidth: 900 }}>
          Websites that work for your business.
        </div>
        <div style={{ display: "flex", marginTop: 48, gap: 20, fontSize: 26, opacity: 0.85 }}>
          <span>Business websites</span>
          <span>·</span>
          <span>Online stores</span>
          <span>·</span>
          <span>Chatbots</span>
        </div>
      </div>
    ),
    size,
  );
}
