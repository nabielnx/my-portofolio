import { useEffect, useState } from 'react'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      <div className="z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column - Text Content */}
        <div className="flex flex-col gap-8 order-2 md:order-1 text-center md:text-left">
          <div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter font-black text-balance">
              <span 
                className={`block transition-all duration-1000 delay-100 ${
                  isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
                }`}
              >
                I'm
              </span>
              <span 
                className={`block text-primary-gradient transition-all duration-1000 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
                }`}
              >
                Game Developer
              </span>
            </h1>

            <div
              className={`transition-all duration-1000 delay-500 mt-6 ${
                 isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
              }`}
            >
               <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white/90 text-balance">
                Muhammad Zaiimun Nabil
               </h2>
            </div>
          </div>
          
          {/* Subtitle */}
          <p 
            className={`text-zinc-400 text-base md:text-lg max-w-lg mx-auto md:mx-0 font-medium tracking-tight leading-relaxed transition-all duration-700 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A full-stack developer crafting high-performance, 
            minimalist digital experiences with precision and care.
          </p>
          
          {/* Premium CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-5 justify-center md:justify-start transition-all duration-700 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a 
              href="#projects" 
              className="group relative px-8 py-3.5 bg-white text-black text-sm font-bold rounded-xl btn-glow overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10">VIEW WORK</span>
            </a>
            <a 
              href="#contact" 
              className="group px-8 py-3.5 glass-premium text-white text-sm font-bold rounded-xl transition-all duration-300 glow-card hover:border-red-500/30"
            >
              <span className="group-hover:text-red-400 transition-colors">LET'S CONNECT</span>
            </a>
          </div>
        </div>

        {/* Right Column - Profile Photo */}
        <div className={`order-1 md:order-2 flex justify-center md:justify-end relative transition-all duration-1000 delay-300 mt-12 md:mt-0 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
            {/* Container Utama (Relative Parent) */}
            {/* Ukuran wadah ini menentukan ukuran lingkaran profil */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">

                {/* ================= 1. KARAKTER VOXEL (DIBELAKANG) ================= */}
                <img
                    src="/images/me.png" 
                    alt="Voxel Character"
                    className={`absolute z-10 top-[10%] md:top-[-8%] w-[170%] md:w-[170%] lg:w-[170%] max-w-none h-auto -rotate-6 pointer-events-none transition-all duration-1000 delay-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                        isLoaded ? 'left-[-110%] opacity-100 translate-x-0' : 'left-[-50%] opacity-0 translate-x-12'
                    }`}
                />
                {/* ================================================================== */}


                {/* 2. Glow Effect behind (Layer paling dasar) */}
                <div className="absolute z-0 inset-0 bg-red-500/20 blur-[80px] rounded-full animate-pulse-glow" />

                {/* ================= 3. LINGKARAN PROFIL (DIDEPAN) ================== */}
                {/* PENTING! z-index diubah jadi z-20 supaya dia menutupi bagian tengah karakter */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-red-500/30 glass-premium glow-border z-20">
                    <img
                        src="https://github.com/nabielnx.png"
                        alt="Muhammad Zaiimun Nabil"
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
                {/* ================================================================== */}

            </div>
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
