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

  async redirects() {
    return [
      {
        source: '/kapcsolat',
        destination: '/hu/kapcsolat',
        permanent: true,
      },
      {
        source: '/projektek',
        destination: '/hu/projektek',
        permanent: true,
      },
      {
        source: '/szolgaltatasok',
        destination: '/hu/szolgaltatasok',
        permanent: true,
      },
      {
        source: '/projektek/:slug',
        destination: '/hu/projektek/:slug',
        permanent: true,
      },
      {
        source: '/szolgaltatasok/:slug',
        destination: '/hu/szolgaltatasok/:slug',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/en/projects',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/projects/:slug',
        destination: '/en/projects/:slug',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/en/services/:slug',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      { source: '/hu/kapcsolat', destination: '/hu/contact' },
      { source: '/hu/projektek', destination: '/hu/projects' },
      { source: '/hu/szolgaltatasok', destination: '/hu/services' },
      { source: '/hu/projektek/:slug', destination: '/hu/projects/:slug' },
      { source: '/hu/szolgaltatasok/:slug', destination: '/hu/services/:slug' },
    ]
  },
}

export default withPayload(nextConfig)
