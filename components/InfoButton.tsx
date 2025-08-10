'use client'

import { useState } from 'react'
import { IoInformationCircle } from 'react-icons/io5'
import { useTranslation } from '../context/LanguageContext'
import styles from '../styles/InfoButton.module.css'

export default function InfoButton()  {
  const { t } = useTranslation()
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  return (
    <div className={styles['info-button-container']}>
      <button
        className={styles['info-button']}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        type="button"
        aria-describedby={showTooltip ? 'info-tooltip' : undefined}
        aria-label={t('common.infoButtonTooltip', 'I created this site using Cursor and prompt engineering skills without any Next.js knowledge.')}
      >
        <IoInformationCircle className={styles['info-icon']} />
      </button>
      {showTooltip && (
        <div className={styles.tooltip} role="tooltip" id="info-tooltip">
          {t('common.infoButtonTooltip', 'I created this site using Cursor and prompt engineering skills without any Next.js knowledge.')}
        </div>
      )}
    </div>
  )
}


