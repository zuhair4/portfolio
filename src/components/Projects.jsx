import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import cafeImage from '../../assets/Cafe.png'
import ivaccinateImage from '../../assets/ivaccinate.png'
import hashedinImage from '../../assets/Hashedin.png'
import udhaarImage from '../../assets/udhaar ss.png'

const projectsData = [
  {
    id: 1,
    title: 'Hashedin by Deloitte',
    description: 'Cutting-edge engineering solutions and product development for enterprises',
    preview: hashedinImage,
    link: 'https://hashedin.com/services#engineering-models',
    tags: ['Current Company', 'AI-Agents', 'Consulting'],
    badge: '..'
  },
  {
    id: 2,
    title: 'Cafe Website',
    description: 'A modern cafe website showcasing menu items, location, and services',
    preview: cafeImage,
    link: 'https://zuhair4.github.io/Cafe/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 3,
    title: 'iVaccinate',
    description: 'A vaccination tracking and management platform',
    preview: ivaccinateImage,
    link: 'https://zuhair4.github.io/iVaccinate/',
    tags: ['React', 'Web App', 'Healthcare']
  },
  {
    id: 4,
    title: 'Udhaar Me Sudhaar',
    description: 'A law firm application that helps clients manage loans, track repayments, and handle related legal matters in one place.',
    preview: udhaarImage,
    link: 'https://zuhair4.github.io/udhaarMeSudhaar/',
    tags: ['HTML', 'CSS', 'JavaScript', 'Finance']
  }
]

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ref, isInView] = useInView()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectsData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectsData.length) % projectsData.length)
  }

  return (
    <section id="projects" className={`projects-section ${isInView ? 'in-view' : ''}`} ref={ref}>
      <div className="container">
        <h2>Featured Projects</h2>
        <p className="projects-subtitle">Check out some of my recent work</p>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-item ${index === currentSlide ? 'active' : ''}`}
            >
              {project.badge && <div className="project-badge">{project.badge}</div>}
              <div className="project-preview">
                <img
                  src={project.preview}
                  alt={project.title}
                  className="project-screenshot"
                />
                <div className="project-overlay">
                  <span className="view-link">View Project →</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}

          {/* Desktop Grid Layout */}
          {projectsData.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item desktop-only"
            >
              {project.badge && <div className="project-badge">{project.badge}</div>}
              <div className="project-preview">
                <img
                  src={project.preview}
                  alt={project.title}
                  className="project-screenshot"
                />
                <div className="project-overlay">
                  <span className="view-link">View Project →</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={prevSlide}>←</button>
          <div className="carousel-indicators">
            {projectsData.map((_, idx) => (
              <button
                key={idx}
                className={`indicator ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></button>
            ))}
          </div>
          <button className="carousel-btn next" onClick={nextSlide}>→</button>
        </div>
      </div>
    </section>
  )
}
