import { useInView } from '../hooks/useInView'


const workExperience = [
  {
    id: 1,
    company: 'Hashedin by Deloitte',
    position: 'Software Engineer - II',
    duration: 'Jul 2024 – Present',
    highlights: [
      'Led end-to-end delivery of Deloitte\'s Vision Portal from greenfield to production in under 10 months, supporting 2.5M+ active users with 99.9% uptime using Micro Frontend Architecture',
      'Built SEO-optimized Next.js/React platforms, improving Lighthouse performance scores by 40%+ and enhancing Core Web Vitals',
      'Designed localized, multi-language interfaces for users across 120+ countries, reducing onboarding time by 25%',
      'Implemented custom theming and white-label UI frameworks for enterprise clients including Google and Amazon',
      'Integrated ServiceNow ticketing via REST APIs with AI-powered agents to automate 30–35% of workflows'
    ],
    tags: ['Angular ', 'React ', 'Micro Frontend Architecture ', 'TypeScript ', 'AI Agents ', 'FireBase ']
  },
  {
    id: 2,
    company: 'WNS',
    position: 'Software Engineer',
    duration: 'Jul 2022 – Jun 2024',
    highlights: [
      'Contributed across full SDLC from requirement analysis to production deployment with cross-functional teams',
      'Built ChatGPT-inspired Generative AI interface using GPT-4 APIs with token-based orchestration',
      'Implemented dynamic theme switching using Angular theming for seamless runtime transitions',
      'Developed data visualizations using D3.js, increasing user engagement by 28%',
      'Upgraded Google Identity Services with one-tap login, improving authentication performance by 20%'
    ],
    tags: ['Angular ', 'GPT-4 APIs ', 'D3.js ', 'Google Identity ', 'AI Integration ']
  }
]

export default function Experience() {
  const [ref, isInView] = useInView()

  return (
    <section id="experience" className={`experience ${isInView ? 'in-view' : ''}`} ref={ref}>
      <div className="container">
        <h2>Work Experience</h2>
        <div className="timeline">
          {workExperience.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              {index < workExperience.length - 1 && <div className="timeline-line"></div>}
              <div className="timeline-content">
                <h3>{exp.position}</h3>
                <p className="company">{exp.company}</p>
                <p className="duration">
                  <span className="calendar-icon">📅</span> {exp.duration}
                </p>
                <ul className="highlights-list">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
                <div className="experience-tags">
                  {exp.tags.map((tag, idx) => (
                    <span key={idx} className="experience-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
