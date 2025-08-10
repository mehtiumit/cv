// Translation utility functions with TypeScript support
// These utilities provide type-safe translation operations and validation

import { Language } from '@/types'
import { 
  TranslationKeys, 
  TranslationFunction, 
  TranslationError, 
  TranslationValidationResult,
  DeepTranslationKeys,
  TranslationValue
} from '@/types/translations'

// Import translation files for validation
import enTranslations from '../data/translations/en.json'
import trTranslations from '../data/translations/tr.json'

// Translation data with proper typing
const translations: Record<Language, TranslationKeys> = {
  en: enTranslations as TranslationKeys,
  tr: trTranslations as TranslationKeys
}

/**
 * Type-safe translation key validator
 * Ensures that translation keys exist in the translation files
 */
export const validateTranslationKey = (
  key: string,
  translations: Record<string, any>
): boolean => {
  const keys = key.split('.')
  let current: any = translations
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k]
    } else {
      return false
    }
  }
  
  return typeof current === 'string'
}

/**
 * Get nested translation value with type safety
 */
export const getTranslationValue = (
  translations: Record<string, any>,
  key: string
): any => {
  const keys = key.split('.')
  let current: any = translations
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k]
    } else {
      return undefined
    }
  }
  
  return current
}

/**
 * Create a type-safe translation function for a specific language
 */
export const createTypeSafeTranslationFunction = (
  language: Language,
  fallbackLanguage: Language = 'en'
): TranslationFunction => {
  const errors: TranslationError[] = []
  
  const logError = (key: string, lang: Language, fallback: string) => {
    errors.push({
      key,
      language: lang,
      fallback,
      timestamp: new Date()
    })
  }

  const translateFunction: TranslationFunction = (key: string, fallback = ''): string => {
    if (!key) return fallback

    // Try current language first
    const currentValue = getTranslationValue(translations[language], key)
    if (typeof currentValue === 'string') {
      return currentValue
    }

    // Try fallback language
    if (language !== fallbackLanguage) {
      const fallbackValue = getTranslationValue(translations[fallbackLanguage], key)
      if (typeof fallbackValue === 'string') {
        logError(key, language, fallbackValue)
        return fallbackValue
      }
    }

    // Return fallback or key
    const finalFallback = fallback || key
    logError(key, language, finalFallback)
    return finalFallback
  }

  // Add utility methods
  ;(translateFunction as any).getErrors = () => [...errors]
  ;(translateFunction as any).clearErrors = () => errors.length = 0
  ;(translateFunction as any).hasErrors = () => errors.length > 0

  return translateFunction
}

/**
 * Validate translation completeness between languages
 */
export const validateTranslationCompleteness = (
  primaryLang: Language = 'en',
  secondaryLang: Language = 'tr'
): TranslationValidationResult => {
  const primaryTranslations = translations[primaryLang]
  const secondaryTranslations = translations[secondaryLang]
  
  const missingKeys: string[] = []
  const extraKeys: string[] = []
  const errors: TranslationError[] = []

  // Helper function to get all keys from nested object
  const getAllKeys = (obj: any, prefix = ''): string[] => {
    const keys: string[] = []
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          keys.push(...getAllKeys(obj[key], fullKey))
        } else {
          keys.push(fullKey)
        }
      }
    }
    
    return keys
  }

  const primaryKeys = getAllKeys(primaryTranslations)
  const secondaryKeys = getAllKeys(secondaryTranslations)

  // Find missing keys in secondary language
  for (const key of primaryKeys) {
    if (!secondaryKeys.includes(key)) {
      missingKeys.push(key)
      errors.push({
        key,
        language: secondaryLang,
        fallback: getTranslationValue(primaryTranslations, key) as string || '',
        timestamp: new Date()
      })
    }
  }

  // Find extra keys in secondary language
  for (const key of secondaryKeys) {
    if (!primaryKeys.includes(key)) {
      extraKeys.push(key)
    }
  }

  return {
    isValid: missingKeys.length === 0 && extraKeys.length === 0,
    missingKeys,
    extraKeys,
    errors
  }
}

/**
 * Get all available translation keys with type safety
 */
export const getAvailableTranslationKeys = (language: Language = 'en'): string[] => {
  const getAllKeys = (obj: any, prefix = ''): string[] => {
    const keys: string[] = []
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          keys.push(...getAllKeys(obj[key], fullKey))
        } else {
          keys.push(fullKey)
        }
      }
    }
    
    return keys
  }

  return getAllKeys(translations[language])
}

/**
 * Check if a translation key exists in a specific language
 */
export const hasTranslationKey = (key: string, language: Language): boolean => {
  return validateTranslationKey(key, translations[language])
}

/**
 * Get translation statistics for a language
 */
export const getTranslationStats = (language: Language) => {
  const keys = getAvailableTranslationKeys(language)
  const validation = validateTranslationCompleteness('en', language)
  
  return {
    totalKeys: keys.length,
    missingKeys: validation.missingKeys.length,
    extraKeys: validation.extraKeys.length,
    completeness: ((keys.length - validation.missingKeys.length) / keys.length) * 100,
    isComplete: validation.isValid
  }
}

/**
 * Interpolate variables in translation strings
 * Usage: interpolateTranslation("Hello {{name}}", { name: "World" })
 */
export const interpolateTranslation = (
  template: string,
  variables: Record<string, string | number> = {}
): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match
  })
}

/**
 * Pluralization helper for translations
 */
export const pluralize = (
  count: number,
  singular: string,
  plural?: string,
  language: Language = 'en'
): string => {
  if (count === 1) {
    return singular
  }
  
  if (plural) {
    return plural
  }
  
  // Simple pluralization rules
  if (language === 'en') {
    return `${singular}s`
  } else if (language === 'tr') {
    // Turkish doesn't have plural forms for most cases
    return singular
  }
  
  return singular
}

/**
 * Format translation with count and pluralization
 */
export const formatTranslationWithCount = (
  t: TranslationFunction,
  key: string,
  count: number,
  language: Language = 'en'
): string => {
  const translation = t(key)
  const pluralSuffix = t('common.pluralSuffix')
  
  if (language === 'tr') {
    // Turkish doesn't use plural suffixes in most contexts
    return `${count} ${translation}`
  }
  
  const pluralized = count === 1 ? translation : `${translation}${pluralSuffix}`
  return `${count} ${pluralized}`
}

/**
 * Development helper to find unused translation keys
 */
export const findUnusedTranslationKeys = (
  usedKeys: string[],
  language: Language = 'en'
): string[] => {
  const allKeys = getAvailableTranslationKeys(language)
  return allKeys.filter(key => !usedKeys.includes(key))
}

/**
 * Export translation data for external use
 */
export const getTranslationData = (language: Language): TranslationKeys => {
  return translations[language]
}

/**
 * Type-safe translation key builder
 */
export class TranslationKeyBuilder {
  private parts: string[] = []

  navigation() {
    this.parts.push('navigation')
    return this
  }

  projects() {
    this.parts.push('projects')
    return this
  }

  projectDetails() {
    this.parts.push('projectDetails')
    return this
  }

  common() {
    this.parts.push('common')
    return this
  }

  accessibility() {
    this.parts.push('accessibility')
    return this
  }

  key(key: string) {
    this.parts.push(key)
    return this
  }

  build(): string {
    return this.parts.join('.')
  }

  static create() {
    return new TranslationKeyBuilder()
  }
}

// Export commonly used translation key builders
export const tk = TranslationKeyBuilder.create