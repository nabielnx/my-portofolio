import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { HERO_TEXT } from '../data/constants'

const About = () => {
  const { ref, isVisible } = useInView({ threshold: 0.2 })
  const [isFocused, setIsFocused] = useState(false)
  
  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000, isVisible: boolean) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      if (!isVisible) return
      
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [isVisible, end, duration])
    
    return count
  }

  const experienceCount = useCounter(5, 1500, isVisible)
  const deliveriesCount = useCounter(40, 2000, isVisible)

  return (
    <section ref={ref} id="about" className="min-h-screen flex flex-col justify-center py-24 md:py-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left Column - Title */}
        <div 
          className={`space-y-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl tracking-tighter leading-tight text-balance">
            ABOUT <br />
            <span className="text-primary-gradient">{HERO_TEXT.name}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-teal-500 rounded-full" />
          
          {/* Chill Character */}
          <img 
            src="/images/me_chill.png" 
            alt="Chill Character" 
            onClick={() => setIsFocused(true)}
            className="w-64 md:w-80 lg:w-96 block ml-auto md:mr-10 -mt-12 md:-mt-24 rotate-12 filter hover:brightness-110 cursor-pointer transition-all duration-500"
          />
        </div>
        
        {/* Right Column - Content */}
        <div className="space-y-8">
          <div 
            className={`space-y-6 text-zinc-400 text-lg leading-relaxed font-medium transition-all duration-700 delay-200 max-w-prose ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="glass-premium p-6 rounded-2xl glow-card">
              I specialize in building complex web architectures that remain remarkably simple for the user. 
              My focus is on performance, accessibility, and clean visual communication.
            </p>
            <p className="text-zinc-500">
              Every line of code I write is intentional, designed to scale and provide 
              seamless experiences across all devices and platforms.
            </p>
          </div>
          
          {/* Animated Stats */}
          <div 
            className={`grid grid-cols-2 gap-8 pt-8 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="glass-premium p-6 rounded-2xl text-center glow-card group">
              <p className="text-4xl md:text-5xl text-white font-bold mb-2 text-primary-gradient">
                {String(experienceCount).padStart(2, '0')}+
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors">
                Years Experience
              </p>
            </div>
            <div className="glass-premium p-6 rounded-2xl text-center glow-card group">
              <p className="text-4xl md:text-5xl text-white font-bold mb-2 text-primary-gradient">
                {deliveriesCount}+
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors">
                Projects Delivered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Character Focus Overlay */}
      {isFocused && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg cursor-zoom-out animate-fade-in"
          onClick={() => setIsFocused(false)}
        >
          <img 
            src="/images/me_chill.png" 
            alt="Character Focus"
            className="h-[85vh] w-auto object-contain drop-shadow-[0_0_100px_rgba(20,184,166,0.4)] animate-lightbox-zoom"
          />
        </div>
      )}
    </section>
  )
}

export default About
