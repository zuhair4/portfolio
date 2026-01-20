import { useInView } from '../hooks/useInView'

const education = {
  school: 'Jamia Hamdard University, New Delhi',
  degree: 'Bachelor of Technology (CSE)',
  field: 'Computer Science Engineering',
  duration: '2018 - 2022',
  cgpa: '8.09',
}

export default function Education() {
  const [ref, isInView] = useInView()

  return (
    <section className={`education ${isInView ? 'in-view' : ''}`} ref={ref}>
      <div className="container">
        <h2>Education</h2>
        <div className="education-card">
          <h3>{education.school}</h3>
          <p className="degree">{education.degree} in {education.field}</p>
          <p className="duration">{education.duration}</p>
          <p className="cgpa">CGPA: {education.cgpa}</p>
        </div>
      </div>
    </section>
  )
}
