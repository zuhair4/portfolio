import { useState, useEffect, useRef, useCallback } from 'react'
import profileImage from '../../assets/IMG_1779.jpg'

const roles = [
  'Frontend Engineer',
  'Full-Stack Developer',
  'AI Integration Specialist',
]

// Floating particle component
function Particles({ mousePos }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const count = 60
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    const particles = particlesRef.current

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Mouse repulsion
        if (mousePos.x > 0 && mousePos.y > 0) {
          const dx = p.x - mousePos.x
          const dy = p.y - mousePos.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const force = (120 - dist) / 120
            p.vx += (dx / dist) * force * 0.3
            p.vy += (dy / dist) * force * 0.3
          }
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [mousePos])

  return <canvas ref={canvasRef} className="hero-particles" />
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        )
      }, isDeleting ? 40 : 80)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  // Mouse tracking for parallax
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax offsets (subtle)
  const textParallaxX = ((mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) - 0.5) * -15
  const textParallaxY = ((mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) - 0.5) * -10
  const imgParallaxX = ((mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) - 0.5) * 20
  const imgParallaxY = ((mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) - 0.5) * 15

  return (
    <section
      id="home"
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Interactive particle canvas */}
      <Particles mousePos={mousePos} />

      {/* Animated mesh gradient blobs */}
      <div className="hero-gradient-orbs">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
      </div>

      <div className="hero-content">
        {/* Text side with mouse parallax */}
        <div
          className="hero-text"
          style={{
            transform: `translate(${textParallaxX}px, ${textParallaxY}px) translateY(${scrollY * -0.15}px)`,
          }}
        >

          <h1>
            <span className="hero-name-line">Zuhair</span>
            <span className="hero-name-line hero-name-accent">Abbas</span>
          </h1>

          <p className="hero-subtitle">
            <span className="hero-role-prefix">{'> '}</span>
            {text}
            <span className="typewriter-cursor" />
          </p>

          <p className="hero-description">
            Building scalable web platforms, optimizing performance, and integrating AI-powered solutions for enterprise applications
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>

        {/* Image side with mouse parallax + animated border */}
        <div
          className="hero-image"
          style={{
            transform: `translate(${imgParallaxX}px, ${imgParallaxY}px) translateY(${scrollY * -0.08}px)`,
          }}
        >
          <div className="hero-img-wrapper">
            <div className="hero-img-glow"></div>
            <div className="hero-img-border">
              <div className="blob-frame">
                <img src={profileImage} alt="Zuhair Abbas" />
              </div>
            </div>
            {/* Orbiting shapes */}
            <div className="orbit-ring">
              <div className="orbit-dot orbit-dot-1"></div>
              <div className="orbit-dot orbit-dot-2"></div>
              <div className="orbit-dot orbit-dot-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" style={{ opacity: Math.max(0, 1 - scrollY / 200) }}>
        <span>Scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  )
}
