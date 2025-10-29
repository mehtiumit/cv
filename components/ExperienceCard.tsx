'use client'

import { useState } from 'react'
import { useTranslation } from '../context/LanguageContext'
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
    <div className="rounded-xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-dark-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{company}</span>
          <span className="text-muted">/</span>
          <span className="text-sm text-muted">{workType}</span>
        </div>
        <div
          className="relative text-sm text-muted"
          onMouseEnter={() => setShowDuration(true)}
          onMouseLeave={() => setShowDuration(false)}
        >
          {startDate} - {endDate}
          {showDuration && (
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white">
              {calculateDuration(startDate, endDate, t)}
            </div>
          )}
        </div>
      </div>
      <h4 className="mt-2 text-lg font-semibold">{position}</h4>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        {bulletPoints.map((point, index) => (
          <li key={index} className="text-muted">{point}</li>
        ))}
      </ul>
    </div>
  )
}


