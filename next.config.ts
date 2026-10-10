import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.1.9"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
