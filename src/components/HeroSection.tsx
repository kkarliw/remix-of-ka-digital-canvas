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
  const screenContentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 1]);
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
                  {/* Screen content overlay - positioned exactly on the laptop screen with perspective */}
                  <motion.div 
                    className="absolute z-[15]"
                    style={{
                      top: '6.5%',
                      left: '12%',
                      width: '76%',
                      height: '58%',
                      opacity: screenContentOpacity,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      transform: 'perspective(1200px) rotateX(1deg) rotateY(-1deg)',
                      transformOrigin: 'center center',
                    }}
                  >
                    {/* Website content inside screen */}
                    <div className="w-full h-full bg-white overflow-hidden">
                      <div className="w-full h-full flex flex-col">
                        {/* Mini navbar */}
                        <div className="flex items-center justify-between px-3 md:px-5 py-1.5 md:py-2 border-b border-gray-100 bg-white">
                          <span className="text-[7px] md:text-xs font-bold text-gray-900 tracking-tight">BYK.A™</span>
                          <div className="flex items-center gap-1.5 md:gap-3">
                            {['Inicio', 'Proyectos', 'Servicios', 'Contacto'].map((item) => (
                              <span key={item} className="text-[5px] md:text-[10px] text-gray-500 hover:text-gray-900 transition-colors">{item}</span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Hero section inside the mockup */}
                        <div className="flex-1 bg-gradient-to-br from-gray-50 to-white">
                          <div className="h-full flex flex-col items-center justify-center px-3 md:px-6">
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1, duration: 0.6 }}
                              className="text-center"
                            >
                              <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-black text-white text-[5px] md:text-[8px] font-medium rounded-full mb-2 md:mb-3">
                                Agencia Digital
                              </span>
                              <h2 className="text-[10px] md:text-lg lg:text-xl font-bold text-gray-900 tracking-tight leading-tight">
                                Creamos Experiencias<br />
                                <span className="text-gray-500">Digitales Únicas</span>
                              </h2>
                              <p className="text-[5px] md:text-[9px] text-gray-500 mt-1 md:mt-2 max-w-[80%] mx-auto">
                                Diseño web, branding y estrategia digital para marcas que buscan destacar.
                              </p>
                              <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-2 md:mt-3">
                                <span className="px-2 py-0.5 md:px-3 md:py-1.5 bg-black text-[5px] md:text-[8px] text-white font-medium rounded-full">
                                  Ver Proyectos
                                </span>
                                <span className="px-2 py-0.5 md:px-3 md:py-1.5 border border-gray-300 text-[5px] md:text-[8px] text-gray-600 font-medium rounded-full">
                                  Contactar
                                </span>
                              </div>
                            </motion.div>
                            
                            {/* Mini stats row */}
                            <div className="flex items-center justify-center gap-3 md:gap-6 mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-100 w-full max-w-[90%]">
                              {[
                                { value: '50+', label: 'Proyectos' },
                                { value: '5', label: 'Años' },
                                { value: '100%', label: 'Satisfacción' },
                              ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                  <span className="text-[8px] md:text-sm font-bold text-gray-900">{stat.value}</span>
                                  <span className="block text-[4px] md:text-[7px] text-gray-400">{stat.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* MacBook Image */}
                  <motion.img 
                    src={macbookImage}
                    alt="MacBook Pro"
                    style={{ opacity: bezelOpacity }}
                    className="w-full h-auto relative z-10"
                  />
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
