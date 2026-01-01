const skills = [
  'React Ecosystem', 'TypeScript', 'Node.js', 'PostgreSQL', 
  'Cloud Architecture', 'Figma', 'CI/CD Pipeline', 'System Design'
]

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="glass p-12 md:p-24 rounded-[2rem] glass-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl tracking-tighter mb-8 leading-tight">CORE <br /><span className="text-zinc-500">EXPERTISE</span></h2>
            <p className="text-zinc-400 text-base leading-relaxed tracking-tight">
              A comprehensive toolkit tailored for modern web development and high-stakes production environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="text-sm font-bold text-zinc-300 tracking-tight uppercase">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
