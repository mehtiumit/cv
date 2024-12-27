'use client'
import styles from '../styles/SkeletonLoader.module.css'

export default function SkeletonLoader() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.name} />
        <div className={styles.title} />
      </div>
      <div className={styles.contact}>
        {[1,2,3,4].map(i => (
          <div key={i} className={styles.contactItem} />
        ))}
      </div>
      <div className={styles.content}>
        {[1,2,3].map(i => (
          <div key={i} className={styles.card} />
        ))}
      </div>
    </div>
  )
} 