'use client'
import { useState, useEffect } from 'react'
import styles from '../styles/ScrollProgressBar.module.css'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / total) * 100
      setProgress(progress)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      className={styles.progressBar}
      style={{ width: `${progress}%` }}
    />
  )
} 