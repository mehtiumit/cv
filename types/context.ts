// Context type definitions
// These types define the structure for React contexts used in the application

import React from 'react';
import { Language, ThemeMode } from './index';
import { TranslationFunction, LanguageInfo } from './translations';

// Language Context Types
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: TranslationFunction;
  isLoading: boolean;
  getAvailableLanguages: () => LanguageInfo[];
  getCurrentLanguageInfo: () => LanguageInfo;
  availableLanguages: Language[];
}

export interface LanguageContextProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
  persistLanguage?: boolean;
  onLanguageChange?: (language: Language) => void;
}

// Theme Context Types
export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
  systemTheme: 'light' | 'dark';
}

export interface ThemeContextProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
  persistTheme?: boolean;
  onThemeChange?: (theme: ThemeMode) => void;
}

// Animation Context Types
export interface AnimationContextType {
  enableAnimations: boolean;
  setEnableAnimations: (enabled: boolean) => void;
  toggleAnimations: () => void;
  reducedMotion: boolean;
  globalDelay: number;
  setGlobalDelay: (delay: number) => void;
  animationState: AnimationState;
}

export interface AnimationState {
  isAnimating: boolean;
  activeAnimations: number;
  queuedAnimations: number;
}

export interface AnimationContextProviderProps {
  children: React.ReactNode;
  enableAnimations?: boolean;
  reducedMotion?: boolean;
  globalDelay?: number;
  onAnimationStateChange?: (enabled: boolean) => void;
}

// Data Context Types (for future use)
export interface DataContextType {
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export interface DataContextProviderProps {
  children: React.ReactNode;
  enableCaching?: boolean;
  cacheTimeout?: number;
  onError?: (error: Error) => void;
}

// Combined App Context Type
export interface AppContextType {
  language: LanguageContextType;
  theme: ThemeContextType;
  animation: AnimationContextType;
  data?: DataContextType;
}

// Context Hook Types
export type UseLanguageHook = () => LanguageContextType;
export type UseThemeHook = () => ThemeContextType;
export type UseAnimationHook = () => AnimationContextType;
export type UseDataHook = () => DataContextType;
export type UseAppHook = () => AppContextType;