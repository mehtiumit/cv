'use client'

import { IoSchoolOutline } from 'react-icons/io5'
import styles from '../styles/EducationCard.module.css'
import { useTranslation, useLanguage } from '../context/LanguageContext'
import { getNestedTranslation } from '../data/translations'

export default function EducationCard() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const edu = getNestedTranslation(language, 'content.education.akdeniz-university') as any

  return (
    <div className={styles['education-card']}>
      <div className={styles['card-header']}>
        <div className={styles['school-info']}>
          <IoSchoolOutline className={styles.icon} />
          <span className={styles.school}>{edu?.school || 'Akdeniz University'}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.location}>{edu?.location || 'Antalya'}</span>
        </div>
        <div className={styles.period}>{edu?.period || '2016 - 2020'}</div>
      </div>
      <h4 className={styles.degree}>{edu?.degree || 'Management Information Systems'}</h4>
      <p className={styles.description}>
        {edu?.description || t('content.education.akdeniz-university.description')}
      </p>
    </div>
  )
}


