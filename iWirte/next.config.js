/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: true,
  },
  webpack: (config, { isServer }) => {
    // Handle react-quill for SSR compatibility
    if (isServer) {
      config.externals.push({
        'react-quill': 'react-quill',
      });
    }
    return config;
  },
};

module.exports = nextConfig;
