import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import cafeImage from '../../assets/Cafe.png'
import ivaccinateImage from '../../assets/ivaccinate.png'
import hashedinImage from '../../assets/Hashedin.png'
import udhaarImage from '../../assets/udhaar ss.png'
import moinMalikImage from '../../assets/THEMOINMALIK.png'

const projectsData = [
  {
    id: 1,
    number: '01',
    title: 'Hashedin by Deloitte',
    category: 'Enterprise Engineering',
    badge: 'Current Company',
    description: 'Engineering cutting-edge enterprise platforms, AI agent workflows, and scalable cloud architectures for global organizations.',
    highlights: ['Enterprise AI Agents', 'Scalable Microservices', 'High-Performance Architecture'],
    preview: hashedinImage,
    link: 'https://hashedin.com/services#engineering-models',
    displayUrl: 'hashedin.com/services',
    tags: ['Enterprise AI', 'AI Agents', 'Consulting', 'Cloud Systems'],
    accentColor: '#4f46e5'
  },
  {
    id: 2,
    number: '02',
    title: 'THEMOINMALIK Dairy',
    category: 'B2B Wholesale & Supply Portal',
    badge: 'B2B Platform',
    description: 'A dedicated commercial dairy fulfillment portal designed for professional kitchens and restaurants, featuring direct batch fulfillment, dynamic product filtering, and instant on-demand ordering.',
    highlights: ['Real-time Catalog Filter', 'Batch Commercial Ordering', 'Responsive Kitchen Portal'],
    preview: moinMalikImage,
    link: 'https://zuhair4.github.io/THEMOINMALIK/',
    displayUrl: 'zuhair4.github.io/THEMOINMALIK',
    tags: ['React', 'B2B E-Commerce', 'JavaScript', 'Responsive UI', 'Modern CSS'],
    accentColor: '#10b981'
  },
  {
    id: 3,
    number: '03',
    title: 'Udhaar Me Sudhaar',
    category: 'FinTech & Legal Solutions',
    badge: 'Client Project',
    description: 'A comprehensive legal-tech advisory platform enabling individuals and businesses to resolve loan disputes, monitor repayment timelines, and streamline legal case documentation.',
    highlights: ['Loan Tracking Dashboard', 'Dispute Resolution Flow', 'Client Legal Workflow'],
    preview: udhaarImage,
    link: 'https://udhaarmesudhaar.com/',
    displayUrl: 'udhaarmesudhaar.com',
    tags: ['FinTech', 'Legal-Tech', 'JavaScript', 'CSS3', 'Web Application'],
    accentColor: '#3b82f6'
  },
  {
    id: 4,
    number: '04',
    title: 'iVaccinate',
    category: 'Digital Healthcare Platform',
    badge: 'HealthTech',
    description: 'A modern healthcare tracking platform designed for managing vaccination schedules, dose reminders, and immunization history for families and clinical providers.',
    highlights: ['Vaccination Timeline Tracking', 'Smart Dose Schedule', 'Automated Record Keeping'],
    preview: ivaccinateImage,
    link: 'https://zuhair4.github.io/iVaccinate/',
    displayUrl: 'zuhair4.github.io/iVaccinate',
    tags: ['React', 'Healthcare', 'State Management', 'UI/UX Design'],
    accentColor: '#8b5cf6'
  },
  {
    id: 5,
    number: '05',
    title: 'Artisanal Cafe',
    category: 'Interactive Web Experience',
    badge: 'Web App',
    description: 'An elegant culinary web portal featuring animated artisanal menus, table reservation requests, location mapping, and responsive mobile-first dining interactions.',
    highlights: ['Interactive Menu System', 'Table Booking Inquiries', 'Fluid Motion & Styling'],
    preview: cafeImage,
    link: 'https://zuhair4.github.io/Cafe/index.html',
    displayUrl: 'zuhair4.github.io/Cafe',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Interactive UI'],
    accentColor: '#f59e0b'
  }
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)
  const [ref, isInView] = useInView()
  const [loadedImages, setLoadedImages] = useState({})
  const projectCardRefs = useRef([])

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }))
  }

  const scrollToProject = (index) => {
    const el = projectCardRefs.current[index]
    if (el) {
      const yOffset = -90
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const cards = projectCardRefs.current
      if (!cards || cards.length === 0) return

      const triggerPosition = window.innerHeight * 0.45
      let currentActive = 0

      cards.forEach((card, index) => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        if (rect.top <= triggerPosition) {
          currentActive = index
        }
      })

      setActiveProject(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="projects" className={`projects-showcase-section ${isInView ? 'in-view' : ''}`} ref={ref}>
      <div className="container projects-main-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="projects-eyebrow">
            <span className="eyebrow-dot"></span>
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Explore recent products, enterprise architectures, and web platforms built with precision.
          </p>

          {/* Sticky Progress & Quick-Jump Navigation */}
          <div className="projects-nav-tracker">
            <div className="tracker-status">
              <span className="tracker-current">
                PROJECT {String(activeProject + 1).padStart(2, '0')}
              </span>
              <span className="tracker-divider">/</span>
              <span className="tracker-total">{String(projectsData.length).padStart(2, '0')}</span>
              <span className="tracker-name">• {projectsData[activeProject].title}</span>
            </div>
            <div className="tracker-pills" role="tablist" aria-label="Project Selection">
              {projectsData.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => scrollToProject(idx)}
                  className={`tracker-pill-btn ${idx === activeProject ? 'active' : ''}`}
                  aria-label={`Jump to project ${project.title}`}
                >
                  <span className="pill-index">{project.number}</span>
                  <span className="pill-title">{project.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Full-Screen Scroll Showcase Deck */}
        <div className="projects-stack-container">
          {projectsData.map((project, index) => (
            <article
              key={project.id}
              ref={el => projectCardRefs.current[index] = el}
              className={`project-stage-card ${index === activeProject ? 'is-active' : ''}`}
              style={{
                '--card-index': index,
                '--accent-color': project.accentColor
              }}
            >
              <div className="project-card-glass">
                {/* Left: Info Column */}
                <div className="project-meta-col">
                  <div className="meta-top-row">
                    <span className="project-index-tag">{project.number}</span>
                    <span className="project-category-tag">{project.category}</span>
                    {project.badge && (
                      <span className="project-badge-pill">{project.badge}</span>
                    )}
                  </div>

                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-highlights-list">
                    {project.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="highlight-item">
                        <span className="highlight-check">✓</span>
                        <span className="highlight-text">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project-tech-pills">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions-row">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-project-cta"
                    >
                      <span>Explore Live Project</span>
                      <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-url-preview"
                    >
                      {project.displayUrl}
                    </a>
                  </div>
                </div>

                {/* Right: Visual Window Mockup Column */}
                <div className="project-visual-col">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="browser-mockup-wrapper"
                  >
                    {/* Mockup Topbar */}
                    <div className="mockup-header">
                      <div className="mockup-dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                      <div className="mockup-address-bar">
                        <span className="lock-icon">🔒</span>
                        <span className="address-text">{project.displayUrl}</span>
                      </div>
                      <div className="mockup-action-indicator">
                        <span>Live ↗</span>
                      </div>
                    </div>

                    {/* Mockup Screen Viewport */}
                    <div className="mockup-screen">
                      {!loadedImages[project.id] && (
                        <div className="skeleton-placeholder-screen">
                          <div className="skeleton-pulse"></div>
                        </div>
                      )}
                      <img
                        src={project.preview}
                        alt={`${project.title} Preview`}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => handleImageLoad(project.id)}
                        className={`mockup-img ${loadedImages[project.id] ? 'loaded' : 'loading'}`}
                      />
                      <div className="screen-hover-overlay">
                        <div className="overlay-btn">
                          <span>View Live Demo</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
