import { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'

// Lazy-load below-fold sections — splits them into separate JS chunks
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const Contact = lazy(() => import('./components/Contact'))
const Education = lazy(() => import('./components/Education'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Suspense fallback={null}>
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Education />
        <Footer />
      </Suspense>
    </div>
  )
}
