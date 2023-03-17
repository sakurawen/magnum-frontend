/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:9009/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
