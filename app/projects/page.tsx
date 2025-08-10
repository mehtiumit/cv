"use client"
import { useState, useEffect, useRef } from "react"
import { useLanguage, useTranslation } from "../../context/LanguageContext"
import Navigation from "../../components/Navigation"
import ProjectFilter from "../../components/ProjectFilter"
import ProjectsGrid from "../../components/ProjectsGrid"
import { getLocalizedProjects } from "../../data/projects"
import type { Platform } from "../../data/projects"
import styles from "../../styles/ProjectsPage.module.css"

type ActiveFilter = "all" | Platform

export default function ProjectsPage() {
  // Toggle to show/hide projects on this page.
  // Set to true when real projects are ready to be displayed.
  const ENABLE_PROJECTS = false
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const skipLinkRef = useRef<HTMLAnchorElement | null>(null)
  const { language } = useLanguage()
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (newFilter: ActiveFilter) => {
    setActiveFilter(newFilter)

    const announcement = `${getFilterLabel(newFilter)} filtresi seçildi`
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(announcement)
      utterance.volume = 0
      window.speechSynthesis.speak(utterance)
    }
  }

  const getFilterLabel = (filter: ActiveFilter): string => {
    const labels: Record<ActiveFilter, string> = {
      all: "Tüm projeler",
      web: "Web projeleri",
      android: "Android projeleri",
      ios: "iOS projeleri",
    }
    return labels[filter] || (filter as string)
  }

  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (mainRef.current) {
      mainRef.current.focus()
      mainRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const projects = getLocalizedProjects(language)

  const structuredData = ENABLE_PROJECTS
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t("projects.title"),
        description: t("projects.subtitle"),
        author: { "@type": "Person", name: "Mehti Ümit Yıldırım" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            "@type": "SoftwareApplication",
            position: index + 1,
            name: project.title,
            description: project.description,
            applicationCategory: project.platform === "web" ? "WebApplication" : "MobileApplication",
            operatingSystem: project.platform === "web" ? "Web Browser" : project.platform === "android" ? "Android" : "iOS",
            programmingLanguage: project.technologies,
            url: project.link,
            codeRepository: project.githubLink,
          })),
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t("projects.title"),
        description: t("projects.subtitle"),
        author: { "@type": "Person", name: "Mehti Ümit Yıldırım" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: t("navigation.projects"), item: "/projects" }
          ]
        }
      }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className={styles.container}>
        <a
          ref={skipLinkRef}
          href="#main-content"
          className="skip-link"
          onClick={handleSkipToContent}
        >
          {t("projects.skipToContent")}
        </a>

        <Navigation />

        <main
          ref={mainRef}
          id="main-content"
          className={styles.content}
          tabIndex={-1}
          role="main"
          aria-labelledby="page-title"
        >
          <header className={styles.header}>
            <h1 id="page-title" className={styles.title}>
              {t("projects.title")}
            </h1>
            <p className={styles.subtitle} aria-describedby="page-title">
              {t("projects.subtitle")}
            </p>
          </header>

          {ENABLE_PROJECTS && (
          <section className={styles.filterSection} aria-labelledby="filter-heading">
            <h2 id="filter-heading" className="sr-only">
              {t("projects.filterHeading")}
            </h2>
            <ProjectFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </section>
          )}

          {ENABLE_PROJECTS ? (
            <section
              className={styles.projectsSection}
              aria-labelledby="projects-heading"
              aria-live="polite"
              aria-atomic="false"
              id={`projects-panel-${activeFilter}`}
              role="tabpanel"
            >
              <h2 id="projects-heading" className="sr-only">
                {getFilterLabel(activeFilter)} - {projects.filter((p) => activeFilter === "all" || p.platform === activeFilter).length} proje
              </h2>
              <ProjectsGrid projects={projects} activeFilter={activeFilter} isLoading={isLoading} />
            </section>
          ) : (
            <section className={styles.comingSoon} role="status" aria-live="polite">
              <div className={styles.comingSoonCard}>
                <h2 className={styles.comingSoonTitle}>{t('projects.comingSoonTitle')}</h2>
                <p className={styles.comingSoonDesc}>{t('projects.comingSoonDescription')}</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  )
}


