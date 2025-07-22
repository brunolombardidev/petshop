/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'bpetback.atrativozap.com.br'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'bpetback.atrativozap.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bpetback.atrativozap.com.br',
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
