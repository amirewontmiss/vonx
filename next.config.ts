
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint from crashing build
  },
  reactStrictMode: true,
}

export default nextConfig

