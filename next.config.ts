import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    // ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
  },
};

export default nextConfig;
