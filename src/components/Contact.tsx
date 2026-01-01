const Contact = () => {
  return (
    <section id="contact" className="py-40 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-5xl md:text-8xl tracking-tighter mb-16">READY TO <br /><span className="text-blue-gradient">COLLABORATE?</span></h2>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <a href="mailto:hello@nabil.com" className="group p-8 glass flex-1 w-full rounded-2xl glass-border hover:bg-white/5 transition-all">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Direct Email</p>
          <p className="text-xl font-medium tracking-tight group-hover:text-primary transition-colors">hello@nabil.com</p>
        </a>
        
        <a href="#" className="group p-8 glass flex-1 w-full rounded-2xl glass-border hover:bg-white/5 transition-all">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold">Social Network</p>
          <p className="text-xl font-medium tracking-tight group-hover:text-primary transition-colors">@nabil_creative</p>
        </a>
      </div>
      
      <div className="mt-20">
        <p className="text-zinc-600 text-sm italic tracking-tight">Currently based in Indonesia — Open for global remote work.</p>
      </div>
    </section>
  )
}

export default Contact
