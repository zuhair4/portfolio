import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
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
} from 'react-icons/si'
import { RiOpenaiFill } from 'react-icons/ri'

import { FaBrain, FaRobot, FaLightbulb, FaCoins, FaServer, FaCode } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'

const row1 = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: '#3178c6',
    category: 'Language',
    level: 90,
    description:
      'A strongly typed superset of JavaScript that adds static types — catching errors early and scaling codebases with confidence.',
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'React',
    icon: SiReact,
    color: '#61dafb',
    category: 'Frontend',
    level: 90,
    description:
      'A component-based library for building fast, interactive user interfaces with a declarative, reusable architecture.',
    link: 'https://react.dev/',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    color: '#ffffff',
    category: 'Framework',
    level: 80,
    description:
      'A React framework for production with server-side rendering, static generation, and full-stack capabilities.',
    link: 'https://nextjs.org/',
  },
  {
    name: 'Angular',
    icon: SiAngular,
    color: '#dd0031',
    category: 'Frontend',
    level: 95,
    description:
      'A comprehensive TypeScript framework for building scalable, enterprise-grade single-page applications.',
    link: 'https://angular.dev/',
  },
  {
    name: 'Node.js',
    icon: FaServer,
    color: '#68a063',
    category: 'Backend',
    level: 82,
    description:
      "A JavaScript runtime built on Chrome's V8 engine for building fast, scalable server-side applications.",
    link: 'https://nodejs.org/',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    color: '#47a248',
    category: 'Database',
    level: 80,
    description:
      'A flexible NoSQL document database that stores data in JSON-like documents for rapid, schema-less development.',
    link: 'https://www.mongodb.com/',
  },
  {
    name: 'OpenAI',
    icon: RiOpenaiFill,
    color: '#10a37f',
    category: 'AI / ML',
    level: 90,
    description:
      'Industry-leading GPT models and APIs for integrating powerful language, vision, and reasoning into applications.',
    link: 'https://platform.openai.com/docs',
  },
  {
    name: 'Claude AI',
    icon: FaRobot,
    color: '#d97706',
    category: 'AI / ML',
    level: 92,
    description:
      "Anthropic's family of safe, capable AI assistants for building agents, tools, and conversational experiences.",
    link: 'https://docs.anthropic.com/',
  },
  {
    name: 'AI Agents',
    icon: FaBrain,
    color: '#a855f7',
    category: 'AI / ML',
    level: 87,
    description:
      'Autonomous systems that reason, plan, and use tools to accomplish complex multi-step tasks with minimal supervision.',
    link: 'https://docs.anthropic.com/en/docs/agents-and-tools/overview',
  },
]

const row2 = [
  {
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#f7df1e',
    category: 'Language',
    level: 93,
    description:
      'The language of the web — powering dynamic, interactive experiences across every modern browser and runtime.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'HTML5',
    icon: SiHtml5,
    color: '#e34f26',
    category: 'Frontend',
    level: 91,
    description:
      'The semantic backbone of the web — structuring content with accessible, modern markup standards.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    name: 'CSS3',
    icon: FaCode,
    color: '#264de4',
    category: 'Frontend',
    level: 90,
    description:
      'The styling engine of the web — layouts, animations, and responsive design with Grid, Flexbox, and modern features.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    color: '#336791',
    category: 'Database',
    level: 80,
    description:
      'A powerful, open-source relational database known for reliability, extensibility, and SQL standards compliance.',
    link: 'https://www.postgresql.org/',
  },
  {
    name: 'Firebase',
    icon: SiFirebase,
    color: '#ffca28',
    category: 'Backend',
    level: 83,
    description:
      "Google's app platform offering real-time databases, authentication, hosting, and serverless functions.",
    link: 'https://firebase.google.com/',
  },
  {
    name: 'REST APIs',
    icon: FaCoins,
    color: '#667eea',
    category: 'Backend',
    level: 90,
    description:
      'An architectural style for designing networked applications using stateless, resource-based HTTP endpoints.',
    link: 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
  },
  {
    name: 'Prompt Eng.',
    icon: FaLightbulb,
    color: '#f59e0b',
    category: 'AI / ML',
    level: 88,
    description:
      'The craft of designing effective prompts to guide LLMs toward accurate, reliable, and useful outputs.',
    link: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },
  {
    name: 'Vibe Coding',
    icon: FaCoins,
    color: '#ec4899',
    category: 'Workflow',
    level: 90,
    description:
      'An AI-assisted, flow-state approach to building software by collaborating with intelligent coding agents.',
    link: 'https://www.anthropic.com/claude-code',
  },
  {
    name: 'Token Mgmt',
    icon: FaServer,
    color: '#06b6d4',
    category: 'AI / ML',
    level: 90,
    description:
      'Optimizing context windows and token usage to balance cost, speed, and quality in LLM-powered applications.',
    link: 'https://docs.anthropic.com/en/docs/build-with-claude/token-counting',
  },
]

