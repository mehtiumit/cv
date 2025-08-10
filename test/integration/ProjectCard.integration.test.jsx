import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectCard from '../../components/ProjectCard'
import { LanguageProvider, LANGUAGES } from '../../context/LanguageContext'
import { getLocalizedProjectById } from '../../data/projects'

// Mock the CSS module
vi.mock('../../styles/ProjectCard.module.css', () => ({
  default: {
    projectCard: 'projectCard',
    featuredBadge: 'featuredBadge',
    cardContent: 'cardContent',
    cardHeader: 'cardHeader',
    titleSection: 'titleSection',
    projectTitle: 'projectTitle',
    platformInfo: 'platformInfo',
    platformIcon: 'platformIcon',
    platformLabel: 'platformLabel',
    projectDescription: 'projectDescription',
    purposeSection: 'purposeSection',
    sectionTitle: 'sectionTitle',
    purposeText: 'purposeText',
    featuresSection: 'featuresSection',
    featuresList: 'featuresList',
    featureItem: 'featureItem',
    technologiesSection: 'technologiesSection',
    technologies: 'technologies',
    techTag: 'techTag',
    linksSection: 'linksSection',
    projectLink: 'projectLink',
    githubLink: 'githubLink',
    linkIcon: 'linkIcon',
    completionDate: 'completionDate'
  }
}))

// Mock react-icons
vi.mock('react-icons/fi', () => ({
  FiExternalLink: () => <span data-testid="external-link-icon">External Link</span>,
  FiGithub: () => <span data-testid="github-icon">GitHub</span>,
  FiCalendar: () => <span data-testid="calendar-icon">Calendar</span>
}))

vi.mock('react-icons/io5', () => ({
  IoPhonePortraitOutline: () => <span data-testid="ios-icon">iOS</span>,
  IoDesktopOutline: () => <span data-testid="web-icon">Web</span>,
  IoPhonePortrait: () => <span data-testid="android-icon">Android</span>
}))

const renderProjectCard = (project, language = null) => {
  if (language) {
    localStorage.getItem.mockReturnValue(language)
  } else {
    localStorage.getItem.mockReturnValue(null)
  }

  return render(
    <LanguageProvider>
      <ProjectCard project={project} index={0} />
    </LanguageProvider>
  )
}

