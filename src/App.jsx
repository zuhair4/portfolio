import { useState } from 'react'
import './App.css'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

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
      tags: ['Next.js', 'React', 'Micro Frontend Architecture', 'TypeScript', 'AI Agents']
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
      tags: ['Angular', 'GPT-4 APIs', 'D3.js', 'Google Identity', 'AI Integration']
    }
  ]

  const skills = [
    // Frontend & Platform Engineering
    'TypeScript',
    'JavaScript',
    'React',
    'Angular',
    'Next.js',
    'Redux',
    'Nx',
    'Micro Frontends',
    'Module Federation',
    'RxJS',
    'NgRx',
    'React Query',
    // Web Performance & Data
    'Web Performance Optimization',
    'Node.js',
    'MongoDB',
    'PostgreSQL',
    'Firebase',
    // AI & Tooling
    'OpenAI APIs',
    'Claude APIs',
    'Prompt Engineering',
    'AI Agents',
    'Token Management',
    'CI/CD Pipelines',
    'OAuth 2.0',
    'Jest',
    'D3.js',
    'HTML5 & CSS3'
  ]

  const education = {
    school: 'Jamia Hamdard University, New Delhi',
    degree: 'Bachelor of Technology (CSE)',
    field: 'Computer Science Engineering',
    duration: '2018 - 2022',
    cgpa: '8.09',
    achievement: 'Recognized with two Spot Awards within the first year for building dynamic, scalable API-driven solutions'
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Portfolio</div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={() => setActiveSection('home')}>Home</a></li>
            <li><a href="#about" onClick={() => setActiveSection('about')}>About</a></li>
            <li><a href="#projects" onClick={() => setActiveSection('projects')}>Projects</a></li>
            <li><a href="#contact" onClick={() => setActiveSection('contact')}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Zuhair Abbas</h1>
          <p className="hero-subtitle">Frontend & Platform Engineer | Full-Stack Developer | AI Integration Specialist</p>
          <p className="hero-description">Building scalable web platforms, optimizing performance, and integrating AI-powered solutions for enterprise applications</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setActiveSection('experience')}>View My Work</button>
            <button className="btn btn-secondary" onClick={() => setActiveSection('contact')}>Get In Touch</button>
          </div>
          <div className="hero-contact">
            <a href="mailto:syedabbas6575@gmail.com">syedabbas6575@gmail.com</a> | 
            <a href="tel:+917011306929"> +91 7011306929</a> | 
            📍 Noida, India
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About Me</h2>
          <p>
            I'm a full-stack engineer with a passion for building scalable web platforms and integrating cutting-edge AI solutions. 
            With experience at Hashedin by Deloitte and WNS, I've successfully delivered enterprise-level applications serving millions of users.
          </p>
          <p>
            My expertise spans frontend architecture (Micro Frontends, Module Federation, Next.js), performance optimization, 
            and AI integration using OpenAI and Claude APIs. I'm driven by the challenge of solving complex problems with clean, 
            maintainable code and creating seamless user experiences globally.
          </p>
          <p>
            When I'm not coding, I explore the intersection of AI and web development, contribute to innovative projects, 
            and engage with the developer community on platforms like LeetCode and LinkedIn.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <div className="container">
          <h2>Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="experience" className="projects">
        <div className="container">
          <h2>Work Experience</h2>
          <div className="experience-container">
            {workExperience.map((exp) => (
              <div key={exp.id} className="experience-card">
                <div className="experience-header">
                  <div>
                    <h3>{exp.position}</h3>
                    <p className="company">{exp.company}</p>
                    <p className="duration">{exp.duration}</p>
                  </div>
                </div>
                <ul className="highlights-list">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
                <div className="project-tags">
                  {exp.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Let's Connect</h2>
          <p>I'm always interested in hearing about new opportunities and collaborating on exciting projects.</p>
          <div className="contact-buttons">
            <a href="mailto:syedabbas6575@gmail.com" className="btn btn-primary">Send Me An Email</a>
            <a href="https://linkedin.com/in/zuhair-abbas" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LinkedIn</a>
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">LeetCode</a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education">
        <div className="container">
          <h2>Education</h2>
          <div className="education-card">
            <h3>{education.school}</h3>
            <p className="degree">{education.degree} in {education.field}</p>
            <p className="duration">{education.duration}</p>
            <p className="cgpa">CGPA: {education.cgpa}</p>
            <p className="achievement"><strong>Achievement:</strong> {education.achievement}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Frontend Developer. All rights reserved.</p>
      </footer>
    </div>
  )
}
