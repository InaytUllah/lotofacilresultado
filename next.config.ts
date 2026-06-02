import type { NextConfig } from "next";

// Static export for Cloudflare Pages free tier (unlimited bandwidth).
// Headers and redirects live in public/_headers and public/_redirects.
// Interactive APIs live in functions/api/* (Cloudflare Pages Functions).

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
