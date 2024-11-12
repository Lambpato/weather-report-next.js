/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
