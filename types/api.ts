// API and data fetching type definitions
// These types define the structure for API responses and data fetching operations

import { Language, Platform } from './index';
import { Project, Experience, Education, SkillCategory, Leadership } from './content';

// Base API Response Types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
  version?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  path?: string;
  method?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Request Types
export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  timeout?: number;
}

export interface QueryParams {
  language?: Language;
  platform?: Platform;
  featured?: boolean;
  limit?: number;
  offset?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Content API Types
export interface ProjectsApiResponse extends ApiResponse<Project[]> {
  meta: {
    totalProjects: number;
    featuredCount: number;
    platformCounts: Record<Platform, number>;
    lastUpdated: string;
  };
}

export interface ExperiencesApiResponse extends ApiResponse<Experience[]> {
  meta: {
    totalExperiences: number;
    currentPositions: number;
    totalYears: number;
    lastUpdated: string;
  };
}

export interface EducationApiResponse extends ApiResponse<Education[]> {
  meta: {
    totalEducation: number;
    degrees: string[];
    institutions: string[];
    lastUpdated: string;
  };
}

export interface SkillsApiResponse extends ApiResponse<SkillCategory[]> {
  meta: {
    totalSkills: number;
    categories: number;
    skillLevels: Record<string, number>;
    lastUpdated: string;
  };
}

export interface LeadershipApiResponse extends ApiResponse<Leadership[]> {
  meta: {
    totalRoles: number;
    currentRoles: number;
    organizations: string[];
    lastUpdated: string;
  };
}

// Translation API Types
export interface TranslationApiResponse extends ApiResponse<Record<string, any>> {
  meta: {
    language: Language;
    version: string;
    keyCount: number;
    lastUpdated: string;
  };
}

export interface TranslationValidationResponse extends ApiResponse<boolean> {
  validation: {
    isValid: boolean;
    missingKeys: string[];
    extraKeys: string[];
    errors: Array<{
      key: string;
      message: string;
    }>;
  };
}

// Analytics API Types
export interface AnalyticsApiResponse extends ApiResponse<any> {
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    averageSessionDuration: number;
    topPages: Array<{
      path: string;
      views: number;
    }>;
    topCountries: Array<{
      country: string;
      visitors: number;
    }>;
    deviceTypes: Record<string, number>;
    browserTypes: Record<string, number>;
  };
}

// Contact API Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  language?: Language;
  timestamp?: string;
}

export interface ContactApiResponse extends ApiResponse<boolean> {
  meta: {
    messageId: string;
    deliveryStatus: 'sent' | 'pending' | 'failed';
    timestamp: string;
  };
}

// Search API Types
export interface SearchRequest {
  query: string;
  language?: Language;
  types?: Array<'project' | 'experience' | 'education' | 'skill' | 'leadership'>;
  limit?: number;
  offset?: number;
}

export interface SearchResult<T = any> {
  item: T;
  type: string;
  score: number;
  matches: Array<{
    field: string;
    value: string;
    indices: [number, number][];
  }>;
}

export interface SearchApiResponse extends ApiResponse<SearchResult[]> {
  meta: {
    query: string;
    totalResults: number;
    searchTime: number;
    suggestions?: string[];
  };
}

// Cache API Types
export interface CacheEntry<T = any> {
  key: string;
  data: T;
  timestamp: string;
  ttl: number;
  size: number;
}

export interface CacheApiResponse<T = any> extends ApiResponse<T> {
  cache: {
    hit: boolean;
    key: string;
    ttl: number;
    timestamp: string;
  };
}

// Health Check API Types
export interface HealthCheckResponse extends ApiResponse<boolean> {
  health: {
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
    version: string;
    environment: string;
    services: Record<string, {
      status: 'up' | 'down';
      responseTime?: number;
      lastCheck: string;
    }>;
  };
}

// Configuration API Types
export interface ConfigApiResponse extends ApiResponse<any> {
  config: {
    features: Record<string, boolean>;
    limits: Record<string, number>;
    settings: Record<string, any>;
    version: string;
  };
}

// Webhook Types
export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature?: string;
}

export interface WebhookResponse extends ApiResponse<boolean> {
  webhook: {
    processed: boolean;
    eventId: string;
    timestamp: string;
  };
}

// Rate Limiting Types
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

export interface RateLimitedResponse<T = any> extends ApiResponse<T> {
  rateLimit: RateLimitInfo;
}

// API Client Configuration Types
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  interceptors?: {
    request?: (config: ApiRequest) => ApiRequest | Promise<ApiRequest>;
    response?: (response: any) => any | Promise<any>;
    error?: (error: any) => any | Promise<any>;
  };
}

// API Hook Types
export interface UseApiOptions<T = any> {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: number | boolean;
  retryDelay?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export interface UseApiResult<T = any> {
  data: T | undefined;
  error: ApiError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<void>;
  mutate: (data: T) => void;
}

// Mutation Types
export interface UseMutationOptions<TData = any, TVariables = any> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void;
}

export interface UseMutationResult<TData = any, TVariables = any> {
  mutate: (variables: TVariables) => Promise<TData>;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | undefined;
  error: ApiError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}