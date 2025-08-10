// Global type declarations
// This file contains global type definitions and module declarations

import { Language, ThemeMode } from './index';

// Global namespace declarations
declare global {
  // Window object extensions
  interface Window {
    // Analytics
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    
    // Theme and language preferences
    __THEME_PREFERENCE__?: ThemeMode;
    __LANGUAGE_PREFERENCE__?: Language;
    
    // Performance monitoring
    __PERFORMANCE_OBSERVER__?: PerformanceObserver;
    
    // Development tools
    __DEV_TOOLS__?: {
      language: Language;
      theme: ThemeMode;
      debug: boolean;
    };
  }

  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_ANALYTICS_ENABLED?: string;
      NEXT_PUBLIC_DEBUG_MODE?: string;
      NEXT_PUBLIC_DEFAULT_LANGUAGE?: Language;
      NEXT_PUBLIC_DEFAULT_THEME?: ThemeMode;
    }
  }
}

// Module declarations for assets and files
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}

declare module '*.woff' {
  const content: string;
  export default content;
}

declare module '*.woff2' {
  const content: string;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '*.eot' {
  const content: string;
  export default content;
}

// CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// JSON files
declare module '*.json' {
  const content: any;
  export default content;
}

// Markdown files
declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.mdx' {
  const content: React.ComponentType;
  export default content;
}

// Web Workers
declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}

// Service Workers
declare module '*.sw.ts' {
  const content: string;
  export default content;
}

// Utility type augmentations
declare module 'react' {
  // Custom hook types
  interface HTMLAttributes<T> {
    'data-testid'?: string;
    'data-test-state'?: string;
    'data-language'?: Language;
    'data-theme'?: ThemeMode;
  }
}

// Next.js specific augmentations
declare module 'next' {
  interface NextPageContext {
    language?: Language;
    theme?: ThemeMode;
  }
}

declare module 'next/app' {
  interface AppProps {
    language?: Language;
    theme?: ThemeMode;
  }
}

// CSS-in-JS library augmentations (if using styled-components or emotion)
declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ThemeMode;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      accent: string;
      success: string;
      warning: string;
      error: string;
    };
    fonts: {
      primary: string;
      secondary: string;
      mono: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    animations: {
      fast: string;
      normal: string;
      slow: string;
    };
  }
}

// Performance API augmentations
declare interface Performance {
  measureUserAgentSpecificMemory?: () => Promise<{
    bytes: number;
    breakdown: Array<{
      bytes: number;
      attribution: Array<{
        url: string;
        scope: string;
      }>;
    }>;
  }>;
}

// Intersection Observer API (for older browsers)
declare interface IntersectionObserverEntry {
  readonly boundingClientRect: DOMRectReadOnly;
  readonly intersectionRatio: number;
  readonly intersectionRect: DOMRectReadOnly;
  readonly isIntersecting: boolean;
  readonly rootBounds: DOMRectReadOnly | null;
  readonly target: Element;
  readonly time: number;
}

// Web Animations API
declare interface Element {
  animate?: (
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options?: number | KeyframeAnimationOptions
  ) => Animation;
}

// Custom events
declare interface CustomEventMap {
  'language-change': CustomEvent<{ language: Language; previousLanguage: Language }>;
  'theme-change': CustomEvent<{ theme: ThemeMode; previousTheme: ThemeMode }>;
  'animation-toggle': CustomEvent<{ enabled: boolean }>;
  'performance-metric': CustomEvent<{ metric: string; value: number; timestamp: number }>;
}

declare interface Document {
  addEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: Document, ev: CustomEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: Document, ev: CustomEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

declare interface Window {
  addEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: Window, ev: CustomEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: Window, ev: CustomEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

export {};