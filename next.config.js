/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  distDir: ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

module.exports = nextConfig;
