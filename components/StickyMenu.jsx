'use client'

import { useState } from 'react'
import styles from '../styles/StickyMenu.module.css'
import SummaryModal from './SummaryModal'

const StickyMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const workSummary = {
    title: 'Work Experience Summary',
    content: [
      'Over 3 years of experience in Back-End Development',
      'Specialized in advertising technologies at Hepsiburada',
      'Strong expertise in .NET Core, Golang, and microservices architecture',
      'Experience with high-scale distributed systems',
      'Proficient in data processing with Kafka and BigQuery',
      'Skilled in search optimization with Elasticsearch/OpenSearch'
    ]
  }

  const skillsSummary = {
    title: 'Skills Summary',
    content: [
      'Backend: .NET Core, Golang',
      'Databases: MongoDB, Redis, MySQL',
      'Search: Elasticsearch, OpenSearch',
      'Cloud & DevOps: Docker, Kubernetes, GCP',
      'Message Queue: Apache Kafka',
      'Analytics: Google BigQuery',
      'Version Control: Git',
      'Soft Skills: Team Collaboration, Problem Solving'
    ]
  }

  const handleMenuClick = (type) => {
    setModalContent(type === 'work' ? workSummary : skillsSummary)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className={styles.stickyMenu}>
        <button 
          className={styles.menuItem}
          onClick={() => handleMenuClick('work')}
        >
          Work Experience Summary
        </button>
        <button 
          className={styles.menuItem}
          onClick={() => handleMenuClick('skills')}
        >
          Skills Summary
        </button>
      </div>

      <SummaryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        content={modalContent.content}
      />
    </>
  )
}

export default StickyMenu 