import { useState, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaChevronDown, FaExternalLinkAlt, FaCode, FaRocket, FaLaptopCode, FaBrain, FaBuilding } from 'react-icons/fa'

const workExperience = [
  {
    id: 1,
    company: 'Hashedin by Deloitte',
    position: 'Software Engineer - II',
    duration: 'Jul 2024 – Present',
    type: 'Full-time',
    highlights: [
      'Led end-to-end delivery of Deloitte\'s Vision Portal from greenfield to production in under 10 months, supporting 2.5M+ active users with 99.9% uptime using Micro Frontend Architecture',
      'Built SEO-optimized Next.js/React platforms, improving Lighthouse performance scores by 40%+ and enhancing Core Web Vitals',
      'Designed localized, multi-language interfaces for users across 120+ countries, reducing onboarding time by 25%',
      'Implemented custom theming and white-label UI frameworks for enterprise clients including Google and Amazon',
      'Integrated ServiceNow ticketing via REST APIs with AI-powered agents to automate 30–35% of workflows',
    ],
    tags: ['Angular', 'React', 'Micro Frontend', 'TypeScript', 'AI Agents', 'Firebase'],
    color: '#667eea',
  },
  {
    id: 2,
    company: 'WNS',
    position: 'Software Engineer',
    duration: 'Jul 2022 – Jun 2024',
    type: 'Full-time',
    highlights: [
      'Contributed across full SDLC from requirement analysis to production deployment with cross-functional teams',
      'Built ChatGPT-inspired Generative AI interface using GPT-4 APIs with token-based orchestration',
      'Implemented dynamic theme switching using Angular theming for seamless runtime transitions',
      'Developed data visualizations using D3.js, increasing user engagement by 28%',
      'Upgraded Google Identity Services with one-tap login, improving authentication performance by 20%',
    ],
    tags: ['Angular', 'GPT-4 APIs', 'D3.js', 'Google Identity', 'AI Integration'],
    color: '#f093fb',
  },
]

export default function Experience() {
  const [ref, isInView] = useInView()

  return (
    <section
      id="experience"
      className={`experience-new ${isInView ? 'in-view' : ''}`}
      ref={ref}
    >
      <div className="exp-glow-bg"></div>
      
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Journey</span>
          <h2 className="section-title">Professional Experience</h2>
          <div className="section-line"></div>
        </div>

        <div className="timeline-container">
          <div className="timeline-line">
            <div className="timeline-progress"></div>
          </div>

          <div className="experience-list">
            {workExperience.map((exp, idx) => (
              <div
                key={exp.id}
                className="timeline-item-new"
                style={{ '--index': idx }}
              >
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot"></div>
                </div>

                <div className="experience-content">
                  <div className="experience-card-new">
                    <div className="card-header-new">
                      <div className="company-info">
                        <div className="company-logo">
                          {exp.company.includes('Deloitte') ? <FaBuilding /> : <FaBriefcase />}
                        </div>
                        <div className="title-group">
                          <h3>{exp.position}</h3>
                          <span className="company-name">{exp.company}</span>
                        </div>
                      </div>
                      <div className="time-location">
                        <span className="duration">
                          <FaCalendarAlt /> {exp.duration}
                        </span>
                        <span className="job-type">{exp.type}</span>
                      </div>
                    </div>

                    <div className="card-body-new">
                      <ul className="highlights-list">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                      
                      <div className="skills-tags">
                        {exp.tags.map((tag, i) => (
                          <span key={i} className="skill-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="card-footer-hidden"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
