import { useInView } from '../hooks/useInView'
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiAngular,
  SiHtml5,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiOpenai,
} from 'react-icons/si'

import { FaBrain, FaRobot, FaLightbulb, FaCoins, FaServer, FaCode } from 'react-icons/fa'

const row1 = [
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Angular', icon: SiAngular, color: '#dd0031' },
  { name: 'Node.js', icon: FaServer, color: '#68a063' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'OpenAI', icon: SiOpenai, color: '#10a37f' },
  { name: 'Claude AI', icon: FaRobot, color: '#d97706' },
  { name: 'AI Agents', icon: FaBrain, color: '#a855f7' },
]

const row2 = [
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', icon: FaCode, color: '#264de4' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
  { name: 'REST APIs', icon: FaCoins, color: '#667eea' },
  { name: 'Prompt Eng.', icon: FaLightbulb, color: '#f59e0b' },
  { name: 'Vibe Coding', icon: FaCoins, color: '#ec4899' },
  { name: 'Token Mgmt', icon: FaServer, color: '#06b6d4' },
]

function MarqueeRow({ skills, direction = 'left', speed = 35 }) {
  // Duplicate items 3x for seamless infinite scroll
  const items = [...skills, ...skills, ...skills]

  return (
    <div className="marquee-row">
      <div
        className={`marquee-track ${direction === 'right' ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {items.map((skill, idx) => {
          const IconComponent = skill.icon
          return (
            <div
              key={idx}
              className="marquee-card"
              style={{ '--skill-color': skill.color }}
            >
              <div className="marquee-card-glow"></div>
              <div className="marquee-card-inner">
                <div className="marquee-icon">
                  <IconComponent />
                </div>
                <span className="marquee-name">{skill.name}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, isInView] = useInView()

  return (
    <section className={`skills ${isInView ? 'in-view' : ''}`} ref={ref}>
      {/* Gradient mesh background */}
      <div className="skills-mesh">
        <div className="mesh-orb mesh-1"></div>
        <div className="mesh-orb mesh-2"></div>
        <div className="mesh-orb mesh-3"></div>
        <div className="mesh-orb mesh-4"></div>
      </div>

      <div className="container skills-header">
        <h2>Skills & Technologies</h2>
        <p className="skills-subtitle">
          The tools and technologies I use to bring ideas to life
        </p>
      </div>

      {/* Marquee rows */}
      <div className="skills-marquee-wrap">
        <div className="marquee-fade marquee-fade-left"></div>
        <div className="marquee-fade marquee-fade-right"></div>
        <MarqueeRow skills={row1} direction="left" speed={40} />
        <MarqueeRow skills={row2} direction="right" speed={45} />
      </div>

      {/* Bottom stat line */}
      <div className="container">
        <div className="skills-stats-row">
          <div className="skills-stat">
            <span className="stat-big">18+</span>
            <span className="stat-small">Technologies</span>
          </div>
          <div className="skills-stat-divider"></div>
          <div className="skills-stat">
            <span className="stat-big">3</span>
            <span className="stat-small">Domains</span>
          </div>
          <div className="skills-stat-divider"></div>
          <div className="skills-stat">
            <span className="stat-big">∞</span>
            <span className="stat-small">Curiosity</span>
          </div>
        </div>
      </div>
    </section>
  )
}
