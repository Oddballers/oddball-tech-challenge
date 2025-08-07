import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    skipTrailingSlashRedirect: true,
  },
  // Skip prerendering pages that have Firebase dependencies
  generateBuildId: async () => {
    return 'build-' + Date.now().toString()
  },
};

export default nextConfig;
