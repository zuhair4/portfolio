import cafeImage from '../../assets/Cafe.png'
import ivaccinateImage from '../../assets/ivaccinate.png'
import hashedinImage from '../../assets/hashedin.png'

const projectsData = [
  {
    id: 1,
    title: 'Hashedin by Deloitte',
    description: 'Cutting-edge engineering solutions and consulting services',
    preview: hashedinImage,
    link: 'https://hashedin.com/services#engineering-models',
    tags: ['Company', 'Engineering', 'Consulting'],
    badge: 'Latest Development'
  },
  {
    id: 2,
    title: 'Cafe Website',
    description: 'A modern cafe website showcasing menu items, location, and services',
    preview: cafeImage,
    link: 'https://zuhair4.github.io/Cafe/index.html',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 3,
    title: 'iVaccinate',
    description: 'A vaccination tracking and management platform',
    preview: ivaccinateImage,
    link: 'https://zuhair4.github.io/iVaccinate/',
    tags: ['React', 'Web App', 'Healthcare']
  }
]

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2>Featured Projects</h2>
        <p className="projects-subtitle">Check out some of my recent work</p>
        <div className="projects-grid">
          {projectsData.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item"
            >
              {project.badge && <div className="project-badge">{project.badge}</div>}
              <div className="project-preview">
                <img 
                  src={project.preview} 
                  alt={project.title}
                  className="project-screenshot"
                />
                <div className="project-overlay">
                  <span className="view-link">View Project →</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
