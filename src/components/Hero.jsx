import { useState, useEffect } from 'react'
import profileImage from '../../assets/IMG_1779.jpg'

const roles = [
  'Frontend Engineer',
  'Full-Stack Developer',
  'AI Integration Specialist'
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        )
      }, isDeleting ? 40 : 80)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Zuhair Abbas</h1>
          <p className="hero-subtitle">
            {text}
            <span className="typewriter-cursor" />
          </p>
          <p className="hero-description">Building scalable web platforms, optimizing performance, and integrating AI-powered solutions for enterprise applications</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
          <div className="hero-contact">
          </div>
        </div>
        <div className="hero-image">
          <div className="blob-frame">
            <img src={profileImage} alt="Zuhair Abbas" />
          </div>
        </div>
      </div>
    </section>
  )
}
