const projects = [
  {
    title: 'Nalar Architecture',
    category: 'Full Stack',
    description: 'Scalable cloud-native enterprise management system.',
    tags: ['React', 'Postgres']
  },
  {
    title: 'Zenith UI Kit',
    category: 'Design System',
    description: 'A professional-grade component library for SaaS.',
    tags: ['Tailwind', 'Next.js']
  },
  {
    title: 'Flux AI',
    category: 'Deep Learning',
    description: 'Real-time content analysis using transformer models.',
    tags: ['Python', 'Azure']
  }
]

const Projects = () => {
  return (
    <section id="projects" className="py-40 px-6 max-w-7xl mx-auto">
      <div className="mb-24">
        <h2 className="text-4xl md:text-6xl tracking-tighter mb-6">SELECTED <br /><span className="text-zinc-500">PROJECTS</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-[16/10] bg-zinc-900 rounded-2xl mb-8 overflow-hidden glass-border relative transition-all duration-500 group-hover:scale-[1.02]">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="absolute bottom-6 left-6 text-[10px] font-bold text-zinc-500 tracking-widest uppercase">0{index + 1} / Project</div>
            </div>
            <div className="space-y-4 px-2">
              <div className="text-[11px] font-bold text-primary uppercase tracking-widest">
                {project.category}
              </div>
              <h3 className="text-2xl tracking-tight font-bold">{project.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs transition-colors group-hover:text-zinc-300">
                {project.description}
              </p>
              <div className="flex gap-4 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
