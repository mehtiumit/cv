// Performance optimization utilities (TypeScript)
import React, { useEffect, useRef, useState } from 'react'

export type AnyFunction<TArgs extends any[] = any[], TReturn = void> = (...args: TArgs) => TReturn

export const debounce = <F extends AnyFunction>(func: F, wait: number, immediate = false): F => {
  let timeout: ReturnType<typeof setTimeout> | null
  return function executedFunction(this: any, ...args: Parameters<F>) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  } as F
}

export const throttle = <F extends AnyFunction>(func: F, limit: number): F => {
  let inThrottle = false
  return function executedFunction(this: any, ...args: Parameters<F>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  } as F
}

export const useIntersectionObserver = (options: IntersectionObserverInit = {}): [
  React.RefObject<HTMLElement | null>,
  boolean,
  IntersectionObserverEntry | null
] => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([firstEntry]) => {
        if (!firstEntry) return
        setIsIntersecting(firstEntry.isIntersecting)
        setEntry(firstEntry)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [elementRef, isIntersecting, entry]
}

export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => reject()
        img.src = url
      })
    })
  )
}

export const getOptimalImageSize = (containerWidth: number, containerHeight: number): { width: number; height: number } => {
  const pixelRatio = window.devicePixelRatio || 1
  return {
    width: Math.ceil(containerWidth * pixelRatio),
    height: Math.ceil(containerHeight * pixelRatio),
  }
}

export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const isSlowConnection = (): boolean => {
  const nav = navigator as any
  if ('connection' in nav) {
    const connection = nav.connection
    return (
      connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData
    )
  }
  return false
}

export const withLazyLoading = <P extends object>(Component: React.ComponentType<P>, options: IntersectionObserverInit = {}) => {
  return function LazyLoadedComponent(props: P) {
    const [elementRef, isIntersecting] = useIntersectionObserver(options)
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
      if (isIntersecting && !hasLoaded) {
        setHasLoaded(true)
      }
    }, [isIntersecting, hasLoaded])

    // Avoid JSX in .ts files to prevent TS parsing issues
    return React.createElement(
      'div',
      { ref: elementRef as React.RefObject<HTMLDivElement> },
      hasLoaded
        ? React.createElement(Component as React.ComponentType<any>, { ...(props as any) })
        : React.createElement('div', { style: { minHeight: '200px' } })
    )
  }
}


