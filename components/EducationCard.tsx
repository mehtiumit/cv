'use client'

import { IoSchoolOutline } from 'react-icons/io5'
import { useTranslation, useLanguage } from '../context/LanguageContext'
import { getNestedTranslation } from '../data/translations'

export default function EducationCard() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const edu = getNestedTranslation(language, 'content.education.akdeniz-university') as any

  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-dark-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <IoSchoolOutline className="text-muted" />
          <span className="font-semibold">{edu?.school || 'Akdeniz University'}</span>
          <span className="text-muted">/</span>
          <span className="text-sm text-muted">{edu?.location || 'Antalya'}</span>
        </div>
        <div className="text-sm text-muted">{edu?.period || '2016 - 2020'}</div>
      </div>
      <h4 className="mt-2 text-lg font-semibold">{edu?.degree || 'Management Information Systems'}</h4>
      <p className="mt-2 text-muted">
        {edu?.description || t('content.education.akdeniz-university.description')}
      </p>
    </div>
  )
}


