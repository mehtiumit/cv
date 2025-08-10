'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import styles from '../styles/Navigation.module.css'

export default function Navigation(): JSX.Element {
  const pathname = usePathname()
  const isProjectsPage = pathname === '/projects'
  const { t } = useTranslation()

  return (
    <nav 
      className={styles.navigation}
      role="navigation"
      aria-label={t('navigation.ariaLabel')}
    >
      <div className={styles.navContent}>
        <LanguageToggle />
        {isProjectsPage ? (
          <Link 
            href="/" 
            className={styles.homeLink}
            aria-label={t('navigation.returnToHome')}
          >
            <span aria-hidden="true">←</span>
            <span>{t('navigation.home')}</span>
          </Link>
        ) : (
          <Link 
            href="/projects" 
            className={styles.projectsLink}
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


