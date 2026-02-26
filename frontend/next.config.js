/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // API rewrites (optional)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://your-backend-api.railway.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
