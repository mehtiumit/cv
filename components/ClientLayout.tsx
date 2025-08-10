'use client'

import { ThemeProvider } from 'next-themes'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense, ReactNode } from 'react'
import { AnimationProvider } from '../context/AnimationContext'
import { LanguageProvider, useTranslation } from '../context/LanguageContext'

function TranslatedErrorFallback({ error }: { error: Error }) {
  const { t } = useTranslation()
  return (
    <div role="alert">
      <p>{t('accessibility.error')}:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function FallbackErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <ErrorBoundary FallbackComponent={FallbackErrorFallback}>
      <TranslatedErrorFallback error={error} />
    </ErrorBoundary>
  )
}

function TranslatedLoadingFallback() {
  const { t } = useTranslation()
  return <div>{t('accessibility.loading')}</div>
}

function FallbackLoadingFallback() {
  return <div>Loading...</div>
}

function LoadingFallback() {
  return (
    <ErrorBoundary FallbackComponent={FallbackLoadingFallback}>
      <TranslatedLoadingFallback />
    </ErrorBoundary>
  )
}

function InnerLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <AnimationProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </AnimationProvider>
    </ThemeProvider>
  )
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <InnerLayout>
        {children}
      </InnerLayout>
    </LanguageProvider>
  )
}


