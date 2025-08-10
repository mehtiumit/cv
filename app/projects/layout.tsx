import type { Metadata } from 'next'
export const dynamic = 'force-static'

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  // Statik export için istek bağlamına bağlı olmadan metadata üret
  const title = 'My Projects | Mehti Ümit Yıldırım'
  const description = 'Projects I developed for Web, Android and iOS.'

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: ['projects', 'web development', 'android development', 'ios development', 'react', 'next.js'],
    authors: [{ name: 'Mehti Ümit Yıldırım' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: '/projects',
      siteName: 'Mehti Ümit Yıldırım',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: 'index, follow',
    alternates: {
      canonical: '/projects',
      languages: {
        en: '/projects',
        tr: '/projects',
        'x-default': '/projects',
      },
    },
  }
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}


