import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.188'],
};

export default nextConfig;
