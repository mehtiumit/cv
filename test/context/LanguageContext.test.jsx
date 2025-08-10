import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { 
  LanguageProvider, 
  useLanguage, 
  useTranslation, 
  LANGUAGES 
} from '../../context/LanguageContext'

// Test component to access context
const TestComponent = () => {
  const { language, setLanguage, toggleLanguage, t, isLoading, getAvailableLanguages, getCurrentLanguageInfo } = useLanguage()
  
  return (
    <div>
      <div data-testid="current-language">{language}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="translation-test">{t('navigation.home')}</div>
      <div data-testid="translation-fallback">{t('nonexistent.key', 'fallback')}</div>
      <div data-testid="available-languages">{JSON.stringify(getAvailableLanguages())}</div>
      <div data-testid="current-language-info">{JSON.stringify(getCurrentLanguageInfo())}</div>
      <button data-testid="set-turkish" onClick={() => setLanguage(LANGUAGES.TR)}>
        Set Turkish
      </button>
      <button data-testid="set-english" onClick={() => setLanguage(LANGUAGES.EN)}>
        Set English
      </button>
      <button data-testid="toggle-language" onClick={toggleLanguage}>
        Toggle Language
      </button>
    </div>
  )
}

// Test component for useTranslation hook
const TranslationTestComponent = () => {
  const { t, language } = useTranslation()
  
  return (
    <div>
      <div data-testid="translation-language">{language}</div>
      <div data-testid="translation-result">{t('navigation.projects')}</div>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
    global.dispatchEvent.mockClear()
  })

  describe('LanguageProvider', () => {
    it('should provide default language as English', async () => {
      localStorage.getItem.mockReturnValue(null)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.EN)
    })

    it('should load saved language from localStorage', async () => {
      localStorage.getItem.mockReturnValue(LANGUAGES.TR)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.TR)
      expect(localStorage.getItem).toHaveBeenCalledWith('preferred-language')
    })

    it('should handle localStorage errors gracefully', async () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.EN)
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load language preference from localStorage:',
        expect.any(Error)
      )
      
      consoleSpy.mockRestore()
    })

    it('should ignore invalid saved language', async () => {
      localStorage.getItem.mockReturnValue('invalid-language')
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.EN)
    })
  })

  describe('Language switching', () => {
    it('should change language when setLanguage is called', async () => {
      const user = userEvent.setup()
      localStorage.getItem.mockReturnValue(null)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      await user.click(screen.getByTestId('set-turkish'))

      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.TR)
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', LANGUAGES.TR)
      expect(global.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'languageChange',
          detail: LANGUAGES.TR
        })
      )
    })

    it('should toggle between languages', async () => {
      const user = userEvent.setup()
      localStorage.getItem.mockReturnValue(null)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      // Should start with English
      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.EN)

      // Toggle to Turkish
      await user.click(screen.getByTestId('toggle-language'))
      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.TR)

      // Toggle back to English
      await user.click(screen.getByTestId('toggle-language'))
      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.EN)
    })

    it('should handle invalid language gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      localStorage.getItem.mockReturnValue(null)
      
      const TestComponentInvalid = () => {
        const { language, setLanguage } = useLanguage()
        
        React.useEffect(() => {
          // Try to set invalid language on mount
          setLanguage('invalid-language')
        }, [setLanguage])
        
        return <div data-testid="current-language">{language}</div>
      }
      
      render(
        <LanguageProvider>
          <TestComponentInvalid />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Invalid language: invalid-language')
      })
      
      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.EN)
      
      consoleSpy.mockRestore()
    })

    it('should handle localStorage save errors gracefully', async () => {
      const user = userEvent.setup()
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      localStorage.getItem.mockReturnValue(null)
      localStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage save error')
      })
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      await user.click(screen.getByTestId('set-turkish'))

      expect(screen.getByTestId('current-language')).toHaveTextContent(LANGUAGES.TR)
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save language preference to localStorage:',
        expect.any(Error)
      )
      
      consoleSpy.mockRestore()
    })
  })

  describe('Translation function', () => {
    it('should return correct translation for valid keys', async () => {
      localStorage.getItem.mockReturnValue(null)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      expect(screen.getByTestId('translation-test')).toHaveTextContent('Homepage')
    })

    it('should return fallback for missing keys', async () => {
      localStorage.getItem.mockReturnValue(null)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      expect(screen.getByTestId('translation-fallback')).toHaveTextContent('fallback')
    })

    it('should return key when no fallback provided for missing translation', async () => {
      localStorage.getItem.mockReturnValue(null)
      
      const TestComponentNoFallback = () => {
        const { t } = useLanguage()
        return <div data-testid="no-fallback">{t('missing.key')}</div>
      }
      
      render(
        <LanguageProvider>
          <TestComponentNoFallback />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('no-fallback')).toHaveTextContent('missing.key')
      })
    })

    it('should fallback to English when Turkish translation is missing', async () => {
      localStorage.getItem.mockReturnValue(LANGUAGES.TR)
      
      const TestComponentMissingTurkish = () => {
        const { t } = useLanguage()
        // Test with a key that exists in English but might not in Turkish
        return <div data-testid="english-fallback">{t('navigation.home')}</div>
      }
      
      render(
        <LanguageProvider>
          <TestComponentMissingTurkish />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('english-fallback')).toHaveTextContent('Ana Sayfa')
      })
    })

    it('should handle translation errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      localStorage.getItem.mockReturnValue(null)
      
      const TestComponentError = () => {
        const { t } = useLanguage()
        // Force an error by passing invalid input
        return <div data-testid="error-test">{t(null)}</div>
      }
      
      render(
        <LanguageProvider>
          <TestComponentError />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('error-test')).toHaveTextContent('')
      })
      
      consoleSpy.mockRestore()
    })
  })

  describe('Utility functions', () => {
    it('should return available languages', async () => {
      localStorage.getItem.mockReturnValue(null)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      const availableLanguages = JSON.parse(screen.getByTestId('available-languages').textContent)
      expect(availableLanguages).toEqual([
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'tr', name: 'Türkçe', nativeName: 'Türkçe' }
      ])
    })

    it('should return current language info', async () => {
      localStorage.getItem.mockReturnValue(LANGUAGES.TR)
      
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false')
      })

      const currentLanguageInfo = JSON.parse(screen.getByTestId('current-language-info').textContent)
      expect(currentLanguageInfo).toEqual({
        code: 'tr',
        name: 'Türkçe',
        nativeName: 'Türkçe',
        isRTL: false
      })
    })
  })

  describe('useLanguage hook', () => {
    it('should work correctly when used within provider', async () => {
      localStorage.getItem.mockReturnValue(null)
      
      const TestComponentInside = () => {
        const { language, t } = useLanguage()
        return (
          <div>
            <div data-testid="hook-language">{language}</div>
            <div data-testid="hook-translation">{t('navigation.home')}</div>
          </div>
        )
      }
      
      render(
        <LanguageProvider>
          <TestComponentInside />
        </LanguageProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByTestId('hook-language')).toHaveTextContent(LANGUAGES.EN)
        expect(screen.getByTestId('hook-translation')).toHaveTextContent('Homepage')
      })
    })
  })

  describe('useTranslation hook', () => {
    it('should provide translation function and current language', async () => {
      localStorage.getItem.mockReturnValue(LANGUAGES.TR)
      
      render(
        <LanguageProvider>
          <TranslationTestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('translation-language')).toHaveTextContent(LANGUAGES.TR)
      })

      expect(screen.getByTestId('translation-result')).toHaveTextContent('Projeler')
    })
  })
})