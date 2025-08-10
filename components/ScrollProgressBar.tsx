'use client'
import { useState, useEffect } from 'react'
import styles from '../styles/ScrollProgressBar.module.css'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const value = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(value)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      className={styles.progressBar}
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  )
}


