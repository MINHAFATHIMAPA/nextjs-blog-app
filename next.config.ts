/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;