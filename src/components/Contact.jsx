import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import LinkedInImg from '../../assets/Linkedin.png'
import LeetcodeImg from '../../assets/Leetcode.png'

export default function Contact() {
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ref, isInView] = useInView()

  const contactCards = [
    {
      id: 1,
      title: 'Email',
      description: 'syedabbas6575@gmail.com',
      type: 'email',
      link: 'mailto:syedabbas6575@gmail.com',
      preview: null
    },
    {
      id: 2,
      title: 'LinkedIn',
      description: 'Connect with me on LinkedIn',
      type: 'linkedin',
      link: 'https://www.linkedin.com/in/zuhair-abbas07/',
      preview: LinkedInImg
    },
    {
      id: 3,
      title: 'LeetCode',
      description: 'Check my coding solutions',
      type: 'leetcode',
      link: 'https://leetcode.com/u/zuhair4/',
      preview: LeetcodeImg
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contactCards.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + contactCards.length) % contactCards.length)
  }

  return (
    <section id="contact" className={`contact ${isInView ? 'in-view' : ''}`} ref={ref}>
      <div className="container">
        <h2>Let's Connect</h2>
        <p>I'm always interested in hearing about new opportunities and collaborating on exciting projects.</p>
        <div className="contact-cards">
          {contactCards.map((card, index) => (
            <a 
              key={card.id} 
              href={card.link} 
              target={card.type === 'email' ? '_self' : '_blank'} 
              rel="noopener noreferrer" 
              className={`contact-card ${index === currentSlide ? 'active' : ''}`}
            >
              {card.preview ? (
                <div className='contact-preview-wrapper'>
                <img src={card.preview} alt={card.title} className="contact-preview" />
                <div className='contact-overlay'>
                  <span className='contact-link-text'>View →</span>
                </div>
                </div>
              ) : (
                <div className="contact-email-preview">
                  <div className="email-icon">✉️</div>
                  <div className="email-text">
                    <div className="email-line"></div>
                    <div className="email-line"></div>
                    <div className="email-line short"></div>
                  </div>
                </div>
              )}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </a>
          ))}

          {/* Desktop Grid Layout */}
          {contactCards.map((card) => (
            <a 
              key={card.id} 
              href={card.link} 
              target={card.type === 'email' ? '_self' : '_blank'} 
              rel="noopener noreferrer" 
              className="contact-card desktop-only"
            >
              {card.preview ? (
                <div className='contact-preview-wrapper'>
                <img src={card.preview} alt={card.title} className="contact-preview" />
                <div className='contact-overlay'>
                  <span className='contact-link-text'>View →</span>
                </div>
                </div>
              ) : (
                <div className="contact-email-preview">
                  <div className="email-icon">✉️</div>
                  <div className="email-text">
                    <div className="email-line"></div>
                    <div className="email-line"></div>
                    <div className="email-line short"></div>
                  </div>
                </div>
              )}
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </a>
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={prevSlide}>←</button>
          <div className="carousel-indicators">
            {contactCards.map((_, idx) => (
              <button
                key={idx}
                className={`indicator ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></button>
            ))}
          </div>
          <button className="carousel-btn next" onClick={nextSlide}>→</button>
        </div>
      </div>
    </section>
  )
}
