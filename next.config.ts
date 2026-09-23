import type { NextConfig } from "next";

// Team portraits are uploaded to Django, so next/image must be told the API is
// an allowed source. Derived from the same env var the data layer uses.
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001");

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP for browsers without it; both beat the source JPEG/PNG.
    formats: ["image/avif", "image/webp"],
    // Next 16 refuses to optimize images from hosts that resolve to a private IP
    // (an SSRF guard). In development the API is localhost, so allow it there
    // only — in production the API is a real domain and the guard still applies.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
