'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect, KeyboardEvent } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import styles from '../styles/ThemeToggle.module.css'

export default function ThemeToggle(): JSX.Element {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    const announcement = `Tema ${newTheme === 'dark' ? 'karanlık' : 'aydınlık'} moda değiştirildi`
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(announcement)
      utterance.volume = 0
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }
  
  if (!mounted) {
    return (
      <button 
        className={styles.themeToggle}
        aria-label="Tema değiştir"
        disabled
      >
        <FiMoon />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'
  const currentTheme = isDark ? 'karanlık' : 'aydınlık'
  const nextTheme = isDark ? 'aydınlık' : 'karanlık'
  
  return (
    <button 
      className={styles.themeToggle}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-label={`Temayı ${nextTheme} moda değiştir`}
      aria-pressed={isDark}
      title={`Şu anki tema: ${currentTheme}. ${nextTheme} moda geçmek için tıklayın.`}
      type="button"
    >
      <span aria-hidden="true">
        {isDark ? <FiSun /> : <FiMoon />}
      </span>
      <span className="sr-only">
        {isDark ? 'Aydınlık tema' : 'Karanlık tema'}
      </span>
    </button>
  )
}


