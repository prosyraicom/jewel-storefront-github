export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  output: "export",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
    unoptimized: true,
  },
};
