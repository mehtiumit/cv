import type { MetadataRoute } from 'next'
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  }
}


