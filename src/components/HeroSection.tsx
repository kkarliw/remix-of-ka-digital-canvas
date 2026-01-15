import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Soft Zoom animation
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const laptopOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  
  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const laptopY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Subtle grain/dust texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Subtle animated depth layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "linear" 
          }}
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(40,40,40,0.3) 0%, transparent 70%)',
          }}
        />

        <motion.div
          style={{ scale, opacity: laptopOpacity }}
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text */}
            <motion.div 
              style={{ y: textY }}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
              >
                Websites &<br />
                <span className="italic font-light text-white/90">Digital</span> Experiences
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-[#888] mt-6 md:mt-8 max-w-md mx-auto lg:mx-0 text-[clamp(0.9rem,1.5vw,1.15rem)] leading-relaxed"
              >
                Diseño y desarrollo de experiencias web modernas, funcionales y optimizadas para generar contacto y conversión en negocios y marcas.
              </motion.p>
            </motion.div>

            {/* Right Column - Laptop Mockup */}
            <motion.div 
              style={{ y: laptopY }}
              className="order-1 lg:order-2"
            >
              <div className="relative" style={{ perspective: "2000px" }}>
                <motion.div 
                  initial={{ rotateX: 15, opacity: 0, y: 60 }}
                  animate={{ rotateX: 4, opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Screen */}
                  <div className="relative">
                    {/* Screen bezel */}
                    <div className="relative bg-[#1a1a1a] rounded-t-[12px] md:rounded-t-[20px] p-[4px] md:p-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_100px_-30px_rgba(0,0,0,0.8)]">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50px] md:w-[100px] h-[14px] md:h-[28px] bg-[#1a1a1a] rounded-b-[10px] md:rounded-b-[18px] z-10 flex items-center justify-center">
                        <div className="w-[4px] h-[4px] md:w-[7px] md:h-[7px] rounded-full bg-[#0a0a0a] ring-1 ring-[#333]" />
                      </div>
                      
                      {/* Screen content - Website inside */}
                      <div className="relative bg-[#fafafa] aspect-[16/10] rounded-[2px] md:rounded-[6px] overflow-hidden">
                        {/* Inner website content */}
                        <div className="absolute inset-0 flex flex-col">
                          {/* Navbar */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="flex items-center justify-between px-3 md:px-6 py-2 md:py-4 border-b border-black/5"
                          >
                            <span className="text-[8px] md:text-xs font-semibold text-[#0a0a0a] tracking-tight">K.A™</span>
                            <div className="flex items-center gap-2 md:gap-4">
                              {['Home', 'Projects', 'About', 'Contact'].map((item, i) => (
                                <span 
                                  key={item} 
                                  className="text-[6px] md:text-[10px] text-[#666] hover:text-[#0a0a0a] transition-colors"
                                  style={{ animationDelay: `${0.9 + i * 0.1}s` }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                          
                          {/* Main content area */}
                          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
                            <motion.h2
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1, duration: 0.6 }}
                              className="text-[clamp(0.8rem,3vw,2.5rem)] font-bold text-[#0a0a0a] tracking-[-0.02em] text-center leading-tight"
                            >
                              Websites & Branding
                            </motion.h2>
                            
                            <motion.p
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.1, duration: 0.5 }}
                              className="text-[7px] md:text-sm text-[#888] mt-2 md:mt-4 text-center max-w-[80%]"
                            >
                              Creative studio crafting digital experiences
                            </motion.p>
                            
                            <motion.button
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.2, duration: 0.5 }}
                              className="mt-3 md:mt-6 px-3 md:px-5 py-1.5 md:py-2.5 bg-[#0a0a0a] text-white text-[7px] md:text-xs rounded-full font-medium flex items-center gap-1 md:gap-2"
                            >
                              View Projects
                              <ArrowDown className="w-2 h-2 md:w-3 md:h-3" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Laptop hinge */}
                    <div className="relative h-[6px] md:h-[14px] bg-gradient-to-b from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] rounded-b-[4px] md:rounded-b-[8px]">
                      <div className="absolute top-[1px] md:top-[3px] left-1/2 -translate-x-1/2 w-[60px] md:w-[160px] h-[2px] md:h-[5px] bg-gradient-to-b from-[#4a4a4a] to-[#3a3a3a] rounded-full" />
                    </div>
                  </div>
                  
                  {/* Keyboard base */}
                  <div 
                    className="relative h-[25px] sm:h-[35px] md:h-[70px] lg:h-[90px] bg-gradient-to-b from-[#2a2a2a] via-[#1e1e1e] to-[#151515] rounded-b-[6px] md:rounded-b-[16px] overflow-hidden"
                    style={{
                      transformOrigin: "top center",
                      transform: "rotateX(-85deg)",
                    }}
                  >
                    <div className="absolute inset-1.5 sm:inset-2 md:inset-4 bg-[#0e0e0e] rounded-[4px] md:rounded-[8px]">
                      <div className="absolute inset-1.5 sm:inset-2 md:inset-4 grid grid-cols-14 gap-[1px] md:gap-1">
                        {Array.from({ length: 42 }).map((_, i) => (
                          <div key={i} className="bg-[#1a1a1a] rounded-[1px] h-[2px] sm:h-[3px] md:h-2.5" />
                        ))}
                      </div>
                      <div className="absolute bottom-1 sm:bottom-1.5 md:bottom-2.5 left-1/2 -translate-x-1/2 w-[35%] h-[5px] sm:h-[8px] md:h-[22px] bg-[#1a1a1a] rounded-[1px] md:rounded-md" />
                    </div>
                  </div>
                </motion.div>
                
                {/* Shadow */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="absolute -bottom-4 md:-bottom-10 left-1/2 -translate-x-1/2 w-[75%] h-[15px] md:h-[45px] bg-white/10 blur-2xl md:blur-3xl rounded-full" 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[9px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-medium">
              Explorar
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
