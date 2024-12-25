'use client'

import { createContext, useContext, useState } from 'react'

const AnimationContext = createContext()

export function AnimationProvider({ children }) {
  const [nameCompleted, setNameCompleted] = useState(false)

  return (
    <AnimationContext.Provider value={{ nameCompleted, setNameCompleted }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  return useContext(AnimationContext)
} 