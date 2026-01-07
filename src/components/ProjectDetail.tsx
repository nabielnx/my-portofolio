import { useEffect, useState } from 'react'
import type { Project } from '../data/projects'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(-1) // -1 = Main Demo/Image, 0+ = Screenshot Index

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 500) // Match animation duration
  }

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-6xl h-full max-h-[90vh] glass-premium rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl transition-transform duration-300 ease-out transform ${
          isClosing ? 'scale-95 translate-y-4' : 'scale-100 translate-y-0'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all backdrop-blur-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left / Top Section - Visuals (Scrollable on mobile) */}
        <div className="w-full md:w-3/5 h-[40vh] md:h-full bg-black/40 overflow-y-auto no-scrollbar relative order-1 md:order-1 hardware-accelerated overscroll-contain">
          {/* Main Display Area */}
          <div className="aspect-video w-full relative group bg-black/20">
             {selectedMediaIndex === -1 ? (
                // Show Main Demo (Video/Iframe/Image)
                project.demoUrl?.endsWith('.mp4') ? (
                  <video 
                    src={project.demoUrl} 
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    loop
                    muted
                  />
                ) : project.demoUrl && !project.demoUrl.includes('youtube.com') ? ( // Simple check for iframe compatibility if needed, though most use embeds
                   <iframe 
                     src={project.demoUrl} 
                     className="w-full h-full object-cover"
                     title="Project Demo"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                ) : (
                   <img 
                     src={project.image} 
                     alt={project.title}
                     className="w-full h-full object-cover"
                   />
                )
             ) : (
                // Show Selected Screenshot
                <img 
                  src={project.screenshots[selectedMediaIndex]} 
                  alt={`Screenshot ${selectedMediaIndex + 1}`}
                  className="w-full h-full object-contain bg-black/50" // Contain to show full screenshot without cropping
                />
             )}
          </div>

          {/* Media Grid */}
          <div className="p-6 grid grid-cols-3 gap-3">
            {/* Screenshots */}
            {project.screenshots.map((shot, idx) => (
              <div 
                key={idx} 
                className={`aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedMediaIndex === idx ? 'border-red-500 ring-2 ring-red-500/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                onClick={() => setSelectedMediaIndex(idx)}
              >
                <img src={shot} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right / Bottom Section - Info (Scrollable) */}
        <div className="w-full md:w-2/5 h-full overflow-y-auto no-scrollbar p-8 md:p-12 bg-gradient-to-b from-transparent to-black/40 order-2 md:order-2 hardware-accelerated overscroll-contain">
           <div className="space-y-8">
             <div>
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-xs font-bold text-red-400 uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                   {project.category}
                 </span>
               </div>
               <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance leading-tight">
                 {project.title}
               </h2>
               <p className="text-zinc-400 text-lg leading-relaxed">
                 {project.longDescription}
               </p>
             </div>

             {/* Key Stats */}
             {project.stats && (
               <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
                 {project.stats.map((stat) => (
                   <div key={stat.label} className="text-center">
                     <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                     <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                   </div>
                 ))}
               </div>
             )}

             {/* Features */}
             <div>
               <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Key Features</h3>
               <ul className="space-y-3">
                 {project.features.map((feature, i) => (
                   <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                     <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>

             {/* External Link */}
             {project.externalLink && (
                <div>
                   <a 
                     href={project.externalLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                   >
                     {project.externalLinkText || 'View Project'}
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                   </a>
                </div>
             )}

             {/* Tech Stack */}
             <div>
               <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Technology</h3>
               <div className="flex flex-wrap gap-2">
                 {project.tags.map(tag => (
                   <span key={tag} className="text-xs font-semibold text-zinc-300 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
