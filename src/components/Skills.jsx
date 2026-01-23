import { useInView } from '../hooks/useInView'
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiOpenai,
} from 'react-icons/si'
import { FaBrain, FaRobot, FaLightbulb, FaCoins, FaServer } from 'react-icons/fa'

const skillCategories = [
  {
    category: 'Frontend',
    color: '#667eea',
    skills: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'React', icon: SiReact },
      { name: 'Angular', icon: SiAngular },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
      { name: 'Next.js', icon: SiNextdotjs }
      // 'TypeScript', 'JavaScript', 'React', 'Angular', 'HTML5 & CSS3' ,'Next.js'
    ]
  },
  {
    category: 'Backend & Database',
    color: '#764ba2',
    skills: [
      { name: 'Node.js', icon: FaServer },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'REST APIs', icon: FaCoins }
    ]
  },
  {
    category: 'AI & Integration',
    color: '#f093fb',
    skills: [
      { name: 'OpenAI APIs', icon: SiOpenai },
      { name: 'Claude APIs', icon: FaRobot },
      { name: 'Prompt Engineering', icon: FaLightbulb },
      { name: 'AI Agents', icon: FaBrain },
      { name: 'Vibe Coding', icon: FaCoins },
      { name: 'Token Management', icon: FaServer }
    ]
  },
]

export default function Skills() {
  const [ref, isInView] = useInView()

  return (
    <section className={`skills ${isInView ? 'in-view' : ''}`} ref={ref}>
      <div className="container">
        <h2>Skills & Technologies</h2>
        <div className="skills-categories">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category">
              <div
                className="category-header"
                style={{ backgroundColor: category.color }}
              >
                <h3>{category.category}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIdx) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skillIdx}
                      className="skill-item"
                      style={{ borderLeftColor: category.color }}
                    >
                      <IconComponent className="skill-icon" />
                      <span>{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
