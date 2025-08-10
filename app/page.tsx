'use client'
import ExperienceCard from "../components/ExperienceCard"
import AnimatedName from "../components/AnimatedName"
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi"
import { FaLinkedinIn } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import LeadershipCard from '../components/LeadershipCard'
import AnimatedTitle from '../components/AnimatedTitle'
import SkillsCard from '../components/SkillsCard'
import InfoButton from '../components/InfoButton'
import styles from '../styles/Page.module.css'
// Note: This is a client component. Page-level metadata cannot be exported here.
import StickyMenu from '../components/StickyMenu'
import EducationCard from '../components/EducationCard'
import Navigation from '../components/Navigation'
import { useTranslation, useLanguage } from '../context/LanguageContext'
import { getNestedTranslation } from '../data/translations'

interface ExperienceItem {
  company: string
  workType: string
  position: string
  startDate: string
  endDate: string
  bulletPoints: string[]
}

interface LeadershipItem {
  organization: string
  location: string
  role: string
  period: string
  bulletPoints: string[]
}

export default function Home() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  const experiencesObj = (getNestedTranslation(language, 'content.experiences') || {}) as Record<string, ExperienceItem>
  const experiences: ExperienceItem[] = Object.values(experiencesObj)

  const leadershipObj = (getNestedTranslation(language, 'content.leadership') || {}) as Record<string, LeadershipItem>
  const leadershipActivities: LeadershipItem[] = Object.values(leadershipObj)

  const contact = (getNestedTranslation(language, 'content.contact') || {}) as { location?: string; email?: string; phone?: string; linkedin?: string }

  return (
    <div className={styles.container}>
      <Navigation />
      <StickyMenu />
      <header className={styles.header}>
        <div className={styles.titleLine}>
          <AnimatedName />
          <AnimatedTitle />
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <IoLocationOutline className="icon" />
            <span>{t('content.contact.location')}</span>
          </div>
          <div className={styles.contactItem}>
            <HiOutlineMail className="icon" />
            <a href="mailto:mehtiumityildirim@gmail.com">
              {t('content.contact.email')}
            </a>
          </div>
          <div className={styles.contactItem}>
            <FaLinkedinIn className="icon" />
            <a
              href="https://linkedin.com/in/mehtiumityildirim"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('content.contact.linkedin')}
            </a>
          </div>
          <div className={styles.contactItem}>
            <HiOutlinePhone className="icon" />
            <a href="tel:+905393873381">{t('content.contact.phone')}</a>
          </div>
        </div>
      </header>

      {/* JSON-LD: Breadcrumbs (Home) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: '/',
              },
            ],
          }),
        }}
      />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('content.sectionTitles.education')}</h2>
        <EducationCard />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('content.sectionTitles.workExperience')}</h2>
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('content.sectionTitles.leadershipAndActivities')}</h2>
        {leadershipActivities.map((activity, index) => (
          <LeadershipCard key={index} {...activity} />
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('content.sectionTitles.skillsAndInterests')}</h2>
        <SkillsCard />
      </section>

      <InfoButton />
    </div>
  )
}


