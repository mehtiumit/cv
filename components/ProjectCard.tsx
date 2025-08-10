'use client'

import { useState } from 'react'
import { FiExternalLink, FiGithub, FiCalendar } from 'react-icons/fi'
import { IoPhonePortraitOutline, IoDesktopOutline, IoPhonePortrait } from 'react-icons/io5'
import styles from '../styles/ProjectCard.module.css'
import { useTranslation } from '../context/LanguageContext'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    purpose?: string
    features?: string[]
    platform: 'web' | 'android' | 'ios'
    technologies: string[]
    link?: string
    githubLink?: string
    featured?: boolean
    completionDate?: string
  }
  index?: number
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const getPlatformIcon = (platform: ProjectCardProps['project']['platform']) => {
    switch (platform) {
      case 'web':
        return <IoDesktopOutline className={styles.platformIcon} />
      case 'android':
        return <IoPhonePortrait className={styles.platformIcon} />
      case 'ios':
        return <IoPhonePortraitOutline className={styles.platformIcon} />
      default:
        return null
    }
  }

  const getPlatformLabel = (platform: ProjectCardProps['project']['platform']) => {
    switch (platform) {
      case 'web':
        return 'Web'
      case 'android':
        return 'Android'
      case 'ios':
        return 'iOS'
      default:
        return platform
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const { t } = useTranslation()

  return (
    <article
      className={styles.projectCard}
      tabIndex={0}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
      aria-describedby={`project-description-${project.id}`}
      style={{ ['--animation-delay' as any]: `${index * 0.1}s` }}
    >
      {/* Platform badge (replaces old featured badge position) */}
      <div
        className={styles.platformBadge}
        role="status"
        aria-label={`${getPlatformLabel(project.platform)} ${t('projects.platformLabels.' + project.platform)}`}
      >
        {getPlatformIcon(project.platform)}
        <span>{getPlatformLabel(project.platform)}</span>
      </div>

      <div className={styles.cardContent}>
        <header className={styles.cardHeader} role="banner">
          <div className={styles.titleSection}>
            <h3 id={`project-title-${project.id}`} className={styles.projectTitle}>
              {project.title}
            </h3>
          </div>
        </header>

        <p id={`project-description-${project.id}`} className={styles.projectDescription}>
          {project.description}
        </p>

        {/* Purpose section removed as requested */}

        {project.features && project.features.length > 0 && (
          <div className={styles.featuresSection}>
            <h4 className={styles.sectionTitle}>Key Features</h4>
            <ul className={styles.featuresList} role="list">
              {(project.features.length > 4
                ? project.features.slice(0, 4)
                : project.features
              ).map((feature, featureIndex) => (
                <li key={featureIndex} className={styles.featureItem} role="listitem">
                  {feature}
                </li>
              ))}
            </ul>
            {project.features.length > 4 && (
              <details className={styles.moreFeatures}>
                <summary className={styles.showMoreButton} aria-label={t('projects.showMore')}>
                  {t('projects.showMore')}
                </summary>
                <ul className={styles.featuresList} role="list">
                  {project.features.slice(4).map((feature, featureIndex) => (
                    <li key={`extra-${featureIndex}`} className={styles.featureItem} role="listitem">
                      {feature}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        <div className={styles.technologiesSection}>
          <div className={styles.technologies} role="list" aria-label={t('projects.technologiesUsed')}>
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className={styles.techTag} role="listitem" aria-label={`Technology: ${tech}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <nav className={styles.linksSection} aria-label={t('projects.projectLinks')}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
              aria-label={`${t('projects.viewProject')} ${project.title} ${t('projects.viewProjectInNewTab')}`}
              onKeyDown={(e) => handleKeyDown(e, () => openLink(project.link!))}
            >
              <FiExternalLink className={styles.linkIcon} aria-hidden="true" />
              <span>{t('projects.viewProject')}</span>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
              aria-label={`${project.title} ${t('projects.viewGithubInNewTab')}`}
              onKeyDown={(e) => handleKeyDown(e, () => openLink(project.githubLink!))}
            >
              <FiGithub className={styles.linkIcon} aria-hidden="true" />
              <span>{t('projects.github')}</span>
            </a>
          )}
        </nav>

        {project.completionDate && (
          <time
            className={styles.completionDate}
            dateTime={project.completionDate}
            aria-label={`${t('projects.projectCompletionDate')} ${project.completionDate}`}
          >
            <FiCalendar className={styles.calendarIcon} aria-hidden="true" />
            {t('projects.completed')}: {project.completionDate}
          </time>
        )}
      </div>
    </article>
  )
}

export default ProjectCard


