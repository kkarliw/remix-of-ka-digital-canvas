import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown, Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const laptopOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Cinematic initial overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        onAnimationComplete={() => setInitialAnimationComplete(true)}
        className="fixed inset-0 z-30 bg-foreground pointer-events-none"
        style={{ display: initialAnimationComplete ? 'none' : 'block' }}
      />
      
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-18 md:pt-24">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating elements - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block"
        >
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[10%] w-2 h-2 bg-foreground/10 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] right-[15%] w-3 h-3 bg-foreground/5 rounded-full"
          />
        </motion.div>

        <motion.div
          style={{ scale, opacity: laptopOpacity, y }}
          className="relative w-full max-w-7xl mx-auto px-3 md:px-6"
        >
          {/* MacBook Pro Style Frame - Premium Design */}
          <div className="relative" style={{ perspective: "2000px" }}>
            <motion.div 
              initial={{ rotateX: 20, opacity: 0, y: 80, scale: 1.15 }}
              animate={{ rotateX: 4, opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative transition-transform duration-500"
              style={{ 
                transformStyle: "preserve-3d",
              }}
            >
              {/* Screen */}
              <div className="relative">
                {/* Screen bezel - Modern thin bezels */}
                <div className="relative bg-[#0a0a0a] rounded-t-[12px] md:rounded-t-[20px] p-[4px] md:p-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_40px_100px_-30px_rgba(0,0,0,0.6)]">
                  {/* Notch / Camera */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50px] md:w-[100px] h-[14px] md:h-[28px] bg-[#0a0a0a] rounded-b-[10px] md:rounded-b-[18px] z-10 flex items-center justify-center">
                    <div className="w-[4px] h-[4px] md:w-[7px] md:h-[7px] rounded-full bg-[#1a1a1a] ring-1 ring-[#2a2a2a]" />
                  </div>
                  
                  {/* Screen content - optimized for mobile */}
                  <div className="relative bg-background aspect-[16/10] rounded-[2px] md:rounded-[6px] overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] via-transparent to-foreground/[0.02]" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-6 md:p-12 lg:p-16 text-center">
                      {/* Badge - smaller on mobile */}
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="flex items-center gap-1.5 mb-2 sm:mb-4 md:mb-6 px-2 sm:px-4 py-1 sm:py-2 bg-foreground/5 backdrop-blur-sm rounded-full border border-foreground/10"
                      >
                        <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-foreground/70" />
                        <span className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground/70 font-medium">
                          Estudio Creativo
                        </span>
                      </motion.div>
                      
                      {/* Main headline - responsive sizing with cinematic reveal */}
                      <motion.h1
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-[clamp(1.1rem,5.5vw,5rem)] font-bold leading-[1] tracking-[-0.03em]"
                      >
                        <span className="block">Creamos</span>
                        <span className="block mt-0.5 sm:mt-1 md:mt-2">
                          <span className="italic font-light">experiencias</span>
                          {" "}digitales
                        </span>
                      </motion.h1>
                      
                      {/* Subheadline - hidden on very small screens, shortened on mobile */}
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.7 }}
                        className="text-muted-foreground mt-2 sm:mt-4 md:mt-6 max-w-[200px] sm:max-w-xs md:max-w-lg text-[clamp(0.55rem,1.3vw,1.1rem)] leading-relaxed"
                      >
                        <span className="hidden sm:inline">Diseño y desarrollo web moderno para marcas que buscan </span>
                        <span className="sm:hidden">Marcas que buscan </span>
                        <span className="text-foreground font-medium">destacar y convertir</span>.
                      </motion.p>

                      {/* Tech badges - smaller on mobile */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mt-3 sm:mt-5 md:mt-8"
                      >
                        {[
                          { icon: Zap, text: "React" },
                          { icon: Sparkles, text: "Animaciones" },
                        ].map((item, i) => (
                          <motion.div
                            key={item.text}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
                            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-foreground/5 rounded-full text-[8px] sm:text-[10px] md:text-xs text-muted-foreground"
                          >
                            <item.icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span>{item.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Laptop bottom edge / hinge */}
                <div className="relative h-[6px] md:h-[14px] bg-gradient-to-b from-[#e0e0e0] via-[#d0d0d0] to-[#a0a0a0] rounded-b-[4px] md:rounded-b-[8px]">
                  <div className="absolute top-[1px] md:top-[3px] left-1/2 -translate-x-1/2 w-[60px] md:w-[160px] h-[2px] md:h-[5px] bg-gradient-to-b from-[#c0c0c0] to-[#d8d8d8] rounded-full" />
                </div>
              </div>
              
              {/* Keyboard base - smaller on mobile */}
              <div 
                className="relative h-[25px] sm:h-[35px] md:h-[70px] lg:h-[90px] bg-gradient-to-b from-[#d8d8d8] via-[#e8e8e8] to-[#c8c8c8] rounded-b-[6px] md:rounded-b-[16px] overflow-hidden"
                style={{
                  transformOrigin: "top center",
                  transform: "rotateX(-85deg)",
                }}
              >
                <div className="absolute inset-1.5 sm:inset-2 md:inset-4 bg-[#1e1e1e] rounded-[4px] md:rounded-[8px]">
                  <div className="absolute inset-1.5 sm:inset-2 md:inset-4 grid grid-cols-14 gap-[1px] md:gap-1">
                    {Array.from({ length: 42 }).map((_, i) => (
                      <div key={i} className="bg-[#2a2a2a] rounded-[1px] h-[2px] sm:h-[3px] md:h-2.5" />
                    ))}
                  </div>
                  <div className="absolute bottom-1 sm:bottom-1.5 md:bottom-2.5 left-1/2 -translate-x-1/2 w-[35%] h-[5px] sm:h-[8px] md:h-[22px] bg-[#2d2d2d] rounded-[1px] md:rounded-md" />
                </div>
              </div>
            </motion.div>
            
            {/* Shadow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-4 md:-bottom-10 left-1/2 -translate-x-1/2 w-[75%] h-[15px] md:h-[45px] bg-foreground/15 blur-2xl md:blur-3xl rounded-full" 
            />
          </div>
        </motion.div>

        {/* Scroll indicator - CENTERED */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">
              Explorar
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
