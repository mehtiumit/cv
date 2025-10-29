'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Navigation(){
  const pathname = usePathname()
  const isProjectsPage = pathname === '/projects'
  const { t } = useTranslation()

  return (
    <nav
      className="sticky top-0 z-10 bg-background/80 py-4 backdrop-blur-md"
      role="navigation"
      aria-label={t('navigation.ariaLabel')}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <LanguageToggle />
        {isProjectsPage ? (
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-primary"
            aria-label={t('navigation.returnToHome')}
          >
            <span aria-hidden="true">← </span>
            <span>{t('navigation.home')}</span>
          </Link>
        ) : (
          <Link
            href="/projects"
            className="text-sm font-medium text-muted hover:text-primary"
            aria-label={t('navigation.projectsAriaLabel')}
          >
            {t('navigation.projects')}
          </Link>
        )}
        <ThemeToggle />
      </div>
    </nav>
  )
}


