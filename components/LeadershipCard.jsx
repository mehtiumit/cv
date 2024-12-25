'use client'

import styles from '../styles/LeadershipCard.module.css'

const LeadershipCard = ({
  organization,
  location,
  role,
  period,
  bulletPoints
}) => {
  return (
    <div className={styles['leadership-card']}>
      <div className={styles['card-header']}>
        <div className={styles['org-info']}>
          <span className={styles.organization}>{organization}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.location}>{location}</span>
        </div>
        <div className={styles.period}>{period}</div>
      </div>
      <h4 className={styles.role}>{role}</h4>
      <ul className={styles['bullet-list']}>
        {bulletPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

export default LeadershipCard 