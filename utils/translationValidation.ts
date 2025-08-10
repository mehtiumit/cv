import { TranslationFile, Language } from '../types/translations';
import { translations, availableLanguages } from '../data/translations';

// Validation error types
export interface ValidationError {
  type: 'missing_key' | 'type_mismatch' | 'empty_value' | 'structure_mismatch';
  language: Language;
  keyPath: string;
  expected?: string;
  actual?: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  summary: {
    totalKeys: number;
    validKeys: number;
    missingKeys: number;
    emptyValues: number;
  };
}

// Deep comparison of object structures
function getObjectPaths(obj: any, prefix = ''): string[] {
  const paths: string[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        paths.push(...getObjectPaths(obj[key], currentPath));
      } else {
        paths.push(currentPath);
      }
    }
  }
  
  return paths;
}

// Get value by path
function getValueByPath(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return current;
}

// Validate translation completeness
export function validateTranslations(): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  // Use English as the reference language
  const referenceLanguage: Language = 'en';
  const referenceTranslation = translations[referenceLanguage];
  const referencePaths = getObjectPaths(referenceTranslation);
  
  let totalKeys = referencePaths.length;
  let validKeys = 0;
  let missingKeys = 0;
  let emptyValues = 0;
  
  // Validate each language against the reference
  for (const language of availableLanguages) {
    if (language === referenceLanguage) continue;
    
    const currentTranslation = translations[language];
    
    for (const path of referencePaths) {
      const referenceValue = getValueByPath(referenceTranslation, path);
      const currentValue = getValueByPath(currentTranslation, path);
      
      // Check if key exists
      if (currentValue === undefined) {
        errors.push({
          type: 'missing_key',
          language,
          keyPath: path,
          message: `Missing translation key: ${path} in ${language}`,
        });
        missingKeys++;
        continue;
      }
      
      // Check if value is empty
      if (typeof currentValue === 'string' && currentValue.trim() === '') {
        warnings.push({
          type: 'empty_value',
          language,
          keyPath: path,
          message: `Empty translation value for key: ${path} in ${language}`,
        });
        emptyValues++;
        continue;
      }
      
      // Check type consistency
      if (typeof referenceValue !== typeof currentValue) {
        errors.push({
          type: 'type_mismatch',
          language,
          keyPath: path,
          expected: typeof referenceValue,
          actual: typeof currentValue,
          message: `Type mismatch for key: ${path} in ${language}. Expected ${typeof referenceValue}, got ${typeof currentValue}`,
        });
        continue;
      }
      
      // Check array length consistency
      if (Array.isArray(referenceValue) && Array.isArray(currentValue)) {
        if (referenceValue.length !== currentValue.length) {
          warnings.push({
            type: 'structure_mismatch',
            language,
            keyPath: path,
            expected: `array length ${referenceValue.length}`,
            actual: `array length ${currentValue.length}`,
            message: `Array length mismatch for key: ${path} in ${language}. Expected ${referenceValue.length} items, got ${currentValue.length}`,
          });
        }
      }
      
      validKeys++;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalKeys,
      validKeys,
      missingKeys,
      emptyValues,
    },
  };
}

// Validate specific language
export function validateLanguage(language: Language): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  
  const referenceLanguage: Language = 'en';
  const referenceTranslation = translations[referenceLanguage];
  const currentTranslation = translations[language];
  const referencePaths = getObjectPaths(referenceTranslation);
  
  let totalKeys = referencePaths.length;
  let validKeys = 0;
  let missingKeys = 0;
  let emptyValues = 0;
  
  for (const path of referencePaths) {
    const referenceValue = getValueByPath(referenceTranslation, path);
    const currentValue = getValueByPath(currentTranslation, path);
    
    if (currentValue === undefined) {
      errors.push({
        type: 'missing_key',
        language,
        keyPath: path,
        message: `Missing translation key: ${path}`,
      });
      missingKeys++;
    } else if (typeof currentValue === 'string' && currentValue.trim() === '') {
      warnings.push({
        type: 'empty_value',
        language,
        keyPath: path,
        message: `Empty translation value for key: ${path}`,
      });
      emptyValues++;
    } else if (typeof referenceValue !== typeof currentValue) {
      errors.push({
        type: 'type_mismatch',
        language,
        keyPath: path,
        expected: typeof referenceValue,
        actual: typeof currentValue,
        message: `Type mismatch for key: ${path}. Expected ${typeof referenceValue}, got ${typeof currentValue}`,
      });
    } else {
      validKeys++;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalKeys,
      validKeys,
      missingKeys,
      emptyValues,
    },
  };
}

// Find missing keys in a specific language
export function findMissingKeys(language: Language): string[] {
  const referenceLanguage: Language = 'en';
  const referenceTranslation = translations[referenceLanguage];
  const currentTranslation = translations[language];
  const referencePaths = getObjectPaths(referenceTranslation);
  
  const missingKeys: string[] = [];
  
  for (const path of referencePaths) {
    const currentValue = getValueByPath(currentTranslation, path);
    if (currentValue === undefined) {
      missingKeys.push(path);
    }
  }
  
  return missingKeys;
}

// Generate validation report
export function generateValidationReport(): string {
  const result = validateTranslations();
  
  let report = '# Translation Validation Report\n\n';
  
  report += `## Summary\n`;
  report += `- Total Keys: ${result.summary.totalKeys}\n`;
  report += `- Valid Keys: ${result.summary.validKeys}\n`;
  report += `- Missing Keys: ${result.summary.missingKeys}\n`;
  report += `- Empty Values: ${result.summary.emptyValues}\n`;
  report += `- Overall Status: ${result.isValid ? '✅ Valid' : '❌ Invalid'}\n\n`;
  
  if (result.errors.length > 0) {
    report += `## Errors (${result.errors.length})\n\n`;
    for (const error of result.errors) {
      report += `- **${error.language}**: ${error.message}\n`;
    }
    report += '\n';
  }
  
  if (result.warnings.length > 0) {
    report += `## Warnings (${result.warnings.length})\n\n`;
    for (const warning of result.warnings) {
      report += `- **${warning.language}**: ${warning.message}\n`;
    }
    report += '\n';
  }
  
  // Language-specific reports
  for (const language of availableLanguages) {
    if (language === 'en') continue;
    
    const langResult = validateLanguage(language);
    report += `## ${language.toUpperCase()} Language Report\n`;
    report += `- Valid Keys: ${langResult.summary.validKeys}/${langResult.summary.totalKeys}\n`;
    report += `- Missing Keys: ${langResult.summary.missingKeys}\n`;
    report += `- Empty Values: ${langResult.summary.emptyValues}\n`;
    report += `- Status: ${langResult.isValid ? '✅ Valid' : '❌ Invalid'}\n\n`;
  }
  
  return report;
}

// Export validation functions
export default {
  validateTranslations,
  validateLanguage,
  findMissingKeys,
  generateValidationReport,
};

// Type-safe translation key constants for tests and developer ergonomics
// Only a subset is defined as tests currently use a few keys. Extend as needed.
export const TranslationKeys = {
  Navigation: {
    Home: 'navigation.home',
    Projects: 'navigation.projects',
  },
  Projects: {
    Title: 'projects.title',
  },
  Common: {
    Loading: 'common.loading',
  },
} as const;