import { Inter } from 'next/font/google'

// Configure Inter font with optimal loading strategy
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap', // Ensures text remains visible during font swap
  preload: true, // Preload the font for better performance
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  variable: '--font-inter',
  // Additional performance optimizations
  adjustFontFallback: true, // Automatically adjust fallback fonts to reduce layout shift
  declarations: [
    {
      prop: 'font-display',
      value: 'swap'
    }
  ]
})

// Legacy export for backward compatibility
export const fontConfig = {
  google: {
    families: ['Inter:400,500,600,700']
  }
} 