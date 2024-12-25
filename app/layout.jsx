import '../styles/globals.css'

export const metadata = {
  title: 'CV Sitesi',
  description: 'Kişisel CV Sitesi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <main style={{ 
          maxWidth: '100vw', 
          overflow: 'hidden',
          backgroundColor: '#fff',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {children}
        </main>
      </body>
    </html>
  )
} 