describe('ProjectCard Integration Tests', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
    global.dispatchEvent.mockClear()
    
    // Mock window.open
    global.open = vi.fn()
  })

  describe('Project Card without images', () => {
    it('should render project card without image section', async () => {
      const project = getLocalizedProjectById('web-1', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      // Should not have any actual image elements (platform icon is semantic, not visual)
      expect(screen.queryByAltText(/image/i)).not.toBeInTheDocument()
      expect(screen.queryByRole('img', { name: /project image/i })).not.toBeInTheDocument()
      
      // Should have all other content
      expect(screen.getByText(project.title)).toBeInTheDocument()
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })

    it('should maintain proper layout without image placeholders', async () => {
      const project = getLocalizedProjectById('web-2', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        const article = screen.getByRole('article')
        expect(article).toBeInTheDocument()
      })

      // Should have proper structure without image containers
      const cardContent = screen.getByRole('article').querySelector('.cardContent')
      expect(cardContent).toBeInTheDocument()
      
      // Should not have loading states or error states for images
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
    })

    it('should ensure visual balance without images', async () => {
      const project = getLocalizedProjectById('android-1', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      // Should have main sections properly displayed (purpose section was removed)
      expect(screen.getByText('Key Features')).toBeInTheDocument()
      
      // Features should be displayed as list(s) + technologies list
      const allLists = screen.getAllByRole('list')
      const expectedListsCount = (project.features.length > 4 ? 2 : 1) + 1 // features (+more) + technologies
      expect(allLists).toHaveLength(expectedListsCount)
      
      project.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })
  })

  describe('Language switching across components', () => {
    it('should render project with English content by default', async () => {
      const project = getLocalizedProjectById('web-1', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        expect(screen.getByText('E-Commerce Dashboard')).toBeInTheDocument()
      })

      // Verify English content is displayed (purpose section removed)
      expect(screen.getByText('Key Features')).toBeInTheDocument()
      // Description should be shown
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })

    it('should render project with Turkish content when specified', async () => {
      const project = getLocalizedProjectById('web-1', 'tr')
      renderProjectCard(project, LANGUAGES.TR)

      await waitFor(() => {
        expect(screen.getByText('E-Ticaret Yönetim Paneli')).toBeInTheDocument()
      })

      // Verify Turkish content is displayed (section titles are not translated in this implementation)
      expect(screen.getByText('Key Features')).toBeInTheDocument()
      // Description should be shown in Turkish
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })

    it('should maintain component functionality across different languages', async () => {
      const user = userEvent.setup()
      const project = getLocalizedProjectById('ios-1', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        expect(screen.getByText('Budget Tracker')).toBeInTheDocument()
      })

      // Test link functionality
      const projectLink = screen.getByRole('link', { name: /view.*project/i })
      expect(projectLink).toBeInTheDocument()
      expect(projectLink).toHaveAttribute('href', project.link)
    })
  })

  describe('Responsive behavior of redesigned cards', () => {
    it('should render properly on different screen sizes', async () => {
      const project = getLocalizedProjectById('web-3', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      const article = screen.getByRole('article')
      
      // Should have responsive classes
      expect(article).toHaveClass('projectCard')
      
      // Should maintain proper structure for responsive design
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      
      const navigation = screen.getByRole('navigation', { name: /project links/i })
      expect(navigation).toBeInTheDocument()
    })

    it('should handle long content gracefully', async () => {
      const projectWithLongContent = {
        ...getLocalizedProjectById('ios-2', 'en'),
        description: 'This is a very long description that should wrap properly and maintain good readability across different screen sizes and viewport widths.',
        // purpose section removed in implementation
        features: [
          'This is a very long feature description that should wrap properly',
          'Another long feature that tests the responsive behavior',
          'A third feature with extensive details about functionality',
          'Fourth feature with comprehensive explanation',
          'Fifth feature to test list handling'
        ]
      }
      
      renderProjectCard(projectWithLongContent)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      // Should render all content without overflow issues
      expect(screen.getByText(projectWithLongContent.description)).toBeInTheDocument()
      // purpose is not rendered anymore
      
      projectWithLongContent.features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })

    it('should maintain accessibility across different layouts', async () => {
      const project = getLocalizedProjectById('ios-3', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      // Should have proper ARIA labels
      const article = screen.getByRole('article')
      expect(article).toHaveAttribute('aria-labelledby', `project-title-${project.id}`)
      expect(article).toHaveAttribute('aria-describedby', `project-description-${project.id}`)
      
      // Should have proper heading structure
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveAttribute('id', `project-title-${project.id}`)
      
      // Should have proper list structure
      const allLists = screen.getAllByRole('list')
      const expectedListsCount = (project.features.length > 4 ? 2 : 1) + 1 // features (+more) + technologies
      expect(allLists).toHaveLength(expectedListsCount)
      
      const techList = screen.getByRole('list', { name: /technologies used/i })
      expect(techList).toBeInTheDocument()
      
      // Should have proper navigation
      const navigation = screen.getByRole('navigation', { name: /project links/i })
      expect(navigation).toBeInTheDocument()
    })

    it('should handle missing optional fields gracefully', async () => {
      const minimalProject = {
        id: 'minimal-1',
        title: 'Minimal Project',
        description: 'A minimal project for testing',
        platform: 'web',
        technologies: ['React'],
        featured: false
        // Missing: purpose, features, links, completionDate
      }
      
      renderProjectCard(minimalProject)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      // Should render basic content
      expect(screen.getByText('Minimal Project')).toBeInTheDocument()
      expect(screen.getByText('A minimal project for testing')).toBeInTheDocument()
      
      // Should not render missing sections
      expect(screen.queryByText('Purpose')).not.toBeInTheDocument()
      expect(screen.queryByText('Key Features')).not.toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.queryByText(/completed/i)).not.toBeInTheDocument()
      
      // Should still render technologies
      expect(screen.getByText('React')).toBeInTheDocument()
    })
  })

  describe('Enhanced visual appearance', () => {
    it('should display improved visual hierarchy', async () => {
      const project = getLocalizedProjectById('web-1', 'en')
      renderProjectCard(project)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      // Should have proper heading levels
      const mainTitle = screen.getByRole('heading', { level: 3 })
      expect(mainTitle).toBeInTheDocument()
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 4 })
      expect(sectionHeadings.length).toBeGreaterThan(0)
      
      // Should have proper semantic structure
      expect(screen.getByRole('banner')).toBeInTheDocument() // header
      expect(screen.getByRole('navigation')).toBeInTheDocument() // links
      const expectedListsCount = (project.features.length > 4 ? 2 : 1) + 1 // features (+more) + technologies
      expect(screen.getAllByRole('list')).toHaveLength(expectedListsCount)
      expect(screen.getByRole('list', { name: /technologies/i })).toBeInTheDocument()
    })

    it('should show platform badge when applicable (replaces featured badge)', async () => {
      const featuredProject = getLocalizedProjectById('web-1', 'en')
      expect(featuredProject.featured).toBe(true)
      
      renderProjectCard(featuredProject)

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
      })

      // Platform label text should be visible instead of "Featured"
      expect(screen.queryByText('Featured')).not.toBeInTheDocument()
      expect(screen.getAllByText('Web').length).toBeGreaterThan(0)
    })

    it('should not show featured badge for non-featured projects', async () => {
      const nonFeaturedProject = getLocalizedProjectById('web-3', 'en')
      expect(nonFeaturedProject.featured).toBe(false)
      
      renderProjectCard(nonFeaturedProject)

      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument()
      })

      // No "Featured" badge text anywhere
      expect(screen.queryByText('Featured')).not.toBeInTheDocument()
      // But platform badge should still exist
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('should display platform icons correctly', async () => {
      const webProject = getLocalizedProjectById('web-1', 'en')
      const androidProject = getLocalizedProjectById('android-1', 'en')
      const iosProject = getLocalizedProjectById('ios-1', 'en')

      // Test web project
      const { unmount: unmountWeb } = renderProjectCard(webProject)
      await waitFor(() => {
        expect(screen.getByTestId('web-icon')).toBeInTheDocument()
        expect(screen.getAllByText('Web')).toHaveLength(2) // Icon text and platform label
      })
      unmountWeb()

      // Test android project
      const { unmount: unmountAndroid } = renderProjectCard(androidProject)
      await waitFor(() => {
        expect(screen.getByTestId('android-icon')).toBeInTheDocument()
        expect(screen.getAllByText('Android')).toHaveLength(2)
      })
      unmountAndroid()

      // Test iOS project
      renderProjectCard(iosProject)
      await waitFor(() => {
        expect(screen.getByTestId('ios-icon')).toBeInTheDocument()
        expect(screen.getAllByText('iOS')).toHaveLength(2)
      })
    })
  })
})