import type { NextConfig } from "next";

const isStaticExport = process.env.BISP_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  reactStrictMode: true,
  ...(isStaticExport
    ? {
        distDir: "out",
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
