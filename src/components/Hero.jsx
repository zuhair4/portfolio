import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import profileImage from '../../assets/IMG_1779.jpg'

const roles = [
  'Frontend Engineer',
  'Full-Stack Developer',
  'AI Integration Specialist',
]

// Floating particle component
// Check mobile once at module level
const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768

function Particles({ mousePosRef }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const isMobile = getIsMobile()

    const resize = () => {
      const dpr = isMobile ? 1 : 2
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Fewer particles on mobile for better perf
    const count = isMobile ? 25 : 60
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    const particles = particlesRef.current
    // Reduce connection distance on mobile
    const connectionDist = isMobile ? 60 : 100

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const mp = mousePosRef.current

      for (const p of particles) {
        // Mouse repulsion (desktop only)
        if (!isMobile && mp.x > 0 && mp.y > 0) {
          const dx = p.x - mp.x
          const dy = p.y - mp.y
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
          if (dist < connectionDist) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / connectionDist)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [mousePosRef])

  return <canvas ref={canvasRef} className="hero-particles" />
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const isMobileRef = useRef(getIsMobile())

  // Track mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = getIsMobile()
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Mouse tracking for parallax (desktop only, stored in ref — no re-renders)
  const handleMouseMove = useCallback((e) => {
    if (isMobileRef.current || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    mousePosRef.current = { x: mx, y: my }

    // Apply parallax transforms directly to DOM (no React re-render)
    const textPX = ((mx / window.innerWidth) - 0.5) * -15
    const textPY = ((my / window.innerHeight) - 0.5) * -10
    const imgPX = ((mx / window.innerWidth) - 0.5) * 20
    const imgPY = ((my / window.innerHeight) - 0.5) * 15

    if (textRef.current) {
      textRef.current.style.transform = `translate3d(${textPX}px, ${textPY}px, 0)`
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `translate3d(${imgPX}px, ${imgPY}px, 0)`
    }
  }, [])

  // Scroll parallax — use rAF + direct DOM manipulation, no state updates
  useEffect(() => {
    let rafId = null
    let ticking = false

    const applyScrollParallax = () => {
      const sy = window.scrollY
      if (!isMobileRef.current) {
        if (textRef.current) {
          // Preserve any existing mouse parallax by reading current values
          const mp = mousePosRef.current
          const textPX = ((mp.x / window.innerWidth) - 0.5) * -15
          const textPY = ((mp.y / window.innerHeight) - 0.5) * -10
          textRef.current.style.transform = `translate3d(${textPX}px, ${textPY + sy * -0.15}px, 0)`
        }
        if (imageRef.current) {
          const mp = mousePosRef.current
          const imgPX = ((mp.x / window.innerWidth) - 0.5) * 20
          const imgPY = ((mp.y / window.innerHeight) - 0.5) * 15
          imageRef.current.style.transform = `translate3d(${imgPX}px, ${imgPY + sy * -0.08}px, 0)`
        }
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - sy / 200)
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(applyScrollParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      id="home"
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* Interactive particle canvas */}
      <Particles mousePosRef={mousePosRef} />

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
          ref={textRef}
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
          ref={imageRef}
        >
          <div className="hero-img-wrapper">
            <div className="hero-img-glow"></div>
            <div className="hero-img-border">
              <div className="blob-frame">
                {!imgLoaded && <div className="skeleton skeleton-placeholder"></div>}
                <img 
                  src={profileImage} 
                  alt="Zuhair Abbas" 
                  onLoad={() => setImgLoaded(true)}
                  className={imgLoaded ? 'image-loaded' : 'image-loading'}
                />
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
      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  )
}
