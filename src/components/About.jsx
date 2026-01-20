import { useInView } from '../hooks/useInView'

export default function About() {
  const [ref, isInView] = useInView()

  return (
    <section id="about" className={`about ${isInView ? 'in-view' : ''}`} ref={ref}>
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
  )
}
