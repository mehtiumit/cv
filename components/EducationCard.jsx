'use client'

import { IoSchoolOutline } from 'react-icons/io5'
import styles from '../styles/EducationCard.module.css'

const EducationCard = () => {
  return (
    <div className={styles['education-card']}>
      <div className={styles['card-header']}>
        <div className={styles['school-info']}>
          <IoSchoolOutline className={styles.icon} />
          <span className={styles.school}>Akdeniz University</span>
          <span className={styles.separator}>/</span>
          <span className={styles.location}>Antalya</span>
        </div>
        <div className={styles.period}>2016 - 2020</div>
      </div>
      <h4 className={styles.degree}>Management Information Systems</h4>
      <p className={styles.description}>
        Bachelor's Degree
      </p>
    </div>
  )
}

export default EducationCard 