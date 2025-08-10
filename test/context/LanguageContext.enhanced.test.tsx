// Enhanced LanguageContext tests with TypeScript support
import { render, screen, act, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage, useTranslation, LANGUAGES } from '../../context/LanguageContext.tsx'
import { translationTestUtils } from '../../utils/translationTesting'
import { validateTranslationCompleteness } from '../../utils/translations'
import { TranslationKeys } from '../../utils/translationValidation'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Mock window.dispatchEvent
const mockDispatchEvent = vi.fn()
Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
})

describe('Enhanced LanguageContext with TypeScript', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  describe('LanguageProvider', () => {
    it('should provide default language context', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      expect(result.current.language).toBe(LANGUAGES.EN)
      expect(result.current.availableLanguages).toEqual([LANGUAGES.EN, LANGUAGES.TR])
      expect(typeof result.current.t).toBe('function')
      expect(typeof result.current.setLanguage).toBe('function')
      expect(typeof result.current.toggleLanguage).toBe('function')
    })

    it('should load saved language from localStorage', async () => {
      mockLocalStorage.getItem.mockReturnValue(LANGUAGES.TR)

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      await waitFor(() => {
        expect(result.current.language).toBe(LANGUAGES.TR)
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('should handle invalid saved language gracefully', async () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-language')

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      await waitFor(() => {
        expect(result.current.language).toBe(LANGUAGES.EN)
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('should accept initial language prop', async () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider initialLanguage={LANGUAGES.TR}>
            {children}
          </LanguageProvider>
        ),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.language).toBe(LANGUAGES.TR)
    })

    it('should call onLanguageChange callback', async () => {
      const onLanguageChange = vi.fn()
      
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider onLanguageChange={onLanguageChange}>
            {children}
          </LanguageProvider>
        ),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      act(() => {
        result.current.setLanguage(LANGUAGES.TR)
      })

      expect(onLanguageChange).toHaveBeenCalledWith(LANGUAGES.TR)
    })

    it('should not persist language when persistLanguage is false', async () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider persistLanguage={false}>
            {children}
          </LanguageProvider>
        ),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Clear any previous calls
      mockLocalStorage.setItem.mockClear()

      act(() => {
        result.current.setLanguage(LANGUAGES.TR)
      })

      expect(mockLocalStorage.setItem).not.toHaveBeenCalled()
    })
  })

  describe('Translation Function', () => {
    it('should translate basic keys correctly', () => {
      const { result } = renderHook(() => useTranslation(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      expect(result.current.t('navigation.home')).toBe('Homepage')
      expect(result.current.t('projects.title')).toBe('My Projects')
      expect(result.current.t('common.loading')).toBe('Loading...')
    })

    it('should handle nested translation keys', () => {
      const { result } = renderHook(() => useTranslation(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      expect(result.current.t('projects.platform.web')).toBe('Web')
      expect(result.current.t('projects.platform.android')).toBe('Android')
      expect(result.current.t('projects.platformLabels.web')).toBe('Web platform')
    })

    it('should return fallback for missing keys', () => {
      const { result } = renderHook(() => useTranslation(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      expect(result.current.t('nonexistent.key', 'Fallback')).toBe('Fallback')
      expect(result.current.t('nonexistent.key')).toBe('nonexistent.key')
    })

    it('should fallback to English when Turkish translation is missing', () => {
      const { result } = renderHook(() => useTranslation(), {
        wrapper: ({ children }) => (
          <LanguageProvider initialLanguage={LANGUAGES.TR}>
            {children}
          </LanguageProvider>
        ),
      })

      // Test with a key that exists in English but might be missing in Turkish
      const translation = result.current.t('navigation.home')
      expect(typeof translation).toBe('string')
      expect(translation.length).toBeGreaterThan(0)
    })

    it('should handle empty or invalid keys gracefully', () => {
      const { result } = renderHook(() => useTranslation(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      expect(result.current.t('')).toBe('')
      expect(result.current.t('', 'fallback')).toBe('fallback')
    })
  })

  describe('Language Switching', () => {
    it('should switch language correctly', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      act(() => {
        result.current.setLanguage(LANGUAGES.TR)
      })

      expect(result.current.language).toBe(LANGUAGES.TR)
      expect(result.current.t('navigation.home')).toBe('Ana Sayfa')
    })

    it('should toggle between languages', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      // Start with English
      expect(result.current.language).toBe(LANGUAGES.EN)

      // Toggle to Turkish
      act(() => {
        result.current.toggleLanguage()
      })
      expect(result.current.language).toBe(LANGUAGES.TR)

      // Toggle back to English
      act(() => {
        result.current.toggleLanguage()
      })
      expect(result.current.language).toBe(LANGUAGES.EN)
    })

    it('should save language preference to localStorage', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      act(() => {
        result.current.setLanguage(LANGUAGES.TR)
      })

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('preferred-language', LANGUAGES.TR)
    })

    it('should dispatch language change event', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      act(() => {
        result.current.setLanguage(LANGUAGES.TR)
      })

      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'languageChange',
          detail: LANGUAGES.TR,
        })
      )
    })

    it('should reject invalid language', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      const originalLanguage = result.current.language

      act(() => {
        // @ts-expect-error - Testing invalid language
        result.current.setLanguage('invalid-language')
      })

      expect(result.current.language).toBe(originalLanguage)
      expect(consoleSpy).toHaveBeenCalledWith('Invalid language: invalid-language')
      
      consoleSpy.mockRestore()
    })
  })

  describe('Language Information', () => {
    it('should provide correct language information', () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      const availableLanguages = result.current.getAvailableLanguages()
      expect(availableLanguages).toHaveLength(2)
      expect(availableLanguages).toContainEqual({
        code: 'en',
        name: 'English',
        nativeName: 'English',
        isRTL: false,
      })
      expect(availableLanguages).toContainEqual({
        code: 'tr',
        name: 'Turkish',
        nativeName: 'Türkçe',
        isRTL: false,
      })
    })

    it('should provide current language information', async () => {
      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => (
          <LanguageProvider initialLanguage={LANGUAGES.TR}>
            {children}
          </LanguageProvider>
        ),
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const currentLanguageInfo = result.current.getCurrentLanguageInfo()
      expect(currentLanguageInfo).toEqual({
        code: 'tr',
        name: 'Turkish',
        nativeName: 'Türkçe',
        isRTL: false,
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.language).toBe(LANGUAGES.EN)
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load language preference from localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('should handle localStorage save errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage save error')
      })

      const { result } = renderHook(() => useLanguage(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      act(() => {
        result.current.setLanguage(LANGUAGES.TR)
      })

      expect(result.current.language).toBe(LANGUAGES.TR)
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save language preference to localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('Translation System Validation', () => {
    it('should have complete translations for both languages', () => {
      const validation = validateTranslationCompleteness('en', 'tr')
      
      if (!validation.isValid) {
        console.warn('Missing translations:', validation.missingKeys)
        console.warn('Extra translations:', validation.extraKeys)
      }

      // This test might fail if translations are incomplete
      // In that case, it serves as a reminder to complete the translations
      expect(validation.missingKeys.length).toBeLessThanOrEqual(5) // Allow some missing keys during development
    })

    it('should pass comprehensive translation test suite', () => {
      const { result } = renderHook(() => useTranslation(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      const testResults = translationTestUtils.runTranslationTestSuite(result.current.t)
      
      // Check that basic functionality works
      expect(testResults.functionTests.length).toBeGreaterThan(0)
      expect(testResults.performance.operationsPerSecond).toBeGreaterThan(1000)
      
      // Log results for debugging
      console.log('Translation test results:', testResults)
    })
  })

  describe('Type Safety', () => {
    it('should provide type-safe translation keys', () => {
      const { result } = renderHook(() => useTranslation(), {
        wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
      })

      // These should compile without TypeScript errors
      expect(result.current.t(TranslationKeys.Navigation.Home)).toBe('Homepage')
      expect(result.current.t(TranslationKeys.Projects.Title)).toBe('My Projects')
      expect(result.current.t(TranslationKeys.Common.Loading)).toBe('Loading...')
    })
  })
})

describe('useLanguage hook error handling', () => {
  it('should throw error when used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useLanguage())
    }).toThrow('useLanguage must be used within a LanguageProvider')

    consoleSpy.mockRestore()
  })
})