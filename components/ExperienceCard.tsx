'use client'

import { useState } from 'react'
import { useTranslation } from '../context/LanguageContext'
import styles from '../styles/ExperienceCard.module.css'

interface ExperienceCardProps {
  company: string
  workType: string
  position: string
  startDate: string
  endDate: string
  bulletPoints: string[]
}

const calculateDuration = (startDate: string, endDate: string, t: (k: string, f?: string) => string): string => {
  const start = new Date(startDate)
  const end = endDate === 'Present' || endDate === 'Günümüz' ? new Date() : new Date(endDate)

  const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

  if (monthDiff >= 12) {
    const years = Math.floor(monthDiff / 12)
    const months = monthDiff % 12

    if (months > 0) {
      return `${years} ${t('common.year', 'year')}${years > 1 ? t('common.pluralSuffix', 's') : ''} ${months} ${t('common.month', 'month')}${months > 1 ? t('common.pluralSuffix', 's') : ''}`
    } else {
      return `${years} ${t('common.year', 'year')}${years > 1 ? t('common.pluralSuffix', 's') : ''}`
    }
  }

  return `${monthDiff} ${t('common.month', 'month')}${monthDiff > 1 ? t('common.pluralSuffix', 's') : ''}`
}

export default function ExperienceCard({ company, workType, position, startDate, endDate, bulletPoints }: ExperienceCardProps) {
  const { t } = useTranslation()
  const [showDuration, setShowDuration] = useState(false)

  return (
    <div className={styles['experience-card']}>
      <div className={styles['card-header']}>
        <div className={styles['company-info']}>
          <span className={styles.company}>{company}</span>
          <span className={styles.separator}>/</span>
          <span className={styles['work-type']}>{workType}</span>
        </div>
        <div
          className={styles['date-range']}
          onMouseEnter={() => setShowDuration(true)}
          onMouseLeave={() => setShowDuration(false)}
        >
          {startDate} - {endDate}
          {showDuration && (
            <div className={styles['duration-tooltip']}>
              {calculateDuration(startDate, endDate, t)}
            </div>
          )}
        </div>
      </div>
      <h4 className={styles.position}>{position}</h4>
      <ul className={styles['bullet-list']}>
        {bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  )
}


