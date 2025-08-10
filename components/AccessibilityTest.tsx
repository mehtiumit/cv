'use client'
import { useEffect, useState } from 'react'

const AccessibilityTest = () => {
  const [issues, setIssues] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const runAccessibilityChecks = () => {
      const issues: string[] = []

      const images = document.querySelectorAll('img')
      images.forEach((img, index) => {
        if (!img.alt && !img.getAttribute('aria-hidden')) {
          issues.push(`Image ${index + 1} missing alt attribute`)
        }
      })

      const formElements = document.querySelectorAll('input, textarea, select')
      formElements.forEach((element, index) => {
        const anyEl = element as any
        const hasLabel = anyEl.labels && anyEl.labels.length > 0
        const hasAriaLabel = element.getAttribute('aria-label')
        const hasAriaLabelledBy = element.getAttribute('aria-labelledby')
        if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
          issues.push(`Form element ${index + 1} missing label`)
        }
      })

      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let previousLevel = 0
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1))
        if (level > previousLevel + 1) {
          issues.push(`Heading ${index + 1} skips levels (h${previousLevel} to h${level})`)
        }
        previousLevel = level
      })

      const elements = document.querySelectorAll('*')
      elements.forEach((element, index) => {
        const styles = window.getComputedStyle(element)
        const backgroundColor = styles.backgroundColor
        const color = styles.color
        if (backgroundColor !== 'rgba(0, 0, 0, 0)' && color !== 'rgba(0, 0, 0, 0)') {
          const bgLuminance = getLuminance(backgroundColor)
          const textLuminance = getLuminance(color)
          const contrast = (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05)
          if (contrast < 4.5) {
            issues.push(`Element ${index + 1} may have insufficient color contrast`)
          }
        }
      })

      const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [tabindex]')
      interactiveElements.forEach((element, index) => {
        const tabIndex = element.getAttribute('tabindex')
        if (tabIndex && parseInt(tabIndex) > 0) {
          issues.push(`Interactive element ${index + 1} has positive tabindex (${tabIndex})`)
        }
      })

      setIssues(issues)
    }

    const timer = setTimeout(runAccessibilityChecks, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getLuminance = (color: string): number => {
    if (color.includes('rgb')) {
      const values = color.match(/\d+/g)
      if (values && values.length >= 3) {
        const r = parseInt(values[0]) / 255
        const g = parseInt(values[1]) / 255
        const b = parseInt(values[2]) / 255
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
    }
    return 0.5
  }

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 10000,
      backgroundColor: '#ff4444',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      display: issues.length > 0 ? 'block' : 'none'
    }}>
      <button 
        onClick={() => setIsVisible(!isVisible)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        Accessibility Issues ({issues.length}) {isVisible ? '▼' : '▶'}
      </button>
      {isVisible && (
        <div style={{ marginTop: '10px' }}>
          {issues.map((issue, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '11px' }}>
              • {issue}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AccessibilityTest


