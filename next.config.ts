
// next.config.ts
import type { NextConfig } from 'next'
import { NextResponse } from 'next/server'


const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ...other config
}

export default nextConfig


