import { useEffect, useState } from 'react'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
      <div className="z-10 max-w-4xl">
      
        
        <div className="flex flex-col gap-6 md:gap-8 mb-12">
          <h1 className="text-6xl md:text-9xl leading-[0.9] tracking-tighter font-black text-balance">
            <span 
              className={`block transition-all duration-1000 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
              }`}
            >
              CREATING
            </span>
            <span 
              className={`block text-blue-gradient transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
              }`}
            >
              SYSTEMS
            </span>
          </h1>

          <div
            className={`transition-all duration-1000 delay-500 ${
               isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
            }`}
          >
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 text-balance">
              Muhammad Zaiimun Nabil
             </h2>
          </div>
        </div>
        
        {/* Subtitle */}
        <p 
          className={`max-w-xl mx-auto text-zinc-400 text-base md:text-lg mb-14 font-medium tracking-tight leading-relaxed transition-all duration-700 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          A full-stack developer crafting high-performance, 
          minimalist digital experiences with precision and care.
        </p>
        
        {/* Premium CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-5 justify-center transition-all duration-700 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a 
            href="#projects" 
            className="group relative px-10 py-4 bg-white text-black text-sm font-bold rounded-xl btn-glow overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10">VIEW MY WORK</span>
          </a>
          <a 
            href="#contact" 
            className="group px-10 py-4 glass-premium text-white text-sm font-bold rounded-xl transition-all duration-300 glow-card hover:border-blue-500/30"
          >
            <span className="group-hover:text-blue-400 transition-colors">LET'S CONNECT</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default Hero
