import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { ArrowDown } from "lucide-react";
import macbookImage from "@/assets/macbook-mockup-angle.png";
import sandCloudBg from "@/assets/sand-cloud-bg.png";
import { RippleWaveLink } from "./ui/ripple-wave-button";

const HeroSection = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Simplified scroll animations for better performance
  const laptopScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5]);
  const laptopY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0.4, 0.55], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Black background with sand cloud overlay */}
      <div className="sticky top-0 h-screen w-full bg-black overflow-hidden">
        {/* Sand cloud background - optimized */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${sandCloudBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        />
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 md:pt-24">
            {/* Grid - responsive optimized */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-12 items-center">
              
              {/* Text Content */}
              <motion.div 
                style={{ opacity: textOpacity }}
                className="order-1 text-center lg:text-left"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block text-[8px] sm:text-[9px] md:text-[10px] text-white/50 uppercase tracking-[0.15em] md:tracking-[0.25em] mb-2 md:mb-4"
                >
                  Agencia Digital Boutique
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight text-white"
                >
                  Websites &<br />
                  <span className="italic font-light text-white/80">Digital</span> Experiences
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-white/60 mt-3 md:mt-5 max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed"
                >
                  Diseño y desarrollo de experiencias web modernas, funcionales y optimizadas para generar contacto y conversión.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mt-5 md:mt-8"
                >
                  <RippleWaveLink
                    href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="default"
                    className="text-[10px] sm:text-[11px] md:text-xs px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5"
                  >
                    Cotizar Proyecto
                  </RippleWaveLink>
                </motion.div>
              </motion.div>

              {/* MacBook Mockup - optimized sizing for tablet */}
              <motion.div 
                style={{ scale: laptopScale, y: laptopY }}
                className="order-2 origin-center mt-4 md:mt-6 lg:mt-0"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <img 
                    src={macbookImage}
                    alt="MacBook Pro"
                    loading="eager"
                    className="w-full h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-md xl:max-w-lg mx-auto pointer-events-none"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator - tablet and up */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
          >
            <span className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">
              Explorar
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-white/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
