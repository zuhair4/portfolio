import profileImage from '../../assets/IMG_1779.jpg'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Zuhair Abbas</h1>
          <p className="hero-subtitle">Frontend Engineer | Full-Stack Developer | AI Integration Specialist</p>
          <p className="hero-description">Building scalable web platforms, optimizing performance, and integrating AI-powered solutions for enterprise applications</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
          <div className="hero-contact">
          </div>
        </div>
        <div className="hero-image">
          <img src={profileImage} alt="Zuhair Abbas" />
        </div>
      </div>
    </section>
  )
}
