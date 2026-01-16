import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import macbookImage from "@/assets/macbook-mockup-angle.png";
import sandCloudBg from "@/assets/sand-cloud-bg.png";

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
      {/* Sand cloud background */}
      <div 
        className="sticky top-0 h-screen w-full"
        style={{
          backgroundImage: `url(${sandCloudBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <motion.div 
                style={{ y: textY, opacity: textOpacity }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-black"
                >
                  Websites &<br />
                  <span className="italic font-light text-black/80">Digital</span> Experiences
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-black/60 mt-6 md:mt-8 max-w-md mx-auto lg:mx-0 text-[clamp(0.9rem,1.5vw,1.15rem)] leading-relaxed"
                >
                  Diseño y desarrollo de experiencias web modernas, funcionales y optimizadas para generar contacto y conversión en negocios y marcas.
                </motion.p>
              </motion.div>

              {/* Right Column - MacBook Mockup */}
              <motion.div 
                style={{ 
                  scale: laptopScale,
                  y: laptopY,
                }}
                className="order-1 lg:order-2 origin-center"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                >
                  <motion.img 
                    src={macbookImage}
                    alt="MacBook Pro"
                    style={{ opacity: bezelOpacity }}
                    className="w-full h-auto relative z-10 pointer-events-none max-w-2xl mx-auto"
                  />
                </motion.div>
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
              <span className="text-[9px] md:text-xs text-black/40 uppercase tracking-[0.2em] font-medium">
                Explorar
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-black/40" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
