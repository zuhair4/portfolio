import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const stats = [
  { value: 3.5, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Projects Delivered' },
  { value: 2.5, suffix: 'M+', label: 'Users Served' }
]

function AnimatedNumber({ value, suffix, inView }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(value, increment * step)
      setCount(current)
      if (step >= steps) {
        setCount(value)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  const displayValue = Number.isInteger(value) ? Math.round(count) : count.toFixed(1)

  return (
    <span className="stat-number">
      {displayValue}{suffix}
    </span>
  )
}

export default function About() {
  const [ref, isInView] = useInView()

  return (
    <section id="about" className={`about ${isInView ? 'in-view' : ''}`} ref={ref}>
      <div className="container">
        <h2>About Me</h2>
        <p>
          I'm a full-stack engineer with a passion for building scalable web platforms and integrating cutting-edge AI solutions.
          With experience at Hashedin by Deloitte and WNS, I've successfully delivered enterprise-level applications serving millions of users.
        </p>
        <p>
          My expertise spans frontend architecture (Micro Frontends, Module Federation, Next.js), performance optimization,
          and AI integration using OpenAI and Claude APIs. I'm driven by the challenge of solving complex problems with clean,
          maintainable code and creating seamless user experiences globally.
        </p>
        <p>
          When I'm not coding, I explore the intersection of AI and web development, contribute to innovative projects,
          and engage with the developer community on platforms like LeetCode and LinkedIn.
        </p>
        <div className="about-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
