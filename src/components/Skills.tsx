import { useEffect, useRef, useState } from 'react'

const skills = [
  { name: 'React Ecosystem', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Cloud Architecture', icon: '☁️' },
  { name: 'Figma', icon: '🎨' },
  { name: 'CI/CD Pipeline', icon: '🔄' },
  { name: 'System Design', icon: '📐' }
]

const Skills = () => {
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
    <section ref={sectionRef} id="skills" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <div 
        className={`glass-premium p-10 md:p-16 lg:p-20 rounded-3xl glow-card transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl tracking-tighter mb-6 leading-tight">
              CORE <br />
              <span className="text-blue-gradient">EXPERTISE</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed tracking-tight mb-8">
              A comprehensive toolkit tailored for modern web development and high-stakes production environments.
            </p>
            
            {/* Tech Stack Highlight */}
            <div className="flex flex-wrap gap-3">
              {['Frontend', 'Backend', 'DevOps'].map((area, i) => (
                <span 
                  key={area}
                  className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-4 py-2 rounded-full border border-zinc-800 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right Column - Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-blue-500/20 transition-all duration-300 cursor-default ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
              >
                {/* Animated Dot */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-50 group-hover:animate-ping" />
                </div>
                
                {/* Skill Name */}
                <span className="text-sm font-semibold text-zinc-300 tracking-tight group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                
                {/* Icon */}
                <span className="ml-auto text-lg opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  {skill.icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
