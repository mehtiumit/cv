'use client'

import { useState } from 'react'
import styles from '../styles/ExperienceCard.module.css'

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = endDate === "Present" ? new Date() : new Date(endDate)
  
  const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth())
  
  if (monthDiff >= 12) {
    const years = Math.floor(monthDiff / 12)
    const months = monthDiff % 12
    return months > 0 ? `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}` 
                     : `${years} year${years > 1 ? 's' : ''}`
  }
  
  return `${monthDiff} month${monthDiff > 1 ? 's' : ''}`
}

const ExperienceCard = ({ 
  company, 
  workType,
  position, 
  startDate,
  endDate,
  bulletPoints 
}) => {
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
              {calculateDuration(startDate, endDate)}
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
  );
};

export default ExperienceCard; 