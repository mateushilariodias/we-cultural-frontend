import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    // WARNING: Isso permite que o build seja concluído mesmo com erros de ESLint
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
