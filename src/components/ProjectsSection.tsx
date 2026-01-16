import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PremiumLink } from "./ui/premium-button";
import projectVeneziaIMac from "@/assets/project-venezia-imac.png";
import projectGiutoursIPad from "@/assets/project-giutours-ipad.png";
import projectSportswearLaptop from "@/assets/project-sportswear-laptop.png";
import projectSportswearMobile from "@/assets/project-sportswear-mobile.png";

interface Hotspot {
  id: string;
  label: string;
  description: string;
  x: string;
  y: string;
}

interface Project {
  id: string;
  title: string;
  watermark: string;
  description: string;
  image: string;
  secondaryImage?: string;
  link: string;
  hotspots: Hotspot[];
  layout: "dual-mockup" | "single-mockup";
}

const projects: Project[] = [
  {
    id: "sportswear",
    title: "AR Sportswear Fit",
    watermark: "SPORTSWEAR FIT",
    description: "Sitio web de e-commerce para marca de ropa deportiva femenina. Diseño moderno, catálogo de productos y compras vía WhatsApp.",
    image: projectSportswearMobile,
    secondaryImage: projectSportswearLaptop,
    link: "https://sportswearfit.com",
    layout: "dual-mockup",
    hotspots: [
      { id: "1", label: "Catálogo", description: "Productos organizados por categoría", x: "75%", y: "35%" },
      { id: "2", label: "Responsive", description: "Adaptado a todos los dispositivos", x: "85%", y: "55%" },
      { id: "3", label: "WhatsApp", description: "Compras directas por chat", x: "25%", y: "45%" },
      { id: "4", label: "Galería", description: "Imágenes de alta calidad", x: "35%", y: "70%" },
    ],
  },
  {
    id: "giutours",
    title: "GIU TOURS",
    watermark: "GIU TOURS",
    description: "Transporte y experiencias turísticas en Cartagena, diseñadas para viajeros que buscan comodidad, seguridad y atención personalizada.",
    image: projectGiutoursIPad,
    link: "https://giutourscom.netlify.app",
    layout: "single-mockup",
    hotspots: [
      { id: "1", label: "Responsive", description: "Optimizado para móvil y desktop", x: "15%", y: "25%" },
      { id: "2", label: "Bilingüe", description: "Contenido en español e inglés", x: "85%", y: "20%" },
      { id: "3", label: "SEO", description: "Posicionamiento en buscadores", x: "80%", y: "60%" },
      { id: "4", label: "WhatsApp", description: "Cotización instantánea", x: "20%", y: "70%" },
    ],
  },
  {
    id: "venezia",
    title: "Venezia Tower House",
    watermark: "VENEZIA TOWER",
    description: "Proyecto inmobiliario en Cartagena enfocado en la presentación clara de apartamentos, precios y tipologías para facilitar la decisión de compra.",
    image: projectVeneziaIMac,
    link: "https://veneziatowerhouse.com",
    layout: "single-mockup",
    hotspots: [
      { id: "1", label: "Info", description: "Detalles del proyecto claros", x: "20%", y: "30%" },
      { id: "2", label: "Planos", description: "Tipologías y distribución", x: "80%", y: "25%" },
      { id: "3", label: "Precios", description: "Información transparente", x: "75%", y: "65%" },
      { id: "4", label: "Conversión", description: "Diseño enfocado en ventas", x: "25%", y: "75%" },
    ],
  },
];

