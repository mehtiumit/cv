import '../styles/globals.css'
import ClientLayout from '../components/ClientLayout'

export const metadata = {
  title: 'Mehti Ümit Yıldırım',
  description: 'My Personal Website',
  keywords: 'web geliştirme, yazılım mühendisi, portfolio',
  author: 'Mehti Ümit Yıldırım',
  openGraph: {
    title: 'Mehti Ümit Yıldırım',
    description: 'Mehti Ümit Yıldırım CV',
    type: 'website',
    locale: 'tr_TR',
  },
  robots: 'index, follow'
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>
          <main className="main-container">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  )
} 