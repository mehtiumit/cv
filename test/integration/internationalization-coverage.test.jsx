/**
 * Internationalization Coverage Tests
 * Verifies complete i18n coverage, language persistence, and default behavior
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LanguageProvider, useLanguage, useTranslation, LANGUAGES } from '../../context/LanguageContext'
import enTranslations from '../../data/translations/en.json'
import trTranslations from '../../data/translations/tr.json'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

// Test component to verify language context
const TestComponent = () => {
  const { language, setLanguage, t, isLoading } = useLanguage()
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <div data-testid="translated-text">{t('navigation.home')}</div>
      <button 
        data-testid="switch-to-tr" 
        onClick={() => setLanguage(LANGUAGES.TR)}
      >
        Switch to Turkish
      </button>
      <button 
        data-testid="switch-to-en" 
        onClick={() => setLanguage(LANGUAGES.EN)}
      >
        Switch to English
      </button>
    </div>
  )
}

describe('Internationalization Coverage', () => {
  beforeEach(() => {
    // Reset localStorage mock
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })

    // Mock window.dispatchEvent
    window.dispatchEvent = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Default Language Behavior', () => {
    it('should default to English when no language preference is stored', async () => {
      localStorageMock.getItem.mockReturnValue(null)

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en')
        expect(screen.getByTestId('translated-text')).toHaveTextContent('Homepage')
      })
    })

    it('should use English as fallback for invalid stored language', async () => {
      localStorageMock.getItem.mockReturnValue('invalid-lang')

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en')
      })
    })
  })

  describe('Language Persistence', () => {
    it('should restore language preference from localStorage', async () => {
      localStorageMock.getItem.mockReturnValue('tr')

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('tr')
        expect(screen.getByTestId('translated-text')).toHaveTextContent('Ana Sayfa')
      })
    })

    it('should persist language changes to localStorage', async () => {
      localStorageMock.getItem.mockReturnValue('en')

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en')
      })

      fireEvent.click(screen.getByTestId('switch-to-tr'))

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('preferred-language', 'tr')
        expect(screen.getByTestId('current-language')).toHaveTextContent('tr')
      })
    })

    it('should dispatch language change event', async () => {
      localStorageMock.getItem.mockReturnValue('en')

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en')
      })

      fireEvent.click(screen.getByTestId('switch-to-tr'))

      await waitFor(() => {
        expect(window.dispatchEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'languageChange',
            detail: 'tr'
          })
        )
      })
    })

    it('should handle localStorage errors gracefully', async () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage not available')
      })

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en')
        expect(consoleSpy).toHaveBeenCalledWith(
          'Failed to load language preference from localStorage:',
          expect.any(Error)
        )
      })

      consoleSpy.mockRestore()
    })
  })

  describe('Translation Coverage', () => {
    it('should have complete translation coverage for all UI text', () => {
      // Check that all English keys have Turkish translations
      const checkTranslationCoverage = (enObj, trObj, path = '') => {
        for (const key in enObj) {
          const currentPath = path ? `${path}.${key}` : key
          
          if (typeof enObj[key] === 'object' && enObj[key] !== null) {
            expect(trObj).toHaveProperty(key)
            expect(typeof trObj[key]).toBe('object')
            checkTranslationCoverage(enObj[key], trObj[key], currentPath)
          } else {
            expect(trObj).toHaveProperty(key)
            expect(typeof trObj[key]).toBe('string')
            // Allow empty strings for specific keys like pluralSuffix in Turkish
            if (key !== 'pluralSuffix') {
              expect(trObj[key]).not.toBe('')
            }
          }
        }
      }

      checkTranslationCoverage(enTranslations, trTranslations)
    })

    it('should fallback to English for missing Turkish translations', () => {
      const TestFallbackComponent = () => {
        const { t } = useTranslation()
        return <div data-testid="fallback-text">{t('nonexistent.key')}</div>
      }

      localStorageMock.getItem.mockReturnValue('tr')

      render(
        <LanguageProvider>
          <TestFallbackComponent />
        </LanguageProvider>
      )

      // Should return the key itself when translation is missing
      expect(screen.getByTestId('fallback-text')).toHaveTextContent('nonexistent.key')
    })

    it('should handle nested translation keys correctly', async () => {
      const TestNestedComponent = () => {
        const { t } = useTranslation()
        return (
          <div>
            <div data-testid="nested-en">{t('projects.platform.web')}</div>
            <div data-testid="nested-tr">{t('projects.platform.android')}</div>
          </div>
        )
      }

      localStorageMock.getItem.mockReturnValue('en')

      render(
        <LanguageProvider>
          <TestNestedComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('nested-en')).toHaveTextContent('Web')
        expect(screen.getByTestId('nested-tr')).toHaveTextContent('Android')
      })
    })
  })

  describe('Language Switching', () => {
    it('should update all text content when language changes', async () => {
      localStorageMock.getItem.mockReturnValue('en')

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      // Initially English
      await waitFor(() => {
        expect(screen.getByTestId('translated-text')).toHaveTextContent('Homepage')
      })

      // Switch to Turkish
      fireEvent.click(screen.getByTestId('switch-to-tr'))

      await waitFor(() => {
        expect(screen.getByTestId('translated-text')).toHaveTextContent('Ana Sayfa')
      })

      // Switch back to English
      fireEvent.click(screen.getByTestId('switch-to-en'))

      await waitFor(() => {
        expect(screen.getByTestId('translated-text')).toHaveTextContent('Homepage')
      })
    })
  })

  describe('Translation Function Edge Cases', () => {
    it('should handle empty or invalid keys', () => {
      const TestEdgeCaseComponent = () => {
        const { t } = useTranslation()
        return (
          <div>
            <div data-testid="empty-key">{t('')}</div>
            <div data-testid="null-key">{t(null)}</div>
            <div data-testid="undefined-key">{t(undefined)}</div>
            <div data-testid="with-fallback">{t('invalid.key', 'Fallback Text')}</div>
          </div>
        )
      }

      render(
        <LanguageProvider>
          <TestEdgeCaseComponent />
        </LanguageProvider>
      )

      expect(screen.getByTestId('empty-key')).toHaveTextContent('')
      expect(screen.getByTestId('null-key')).toHaveTextContent('')
      expect(screen.getByTestId('undefined-key')).toHaveTextContent('')
      expect(screen.getByTestId('with-fallback')).toHaveTextContent('Fallback Text')
    })
  })

  describe('Project Data Translations', () => {
    it('should have complete project data translations', () => {
      const enProjectData = enTranslations.projectData
      const trProjectData = trTranslations.projectData

      // Check that all projects have translations
      for (const projectId in enProjectData) {
        expect(trProjectData).toHaveProperty(projectId)
        
        const enProject = enProjectData[projectId]
        const trProject = trProjectData[projectId]

        // Check required fields
        expect(trProject).toHaveProperty('title')
        expect(trProject).toHaveProperty('description')
        expect(trProject).toHaveProperty('purpose')
        expect(trProject).toHaveProperty('features')

        // Check that features array has same length
        expect(trProject.features).toHaveLength(enProject.features.length)
        
        // Check that all features are translated
        trProject.features.forEach(feature => {
          expect(typeof feature).toBe('string')
          expect(feature.length).toBeGreaterThan(0)
        })
      }
    })
  })
})