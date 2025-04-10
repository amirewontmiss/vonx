
// next.config.ts
import type { NextConfig } from 'next'
import { NextResponse } from 'next/server'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint build errors on Vercel
  },
}

export default nextConfig

