'use client'

import { useState, useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import { useTranslation } from '../context/LanguageContext'
import styles from '../styles/ProjectsGrid.module.css'

interface ProjectsGridProps {
  projects: Array<any>
  activeFilter: 'all' | 'web' | 'android' | 'ios'
  isLoading: boolean
}

const ProjectsGrid = ({ projects, activeFilter, isLoading }: ProjectsGridProps) => {
  const { t } = useTranslation()
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const announcementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => {
      const filtered = activeFilter === 'all' ? projects : projects.filter((project) => project.platform === activeFilter)
      setFilteredProjects(filtered)
      setIsTransitioning(false)
      if (announcementRef.current) {
        const filterLabel = getFilterLabel(activeFilter, t)
        const count = filtered.length
        announcementRef.current.textContent = `${filterLabel} ${t('projects.filterApplied')} ${count} ${t('projects.projectsShowing')}`
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [projects, activeFilter, t])

  if (isLoading) {
    return (
      <div className={styles.gridContainer} role="status" aria-live="polite">
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} aria-hidden="true"></div>
          <p className={styles.loadingText}>{t('projects.loading')}</p>
        </div>
        <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
      </div>
    )
  }

  if (!isTransitioning && filteredProjects.length === 0) {
    return (
      <div className={styles.gridContainer} role="status" aria-live="polite">
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} role="img" aria-label={t('projects.emptyFolderIcon')}>
            📂
          </div>
          <h3 className={styles.emptyTitle}>{t('projects.noProjectsFound')}</h3>
          <p className={styles.emptyDescription}>
            {activeFilter === 'all' ? t('projects.noActiveProjects') : `${getFilterLabel(activeFilter, t)} ${t('projects.noProjectsInCategory')}`}
          </p>
        </div>
        <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
      </div>
    )
  }

  return (
    <div className={styles.gridContainer}>
      <div
        ref={gridRef}
        className={`${styles.projectsGrid} ${isTransitioning ? styles.transitioning : ''}`}
        role="grid"
        aria-label={`${t('projects.projectList')}- ${filteredProjects.length}`}
      >
        {filteredProjects.map((project, index) => (
          <div key={project.id} className={styles.gridItem} role="gridcell" style={{ ['--animation-delay' as any]: `${index * 0.1}s` }}>
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
      <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true"></div>
    </div>
  )
}

const getFilterLabel = (filter: ProjectsGridProps['activeFilter'], t: (key: string) => string) => {
  if (filter === 'all') {
    return t('projects.platform.all')
  }
  return t(`projects.platform.${filter}`) || filter
}

export default ProjectsGrid


