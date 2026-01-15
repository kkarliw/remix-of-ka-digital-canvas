import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import macbookImage from "@/assets/macbook-pro-16.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Zoom INTO the laptop screen effect
  const laptopScale = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1.8, 8]);
  const laptopY = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 50, 200]);
  
  // Fade out elements as we zoom in
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const bezelOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const screenContentOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);
  
  // Parallax for text
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh]"
    >
      <motion.div 
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text (fades out first) */}
            <motion.div 
              style={{ y: textY, opacity: textOpacity }}
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

            {/* Right Column - Laptop Mockup (zooms in as you scroll) */}
            <motion.div 
              style={{ 
                scale: laptopScale,
                y: laptopY,
              }}
              className="order-1 lg:order-2 origin-center"
            >
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                >
                  {/* MacBook Image */}
                  <motion.img 
                    src={macbookImage}
                    alt="MacBook Pro"
                    style={{ opacity: bezelOpacity }}
                    className="w-full h-auto relative z-10"
                  />
                  
                  {/* Screen content overlay - positioned on the laptop screen */}
                  <motion.div 
                    className="absolute z-20"
                    style={{
                      top: '3%',
                      left: '10%',
                      width: '55%',
                      height: '45%',
                      opacity: screenContentOpacity,
                    }}
                  >
                    {/* Attractive gradient content inside screen */}
                    <div className="w-full h-full rounded-[2px] overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4">
                        {/* Floating shapes for visual interest */}
                        <div className="absolute top-2 left-2 w-4 h-4 md:w-8 md:h-8 rounded-full bg-white/20 blur-sm" />
                        <div className="absolute bottom-4 right-3 w-6 h-6 md:w-12 md:h-12 rounded-full bg-yellow-300/30 blur-md" />
                        <div className="absolute top-1/3 right-1/4 w-3 h-3 md:w-6 md:h-6 rounded-full bg-cyan-300/40" />
                        
                        {/* Content */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9, duration: 0.6 }}
                          className="text-center relative z-10"
                        >
                          <span className="text-[6px] md:text-[10px] font-medium text-white/80 uppercase tracking-[0.2em]">Creative Studio</span>
                          <h2 className="text-[10px] md:text-xl lg:text-2xl font-bold text-white mt-1 md:mt-2 tracking-tight">
                            Design & Code
                          </h2>
                          <p className="text-[6px] md:text-[10px] text-white/70 mt-1 max-w-[90%] mx-auto">
                            Crafting digital experiences
                          </p>
                          <div className="flex items-center justify-center gap-1 md:gap-2 mt-2 md:mt-3">
                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-white text-[6px] md:text-[9px] text-purple-600 font-semibold rounded-full">
                              View Work
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
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
      </motion.div>
    </section>
  );
};

export default HeroSection;
