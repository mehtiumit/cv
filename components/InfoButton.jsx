'use client'

import { useState } from 'react'
import { IoInformationCircle } from 'react-icons/io5'
import styles from '../styles/InfoButton.module.css'

const InfoButton = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className={styles['info-button-container']}>
      <button
        className={styles['info-button']}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <IoInformationCircle className={styles['info-icon']} />
      </button>
      {showTooltip && (
        <div className={styles.tooltip}>
          I created this site using Cursor and prompt engineering skills without any Next.js knowledge.
        </div>
      )}
    </div>
  )
}

export default InfoButton 