import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const { isDarkTheme, toggleTheme } = useTheme()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Scroll spy + collapse trigger
  useEffect(() => {
    const handleScroll = () => {
      // Collapse logo after 60px
      setScrolled(window.scrollY > 60)

      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean)
      const scrollPos = window.scrollY + 120

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
    <nav className="navbar">
      <div className="nav-container">

        {/* Animated logo: "<ZuhairAbbas/>" → "<ZA/>" on scroll */}
        <a href="#home" className={`logo logo-animated ${scrolled ? 'logo-collapsed' : ''}`}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-initial">Z</span>
          <span className="logo-expand logo-first">uhair</span>
          <span className="logo-initial">A</span>
          <span className="logo-expand logo-last">bbas</span>
          <span className="logo-bracket">/&gt;</span>
        </a>

        <button className="theme-toggle" onClick={toggleTheme}>
          <span className="theme-icon"> {isDarkTheme ? '☀️' : '🌙'}</span>
        </button>

        <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

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
        </ul>
      </div>
    </nav>
  )
}
