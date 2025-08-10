// Translation testing utilities
// These utilities help test translation functionality and completeness

import { Language } from '@/types'
import { 
  TranslationKeys, 
  TranslationFunction, 
  TranslationError,
  TranslationValidationResult 
} from '@/types/translations'
import { validateTranslationCompleteness, getTranslationStats } from './translations'

/**
 * Mock translation function for testing
 */
export const createMockTranslationFunction = (
  mockTranslations: Partial<Record<string, string>> = {}
): TranslationFunction => {
  const errors: TranslationError[] = []

  const mockT: TranslationFunction = (key: string, fallback = ''): string => {
    if (mockTranslations[key]) {
      return mockTranslations[key]!
    }

    const error: TranslationError = {
      key,
      language: 'en',
      fallback: fallback || key,
      timestamp: new Date()
    }
    errors.push(error)

    return fallback || key
  }

  // Add utility methods
  ;(mockT as any).getErrors = () => [...errors]
  ;(mockT as any).clearErrors = () => errors.length = 0
  ;(mockT as any).hasErrors = () => errors.length > 0

  return mockT
}

/**
 * Test translation key existence across all languages
 */
export const testTranslationKeyExistence = (
  keys: string[],
  languages: Language[] = ['en', 'tr']
): Record<Language, string[]> => {
  const results: Record<Language, string[]> = {} as Record<Language, string[]>

  for (const language of languages) {
    const validation = validateTranslationCompleteness('en', language)
    const missingKeys = keys.filter(key => 
      validation.missingKeys.includes(key)
    )
    results[language] = missingKeys
  }

  return results
}

/**
 * Generate translation coverage report
 */
export const generateTranslationCoverageReport = (
  languages: Language[] = ['en', 'tr']
): Record<Language, ReturnType<typeof getTranslationStats>> => {
  const report: Record<Language, ReturnType<typeof getTranslationStats>> = {} as any

  for (const language of languages) {
    report[language] = getTranslationStats(language)
  }

  return report
}

/**
 * Test translation function with various scenarios
 */
export const testTranslationFunction = (
  t: TranslationFunction,
  testCases: Array<{
    key: string
    expected?: string
    fallback?: string
    description: string
  }>
): Array<{
  key: string
  expected?: string | undefined
  actual: string
  passed: boolean
  description: string
}> => {
  return testCases.map(testCase => {
    const actual = t(testCase.key, testCase.fallback)
    const passed = testCase.expected ? actual === testCase.expected : actual !== testCase.key

    return {
      key: testCase.key,
      expected: testCase.expected,
      actual,
      passed,
      description: testCase.description
    }
  })
}

/**
 * Validate translation interpolation
 */
export const testTranslationInterpolation = (
  template: string,
  variables: Record<string, string | number>,
  expected: string
): boolean => {
  const result = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match
  })

  return result === expected
}

/**
 * Test pluralization rules
 */
export const testPluralization = (
  language: Language,
  testCases: Array<{
    count: number
    singular: string
    plural?: string
    expected: string
  }>
): Array<{
  count: number
  singular: string
  plural?: string
  expected: string
  actual: string
  passed: boolean
}> => {
  return testCases.map(testCase => {
    let actual: string

    if (testCase.count === 1) {
      actual = testCase.singular
    } else if (testCase.plural) {
      actual = testCase.plural
    } else if (language === 'en') {
      actual = `${testCase.singular}s`
    } else {
      actual = testCase.singular
    }

    return {
      ...testCase,
      actual,
      passed: actual === testCase.expected
    }
  })
}

/**
 * Performance test for translation function
 */
export const performanceTestTranslation = (
  t: TranslationFunction,
  keys: string[],
  iterations: number = 1000
): {
  totalTime: number
  averageTime: number
  operationsPerSecond: number
} => {
  const startTime = performance.now()

  for (let i = 0; i < iterations; i++) {
    for (const key of keys) {
      t(key)
    }
  }

  const endTime = performance.now()
  const totalTime = endTime - startTime
  const totalOperations = iterations * keys.length
  const averageTime = totalTime / totalOperations
  const operationsPerSecond = 1000 / averageTime

  return {
    totalTime,
    averageTime,
    operationsPerSecond
  }
}

/**
 * Memory usage test for translation system
 */
export const memoryTestTranslation = (
  createTranslationFunction: () => TranslationFunction,
  iterations: number = 100
): {
  initialMemory: number
  finalMemory: number
  memoryIncrease: number
} => {
  // Force garbage collection if available
  if (global.gc) {
    global.gc()
  }

  const initialMemory = process.memoryUsage().heapUsed

  // Create and use translation functions
  const functions: TranslationFunction[] = []
  for (let i = 0; i < iterations; i++) {
    const t = createTranslationFunction()
    functions.push(t)
    
    // Use the function to ensure it's not optimized away
    t('common.loading')
    t('navigation.home')
    t('projects.title')
  }

  // Force garbage collection if available
  if (global.gc) {
    global.gc()
  }

  const finalMemory = process.memoryUsage().heapUsed
  const memoryIncrease = finalMemory - initialMemory

  return {
    initialMemory,
    finalMemory,
    memoryIncrease
  }
}

/**
 * Comprehensive translation system test suite
 */
export const runTranslationTestSuite = (
  t: TranslationFunction,
  languages: Language[] = ['en', 'tr']
): {
  keyExistence: Record<Language, string[]>
  coverage: Record<Language, ReturnType<typeof getTranslationStats>>
  functionTests: ReturnType<typeof testTranslationFunction>
  performance: ReturnType<typeof performanceTestTranslation>
  validation: TranslationValidationResult
} => {
  // Common test keys
  const testKeys = [
    'navigation.home',
    'navigation.projects',
    'projects.title',
    'projects.loading',
    'common.error',
    'common.loading',
    'accessibility.skipLink'
  ]

  // Test cases for translation function
  const testCases = [
    {
      key: 'navigation.home',
      description: 'Basic navigation key'
    },
    {
      key: 'nonexistent.key',
      fallback: 'Fallback text',
      expected: 'Fallback text',
      description: 'Non-existent key with fallback'
    },
    {
      key: '',
      fallback: 'Empty key fallback',
      expected: 'Empty key fallback',
      description: 'Empty key'
    }
  ]

  return {
    keyExistence: testTranslationKeyExistence(testKeys, languages),
    coverage: generateTranslationCoverageReport(languages),
    functionTests: testTranslationFunction(t, testCases),
    performance: performanceTestTranslation(t, testKeys),
    validation: validateTranslationCompleteness()
  }
}

/**
 * Export test utilities for Jest/Vitest
 */
export const translationTestUtils = {
  createMockTranslationFunction,
  testTranslationKeyExistence,
  generateTranslationCoverageReport,
  testTranslationFunction,
  testTranslationInterpolation,
  testPluralization,
  performanceTestTranslation,
  memoryTestTranslation,
  runTranslationTestSuite
}