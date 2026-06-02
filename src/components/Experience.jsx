import { useInView } from '../hooks/useInView'
import {
  FaBriefcase,
  FaCalendarAlt,
  FaBuilding,
  FaArrowRight,
} from 'react-icons/fa'

const workExperience = [
  {
    id: 1,
    company: 'Hashedin by Deloitte',
    position: 'Software Engineer - II',
    duration: 'Jul 2024 – Present',
    type: 'Full-time',
    current: true,
    color: '#667eea',
    accent: '#764ba2',
    metrics: [
      { value: '2.5M+', label: 'Active Users' },
      { value: '99.9%', label: 'Uptime' },
      { value: '40%+', label: 'Faster Loads' },
    ],
    highlights: [
      "Developed Google Gemini MCP connectors enabling third-party AI integrations with Figma, Canva, Miro, and Linear; researched and implemented OAuth 2.1 authentication for secure integration with Google AI Client.",
      'Led end-to-end delivery of Deloitte\'s Vision Portal from greenfield to production in under 10 months, supporting 2.5M+ active users with 99.9% uptime using Micro Frontend Architecture',
      'Built SEO-optimized Next.js/React platforms, improving Lighthouse performance scores by 40%+ and enhancing Core Web Vitals',
      'Designed localized, multi-language interfaces for users across 120+ countries, reducing onboarding time by 25%',
      'Implemented custom theming and white-label UI frameworks for enterprise clients including Google and Amazon',
      'Integrated ServiceNow ticketing via REST APIs with AI-powered agents to automate 30–35% of workflows',
    ],
    tags: ['Angular', 'React', 'Micro Frontend', 'TypeScript', 'AI Agents', 'Firebase'],
  },
  {
    id: 2,
    company: 'WNS',
    position: 'Software Engineer',
    duration: 'Jul 2022 – Jun 2024',
    type: 'Full-time',
    current: false,
    color: '#f093fb',
    accent: '#f5576c',
    metrics: [
      { value: '28%', label: 'Engagement ↑' },
      { value: '20%', label: 'Faster Auth' },
      { value: 'GPT-4', label: 'Gen-AI UI' },
    ],
    highlights: [
      'Contributed across full SDLC from requirement analysis to production deployment with cross-functional teams',
      'Built ChatGPT-inspired Generative AI interface using GPT-4 APIs with token-based orchestration',
      'Implemented dynamic theme switching using Angular theming for seamless runtime transitions',
      'Developed data visualizations using D3.js, increasing user engagement by 28%',
      'Upgraded Google Identity Services with one-tap login, improving authentication performance by 20%',
    ],
    tags: ['Angular', 'GPT-4 APIs', 'D3.js', 'Google Identity', 'AI Integration'],
  },
]

function ExperienceCard({ exp, idx }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      className="exp-item"
      style={{
        '--index': idx,
        '--c': exp.color,
        '--c2': exp.accent,
      }}
    >
      {/* Timeline node */}
      <div className="exp-node">
        <span className="exp-node-core" />
        {exp.current && <span className="exp-node-pulse" />}
      </div>

      {/* Card */}
      <div className="exp-card" onMouseMove={handleMouseMove}>
        <div className="exp-card-spotlight" />
        <div className="exp-card-border" />

        <div className="exp-card-inner">
          {/* Header */}
          <div className="exp-head">
            <div className="exp-company">
              <div className="exp-logo">
                {exp.company.includes('Deloitte') ? <FaBuilding /> : <FaBriefcase />}
              </div>
              <div className="exp-titles">
                <h3>{exp.position}</h3>
                <span className="exp-company-name">{exp.company}</span>
              </div>
            </div>

            <div className="exp-meta">
              {exp.current && (
                <span className="exp-current">
                  <span className="exp-current-dot" />
                  Current
                </span>
              )}
              <span className="exp-duration">
                <FaCalendarAlt /> {exp.duration}
              </span>
              <span className="exp-type">{exp.type}</span>
            </div>
          </div>

          {/* Impact metrics */}
          <div className="exp-metrics">
            {exp.metrics.map((m) => (
              <div className="exp-metric" key={m.label}>
                <span className="exp-metric-value">{m.value}</span>
                <span className="exp-metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <ul className="exp-highlights">
            {exp.highlights.map((h, i) => (
              <li key={i}>
                <FaArrowRight className="exp-bullet" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="exp-tags">
            {exp.tags.map((tag) => (
              <span key={tag} className="exp-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const [ref, isInView] = useInView()

  return (
    <section
      id="experience"
      className={`experience-new ${isInView ? 'in-view' : ''}`}
      ref={ref}
    >
      <div className="exp-glow-bg"></div>
      <div className="exp-grid-bg"></div>

      <div className="container">
        <div className="section-header">
          <span className="section-badge">Journey</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Building products that scale — from greenfield to millions of users
          </p>
          <div className="section-line"></div>
        </div>

        <div className="exp-timeline">
          <div className="exp-rail">
            <div className="exp-rail-fill"></div>
          </div>

          <div className="exp-list">
            {workExperience.map((exp, idx) => (
              <ExperienceCard key={exp.id} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
