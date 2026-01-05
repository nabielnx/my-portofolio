import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { useScrollSpy } from './hooks/useScrollSpy'
import { NAV_ITEMS } from './data/constants'
import { SEO } from './components/SEO'

function App() {
  const activeSection = useScrollSpy(NAV_ITEMS, 150)

  return (
    <div className="relative min-h-screen font-sans selection:bg-primary/30">
      <SEO />
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
          {NAV_ITEMS.map((item) => (
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
