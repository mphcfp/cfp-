import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...(process.env.AURA_STATIC_EXPORT === '1' ? { output: 'export' as const } : {}),
  images: { unoptimized: true },
  poweredByHeader: false,
  trailingSlash: true,
};

export default nextConfig;
