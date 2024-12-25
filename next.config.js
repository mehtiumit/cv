/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  experimental: {
    optimizeFonts: false
  }
}

module.exports = nextConfig 