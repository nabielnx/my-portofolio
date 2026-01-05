import { useEffect, useState, useRef } from 'react'

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
}

export const useInView = (options: UseInViewOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  
  // Destructure options to memoize properly if needed, usually defaults are fine
  const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = true } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
            setIsVisible(false)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, triggerOnce])

  return { ref, isVisible }
}
