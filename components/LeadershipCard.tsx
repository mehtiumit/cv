'use client'

import styles from '../styles/LeadershipCard.module.css'

interface LeadershipCardProps {
  organization: string
  location: string
  role: string
  period: string
  bulletPoints: string[]
}

export default function LeadershipCard({ organization, location, role, period, bulletPoints }: LeadershipCardProps): JSX.Element {
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


