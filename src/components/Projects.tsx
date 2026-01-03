import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import ProjectDetail from './ProjectDetail'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-32 md:py-40 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div 
        className={`mb-20 md:mb-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl md:text-6xl tracking-tighter mb-4">
          SELECTED <br />
          <span className="text-blue-gradient">PROJECTS</span>
        </h2>
        <p className="text-zinc-500 max-w-md">
          A curated selection of work that showcases my expertise in building modern digital experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`group cursor-pointer transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedProject(project)}
          >
            {/* Project Card */}
            <div className={`
              relative aspect-[4/3] rounded-2xl mb-6 overflow-hidden 
              glass-premium card-hover
              ${hoveredIndex === index ? 'glow-border' : ''}
            `}>
              {/* Project Image */}
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay`} />
              
              {/* Dark Gradient for Text Legibility (if needed) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />
              
              {/* Project Number */}
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="text-3xl font-bold text-white/10 group-hover:text-white/30 transition-colors">
                  0{index + 1}
                </span>
              </div>

              {/* Arrow Indicator */}
              <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            {/* Project Info */}
            <div className="space-y-3 px-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.15em]">
                  {project.category}
                </span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>
              
              <h3 className="text-xl md:text-2xl tracking-tight font-bold group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                {project.shortDescription}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-3">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[10px] font-semibold text-zinc-600 uppercase tracking-tight px-2 py-1 rounded-md bg-white/5 group-hover:bg-blue-500/10 group-hover:text-blue-400/80 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Project Detail Overlay */}
      {selectedProject && (
        <ProjectDetail 
           project={selectedProject} 
           onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  )
}

export default Projects
