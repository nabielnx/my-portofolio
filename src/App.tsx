import { useState, useEffect } from 'react'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Projects from './components/Projects.tsx'
import Skills from './components/Skills.tsx'
import Contact from './components/Contact.tsx'

function App() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact']
      let current = 'hero'
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) current = section
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen font-sans selection:bg-primary/30">
      {/* Noise Texture */}
      <div className="noise-bg" />
      
      {/* Aurora Background with Orbs */}
      <div className="aurora-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      
      {/* Premium Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 md:top-8 md:bottom-auto md:left-1/2 md:-translate-x-1/2 z-50 glass-premium px-4 md:px-8 py-3 rounded-2xl md:rounded-full">
        <div className="flex justify-around md:justify-center md:gap-10 items-center">
          {['hero', 'about', 'projects', 'skills', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`relative text-[10px] md:text-[12px] font-bold transition-all duration-300 px-2 py-1.5 rounded-lg ${
                activeSection === item 
                  ? 'text-red-400 nav-active' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="py-20 text-center">
        <p className="text-zinc-600 text-[11px] tracking-[0.2em] uppercase font-medium">
          © {new Date().getFullYear()} — Crafted with precision
        </p>
      </footer>
    </div>
  )
}

export default App
