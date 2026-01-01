const About = () => {
  return (
    <section id="about" className="py-40 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div className="space-y-10">
          <h2 className="text-4xl md:text-6xl tracking-tighter">ABOUT <br /><span className="text-zinc-500">Muhammad Zaiimun Nabiil</span></h2>
          <div className="w-20 h-1 bg-primary" />
        </div>
        
        <div className="space-y-8 text-zinc-400 text-lg leading-relaxed font-medium">
          <p>
            I specialize in building complex web architectures that remain remarkably simple for the user. 
            My focus is on performance, accessibility, and clean visual communication.
          </p>
          <p>
            Every line of code I write is intentional, designed to scale and provide 
            seamless experiences across all devices and platforms.
          </p>
          
          <div className="grid grid-cols-2 gap-10 pt-10">
            <div>
              <p className="text-2xl text-white font-bold mb-1">05+</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Experience</p>
            </div>
            <div>
              <p className="text-2xl text-white font-bold mb-1">40+</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Deliveries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
