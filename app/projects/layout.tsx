import type { Metadata } from 'next'
import { cookies, headers } from 'next/headers'

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const preferred = cookieStore.get('preferred-language')?.value
  const hdrs = await headers()
  const acceptLang = hdrs.get('accept-language') || ''
  const isTR = preferred === 'tr' || acceptLang.toLowerCase().startsWith('tr')

  const title = isTR ? 'Projelerim | Mehti Ümit Yıldırım' : 'My Projects | Mehti Ümit Yıldırım'
  const description = isTR
    ? 'Web, Android ve iOS platformlarında geliştirdiğim projeler.'
    : 'Projects I developed for Web, Android and iOS.'

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: isTR
      ? ['projeler', 'web geliştirme', 'android geliştirme', 'ios geliştirme', 'react', 'next.js']
      : ['projects', 'web development', 'android development', 'ios development', 'react', 'next.js'],
    authors: [{ name: 'Mehti Ümit Yıldırım' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isTR ? 'tr_TR' : 'en_US',
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


