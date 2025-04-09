import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.kym-cdn.com",
      },
    ],
  },
};

export default nextConfig;
