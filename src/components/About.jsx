import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from '../hooks/useInView'

const stats = [
  { value: 3.5, suffix: '+', label: 'Years Experience', icon: '⚡' },
  { value: 10, suffix: '+', label: 'Projects Delivered', icon: '🚀' },
  { value: 2.5, suffix: 'M+', label: 'Users Served', icon: '🌍' }
]

const techIcons = [
  { icon: '⚛️', label: 'React', x: 12, y: 22, delay: 0 },
  { icon: '▲', label: 'Next.js', x: 88, y: 28, delay: 0.5 },
  { icon: '🟢', label: 'Node.js', x: 8, y: 75, delay: 1 },
  { icon: '🤖', label: 'AI/ML', x: 90, y: 72, delay: 1.5 },
  { icon: '🔷', label: 'TypeScript', x: 48, y: 88, delay: 2 },
]

const codeLines = [
  { text: 'const developer = {', color: '#c792ea' },
  { text: '  name: "Zuhair Abbas",', color: '#c3e88d' },
  { text: '  role: "Full-Stack Engineer",', color: '#c3e88d' },
  { text: '  passion: "Building at Scale",', color: '#f78c6c' },
  { text: '  superpower: "AI Integration",', color: '#89ddff' },
  { text: '  motto: "Clean code, big impact"', color: '#ffcb6b' },
  { text: '};', color: '#c792ea' },
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
    <span className="about-bento-stat-number">
      {displayValue}{suffix}
    </span>
  )
}

function CodeBlock({ inView }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!inView) return
    let line = 0
    const timer = setInterval(() => {
      line++
      setVisibleLines(line)
      if (line >= codeLines.length) clearInterval(timer)
    }, 200)
    return () => clearInterval(timer)
  }, [inView])

  return (
    <div className="about-code-block">
      <div className="about-code-header">
        <div className="about-code-dots">
          <span className="about-dot about-dot-red"></span>
          <span className="about-dot about-dot-yellow"></span>
          <span className="about-dot about-dot-green"></span>
        </div>
        <span className="about-code-filename">developer.js</span>
      </div>
      <pre className="about-code-content">
        {codeLines.map((line, idx) => (
          <div
            key={idx}
            className={`about-code-line ${idx < visibleLines ? 'about-code-line-visible' : ''}`}
            style={{ transitionDelay: `${idx * 0.05}s` }}
          >
            <span className="about-code-line-number">{idx + 1}</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </div>
        ))}
        <div className={`about-code-cursor ${visibleLines >= codeLines.length ? 'about-code-cursor-blink' : ''}`}>
          <span className="about-code-line-number">{codeLines.length + 1}</span>
          <span className="about-cursor-char">|</span>
        </div>
      </pre>
    </div>
  )
}

function FloatingIcons({ inView }) {
  return (
    <div className="about-floating-icons">
      {techIcons.map((tech, idx) => (
        <div
          key={idx}
          className={`about-floating-icon ${inView ? 'about-floating-icon-visible' : ''}`}
          style={{
            left: `${tech.x}%`,
            top: `${tech.y}%`,
            animationDelay: `${tech.delay}s`,
            transitionDelay: `${0.6 + tech.delay * 0.15}s`
          }}
          title={tech.label}
        >
          <span className="about-floating-icon-emoji">{tech.icon}</span>
          <span className="about-floating-icon-label">{tech.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  const [ref, isInView] = useInView()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const sectionRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [])

  const mergedRef = useCallback((node) => {
    ref.current = node
    sectionRef.current = node
  }, [ref])

  return (
    <section
      id="about"
      className={`about-section ${isInView ? 'about-in-view' : ''}`}
      ref={mergedRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient mesh background */}
      <div
        className="about-gradient-mesh"
        style={{
          '--mouse-x': mousePos.x,
          '--mouse-y': mousePos.y,
        }}
      >
        <div className="about-mesh-orb about-mesh-orb-1"></div>
        <div className="about-mesh-orb about-mesh-orb-2"></div>
        <div className="about-mesh-orb about-mesh-orb-3"></div>
      </div>

      {/* Floating tech icons */}
      <FloatingIcons inView={isInView} />

      <div className="container about-container">
        {/* Section header */}
        <div className="about-header">
          <span className="about-badge">WHO I AM</span>
          <h2 className="about-title">
            Crafting Digital <br />
            <span className="about-title-gradient">Experiences</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="about-bento">
          {/* Main intro card */}
          <div className="about-bento-card about-bento-main">
            <div className="about-bento-card-glow"></div>
            <div className="about-bento-card-inner">
              <div className="about-bento-main-content">
                <h3 className="about-bento-heading">
                  Full-Stack Engineer with a <span className="about-highlight">passion</span> for building at scale
                </h3>
                <p>
                  With experience at <strong>Hashedin by Deloitte</strong> and <strong>WNS</strong>, I've successfully
                  delivered enterprise-level applications serving millions of users. I thrive at the intersection
                  of <span className="about-highlight-secondary">frontend architecture</span> and <span className="about-highlight-secondary">AI integration</span>.
                </p>
                <div className="about-tech-tags">
                  {['Micro Frontends', 'Module Federation', 'Next.js', 'OpenAI', 'Claude API'].map((tag) => (
                    <span key={tag} className="about-tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Code card */}
          <div className="about-bento-card about-bento-code">
            <div className="about-bento-card-glow"></div>
            <div className="about-bento-card-inner">
              <CodeBlock inView={isInView} />
            </div>
          </div>

          {/* Stats cards */}
          <div className="about-stats-group">
            {stats.map((stat, idx) => (
              <div key={idx} className="about-bento-card about-bento-stat" style={{ '--stat-delay': `${0.3 + idx * 0.1}s` }}>
                <div className="about-bento-card-glow"></div>
                <div className="about-bento-card-inner about-stat-inner">
                  <span className="about-bento-stat-icon">{stat.icon}</span>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
                  <span className="about-bento-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Philosophy card */}
          <div className="about-bento-card about-bento-philosophy">
            <div className="about-bento-card-glow"></div>
            <div className="about-bento-card-inner">
              <div className="about-philosophy-content">
                <span className="about-philosophy-icon">💡</span>
                <h4>My Philosophy</h4>
                <p>
                  Clean code, big impact. I believe in solving complex problems
                  with maintainable solutions and creating seamless user experiences globally.
                </p>
                <div className="about-philosophy-quote">
                  <span className="about-quote-mark">"</span>
                  <em>When I'm not coding, I explore the intersection of AI and web development,
                  contribute to innovative projects, and engage with the developer community.</em>
                  <span className="about-quote-mark">"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
