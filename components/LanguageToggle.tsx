'use client'

import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useLanguage, LANGUAGES } from '../context/LanguageContext'
import styles from '../styles/LanguageToggle.module.css'

const LanguageToggle = () => {
  const { language, toggleLanguage, isLoading } = useLanguage()

  const handleToggle = () => {
    if (isLoading) return
    toggleLanguage()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  if (isLoading) {
    return (
      <div className={styles.languageToggle} aria-hidden="true">
        <div className={styles.loadingIndicator}></div>
      </div>
    )
  }

  return (
    <button
      className={styles.languageToggle}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-label={`Switch to ${language === LANGUAGES.EN ? 'Turkish' : 'English'}`}
      aria-pressed={language === LANGUAGES.TR}
      aria-checked={language === LANGUAGES.TR}
      type="button"
      role="switch"
    >
      <div className={styles.toggleContainer}>
        <span 
          className={`${styles.languageOption} ${language === LANGUAGES.EN ? styles.active : ''}`}
          aria-hidden="true"
        >
          EN
        </span>
        <span 
          className={`${styles.languageOption} ${language === LANGUAGES.TR ? styles.active : ''}`}
          aria-hidden="true"
        >
          TR
        </span>
      </div>

      <span className="sr-only">
        Current language: {language === LANGUAGES.EN ? 'English' : 'Turkish'}. 
        Click to switch to {language === LANGUAGES.EN ? 'Turkish' : 'English'}.
      </span>
    </button>
  )
}

export default LanguageToggle