/* ---------- Hover Popup (rendered via portal) ---------- */
function SkillPopup({ data, onMouseEnter, onMouseLeave }) {
  const { skill, rect } = data
  const Icon = skill.icon

  // Position: centered above the card, flipping below if near the top edge.
  const POPUP_WIDTH = Math.min(300, window.innerWidth - 24)
  const GAP = 16
  const placeBelow = rect.top < 260
  const centerX = rect.left + rect.width / 2

  let left = centerX - POPUP_WIDTH / 2
  // Keep within viewport horizontally
  const margin = 12
  left = Math.max(margin, Math.min(left, window.innerWidth - POPUP_WIDTH - margin))

  const arrowOffset = centerX - left // arrow points at card center

  const style = {
    position: 'fixed',
    left: `${left}px`,
    width: `${POPUP_WIDTH}px`,
    '--skill-color': skill.color,
    '--arrow-x': `${arrowOffset}px`,
    zIndex: 9999,
  }

  if (placeBelow) {
    style.top = `${rect.bottom + GAP}px`
  } else {
    style.top = `${rect.top - GAP}px`
    style.transform = 'translateY(-100%)'
  }

  return createPortal(
    <div
      className={`skill-popup ${placeBelow ? 'popup-below' : 'popup-above'}`}
      style={style}
      role="tooltip"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="skill-popup-glow" />
      <div className="skill-popup-header">
        <div className="skill-popup-icon">
          <Icon />
        </div>
        <div className="skill-popup-titles">
          <span className="skill-popup-name">{skill.name}</span>
          <span className="skill-popup-category">{skill.category}</span>
        </div>
      </div>

      <p className="skill-popup-desc">{skill.description}</p>

      <div className="skill-popup-meter">
        <div className="skill-popup-meter-head">
          <span>Proficiency</span>
          <span>{skill.level}%</span>
        </div>
        <div className="skill-popup-bar">
          <div className="skill-popup-bar-fill" style={{ width: `${skill.level}%` }} />
        </div>
      </div>

      <a
        className="skill-popup-link"
        href={skill.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
        <FiArrowUpRight />
      </a>
      <span className="skill-popup-arrow" />
    </div>,
    document.body
  )
}

function MarqueeRow({ skills, direction = 'left', speed = 35, onCardEnter, onCardLeave }) {
  // Memoize so the 27-item array isn't recreated on every render
  const items = useMemo(() => [...skills, ...skills, ...skills], [skills])

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
              onMouseEnter={(e) => onCardEnter(skill, e.currentTarget)}
              onMouseLeave={onCardLeave}
              tabIndex={0}
              onFocus={(e) => onCardEnter(skill, e.currentTarget)}
              onBlur={onCardLeave}
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
  const [active, setActive] = useState(null) // { skill, rect }
  const closeTimer = useRef(null)

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const handleCardEnter = useCallback((skill, el) => {
    clearCloseTimer()
    setActive({ skill, rect: el.getBoundingClientRect() })
  }, [])

  const handleCardLeave = useCallback(() => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setActive(null), 140)
  }, [])

  const handlePopupEnter = useCallback(() => clearCloseTimer(), [])
  const handlePopupLeave = useCallback(() => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setActive(null), 140)
  }, [])

  // Dismiss on scroll/resize since the fixed popup would otherwise detach.
  useEffect(() => {
    if (!active) return
    const dismiss = () => setActive(null)
    window.addEventListener('scroll', dismiss, true)
    window.addEventListener('resize', dismiss)
    return () => {
      window.removeEventListener('scroll', dismiss, true)
      window.removeEventListener('resize', dismiss)
    }
  }, [active])

  useEffect(() => () => clearCloseTimer(), [])

  return (
    <section id="skills" className={`skills ${isInView ? 'in-view' : ''}`} ref={ref}>
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
          <span className="skills-hint"> — hover a skill to learn more</span>
        </p>
      </div>

      {/* Marquee rows */}
      <div className={`skills-marquee-wrap ${active ? 'popup-open' : ''}`}>
        <div className="marquee-fade marquee-fade-left"></div>
        <div className="marquee-fade marquee-fade-right"></div>
        <MarqueeRow
          skills={row1}
          direction="left"
          speed={40}
          onCardEnter={handleCardEnter}
          onCardLeave={handleCardLeave}
        />
        <MarqueeRow
          skills={row2}
          direction="right"
          speed={45}
          onCardEnter={handleCardEnter}
          onCardLeave={handleCardLeave}
        />
      </div>

      {/* AI Certifications */}
      <div className="container">
        <div className="skills-certs-row">
          <a
            href="https://www.credly.com/badges/15e87db5-9c67-4d7b-bf44-2dae7dcdd0f3/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card"
            aria-label="Claude Certified Architect – Foundations on Credly"
          >
            {/* Badge icon area */}
            <div className="cert-badge-icon">
              {/* Anthropic starburst */}
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cert-anthropic-svg" aria-hidden="true">
                <circle cx="32" cy="32" r="32" fill="#d97706" opacity="0.15" />
                <g transform="translate(12, 12) scale(0.625)">
                  <path d="M32 6 L34.5 22 L48 14 L38 26 L54 28.5 L38 31 L48 43 L34.5 35 L32 51 L29.5 35 L16 43 L26 31 L10 28.5 L26 26 L16 14 L29.5 22 Z" fill="#d97706"/>
                </g>
              </svg>
              <span className="cert-verified-dot" aria-hidden="true" />
            </div>

            {/* Text content */}
            <div className="cert-content">
              <div className="cert-meta">
                <span className="cert-issuer">Anthropic</span>
                <span className="cert-dot" aria-hidden="true">·</span>
                <span className="cert-type">Certification</span>
              </div>
              <h3 className="cert-name">Claude Certified Architect<span className="cert-tier"> – Foundations</span></h3>
              <p className="cert-skills-label">AI System Design · Claude Agent SDK · MCP · Prompt Engineering</p>
            </div>

            {/* Right: dates + verify CTA */}
            <div className="cert-right">
              <div className="cert-dates">
                <span className="cert-issued">Issued Jul 2026</span>
                <span className="cert-expires">Expires Jul 2027</span>
              </div>
              <span className="cert-verify-btn">
                Verify
                <FiArrowUpRight />
              </span>
            </div>
          </a>
        </div>
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

      {active && (
        <SkillPopup
          data={active}
          onMouseEnter={handlePopupEnter}
          onMouseLeave={handlePopupLeave}
        />
      )}
    </section>
  )
}
