import { useEffect, useRef, useState } from 'react'

export const useInView = (options = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  // Hold options in a ref so they don't re-trigger the effect on every render
  const optionsRef = useRef(options)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(entry.target)
      }
    }, {
      threshold: 0.1,
      ...optionsRef.current
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, []) // stable — runs once on mount only

  return [ref, isInView]
}
