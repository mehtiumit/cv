// Content data type definitions
// These types define the structure for all content data in the application

import { Language, Platform, DateString } from './index';
import type { LocalizedString } from './translations';

// Uses LocalizedString from translations.ts

// Base content interface with multilingual support
export interface BaseContent {
  id: string;
  createdAt?: DateString;
  updatedAt?: DateString;
}

// Project data types
export interface Project extends BaseContent {
  title: string; // Will be localized through translation system
  description: string; // Will be localized through translation system
  purpose: string; // Will be localized through translation system
  features: string[]; // Will be localized through translation system
  platform: Platform;
  technologies: string[];
  link?: string;
  githubLink?: string;
  featured: boolean;
  completionDate: string;
  imageUrl?: string;
  demoUrl?: string;
  status: ProjectStatus;
}

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'archived';

// Localized project interface for future multilingual data structure
export interface LocalizedProject extends BaseContent {
  title: LocalizedString;
  description: LocalizedString;
  purpose: LocalizedString;
  features: LocalizedString[];
  platform: Platform;
  technologies: string[];
  link?: string;
  githubLink?: string;
  featured: boolean;
  completionDate: string;
  imageUrl?: string;
  demoUrl?: string;
  status: ProjectStatus;
}

// Experience data types
export interface Experience extends BaseContent {
  company: LocalizedString;
  workType: LocalizedString;
  position: LocalizedString;
  startDate: DateString;
  endDate: DateString | 'present';
  bulletPoints: LocalizedString[];
  location?: LocalizedString;
  technologies?: string[];
  companyUrl?: string;
  companyLogo?: string;
  isCurrentPosition: boolean;
}

// Education data types
export interface Education extends BaseContent {
  institution: LocalizedString;
  degree: LocalizedString;
  field: LocalizedString;
  startDate: DateString;
  endDate: DateString;
  gpa?: string;
  achievements?: LocalizedString[];
  location?: LocalizedString;
  institutionUrl?: string;
  institutionLogo?: string;
  honors?: LocalizedString[];
}

// Skills data types
export interface SkillCategory extends BaseContent {
  name: LocalizedString;
  skills: SkillItem[];
  icon?: string;
  order: number;
}

export interface SkillItem {
  id: string;
  name: LocalizedString;
  level?: SkillLevel;
  years?: number;
  description?: LocalizedString;
  icon?: string;
  category?: string;
  isHighlighted?: boolean;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Leadership data types
export interface Leadership extends BaseContent {
  organization: LocalizedString;
  role: LocalizedString;
  description: LocalizedString;
  startDate: DateString;
  endDate: DateString | 'present';
  achievements?: LocalizedString[];
  organizationUrl?: string;
  organizationLogo?: string;
  isCurrentRole: boolean;
  type: LeadershipType;
}

export type LeadershipType = 'volunteer' | 'professional' | 'academic' | 'community';

// Contact information types
export interface ContactInfo {
  email: string;
  phone?: string;
  location: LocalizedString;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  resume?: string;
}

// Personal information types
export interface PersonalInfo {
  name: string;
  title: LocalizedString;
  bio: LocalizedString;
  avatar?: string;
  backgroundImage?: string;
  tagline?: LocalizedString;
  interests?: LocalizedString[];
  languages: LanguageSkill[];
}

export interface LanguageSkill {
  language: string;
  level: LanguageProficiency;
  nativeName: string;
}

export type LanguageProficiency = 'native' | 'fluent' | 'advanced' | 'intermediate' | 'beginner';

// Portfolio data aggregation types
export interface PortfolioData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  leadership: Leadership[];
}

// Data filtering and sorting types
export interface FilterOptions {
  platform?: Platform;
  featured?: boolean;
  status?: ProjectStatus;
  skillLevel?: SkillLevel;
  dateRange?: {
    start: DateString;
    end: DateString;
  };
  technologies?: string[];
  searchQuery?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Data access utility types
export interface DataAccessOptions {
  language?: Language;
  filters?: FilterOptions;
  sort?: SortOptions;
  limit?: number;
  offset?: number;
}

// Content validation types
export interface ContentValidationRule {
  field: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => boolean;
}

export interface ContentValidationResult {
  isValid: boolean;
  errors: ContentValidationError[];
}

export interface ContentValidationError {
  field: string;
  message: string;
  value: any;
  rule: ContentValidationRule;
}

// Content metadata types
export interface ContentMetadata {
  version: string;
  lastUpdated: DateString;
  author: string;
  language: Language;
  tags?: string[];
  category?: string;
}

// Content export/import types
export interface ContentExportOptions {
  format: 'json' | 'csv' | 'xml' | 'yaml';
  language?: Language;
  includeMetadata?: boolean;
  fields?: string[];
}

export interface ContentImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: ContentValidationError[];
}

// Search and indexing types
export interface SearchableContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  content: string;
  tags: string[];
  language: Language;
  lastModified: DateString;
}

export type ContentType = 'project' | 'experience' | 'education' | 'skill' | 'leadership';

export interface ContentSearchResult {
  item: SearchableContent;
  score: number;
  matches: ContentSearchMatch[];
}

export interface ContentSearchMatch {
  field: string;
  value: string;
  indices: [number, number][];
}

// Analytics and tracking types
export interface ContentAnalytics {
  views: number;
  interactions: number;
  lastViewed: DateString;
  popularityScore: number;
  engagementRate: number;
}

// Content caching types
export interface ContentCacheEntry<T = any> {
  data: T;
  timestamp: DateString;
  ttl: number;
  key: string;
}

export interface ContentCacheOptions {
  ttl?: number;
  maxSize?: number;
  strategy?: 'lru' | 'fifo' | 'ttl';
}