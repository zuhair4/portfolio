import { useInView } from '../hooks/useInView'

const skillCategories = [
  {
    category: 'Frontend',
    color: '#667eea',
    skills: ['TypeScript', 'JavaScript', 'React', 'Angular', 'HTML5 & CSS3' ,'Next.js']
  },
  {
    category: 'Backend & Database',
    color: '#764ba2',
    skills: ['Node.js', 'MongoDB', 'PostgreSQL', 'Firebase', 'REST APIs']
  },
  {
    category: 'AI & Integration',
    color: '#f093fb',
    skills: ['OpenAI APIs', 'Claude APIs', 'Prompt Engineering', 'AI Agents', 'Vibe Coding', 'Token Management']
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
                {category.skills.map((skill, skillIdx) => (
                  <div 
                    key={skillIdx} 
                    className="skill-item"
                    style={{ borderLeftColor: category.color }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
