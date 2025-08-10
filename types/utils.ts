// Utility type definitions
// These types support utility functions, helpers, and common patterns

import { Language, Platform, DateString } from './index';
import { Project, Experience, Education, SkillCategory, Leadership } from './content';

// Generic utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type NonEmptyArray<T> = [T, ...T[]];
export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<Record<K, V>>;

// Function utility types
export type AsyncFunction<T = any, R = any> = (...args: T[]) => Promise<R>;
export type SyncFunction<T = any, R = any> = (...args: T[]) => R;
export type VoidFunction = () => void;
export type AsyncVoidFunction = () => Promise<void>;

export type EventCallback<T = any> = (data: T) => void;
export type AsyncEventCallback<T = any> = (data: T) => Promise<void>;

// Data transformation types
export interface DataTransformer<TInput, TOutput> {
  transform: (input: TInput) => TOutput;
  reverse?: (output: TOutput) => TInput;
}

export interface AsyncDataTransformer<TInput, TOutput> {
  transform: (input: TInput) => Promise<TOutput>;
  reverse?: (output: TOutput) => Promise<TInput>;
}

// Validation utility types
export type ValidationRule<T = any> = (value: T) => boolean | string;
export type AsyncValidationRule<T = any> = (value: T) => Promise<boolean | string>;

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  warnings?: Record<string, string[]>;
}

// Formatting utility types
export interface DateFormatOptions {
  locale?: string;
  format?: 'short' | 'medium' | 'long' | 'full' | 'relative';
  includeTime?: boolean;
  timezone?: string;
}

export interface NumberFormatOptions {
  locale?: string;
  style?: 'decimal' | 'currency' | 'percent';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface TextFormatOptions {
  maxLength?: number;
  ellipsis?: boolean;
  preserveWhitespace?: boolean;
  stripHtml?: boolean;
}

// URL and routing utility types
export interface UrlParams {
  [key: string]: string | string[] | undefined;
}

export interface UtilQueryParams {
  [key: string]: string | number | boolean | string[] | number[] | boolean[] | undefined;
}

export interface RouteInfo {
  path: string;
  params: UrlParams;
  query: UtilQueryParams;
  hash?: string;
  isActive: boolean;
}

// Storage utility types
export interface StorageOptions {
  prefix?: string;
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
  ttl?: number;
  encrypt?: boolean;
}

export interface StorageItem<T = any> {
  value: T;
  timestamp: number;
  ttl?: number;
  encrypted?: boolean;
}

// Performance utility types
export interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  memoryUsage?: {
    used: number;
    total: number;
  };
  renderCount?: number;
}

export interface PerformanceOptions {
  enableProfiling?: boolean;
  sampleRate?: number;
  maxSamples?: number;
  includeMemory?: boolean;
}

// Debounce and throttle utility types
export interface DebounceOptions {
  delay: number;
  immediate?: boolean;
  maxWait?: number;
}

export interface ThrottleOptions {
  delay: number;
  leading?: boolean;
  trailing?: boolean;
}

export type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
  pending: () => boolean;
};

export type ThrottledFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

// Error handling utility types
export interface ErrorInfo {
  message: string;
  code?: string | number;
  stack?: string;
  timestamp: Date;
  context?: Record<string, any>;
}

export interface ErrorHandler {
  handle: (error: Error, context?: Record<string, any>) => void;
  shouldHandle?: (error: Error) => boolean;
}

export interface RetryOptions {
  maxAttempts: number;
  delay: number;
  backoff?: 'linear' | 'exponential';
  maxDelay?: number;
  shouldRetry?: (error: Error, attempt: number) => boolean;
}

// Data fetching utility types
export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  baseURL?: string;
  params?: UtilQueryParams;
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer';
}

export interface FetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

// Localization utility types
export interface LocalizationOptions {
  language: Language;
  fallbackLanguage?: Language;
  interpolation?: boolean;
  pluralization?: boolean;
  dateFormat?: DateFormatOptions;
  numberFormat?: NumberFormatOptions;
}

export type LocalizedContent<T = string> = {
  [K in Language]?: T;
};

export type LocalizationKey = string;
export type LocalizationValue = string | number | boolean | Date;
export type LocalizationVariables = Record<string, LocalizationValue>;

// Search and filtering utility types
export interface SearchOptions {
  query: string;
  fields?: string[];
  caseSensitive?: boolean;
  exactMatch?: boolean;
  fuzzy?: boolean;
  threshold?: number;
  maxResults?: number;
}

export interface UtilSearchResult<T = any> {
  item: T;
  score: number;
  matches: UtilSearchMatch[];
}

export interface UtilSearchMatch {
  field: string;
  value: string;
  indices: [number, number][];
  score: number;
}

export interface FilterFunction<T = any> {
  (item: T, index: number, array: T[]): boolean;
}

export interface SortFunction<T = any> {
  (a: T, b: T): number;
}

// Data processing utility types
export interface ProcessingOptions {
  batchSize?: number;
  parallel?: boolean;
  maxConcurrency?: number;
  onProgress?: (processed: number, total: number) => void;
  onError?: (error: Error, item: any, index: number) => void;
}

export interface ProcessingResult<T = any> {
  processed: T[];
  errors: Array<{ error: Error; item: any; index: number }>;
  totalProcessed: number;
  totalErrors: number;
  duration: number;
}

// Cache utility types
export interface UtilCacheEntry<T = any> {
  key: string;
  value: T;
  timestamp: number;
  ttl?: number;
  size?: number;
}

export interface UtilCacheOptions {
  maxSize?: number;
  maxAge?: number;
  strategy?: 'lru' | 'lfu' | 'fifo' | 'ttl';
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  memoryUsage: number;
}

// Animation utility types
export interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string | ((t: number) => number);
  iterations?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface UtilAnimationState {
  isAnimating: boolean;
  progress: number;
  currentIteration: number;
  direction: 'forward' | 'backward';
}

// Device and browser utility types
export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  os: string;
  browser: string;
  version: string;
  touchSupported: boolean;
  screenSize: {
    width: number;
    height: number;
  };
}

export interface BrowserCapabilities {
  webGL: boolean;
  webWorkers: boolean;
  serviceWorkers: boolean;
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  geolocation: boolean;
  notifications: boolean;
}

// Color utility types
export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorHSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorHex {
  hex: string;
}

export type ColorFormat = ColorRGB | ColorHSL | ColorHex;

// File utility types
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  extension: string;
}

export interface FileProcessingOptions {
  maxSize?: number;
  allowedTypes?: string[];
  quality?: number;
  resize?: {
    width?: number;
    height?: number;
    maintainAspectRatio?: boolean;
  };
}

// Utility function types for specific domains
export type ProjectUtilityFunction = (projects: Project[], language?: Language) => Project[];
export type ExperienceUtilityFunction = (experiences: Experience[], language?: Language) => Experience[];
export type EducationUtilityFunction = (education: Education[], language?: Language) => Education[];
export type SkillUtilityFunction = (skills: SkillCategory[], language?: Language) => SkillCategory[];
export type LeadershipUtilityFunction = (leadership: Leadership[], language?: Language) => Leadership[];

// Generic data manipulation types
export type DataMapper<TInput, TOutput> = (input: TInput) => TOutput;
export type DataFilter<T> = (item: T) => boolean;
export type DataSorter<T> = (a: T, b: T) => number;
export type DataGrouper<T, K extends string | number | symbol> = (item: T) => K;
export type DataAggregator<T, R> = (items: T[]) => R;