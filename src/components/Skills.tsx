import { useInView } from '../hooks/useInView'
import { SKILLS_DATA, TECH_STACK_AREAS } from '../data/constants'

const Skills = () => {
  const { ref, isVisible } = useInView({ threshold: 0.2 })

  return (
    <section ref={ref} id="skills" className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
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
            <h2 className="text-4xl md:text-5xl tracking-tighter mb-6 leading-tight text-balance">
              CORE <br />
              <span className="text-primary-gradient">EXPERTISE</span>
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed tracking-tight mb-8">
              A comprehensive toolkit tailored for modern web development and high-stakes production environments.
            </p>
            
            {/* Tech Stack Highlight */}
            <div className="flex flex-wrap gap-3">
              {TECH_STACK_AREAS.map((area, i) => (
                <span 
                  key={area}
                  className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-4 py-2 rounded-full border border-zinc-800 hover:border-red-500/50 hover:text-red-400 transition-all cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right Column - Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILLS_DATA.map((skill, index) => (
              <div 
                key={index} 
                className={`group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-red-500/20 transition-all duration-300 cursor-default ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
              >
                {/* Icon Wrapper */}
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:text-white group-hover:bg-red-500 transition-all duration-300">
                  <skill.icon size={20} strokeWidth={1.5} />
                </div>
                
                {/* Skill Name */}
                <span className="text-sm font-semibold text-zinc-300 tracking-tight group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                
                {/* Arrow Indicator (replaces old icon) */}
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
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
