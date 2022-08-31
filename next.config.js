/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'], // Only run ESLint on these directories during production builds (next build)
  }
};
