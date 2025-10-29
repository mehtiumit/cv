'use client'
import { motion } from "framer-motion"
import ExperienceCard from "../components/ExperienceCard"
import AnimatedName from "../components/AnimatedName"
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi"
import { FaLinkedinIn } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import LeadershipCard from '../components/LeadershipCard'
import AnimatedTitle from '../components/AnimatedTitle'
import SkillsCard from '../components/SkillsCard'
import InfoButton from '../components/InfoButton'
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navigation />
      <header className="py-20 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div>
            <AnimatedName />
            <AnimatedTitle />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 sm:mt-0">
            <div className="flex items-center space-x-2">
              <IoLocationOutline className="text-muted" />
              <span className="text-sm">{t('content.contact.location')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiOutlineMail className="text-muted" />
              <a href="mailto:mehtiumityildirim@gmail.com" className="text-sm hover:text-primary">
                {t('content.contact.email')}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <FaLinkedinIn className="text-muted" />
              <a
                href="https://linkedin.com/in/mehtiumityildirim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                {t('content.contact.linkedin')}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <HiOutlinePhone className="text-muted" />
              <a href="tel:+905393873381" className="text-sm hover:text-primary">{t('content.contact.phone')}</a>
            </div>
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

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-20 sm:py-12"
      >
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {t('content.sectionTitles.education')}
        </h2>
        <div className="mt-12">
          <EducationCard />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="py-20 sm:py-12"
      >
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {t('content.sectionTitles.workExperience')}
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ExperienceCard {...experience} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="py-20 sm:py-12"
      >
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {t('content.sectionTitles.leadershipAndActivities')}
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-8"
        >
          {leadershipActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <LeadershipCard {...activity} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="py-20 sm:py-12"
      >
        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {t('content.sectionTitles.skillsAndInterests')}
        </h2>
        <div className="mt-12">
          <SkillsCard />
        </div>
      </motion.section>

      <InfoButton />
    </div>
  )
}


