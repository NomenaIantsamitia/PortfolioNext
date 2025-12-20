import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '2mb' } // CORRIGEZ CETTE LIGNE AUSSI
  },
  eslint: {
    // Ignorer toutes les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  typescript: {

    ignoreBuildErrors: true,
  }
}

export default nextConfig