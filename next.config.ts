import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.marketingpuzzle.hu',
        pathname: '/api/media/**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/hu/kapcsolat', destination: '/hu/contact' },
      { source: '/hu/projektek', destination: '/hu/projects' },
      { source: '/hu/szolgaltatasok', destination: '/hu/services' },
      { source: '/kapcsolat', destination: '/hu/contact' },
      { source: '/projektek', destination: '/hu/projects' },
      { source: '/szolgaltatasok', destination: '/hu/services' },
      { source: '/hu/projektek/:slug', destination: '/hu/projects/:slug' },
      { source: '/hu/szolgaltatasok/:slug', destination: '/hu/services/:slug' },
      { source: '/projektek/:slug', destination: '/hu/projects/:slug' },
      { source: '/szolgaltatasok/:slug', destination: '/hu/services/:slug' },
    ]
  },
}

export default withPayload(nextConfig)
