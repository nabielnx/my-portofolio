import { useEffect, useRef, useState } from 'react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
    <section ref={sectionRef} id="contact" className="py-24 md:py-40 px-6 max-w-7xl mx-auto text-center">
      {/* Section Header */}
      <div 
        className={`mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl md:text-6xl lg:text-8xl tracking-tighter mb-6 leading-tight text-balance">
          READY TO <br />
          <span className="text-primary-gradient">COLLABORATE?</span>
        </h2>
        <p className="text-zinc-500 text-lg max-w-md mx-auto">
          Let's create something extraordinary together
        </p>
      </div>

      {/* Contact Cards */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Email Card */}
        <a 
          href="mailto:hello@nabil.com" 
          className="group relative p-8 md:p-10 glass-premium rounded-2xl glow-card overflow-hidden transition-all duration-500"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-red-500/20 transition-colors">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-semibold">
              Direct Email
            </p>
            <p className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-red-400 transition-colors">
              zaimunnabil1@gmail.com
            </p>
          </div>

          {/* Arrow */}
          <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </a>
        
        {/* Social Card */}
        <a 
          href="#" 
          className="group relative p-8 md:p-10 glass-premium rounded-2xl glow-card overflow-hidden transition-all duration-500"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-teal-500/20 transition-colors">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-semibold">
              Social Network
            </p>
            <p className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-teal-400 transition-colors">
              @zaimnnabil
            </p>
          </div>

          {/* Arrow */}
          <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </a>
      </div>

      {/* Location Badge */}
      <div 
        className={`inline-flex items-center gap-3 px-6 py-3 glass-premium rounded-full transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        <p className="text-zinc-400 text-sm tracking-tight">
          Based in <span className="text-white font-medium">Indonesia</span> — Open for global remote work
        </p>
      </div>
    </section>
  )
}

export default Contact
