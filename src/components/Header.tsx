import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoLight from "@/assets/logo-light.jpg";
import { WavyLink } from "./ui/wavy-link";
import { PremiumLink } from "./ui/premium-button";

const Header = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Sobre", id: "about" },
    { label: "Servicios", id: "services" },
    { label: "Proyectos", id: "projects" },
    { label: "Proceso", id: "process" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo - grande */}
          <a href="/" className="flex items-center gap-3 z-50">
            <img 
              src={logoLight} 
              alt="Design by K.A™" 
              className="h-10 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <WavyLink
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                isActive={activeSection === item.id}
              >
                {item.label}
              </WavyLink>
            ))}
          </nav>

          {/* Apple-style Menu Button - Ultra minimal */}
          <button 
            className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="relative w-5 h-3 flex flex-col justify-between">
              <motion.span
                animate={mobileMenuOpen 
                  ? { rotate: 45, y: 5, width: 20 } 
                  : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="block h-[1.5px] bg-gray-900 origin-left rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen 
                  ? { opacity: 0, scaleX: 0 } 
                  : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.15 }}
                className="block w-3.5 h-[1.5px] bg-gray-900 rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen 
                  ? { rotate: -45, y: -5, width: 20 } 
                  : { rotate: 0, y: 0, width: 14 }
                }
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="block h-[1.5px] bg-gray-900 origin-left rounded-full"
              />
            </div>
          </button>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <PremiumLink
              href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              Cotizar sitio web
            </PremiumLink>
          </div>
        </div>
      </motion.header>

      {/* Apple-style Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-white"
          >
            <motion.nav 
              className="relative h-full flex flex-col items-center justify-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-[2.5rem] font-medium py-2 text-gray-900 hover:text-gray-600 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + index * 0.06,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="mt-8"
              >
                <PremiumLink
                  href="https://wa.me/573107086902?text=Hola,%20quiero%20cotizar%20un%20sitio%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="text-base px-8 py-4 rounded-full"
                >
                  Cotizar sitio web
                </PremiumLink>
              </motion.div>

              {/* Subtle footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 text-[11px] text-gray-500 tracking-widest uppercase"
              >
                Design by K.A™
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
