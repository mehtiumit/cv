'use client'

import { useEffect, useState, ReactNode } from 'react'

export default function DynamicLayout({ children, className }: { children: ReactNode; className?: string }) {
  const [language, setLanguage] = useState<'en' | 'tr'>('en')

  useEffect(() => {
    const getInitialLanguage = (): 'en' | 'tr' => {
      try {
        const savedLanguage = localStorage.getItem('preferred-language')
        return savedLanguage === 'tr' ? 'tr' : 'en'
      } catch {
        return 'en'
      }
    }

    const initialLanguage = getInitialLanguage()
    setLanguage(initialLanguage)
    document.documentElement.lang = initialLanguage

    const handleLanguageChange = () => {
      try {
        const currentLanguage = (localStorage.getItem('preferred-language') as 'en' | 'tr') || 'en'
        setLanguage(currentLanguage)
        document.documentElement.lang = currentLanguage
      } catch (err) {
        console.warn('Failed to update language:', err)
      }
    }

    window.addEventListener('storage', handleLanguageChange)
    window.addEventListener('languageChange', handleLanguageChange as EventListener)

    return () => {
      window.removeEventListener('storage', handleLanguageChange)
      window.removeEventListener('languageChange', handleLanguageChange as EventListener)
    }
  }, [])

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}


