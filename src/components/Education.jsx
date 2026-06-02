import { useInView } from '../hooks/useInView'

const stats = [
  { value: '8.09', suffix: '/10', label: 'CGPA' },
  { value: '4', suffix: ' Yrs', label: 'Duration' },
  { value: '2022', suffix: '', label: 'Graduated' },
]

const courses = [
  'Data Structures & Algorithms',
  'Operating Systems',
  'Database Management',
  'Computer Networks',
  'Machine Learning',
  'Object-Oriented Programming',
  'Web Technologies',
  'Software Engineering',
]

export default function Education() {
  const [ref, isInView] = useInView()

  return (
    <section
      id="education"
      className={`edu-section ${isInView ? 'edu-in-view' : ''}`}
      ref={ref}
    >
      {/* Decorative background orbs */}
      <div className="edu-bg" aria-hidden="true">
        <div className="edu-orb edu-orb-1"></div>
        <div className="edu-orb edu-orb-2"></div>
        <div className="edu-orb edu-orb-3"></div>
      </div>

      <div className="container edu-container">

        {/* Section header */}
        <div className="edu-header">
          <span className="edu-badge">EDUCATION</span>
          <h2 className="edu-title">
            Academic <span className="edu-title-gradient">Foundation</span>
          </h2>
          <p className="edu-subtitle">The building blocks of my technical journey</p>
        </div>

        {/* Main card */}
        <div className="edu-card">
          <div className="edu-card-glow" aria-hidden="true"></div>

          {/* Left: University identity */}
          <div className="edu-card-left">
            <div className="edu-icon-wrap">
              <span className="edu-icon">🎓</span>
            </div>

            <div className="edu-uni-info">
              <span className="edu-degree-badge">B.Tech · CSE</span>
              <h3 className="edu-uni-name">Jamia Hamdard University</h3>
              <p className="edu-location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                New Delhi, India
              </p>
            </div>

            <div className="edu-duration-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              2018 – 2022
            </div>
          </div>

          {/* Divider */}
          <div className="edu-divider" aria-hidden="true"></div>

          {/* Right: Details */}
          <div className="edu-card-right">

            {/* Stats */}
            <div className="edu-stats">
              {stats.map((s, i) => (
                <div key={i} className="edu-stat">
                  <span className="edu-stat-value">
                    {s.value}
                    <span className="edu-stat-suffix">{s.suffix}</span>
                  </span>
                  <span className="edu-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Degree */}
            <p className="edu-degree-full">
              Bachelor of Technology in Computer Science &amp; Engineering
            </p>

            {/* Coursework */}
            <div className="edu-courses">
              <span className="edu-courses-label">Key Coursework</span>
              <div className="edu-course-tags">
                {courses.map(c => (
                  <span key={c} className="edu-course-tag">{c}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
