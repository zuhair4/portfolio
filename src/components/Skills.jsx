const skills = [
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
  'Web Performance Optimization',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'Firebase',
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

export default function Skills() {
  return (
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
  )
}
