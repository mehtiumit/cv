// Core translation interfaces
export interface LocalizedString {
  en: string;
  tr: string;
}

// Navigation translations
export interface NavigationTranslations {
  home: string;
  projects: string;
  backToHome: string;
  ariaLabel: string;
  returnToHome: string;
  projectsAriaLabel: string;
}

// Projects translations
export interface ProjectTranslations {
  title: string;
  subtitle: string;
  viewProject: string;
  github: string;
  completed: string;
  featured: string;
  loading: string;
  noProjectsFound: string;
  noProjectsInCategory: string;
  noActiveProjects: string;
  skipToContent: string;
  filterHeading: string;
  projectsHeading: string;
  projectList: string;
  showSelectedProjects: string;
  filterApplied: string;
  projectsShowing: string;
  allProjects: string;
  webProjects: string;
  androidProjects: string;
  iosProjects: string;
  platform: {
    all: string;
    web: string;
    android: string;
    ios: string;
  };
  platformLabels: {
    web: string;
    android: string;
    ios: string;
  };
  technologiesUsed: string;
  projectLinks: string;
  viewProjectInNewTab: string;
  viewGithubInNewTab: string;
  projectCompletionDate: string;
  emptyFolderIcon: string;
}

// Project details translations
export interface ProjectDetailsTranslations {
  purpose: string;
  features: string;
  technologies: string;
}

// Individual project data translation
export interface ProjectDataTranslation {
  title: string;
  description: string;
  purpose: string;
  features: string[];
}

// Common translations
export interface CommonTranslations {
  loading: string;
  error: string;
  retry: string;
  close: string;
  open: string;
  save: string;
  cancel: string;
  confirm: string;
  delete: string;
  edit: string;
  add: string;
  remove: string;
  search: string;
  filter: string;
  sort: string;
  next: string;
  previous: string;
  first: string;
  last: string;
  aiGeneratedSummary: string;
  year: string;
  month: string;
  pluralSuffix: string;
}

// Accessibility translations
export interface AccessibilityTranslations {
  skipLink: string;
  mainContent: string;
  navigation: string;
  menu: string;
  closeMenu: string;
  openMenu: string;
  loading: string;
  error: string;
  success: string;
}

// Content translations for hardcoded data
export interface ContentTranslations {
  sectionTitles: {
    education: string;
    workExperience: string;
    leadershipAndActivities: string;
    skillsAndInterests: string;
  };
  contact: {
    location: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  education: Record<string, EducationTranslation>;
  experiences: Record<string, ExperienceTranslation>;
  leadership: Record<string, LeadershipTranslation>;
  skills: SkillsTranslations;
}

// Education translation interface
export interface EducationTranslation {
  school: string;
  location: string;
  degree: string;
  description: string;
  period: string;
}

// Experience translation interface
export interface ExperienceTranslation {
  company: string;
  workType: string;
  position: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
}

// Leadership translation interface
export interface LeadershipTranslation {
  organization: string;
  location: string;
  role: string;
  period: string;
  bulletPoints: string[];
}

// Skills translations interface
export interface SkillsTranslations {
  sections: {
    technical: string;
    language: string;
    interests: string;
  };
  techStack: Record<string, TechStackTranslation>;
  languages: Record<string, LanguageSkillTranslation>;
  interests: Record<string, InterestTranslation>;
}

export interface TechStackTranslation {
  name: string;
  companies: string[];
}

export interface LanguageSkillTranslation {
  name: string;
  level: string;
}

export interface InterestTranslation {
  name: string;
}

// Main translation file interface
export interface TranslationFile {
  navigation: NavigationTranslations;
  projects: ProjectTranslations;
  projectDetails: ProjectDetailsTranslations;
  projectData: Record<string, ProjectDataTranslation>;
  common: CommonTranslations;
  accessibility: AccessibilityTranslations;
  content: ContentTranslations;
}

// Language type
export type Language = 'en' | 'tr';

// Language metadata used by UI and context
export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  isRTL: boolean;
}

// Alias the full translation file shape as TranslationKeys for convenience
export type TranslationKeys = TranslationFile;

// Translation function contract used across app
export type TranslationFunction = ((key: string, fallback?: string) => string) & {
  getErrors?: () => TranslationError[];
  clearErrors?: () => void;
  hasErrors?: () => boolean;
};

// Error model for missing/invalid translations
export interface TranslationError {
  key: string;
  language: Language;
  fallback: string;
  timestamp: Date;
}

// Validation result when comparing translation files
export interface TranslationValidationResult {
  isValid: boolean;
  missingKeys: string[];
  extraKeys: string[];
  errors: TranslationError[];
}

// Utility types to infer nested key paths and values
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

export type DeepTranslationKeys<T> = T extends string
  ? never
  : T extends Array<any>
    ? never
    : {
        [K in keyof T & string]: T[K] extends string
          ? K
          : T[K] extends object
            ? Join<K, DeepTranslationKeys<T[K]>>
            : never
      }[keyof T & string];

export type TranslationValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? TranslationValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

// Translation key paths (for type-safe access)
export type TranslationKeyPath = 
  | `navigation.${keyof NavigationTranslations}`
  | `projects.${keyof ProjectTranslations}`
  | `projectDetails.${keyof ProjectDetailsTranslations}`
  | `common.${keyof CommonTranslations}`
  | `accessibility.${keyof AccessibilityTranslations}`
  | `content.sectionTitles.${keyof ContentTranslations['sectionTitles']}`
  | `content.contact.${keyof ContentTranslations['contact']}`
  | `content.skills.sections.${keyof SkillsTranslations['sections']}`;