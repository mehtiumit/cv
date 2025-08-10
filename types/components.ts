// Component type definitions
// These types define props, state, and event handlers for React components

import React from 'react';
import { Language, Platform, ThemeMode, AsyncState, LoadingState } from './index';
import { Project, Experience, Education, SkillCategory, Leadership, FilterOptions, SortOptions } from './content';
import { TranslationFunction } from './translations';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
}

// Layout component props
export interface LayoutProps extends BaseComponentProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface NavigationProps extends BaseComponentProps {
  currentPath?: string;
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  showLanguageToggle?: boolean;
  showThemeToggle?: boolean;
}

export interface StickyMenuProps extends BaseComponentProps {
  isVisible?: boolean;
  threshold?: number;
  onVisibilityChange?: (visible: boolean) => void;
}

// Language and theme component props
export interface LanguageToggleProps extends BaseComponentProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  availableLanguages?: Language[];
  showLabels?: boolean;
  variant?: 'button' | 'dropdown' | 'switch';
}

export interface ThemeToggleProps extends BaseComponentProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  showLabel?: boolean;
  variant?: 'button' | 'switch' | 'dropdown';
}

// Project component props
export interface ProjectCardProps extends BaseComponentProps {
  project: Project;
  language?: Language;
  showFullDescription?: boolean;
  onProjectClick?: (project: Project) => void;
  onGithubClick?: (project: Project) => void;
  onLiveClick?: (project: Project) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export interface ProjectsGridProps extends BaseComponentProps {
  projects: Project[];
  language?: Language;
  loading?: boolean;
  error?: string | null;
  onProjectClick?: (project: Project) => void;
  emptyStateMessage?: string;
  gridColumns?: number;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
}

export interface ProjectFilterProps extends BaseComponentProps {
  currentPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  projectCounts?: Record<Platform, number>;
  showCounts?: boolean;
  variant?: 'tabs' | 'dropdown' | 'buttons';
}

// Content display component props
export interface ExperienceCardProps extends BaseComponentProps {
  experience: Experience;
  language?: Language;
  showFullDetails?: boolean;
  variant?: 'default' | 'compact' | 'timeline';
  onCompanyClick?: (experience: Experience) => void;
}

export interface EducationCardProps extends BaseComponentProps {
  education: Education;
  language?: Language;
  showFullDetails?: boolean;
  variant?: 'default' | 'compact' | 'timeline';
  onInstitutionClick?: (education: Education) => void;
}

export interface SkillsCardProps extends BaseComponentProps {
  skillCategory: SkillCategory;
  language?: Language;
  showLevels?: boolean;
  showYears?: boolean;
  variant?: 'default' | 'compact' | 'grid' | 'list';
  onSkillClick?: (skill: any) => void;
}

export interface LeadershipCardProps extends BaseComponentProps {
  leadership: Leadership;
  language?: Language;
  showFullDetails?: boolean;
  variant?: 'default' | 'compact' | 'timeline';
  onOrganizationClick?: (leadership: Leadership) => void;
}

// Animation component props
export interface AnimatedNameProps extends BaseComponentProps {
  name: string;
  delay?: number;
  duration?: number;
  variant?: 'typewriter' | 'fade' | 'slide' | 'bounce';
  onAnimationComplete?: () => void;
}

export interface AnimatedTitleProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  delay?: number;
  duration?: number;
  variant?: 'fade' | 'slide' | 'scale' | 'rotate';
  onAnimationComplete?: () => void;
}

// UI component props
export interface InfoButtonProps extends BaseComponentProps {
  content: string | React.ReactNode;
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface ContactCardProps extends BaseComponentProps {
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  showLabels?: boolean;
  variant?: 'default' | 'compact' | 'horizontal';
}

export interface ScrollProgressBarProps extends BaseComponentProps {
  target?: string | HTMLElement;
  height?: number;
  color?: string;
  backgroundColor?: string;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
}

// Modal and overlay component props
export interface SummaryModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | React.ReactNode;
  language?: Language;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface SkeletonLoaderProps extends BaseComponentProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

// Provider component props
export interface ProvidersProps extends BaseComponentProps {
  initialLanguage?: Language;
  initialTheme?: ThemeMode;
  enableAnalytics?: boolean;
  enableErrorBoundary?: boolean;
}

export interface ClientLayoutProps extends BaseComponentProps {
  showNavigation?: boolean;
  showFooter?: boolean;
  enableScrollProgress?: boolean;
  enableBackToTop?: boolean;
}

export interface DynamicLayoutProps extends BaseComponentProps {
  variant?: 'default' | 'minimal' | 'full-width';
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

// Context provider props (basic versions - full versions in context.ts)
export interface ComponentLanguageProviderProps extends BaseComponentProps {
  initialLanguage?: Language;
  persistLanguage?: boolean;
  onLanguageChange?: (language: Language) => void;
}

export interface ComponentAnimationProviderProps extends BaseComponentProps {
  enableAnimations?: boolean;
  reducedMotion?: boolean;
  globalDelay?: number;
  onAnimationStateChange?: (enabled: boolean) => void;
}

// Form component props
export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export interface SearchInputProps extends FormFieldProps {
  onSearch: (query: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  showClearButton?: boolean;
  showSearchIcon?: boolean;
}

// Event handler types
export type ComponentEventHandler<T = any> = (event: React.SyntheticEvent, data?: T) => void;
export type KeyboardEventHandler = (event: React.KeyboardEvent) => void;
export type MouseEventHandler = (event: React.MouseEvent) => void;
export type FocusEventHandler = (event: React.FocusEvent) => void;
export type ChangeEventHandler<T = any> = (value: T, event?: React.ChangeEvent) => void;

// Component state types
export interface ComponentState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

export interface InteractiveState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isDisabled: boolean;
}

export interface VisibilityState {
  isVisible: boolean;
  isInViewport: boolean;
  intersectionRatio: number;
}

// Component configuration types
export interface ComponentConfig {
  enableAnimations: boolean;
  enableAccessibility: boolean;
  enableAnalytics: boolean;
  debugMode: boolean;
  theme: ThemeMode;
  language: Language;
}

// Accessibility types
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-busy'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-disabled'?: boolean;
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-pressed'?: boolean;
  'aria-selected'?: boolean;
  role?: string;
  tabIndex?: number;
}

// Performance and optimization types
export interface ComponentPerformanceMetrics {
  renderTime: number;
  mountTime: number;
  updateCount: number;
  lastRenderTimestamp: number;
  memoryUsage?: number;
}

export interface LazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  placeholder?: React.ReactNode;
  fallback?: React.ReactNode;
}

// Testing types
export interface ComponentTestProps {
  'data-testid'?: string;
  'data-test-state'?: string;
  'data-test-variant'?: string;
  'data-test-loading'?: boolean;
  'data-test-error'?: boolean;
}

// Generic component types
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

// Higher-order component types
export interface WithLoadingProps {
  loading?: boolean;
  loadingComponent?: React.ComponentType;
  loadingText?: string;
}

export interface WithErrorProps {
  error?: string | Error | null;
  errorComponent?: React.ComponentType<{ error: string | Error }>;
  onRetry?: () => void;
}

export interface WithTranslationProps {
  t: TranslationFunction;
  language: Language;
  changeLanguage: (language: Language) => void;
}