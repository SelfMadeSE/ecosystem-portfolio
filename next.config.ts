import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizePackageImports: ['lucide-react'] },
  outputFileTracingRoot: path.join(__dirname),
}

export default nextConfig
