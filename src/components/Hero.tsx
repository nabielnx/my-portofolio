const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
      <div className="z-10 max-w-4xl">
        <div className="inline-block px-3 py-1 mb-8 glass-border rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          Available for Collaboration
        </div>
        
        <h1 className="text-5xl md:text-8xl mb-8 leading-[1.1] tracking-tighter">
          ELEGANT SOLUTIONS <br />
          <span className="text-blue-gradient">FOR THE WEB</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-zinc-400 text-base md:text-lg mb-12 font-medium tracking-tight">
          A full-stack developer crafting high-performance, 
          minimalist digital experiences with precision and care.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a href="#projects" className="px-10 py-4 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
            MY PROJECTS
          </a>
          <a href="#contact" className="px-10 py-4 glass glass-border text-white text-sm font-bold rounded-xl hover:bg-white/5 transition-all active:scale-95">
            LET'S TALK
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
