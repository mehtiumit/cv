import type { NextConfig } from 'next'

// Configure GitHub Pages basePath/assetPrefix only during Actions builds
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? ''
const computedBasePath = isGithubActions && repositoryName ? `/${repositoryName}` : undefined
const computedAssetPrefix = computedBasePath ? `${computedBasePath}/` : undefined

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  // Enable static export for GitHub Pages
  output: 'export',
  // Apply basePath and assetPrefix when building on GitHub Actions (project pages)
  ...(computedBasePath
    ? {
        basePath: computedBasePath,
        assetPrefix: computedAssetPrefix as string,
      }
    : {}),
}

export default nextConfig
