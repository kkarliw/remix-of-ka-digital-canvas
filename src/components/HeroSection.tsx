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
                  
                  {/* Screen content overlay - positioned on the laptop screen with perspective */}
                  <motion.div 
                    className="absolute z-0"
                    style={{
                      top: '2.5%',
                      left: '12.5%',
                      width: '51%',
                      height: '36%',
                      opacity: screenContentOpacity,
                      transform: 'perspective(1000px) rotateY(-8deg) rotateX(2deg) skewY(1deg)',
                      transformOrigin: 'center center',
                    }}
                  >
                    {/* Clean white content inside screen */}
                    <div className="w-full h-full rounded-sm overflow-hidden bg-white shadow-inner">
                      <div className="w-full h-full flex flex-col">
                        {/* Mini navbar */}
                        <div className="flex items-center justify-between px-2 md:px-4 py-1 md:py-2 border-b border-gray-100">
                          <span className="text-[5px] md:text-[9px] font-bold text-gray-900 tracking-tight">K.A™</span>
                          <div className="flex items-center gap-1 md:gap-3">
                            {['Home', 'Work', 'About', 'Contact'].map((item) => (
                              <span key={item} className="text-[4px] md:text-[7px] text-gray-500">{item}</span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Main content */}
                        <div className="flex-1 flex flex-col items-center justify-center px-2 md:px-6">
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="text-center"
                          >
                            <span className="text-[4px] md:text-[8px] font-medium text-gray-400 uppercase tracking-[0.15em]">Creative Studio</span>
                            <h2 className="text-[8px] md:text-base lg:text-lg font-bold text-gray-900 mt-0.5 md:mt-1 tracking-tight leading-tight">
                              Websites & Branding
                            </h2>
                            <p className="text-[4px] md:text-[8px] text-gray-500 mt-0.5 md:mt-1">
                              Crafting premium digital experiences
                            </p>
                            <div className="flex items-center justify-center gap-1 md:gap-2 mt-1 md:mt-3">
                              <span className="px-1.5 py-0.5 md:px-3 md:py-1 bg-gray-900 text-[4px] md:text-[7px] text-white font-medium rounded-full">
                                View Projects
                              </span>
                              <span className="px-1.5 py-0.5 md:px-3 md:py-1 border border-gray-300 text-[4px] md:text-[7px] text-gray-600 font-medium rounded-full">
                                Contact
                              </span>
                            </div>
                          </motion.div>
                        </div>
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
