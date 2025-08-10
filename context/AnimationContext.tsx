'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AnimationContextValue {
  nameCompleted: boolean
  setNameCompleted: (value: boolean) => void
}

const AnimationContext = createContext<AnimationContextValue | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [nameCompleted, setNameCompleted] = useState<boolean>(false)

  return (
    <AnimationContext.Provider value={{ nameCompleted, setNameCompleted }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const ctx = useContext(AnimationContext)
  if (!ctx) throw new Error('useAnimation must be used within AnimationProvider')
  return ctx
}


