import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages; no server, so images ship as-is.
  // Cache Components is off because it implies PPR, which export mode rejects.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
