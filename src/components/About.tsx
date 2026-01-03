import { useEffect, useRef, useState } from 'react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left Column - Title */}
        <div 
          className={`space-y-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl tracking-tighter leading-tight text-balance">
            ABOUT <br />
            <span className="text-blue-gradient">Muhammad Zaiimun Nabiil</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
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
              <p className="text-4xl md:text-5xl text-white font-bold mb-2 text-blue-gradient">
                {String(experienceCount).padStart(2, '0')}+
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors">
                Years Experience
              </p>
            </div>
            <div className="glass-premium p-6 rounded-2xl text-center glow-card group">
              <p className="text-4xl md:text-5xl text-white font-bold mb-2 text-blue-gradient">
                {deliveriesCount}+
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors">
                Projects Delivered
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
