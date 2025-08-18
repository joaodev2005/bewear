import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    domains: ['fsc-projects-static.s3.us-east-1.amazonaws.com'],
  },
};

export default nextConfig;
