import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import profileImage from '../../assets/IMG_1779.jpg'

const roles = [
  'Frontend Engineer',
  'Full-Stack Developer',
  'AI Integration Specialist',
]

const TYPING_SPEED = 80
const DELETING_SPEED = 40
const PAUSE_DURATION = 2000


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

    // Fewer particles on mobile; desktop reduced to cut O(n²) connection checks by ~55%
    const count = isMobile ? 20 : 40
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
  // Apple Vision Pro 3D Glass Stage Component

  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const imgWrapperRef = useRef(null)
  const spotlightRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const isMobileRef = useRef(getIsMobile())

  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = getIsMobile()
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout
    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_DURATION)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        )
      }, speed)
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  // Mouse tracking for 3D glass tilt & dynamic spotlight follower
  const handleMouseMove = useCallback((e) => {
    if (isMobileRef.current || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    mousePosRef.current = { x: mx, y: my }

    const textPX = ((mx / window.innerWidth) - 0.5) * -15
    const textPY = ((my / window.innerHeight) - 0.5) * -10
    const imgPX = ((mx / window.innerWidth) - 0.5) * 18
    const imgPY = ((my / window.innerHeight) - 0.5) * 14

    if (textRef.current) {
      textRef.current.style.transform = `translate3d(${textPX}px, ${textPY}px, 0)`
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `translate3d(${imgPX}px, ${imgPY}px, 0)`
    }

    // 3D Glass Card Tilt
    if (imgWrapperRef.current) {
      const tiltX = ((my / rect.height) - 0.5) * -20
      const tiltY = ((mx / rect.width) - 0.5) * 20
      imgWrapperRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03,1.03,1.03)`
    }

    // Dynamic Spotlight follower inside glass frame
    if (spotlightRef.current && imgWrapperRef.current) {
      const cardRect = imgWrapperRef.current.getBoundingClientRect()
      const cx = e.clientX - cardRect.left
      const cy = e.clientY - cardRect.top
      spotlightRef.current.style.background = `radial-gradient(circle 220px at ${cx}px ${cy}px, rgba(255, 255, 255, 0.22), transparent 70%)`
    }
  }, [])

  // Apple-Style 3D Perspective Docking Scroll Handler (rAF powered)
  useEffect(() => {
    let rafId = null
    let ticking = false

    const applyScrollParallax = () => {
      const sy = window.scrollY
      const progress = Math.min(sy / (window.innerHeight * 0.75), 1)

      if (!isMobileRef.current) {
        if (textRef.current) {
          const mp = mousePosRef.current
          const textPX = ((mp.x / window.innerWidth) - 0.5) * -15
          const textPY = ((mp.y / window.innerHeight) - 0.5) * -10
          textRef.current.style.transform = `translate3d(${textPX}px, ${textPY + sy * -0.15}px, 0)`
        }

        // Apple-style 3D Fold-Down & Docking on Scroll
        if (imgWrapperRef.current) {
          const mp = mousePosRef.current
          const imgPX = ((mp.x / window.innerWidth) - 0.5) * 18
          const imgPY = ((mp.y / window.innerHeight) - 0.5) * 14

          const transY = sy * -0.35
          const rotX = progress * 28       // Smooth 3D fold backward
          const rotY = progress * -14      // Gentle perspective angle
          const scale = 1 - progress * 0.12
          const opacity = Math.max(0, 1 - progress * 1.05)

          imgWrapperRef.current.style.transform = `perspective(1200px) translate3d(${imgPX}px, ${imgPY + transY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`
          imgWrapperRef.current.style.opacity = opacity
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
      onMouseLeave={() => {
        if (imgWrapperRef.current) {
          imgWrapperRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
        }
      }}
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
          {/* Available badge */}
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for opportunities
          </div>

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

          {/* Quick stats */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-num">4+</span>
              <span className="hero-stat-label">Years Exp</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">Active Clients</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-num">10+</span>
              <span className="hero-stat-label">AI Projects</span>
            </div>
          </div>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>

          {/* Social links */}
          <div className="hero-socials">
            <a
              href="https://github.com/zuhair4"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              {/* GitHub */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/zuhair-abbas-3765291a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn"
            >
              {/* LinkedIn */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.credly.com/badges/15e87db5-9c67-4d7b-bf44-2dae7dcdd0f3/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link hero-social-link--cert"
              aria-label="Claude Certified Architect – Foundations"
            >
              {/* Anthropic starburst */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2l1 6 5-3-3 5 6 1-6 1 3 5-5-3-1 6-1-6-5 3 3-5-6-1 6-1-3-5 5 3z" />
              </svg>
              <span className="hero-social-cert-label">CCFA</span>
            </a>
          </div>
        </div>


        {/* Apple Vision Pro Style 3D Floating Glass Stage */}
        <div className="hero-image" ref={imageRef}>
          <div className="apple-glass-stage" ref={imgWrapperRef}>

            {/* Dynamic Spotlight Follower */}
            <div className="glass-spotlight" ref={spotlightRef}></div>

            {/* Iridescent Gradient Halo Ring */}
            <div className="apple-halo-ring"></div>

            {/* Glass Container */}
            <div className="apple-glass-card">
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

            {/* Ambient Backlight Glow */}
            <div className="apple-ambient-glow"></div>

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
