// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 💥 This line disables build-breaking ESLint checks
  },
}

export default nextConfig

