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

  return (
    <div className="relative min-h-screen font-sans selection:bg-primary/30">
      <div className="liquid-bg" />
      
      {/* Navigation - Mobile: Bottom Fixed | Desktop: Top Fixed */}
      <nav className="fixed bottom-6 left-5 right-5 md:top-8 md:bottom-auto md:left-1/2 md:-translate-x-1/2 z-50 glass px-4 md:px-6 py-2.5 rounded-2xl md:rounded-full glass-border">
        <div className="flex justify-around md:justify-center md:gap-8 items-center">
          {['hero', 'about', 'projects', 'skills', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`text-[10px] md:text-[13px] font-bold transition-all px-2 py-1 ${
                activeSection === item ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-300'
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

      <footer className="py-20 text-center text-zinc-600 text-[12px] tracking-widest uppercase">
        <p>© {new Date().getFullYear()} — Designed for Excellence</p>
      </footer>
    </div>
  )
}

export default App
