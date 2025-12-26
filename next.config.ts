import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress Vercel instrumentation warnings
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },

  // Experimental features
  experimental: {
    // Disable Vercel feedback widget in development
    instrumentationHook: false,
  },
};

export default nextConfig;
