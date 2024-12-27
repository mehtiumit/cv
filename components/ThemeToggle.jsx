'use client'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'
import styles from '../styles/ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button 
      className={styles.themeToggle}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  )
} 