import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "iitb-wustl.org" },
      { protocol: "https", hostname: "c.ndtvimg.com" },
      { protocol: "https", hostname: "mcdonnell.washu.edu" },
    ],
  },
};

export default nextConfig;
