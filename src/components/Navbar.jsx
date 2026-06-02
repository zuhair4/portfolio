import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

const resumePath = `${import.meta.env.BASE_URL}Zuhair_Abbas_Resume_2026.pdf`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const { isDarkTheme, toggleTheme } = useTheme()
  const navContainerRef = useRef(null)

  const toggleMenu = () => setIsOpen(prev => !prev)
  const closeMenu = () => setIsOpen(false)

  const handleResumeDownload = () => {
    if (downloaded) return
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2500)
  }

  // Close mobile menu when clicking outside the navbar
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Cache section elements once after mount — avoid DOM queries on every scroll
  const sectionsRef = useRef([])

  useEffect(() => {
    sectionsRef.current = navLinks.map(link => document.getElementById(link.id)).filter(Boolean)

    const handleScroll = () => {
      // Re-query until all lazy-loaded sections are in the DOM
      if (sectionsRef.current.length < navLinks.length) {
        sectionsRef.current = navLinks.map(link => document.getElementById(link.id)).filter(Boolean)
      }

      setScrolled(window.scrollY > 60)
      const scrollPos = window.scrollY + 120
      const sections = sectionsRef.current

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="nav-container" ref={navContainerRef}>

        {/* Animated logo: "<ZuhairAbbas/>" → "<ZA/>" on scroll */}
        <a href="#home" className={`logo logo-animated ${scrolled ? 'logo-collapsed' : ''}`}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-initial">Z</span>
          <span className="logo-expand logo-first">uhair</span>
          <span className="logo-initial">A</span>
          <span className="logo-expand logo-last">bbas</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        {/* Nav links — centered between logo and actions */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* Resume download in mobile dropdown */}
          <li className="nav-menu-resume-item">
            <a
              href={resumePath}
              download="Zuhair_Abbas_Resume_2026.pdf"
              className="nav-menu-resume-link"
              onClick={closeMenu}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </li>
        </ul>

        {/* Right-side actions: theme toggle, resume button (desktop), hamburger (mobile) */}
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            <span className="theme-icon">{isDarkTheme ? '☀️' : '🌙'}</span>
          </button>

          <a
            id="resume-download-btn"
            href={resumePath}
            download="Zuhair_Abbas_Resume_2026.pdf"
            className={`resume-download-btn ${downloaded ? 'downloaded' : ''}`}
            onClick={handleResumeDownload}
          >
            <span className="resume-btn-icon">
              {downloaded ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
            </span>
            <span className="resume-btn-text">
              {downloaded ? 'Downloaded!' : 'Resume'}
            </span>
          </a>

          <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </nav>
  )
}