// Enhanced Hotspot component with elegant tooltip - CENTERED
const HotspotDot = ({ 
  hotspot, 
  isActive, 
  onHover, 
  onLeave,
  delay 
}: { 
  hotspot: Hotspot; 
  isActive: boolean; 
  onHover: () => void; 
  onLeave: () => void;
  delay: number;
}) => (
  <motion.div
    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
    style={{ left: hotspot.x, top: hotspot.y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
  >
    <div
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Dot - more rounded */}
      <div className="relative">
        <div className="w-5 h-5 md:w-6 md:h-6 bg-foreground rounded-full flex items-center justify-center shadow-lg">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-background rounded-full" />
        </div>
        <div className="absolute inset-0 w-5 h-5 md:w-6 md:h-6 bg-foreground/20 rounded-full animate-ping" />
      </div>

      {/* Enhanced Tooltip - properly centered above dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-30 pointer-events-none"
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="bg-foreground text-background px-4 py-2.5 rounded-xl shadow-2xl min-w-[130px] max-w-[180px] text-center">
          <p className="text-xs font-semibold mb-0.5 whitespace-nowrap">{hotspot.label}</p>
          <p className="text-[10px] opacity-75 leading-tight">{hotspot.description}</p>
          {/* Arrow - centered and more rounded */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-foreground" />
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Section Divider - transition between projects
const ProjectDivider = ({ index }: { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      className="relative h-[30vh] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Center dot */}
      <motion.div
        className="relative z-10 w-3 h-3 bg-foreground/30 rounded-full"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="absolute inset-0 bg-foreground/10 rounded-full animate-ping" />
      </motion.div>

      {/* Project number indicator */}
      <motion.span
        className="absolute right-8 md:right-16 text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        0{index + 2}
      </motion.span>
    </motion.div>
  );
};

// Dual Mockups Project Card - PREMIUM ANIMATIONS & TABLET OPTIMIZED
const DualMockupProjectCard = ({ project }: { project: Project }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Enhanced scroll-driven animations
  const mobileY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, -80]);
  const mobileRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, -3, -6]);
  const laptopX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 30, 60]);
  const laptopScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1.08]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const bgGlow = useTransform(scrollYProgress, [0, 0.5], [0, 0.15]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Animated background glow on scroll */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none"
          style={{ opacity: bgGlow }}
        />

        {/* Watermark with enhanced parallax */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ x: watermarkX }}
        >
          <span className="text-[10vw] sm:text-[12vw] md:text-[14vw] lg:text-[18vw] font-bold tracking-tighter whitespace-nowrap text-foreground/[0.03]">
            {project.watermark}
          </span>
        </motion.div>

        <div className="container-custom relative z-10 flex flex-col h-full justify-center py-16 md:py-20 px-4 sm:px-6 md:px-8">
          {/* Dual Mockups - Optimized for tablet */}
          <motion.div 
            className="relative flex justify-center items-end gap-3 sm:gap-5 md:gap-8 lg:gap-12 order-1 mb-6 md:mb-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Mobile mockup - Premium hover effect */}
            <motion.div
              className="relative z-10"
              style={{ y: mobileY, rotate: mobileRotate }}
              initial={{ opacity: 0, x: -80, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.img
                src={project.image}
                alt={`${project.title} mobile`}
                className="w-[80px] sm:w-[110px] md:w-[160px] lg:w-[280px] xl:w-[360px] h-auto rounded-xl sm:rounded-2xl md:rounded-3xl"
                style={{
                  boxShadow: isHovered 
                    ? '0 40px 80px -20px rgba(0,0,0,0.5), 0 20px 40px -10px rgba(0,0,0,0.3)'
                    : '0 25px 50px -12px rgba(0,0,0,0.4)'
                }}
              />
              {/* Subtle reflection */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-t from-foreground/5 to-transparent blur-xl" />
            </motion.div>

            {/* Laptop mockup - Premium hover effect */}
            <motion.div
              className="relative"
              style={{ x: laptopX, scale: laptopScale }}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <motion.img
                src={project.secondaryImage}
                alt={`${project.title} desktop`}
                className="w-[160px] sm:w-[220px] md:w-[320px] lg:w-[480px] xl:w-[600px] h-auto"
                style={{
                  filter: isHovered ? 'brightness(1.05)' : 'brightness(1)',
                  boxShadow: isHovered 
                    ? '0 50px 100px -30px rgba(0,0,0,0.5)'
                    : '0 30px 60px -20px rgba(0,0,0,0.4)'
                }}
              />
              
              {/* Hotspots - only on larger screens */}
              <div className="hidden lg:block">
                {project.hotspots.map((hotspot, idx) => (
                  <HotspotDot
                    key={hotspot.id}
                    hotspot={hotspot}
                    isActive={activeHotspot === hotspot.id}
                    onHover={() => setActiveHotspot(hotspot.id)}
                    onLeave={() => setActiveHotspot(null)}
                    delay={0.8 + idx * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile/Tablet: Feature badges below mockups */}
          <motion.div
            className="flex lg:hidden flex-wrap justify-center gap-2 mt-4 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {project.hotspots.slice(0, 4).map((hotspot) => (
              <motion.span 
                key={hotspot.id}
                className="text-[9px] sm:text-[10px] md:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-foreground/5 rounded-full text-muted-foreground border border-foreground/10"
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--foreground) / 0.1)' }}
              >
                {hotspot.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Content BELOW mockups - centered & optimized */}
          <motion.div
            className="text-center max-w-lg lg:max-w-xl mx-auto px-4 order-2 mt-4 md:mt-6"
            style={{ opacity: contentOpacity }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-foreground/5 rounded-full border border-foreground/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full animate-pulse" />
              Proyecto destacado
            </motion.span>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4">{project.title}</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-5 md:mb-8 max-w-sm md:max-w-md mx-auto leading-relaxed">
              {project.description}
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PremiumLink
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="rounded-xl text-xs sm:text-sm md:text-base px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 group"
              >
                Ver proyecto
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </PremiumLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Single mockup project - PREMIUM ANIMATIONS & TABLET OPTIMIZED
const SingleMockupProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 2 : -2]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -60 : 60]);
  const bgGlow = useTransform(scrollYProgress, [0, 0.5], [0, 0.12]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[180vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Animated background glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none"
          style={{ opacity: bgGlow }}
        />

        {/* Watermark with enhanced parallax */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ x: watermarkX }}
        >
          <span className="text-[10vw] sm:text-[12vw] md:text-[14vw] lg:text-[18vw] font-bold tracking-tighter whitespace-nowrap text-foreground/[0.03]">
            {project.watermark}
          </span>
        </motion.div>

        <div className="container-custom relative z-10 pt-16 md:pt-20 px-4 sm:px-6 md:px-8">
          <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 md:gap-8 lg:gap-16`}>
            
            {/* Mockup - Premium hover & scroll effects */}
            <motion.div
              className="relative w-full lg:w-[60%] flex justify-center"
              style={{ y: mockupY, scale: mockupScale, rotate: mockupRotate }}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-[240px] sm:w-[300px] md:w-[400px] lg:w-[520px] xl:w-[640px] h-auto"
                  style={{
                    filter: isHovered ? 'brightness(1.05)' : 'brightness(1)',
                    boxShadow: isHovered 
                      ? '0 60px 120px -40px rgba(0,0,0,0.5), 0 30px 60px -20px rgba(0,0,0,0.3)'
                      : '0 40px 80px -30px rgba(0,0,0,0.4)'
                  }}
                />
                
                {/* Subtle glow effect on hover */}
                <motion.div 
                  className="absolute -inset-4 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hotspots - only on larger screens */}
                <div className="hidden lg:block">
                  {project.hotspots.map((hotspot, idx) => (
                    <HotspotDot
                      key={hotspot.id}
                      hotspot={hotspot}
                      isActive={activeHotspot === hotspot.id}
                      onHover={() => setActiveHotspot(hotspot.id)}
                      onLeave={() => setActiveHotspot(null)}
                      delay={0.6 + idx * 0.1}
                    />
                  ))}
                </div>
                
                {/* Mobile/Tablet: Feature badges */}
                <motion.div
                  className="flex lg:hidden flex-wrap justify-center gap-2 mt-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {project.hotspots.slice(0, 4).map((hotspot) => (
                    <motion.span 
                      key={hotspot.id}
                      className="text-[9px] sm:text-[10px] md:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-foreground/5 rounded-full text-muted-foreground border border-foreground/10"
                      whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--foreground) / 0.1)' }}
                    >
                      {hotspot.label}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Content - Premium animations */}
            <motion.div
              className={`w-full lg:w-[40%] text-center ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'} px-2 sm:px-4`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span 
                className={`inline-flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-foreground/5 rounded-full border border-foreground/10 ${index % 2 !== 0 ? 'lg:ml-auto' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full animate-pulse" />
                Proyecto destacado
              </motion.span>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4">{project.title}</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-5 md:mb-8 max-w-xs sm:max-w-sm mx-auto lg:mx-0 leading-relaxed">
                {project.description}
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PremiumLink
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className={`rounded-xl text-xs sm:text-sm md:text-base px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 group ${index % 2 !== 0 ? 'lg:ml-auto' : ''}`}
                >
                  Ver proyecto
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </PremiumLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative bg-background">
      {/* Section Header */}
      <motion.div 
        ref={headerRef}
        className="container-custom py-12 sm:py-16 md:py-20 lg:py-24 text-center px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7 }}
      >
        <motion.span 
          className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-foreground/5 rounded-full border border-foreground/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full animate-pulse" />
          Portafolio
        </motion.span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Proyectos</h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mt-3 sm:mt-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto leading-relaxed">
          Sitios web diseñados como productos digitales premium, enfocados en conversión y experiencia de usuario.
        </p>
      </motion.div>

      {/* Projects with pinned scroll and dividers */}
      {projects.map((project, index) => (
        <div key={project.id}>
          {project.layout === "dual-mockup" ? (
            <DualMockupProjectCard project={project} />
          ) : (
            <SingleMockupProjectCard project={project} index={index} />
          )}
          
          {/* Add divider between projects */}
          {index < projects.length - 1 && (
            <ProjectDivider index={index} />
          )}
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;
