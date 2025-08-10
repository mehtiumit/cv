import { TranslationFile, Language } from '../../types/translations';
import enTranslations from './en.json';
import trTranslations from './tr.json';

// Type-safe translation files
export const translations: Record<Language, TranslationFile> = {
  en: enTranslations as TranslationFile,
  tr: trTranslations as TranslationFile,
};

// Available languages
export const availableLanguages: Language[] = ['en', 'tr'];

// Default language
export const defaultLanguage: Language = 'en';

// Language information
export const languageInfo = {
  en: {
    code: 'en' as Language,
    name: 'English',
    nativeName: 'English',
    isRTL: false,
  },
  tr: {
    code: 'tr' as Language,
    name: 'Turkish',
    nativeName: 'Türkçe',
    isRTL: false,
  },
};

// Helper function to get translation by key path
export function getTranslation(
  language: Language,
  keyPath: string,
  fallback?: string
): string {
  const keys = keyPath.split('.');
  let value: any = translations[language];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Return fallback or key if translation not found
      return fallback || keyPath;
    }
  }
  
  return typeof value === 'string' ? value : fallback || keyPath;
}

// Helper function to get nested object by key path
export function getNestedTranslation(
  language: Language,
  keyPath: string
): any {
  const keys = keyPath.split('.');
  let value: any = translations[language];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return null;
    }
  }
  
  return value;
}

export default translations;