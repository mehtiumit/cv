'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../context/LanguageContext'
import styles from '../styles/ProjectFilter.module.css'
import { platformOptions } from '../data/projects'

interface ProjectFilterProps {
  activeFilter: 'all' | 'web' | 'android' | 'ios'
  onFilterChange: (value: ProjectFilterProps['activeFilter']) => void
}

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  const { t } = useTranslation()
  const [isAnimating, setIsAnimating] = useState(false)
  const [, setFocusedIndex] = useState(-1)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleFilterClick = (filterValue: ProjectFilterProps['activeFilter']) => {
    if (filterValue === activeFilter || isAnimating) return
    setIsAnimating(true)
    onFilterChange(filterValue)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleKeyDown = (event: React.KeyboardEvent, filterValue: ProjectFilterProps['activeFilter'], index: number) => {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        event.preventDefault()
        handleFilterClick(filterValue)
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        const prevIndex = index > 0 ? index - 1 : platformOptions.length - 1
        buttonRefs.current[prevIndex]?.focus()
        setFocusedIndex(prevIndex)
        break
      }
      case 'ArrowRight': {
        event.preventDefault()
        const nextIndex = index < platformOptions.length - 1 ? index + 1 : 0
        buttonRefs.current[nextIndex]?.focus()
        setFocusedIndex(nextIndex)
        break
      }
      case 'Home': {
        event.preventDefault()
        buttonRefs.current[0]?.focus()
        setFocusedIndex(0)
        break
      }
      case 'End': {
        event.preventDefault()
        const lastIndex = platformOptions.length - 1
        buttonRefs.current[lastIndex]?.focus()
        setFocusedIndex(lastIndex)
        break
      }
    }
  }

  useEffect(() => {
    const activeIndex = platformOptions.findIndex((option) => option.value === activeFilter)
    setFocusedIndex(activeIndex)
  }, [activeFilter])

  return (
    <div className={styles.filterContainer}>
      <div ref={containerRef} className={styles.filterButtons} role="tablist" aria-label={t('projects.filterHeading')}>
        {platformOptions.map((option, index) => (
          <button
            key={option.value}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={`${styles.filterButton} ${activeFilter === option.value ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
            onClick={() => handleFilterClick(option.value as ProjectFilterProps['activeFilter'])}
            onKeyDown={(e) => handleKeyDown(e, option.value as ProjectFilterProps['activeFilter'], index)}
            role="tab"
            tabIndex={activeFilter === option.value ? 0 : -1}
            aria-selected={activeFilter === option.value}
            aria-controls={`projects-panel-${option.value}`}
            aria-label={`${t(`projects.platform.${option.value}`)} ${t('projects.showSelectedProjects')}`}
            id={`filter-${option.value}`}
          >
            <span className={styles.buttonText}>{t(`projects.platform.${option.value}`)}</span>
            <span className={styles.buttonIndicator} aria-hidden="true"></span>
          </button>
        ))}
      </div>
    </div>
  )
}


