import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import GeometryDash from './GeometryDash'
import { HERO_TEXT } from '../data/constants'

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [showGame, setShowGame] = useState(false)
    const [isHoveredCharacter, setIsHoveredCharacter] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        const timer = setTimeout(() => setIsReady(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
             
             {/* Game Overlay */}
             {showGame && <GeometryDash onClose={() => setShowGame(false)} />}

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* ================= GEOMETRY DASH MASCOT (Perimeter Patrol) ================= */}
                <div 
                    role="button"
                    tabIndex={0}
                    aria-label="Play Geometry Dash Minigame"
                    onClick={() => setShowGame(true)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowGame(true) }}
                    className="absolute z-50 w-12 h-12 md:w-16 md:h-16 cursor-pointer group/mascot animate-mascot-perimeter focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg pointer-events-auto"
                    style={{ top: '-20px', left: '-60px'}} // Origin point for CSS animation
                    title="Play Minigame!"
                >
                    {/* The Cube */}
                    <div className="w-full h-full bg-red-500 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.5)] border-2 border-red-400 flex items-center justify-center transition-transform group-hover/mascot:scale-110">
                        <div className="w-1/2 h-1/2 bg-red-300 rounded-sm opacity-50" />
                        {/* Eyes */}
                        <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-white rounded-full" />
                        <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-white rounded-full" />
                    </div>
                    {/* Tooltip hint */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-teal-500 text-[10px] text-black font-bold rounded opacity-0 group-hover/mascot:opacity-100 transition-opacity whitespace-nowrap">
                        PLAY ME!
                    </div>
                </div>
                {/* ========================================================================= */}
                
                {/* Left Column - Text Content */}
                <div className="flex flex-col gap-8 order-2 md:order-1 text-center md:text-left">
                    <div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter font-black text-balance">
                            <span 
                                className={`block transition-all duration-1000 delay-100 ${
                                    isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
                                }`}
                            >
                                {HERO_TEXT.greeting} 
                            </span>
                            <span 
                                className={`block text-primary-gradient transition-all duration-1000 delay-300 ${
                                    isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
                                }`}
                            >
                                {HERO_TEXT.title}
                            </span>
                        </h1>

                        <div
                            className={`transition-all duration-1000 delay-500 mt-6 ${
                                isLoaded ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'
                            }`}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white/90 text-balance">
                                {HERO_TEXT.name}
                            </h2>
                        </div>
                    </div>
                    
                    {/* Subtitle */}
                    <p 
                        className={`text-zinc-400 text-base md:text-lg max-w-lg mx-auto md:mx-0 font-medium tracking-tight leading-relaxed transition-all duration-700 delay-700 ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        {HERO_TEXT.description}
                    </p>
                    
                    {/* Action Row: Button + Socials */}
                    <div 
                        className={`flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start transition-all duration-700 delay-700 ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        {/* View Work Button */}
                        <a 
                            href="#projects" 
                            className="group relative px-8 py-3.5 bg-white text-black text-sm font-bold rounded-xl btn-glow overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105"
                        >
                            <span className="relative z-10">{HERO_TEXT.actions.primary}</span>
                        </a>

                        {/* Separator (Optional / Visual Gap) */}
                        <div className="hidden sm:block w-px h-8 bg-white/10 mx-2" />

                        {/* Social Icons (Standard) */}
                        <div className="flex items-center gap-4">
                           {[
                              { Icon: Github, href: "https://github.com/nabielnx", label: "GitHub" },
                              { Icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-zaiimun-nabiil/", label: "LinkedIn" },
                              { Icon: Mail, href: "mailto:zaimunnabil1@gmail.com", label: "Email" }
                          ].map((social, i) => (
                              <a 
                                  key={i}
                                  href={social.href} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  aria-label={social.label}
                                  className="p-3 glass-premium rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 group focus-visible:ring-2 focus-visible:ring-red-500/50 outline-none"
                              >
                                  <social.Icon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                              </a>
                          ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Profile Photo */}
                <div className={`order-1 md:order-2 flex justify-center md:justify-end relative transition-all duration-1000 delay-300 mt-12 md:mt-0 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                    {/* Container Utama (Relative Parent) */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">

                        {/* ================= 1. KARAKTER VOXEL (DIBELAKANG) ================= */}
                        <div 
                            className="absolute z-10 inset-0 pointer-events-none"
                            onMouseEnter={() => setIsHoveredCharacter(true)}
                            onMouseLeave={() => setIsHoveredCharacter(false)}
                        >
                            {/* Default Pose */}
                            <img
                                src="/images/me.png" 
                                alt="Voxel Character"
                                onClick={() => setIsFocused(true)}
                                className={`absolute top-[10%] md:top-[-15%] w-[140%] md:w-[140%] lg:w-[140%] max-w-none h-auto -rotate-6 cursor-pointer hover:scale-105 hover:brightness-110 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all ease-in-out pointer-events-auto ${
                                    isReady ? 'duration-300 delay-0' : 'duration-1000 delay-0 md:delay-1000'
                                } ${
                                    isLoaded ? 'left-[-100%] translate-x-0' : 'left-[-50%] opacity-0 translate-x-12'
                                } ${isHoveredCharacter ? 'opacity-0' : 'opacity-100'}`}
                            />
                            {/* Waving Pose */}
                            <img
                                src="/images/me_hi.png" 
                                alt="Voxel Character Waving"
                                onClick={() => setIsFocused(true)}
                                className={`absolute top-[10%] md:top-[-15%] w-[140%] md:w-[140%] lg:w-[140%] max-w-none h-auto -rotate-6 cursor-pointer hover:scale-105 hover:brightness-110 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all ease-in-out pointer-events-auto ${
                                    isReady ? 'duration-300 delay-0' : 'duration-1000 delay-0 md:delay-1000'
                                } ${
                                    isLoaded ? 'left-[-100%] translate-x-0' : 'left-[-50%] opacity-0 translate-x-12'
                                } ${isHoveredCharacter ? 'opacity-100' : 'opacity-0'}`}
                            />
                        </div>
                        {/* ================================================================== */}

                        {/* 2. Glow Effect behind (Layer paling dasar) */}
                        <div className="absolute z-0 inset-0 bg-red-500/80 blur-[60px] rounded-full animate-pulse-glow" />

                        {/* ================= 3. LINGKARAN PROFIL (DIDEPAN) ================== */}
                        {/* PENTING! z-index diubah jadi z-20 supaya dia menutupi bagian tengah karakter */}
                        <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden border-2 border-red-500/40 glass-premium glow-border z-20 -translate-y-12 md:-translate-y-11">
                            <img
                                src="/images/myPhoto.jpeg"
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
            
            {/* Character Focus Overlay */}
            {isFocused && (
                <div 
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg cursor-zoom-out animate-fade-in"
                onClick={() => setIsFocused(false)}
                >
                <img 
                    src="/images/me.png" 
                    alt="Character Focus"
                    className="h-[85vh] w-auto object-contain drop-shadow-[0_0_100px_rgba(239,68,68,0.4)] animate-lightbox-zoom"
                />
                </div>
            )}
        </section>
    )
}

export default Hero
