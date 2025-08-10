// Main type exports for the application
// This file serves as the central export point for all type definitions

// Core type definitions
export * from './translations';
export * from './content';
export * from './components';
export * from './context';

// Selective exports to avoid conflicts
export type {
  // Utils types (avoiding conflicts)
  DeepPartial,
  DeepRequired,
  Nullable,
  Maybe,
  NonEmptyArray,
  ReadonlyRecord,
  AsyncFunction,
  SyncFunction,
  VoidFunction,
  AsyncVoidFunction,
  EventCallback,
  AsyncEventCallback,
  DataTransformer,
  AsyncDataTransformer,
  ValidationRule,
  AsyncValidationRule,
  ValidationSchema,
  DateFormatOptions,
  NumberFormatOptions,
  TextFormatOptions,
  UrlParams,
  StorageOptions,
  StorageItem,
  PerformanceMetrics,
  PerformanceOptions,
  DebounceOptions,
  ThrottleOptions,
  DebouncedFunction,
  ThrottledFunction,
  ErrorInfo,
  ErrorHandler,
  RetryOptions,
  FetchOptions,
  FetchResponse,
  LocalizationOptions,
  LocalizedContent,
  LocalizationKey,
  LocalizationValue,
  LocalizationVariables,
  SearchOptions,
  FilterFunction,
  SortFunction,
  ProcessingOptions,
  ProcessingResult,
  DeviceInfo,
  BrowserCapabilities,
  ColorRGB,
  ColorHSL,
  ColorHex,
  ColorFormat,
  FileInfo,
  FileProcessingOptions,
  ProjectUtilityFunction,
  ExperienceUtilityFunction,
  EducationUtilityFunction,
  SkillUtilityFunction,
  LeadershipUtilityFunction,
  DataMapper,
  DataFilter,
  DataSorter,
  DataGrouper,
  DataAggregator
} from './utils';

export type {
  // API types (avoiding conflicts)
  ApiError,
  ApiRequest,
  QueryParams as ApiQueryParams,
  ProjectsApiResponse,
  ExperiencesApiResponse,
  EducationApiResponse,
  SkillsApiResponse,
  LeadershipApiResponse,
  TranslationApiResponse,
  TranslationValidationResponse,
  AnalyticsApiResponse,
  ContactFormData,
  ContactApiResponse,
  SearchRequest,
  SearchApiResponse,
  CacheApiResponse,
  HealthCheckResponse,
  ConfigApiResponse,
  WebhookPayload,
  WebhookResponse,
  RateLimitInfo,
  RateLimitedResponse,
  ApiClientConfig,
  UseApiOptions,
  UseApiResult,
  UseMutationOptions,
  UseMutationResult
} from './api';

export type {
  // Validator types
  ValidationResult as ValidatorResult,
  ValidationError as ValidatorError,
  ValidationWarning
} from './validators';

// Re-export validator functions
export {
  isValidLanguage,
  isValidPlatform,
  isValidLocalizedString,
  isValidProject,
  isValidExperience,
  isValidEducation,
  isValidSkillCategory,
  isValidLeadership,
  isValidTranslationKeys,
  validateRequired,
  validateString,
  validateNumber,
  validateBoolean,
  validateArray,
  validateObject,
  validateEnum,
  validateDate,
  validateUrl,
  validateEmail,
  ValidationContext
} from './validators';

// Re-export translation utilities (kept minimal to avoid missing symbols)
export type { TranslationKeyPath } from './translations';

// Language and localization types
export type Language = 'en' | 'tr';



// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Platform types
export type Platform = 'web' | 'android' | 'ios' | 'all';

// Date and time types
export type DateString = string; // ISO date string format
export type TimestampString = string; // ISO timestamp string format

// Generic API response types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface ValidationError extends AppError {
  field: string;
  value: any;
}

// Loading and async state types
export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: string;
  accentColor?: string;
}