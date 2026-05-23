import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "iitb-wustl.org" },
      { protocol: "https", hostname: "c.ndtvimg.com" },
      { protocol: "https", hostname: "mcdonnell.washu.edu" },
      { protocol: "https", hostname: "home.iitd.ac.in" },
      { protocol: "https", hostname: "premi25.iitd.ac.in" },
      { protocol: "https", hostname: "campusutra.com" },
      { protocol: "https", hostname: "www.catalyser.in" },
      { protocol: "https", hostname: "www.bits-pilani.ac.in" },
      { protocol: "https", hostname: "media.collegedekho.com" },
      { protocol: "https", hostname: "www.nitt.edu" },
      { protocol: "https", hostname: "img.collegepravesh.com" },
      { protocol: "https", hostname: "cse.jadavpuruniversity.in" },
    ],
  },
};

export default nextConfig;
