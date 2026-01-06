import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { HERO_TEXT, JOURNEY_DATA } from '../data/constants'

const About = () => {
  const { ref, isVisible } = useInView({ threshold: 0.1 })
  const [isFocused, setIsFocused] = useState(false)

  return (
    <section ref={ref} id="about" className="min-h-screen flex flex-col justify-center py-24 md:py-40 px-6 max-w-7xl mx-auto">
      
      {/* Header with Character */}
      <div 
        className={`flex flex-row items-center justify-center gap-0 mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Character - Left of Text on Desktop */}
        <img 
            src="/images/me_chill.png" 
            alt="Chill Character" 
            onClick={() => setIsFocused(true)}
            className="w-47 sm:w-48 md:w-80 lg:w-[24rem] -mr-4 md:-mr-16 rotate-[-1deg] filter drop-shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105 cursor-pointer transition-all duration-300 grayscale-[0.2] hover:grayscale-0 relative z-10"
        />

        {/* Text */}
        <div className="text-left relative z-0">
            <h2 className="text-4xl sm:text-5xl md:text-8xl tracking-tighter leading-tight text-balance mb-2 md:mb-4">
            ABOUT <br /> MY <span className="text-primary-gradient">JOURNEY</span>
            </h2>
            <p className="text-zinc-500 max-w-lg text-sm md:text-lg">
            The path that led me to where I am today.
            </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        
        {/* Center Vertical Line (Hidden on Mobile, Visible on MD+) */}
        <div 
            className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-red-500 via-teal-500 to-transparent transition-all duration-1000 delay-300 ${
                isVisible ? 'h-full opacity-30' : 'h-0 opacity-0'
            }`} 
        />
        
        {/* Mobile Vertical Line (Left side) */}
        <div 
            className={`md:hidden absolute left-4 top-0 w-0.5 bg-gradient-to-b from-red-500 via-teal-500 to-transparent transition-all duration-1000 delay-300 ${
                isVisible ? 'h-full opacity-30' : 'h-0 opacity-0'
            }`} 
        />

        <div className="space-y-12 md:space-y-0">
          {JOURNEY_DATA.map((item, index) => {
            const isLeft = index % 2 === 0
            
            return (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center justify-between md:gap-8 ${
                   !isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* 1. Spacer for opposite side (Desktop only) */}
                <div className="hidden md:block w-5/12" />

                {/* 2. Center Dot */}
                <div 
                    className={`absolute left-4 md:left-1/2 -translate-x-1.5 md:-translate-x-1/2 flex items-center justify-center transition-all duration-500 ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 500}ms` }}
                >
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-10" />
                    {/* Connecting line for mobile to card */}
                    <div className="md:hidden absolute left-full top-1/2 h-0.5 w-4 bg-red-500/30" />
                </div>

                {/* 3. Content Card */}
                <div 
                  className={`w-full pl-12 md:pl-0 md:w-5/12 transition-all duration-700 ${
                    isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : isLeft ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="glass-premium p-6 md:p-8 rounded-2xl glow-card relative group hover:-translate-y-1 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-red-400 text-xs font-bold tracking-wider mb-4 border border-red-500/10 group-hover:bg-red-500/10 transition-colors">
                        {item.period}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wide">
                        {item.role}
                    </p>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        {item.description}
                    </p>
                  </div>
                </div>

              </div>
            )
          })}
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
