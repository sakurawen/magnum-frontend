/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['@tremor/react'],
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:9009/:path*',
        },
        {
          source: '/openai/:path*',
          destination: 'http://localhost:3670/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
