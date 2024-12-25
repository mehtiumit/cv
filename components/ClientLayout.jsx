'use client'

import { ThemeProvider } from 'next-themes'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { AnimationProvider } from '../context/AnimationContext'

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Bir şeyler yanlış gitti:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider attribute="class">
      <AnimationProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>Yükleniyor...</div>}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </AnimationProvider>
    </ThemeProvider>
  )
} 