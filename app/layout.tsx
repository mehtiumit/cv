import '../styles/globals.css'
import ClientLayout from '../components/ClientLayout'
import DynamicLayout from '../components/DynamicLayout'
import { inter } from './fonts'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import trTranslations from '../data/translations/tr.json'
import enTranslations from '../data/translations/en.json'

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
const enSkills: string[] = Object.values(
  // @ts-expect-error json shape
  (enTranslations?.content?.skills?.techStack as Record<string, { name: string }> | undefined) ?? {}
).map((s) => s.name)
const trSkills: string[] = Object.values(
  // @ts-expect-error json shape
  (trTranslations?.content?.skills?.techStack as Record<string, { name: string }> | undefined) ?? {}
).map((s) => s.name)
const combinedSkillKeywords = Array.from(new Set([...enSkills, ...trSkills]))

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Mehti Ümit Yıldırım',
  description: 'Back-End Developer | .NET Core, Golang, Microservices',
  applicationName: 'Mehti Ümit Yıldırım - Portfolio',
  keywords: [
    'back end developer',
    'backend developer',
    'software engineer',
    '.net core',
    'golang',
    'microservices',
    'portfolio',
    'web geliştirme',
    'yazılım mühendisi',
    ...combinedSkillKeywords,
  ],
  authors: [{ name: 'Mehti Ümit Yıldırım', url: siteUrl }],
  creator: 'Mehti Ümit Yıldırım',
  publisher: 'Mehti Ümit Yıldırım',
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      tr: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Mehti Ümit Yıldırım',
    description: 'Back-End Developer | .NET Core, Golang, Microservices',
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'Mehti Ümit Yıldırım',
    images: [
      {
        url: '/vercel.svg',
        width: 1200,
        height: 630,
        alt: 'Mehti Ümit Yıldırım',
      },
    ],
    localeAlternate: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mehti Ümit Yıldırım',
    description: 'Back-End Developer | .NET Core, Golang, Microservices',
    images: ['/vercel.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <DynamicLayout className={inter.className}>
      {/* Font preloading for better performance */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/** JSON-LD: Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Mehti Ümit Yıldırım',
            jobTitle: 'Back-End Developer',
            email: `mailto:${trTranslations.content?.contact?.email || 'mehtiumityildirim@gmail.com'}`,
            telephone: trTranslations.content?.contact?.phone || '+90 539 387 33 81',
            url: siteUrl,
            address: trTranslations.content?.contact?.location || 'Antalya, Türkiye',
            sameAs: [
              `https://www.linkedin.com/${trTranslations.content?.contact?.linkedin || 'in/mehtiumityildirim'}`,
            ],
            knowsLanguage: ['tr-TR', 'en-US'],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name:
                trTranslations.content?.education?.['akdeniz-university']?.school ||
                'Akdeniz Üniversitesi',
              sameAs: 'https://www.akdeniz.edu.tr/',
            },
          }),
        }}
      />
      {/** JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Mehti Ümit Yıldırım',
            url: siteUrl,
            inLanguage: ['tr-TR', 'en-US'],
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <ClientLayout>
        <main className="main-container">
          {children}
        </main>
      </ClientLayout>
    </DynamicLayout>
  )
}


