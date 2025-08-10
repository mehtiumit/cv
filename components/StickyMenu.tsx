'use client'

import { useMemo, useState } from 'react'
import styles from '../styles/StickyMenu.module.css'
import SummaryModal from './SummaryModal'
import { useTranslation } from '../context/LanguageContext'
import { getTranslation, getNestedTranslation } from '@/data/translations'

type SummaryType = 'work' | 'skills'

interface SummaryContent {
  title: string
  content: string[]
}

const StickyMenu = () => {
  const { t, language } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<SummaryContent | null>(null)

  const workSummary: SummaryContent = useMemo(() => ({
    title: getTranslation(language, 'content.summaries.work.title', 'Work Experience Summary'),
    content: (getNestedTranslation(language, 'content.summaries.work.items') as string[]) || []
  }), [language])

  const skillsSummary: SummaryContent = useMemo(() => ({
    title: getTranslation(language, 'content.summaries.skills.title', 'Skills Summary'),
    content: (getNestedTranslation(language, 'content.summaries.skills.items') as string[]) || []
  }), [language])

  const handleMenuClick = (type: SummaryType) => {
    setModalContent(type === 'work' ? workSummary : skillsSummary)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className={styles.stickyMenu}>
        <button 
          className={styles.menuItem}
          onClick={() => handleMenuClick('work')}
          type="button"
        >
          {getTranslation(language, 'content.summaries.work.button', 'Work Experience Summary')}
        </button>
        <button 
          className={styles.menuItem}
          onClick={() => handleMenuClick('skills')}
          type="button"
        >
          {getTranslation(language, 'content.summaries.skills.button', 'Skills Summary')}
        </button>
      </div>

      {modalContent && (
        <SummaryModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalContent.title}
          content={modalContent.content}
        />
      )}
    </>
  )
}

export default StickyMenu


