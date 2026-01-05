import { useState, useEffect } from 'react'

export const useScrollSpy = (sectionIds: readonly string[], offset: number = 0) => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    
    // Create an observer for each section
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
            // Trigger when 50% of the target is visible
            threshold: 0.5,
            rootMargin: `-${offset}px 0px 0px 0px` 
        }
      )
      
      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds, offset])

  return activeSection
}
