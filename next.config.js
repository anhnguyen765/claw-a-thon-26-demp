/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/claw-a-thon-26-demp',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
