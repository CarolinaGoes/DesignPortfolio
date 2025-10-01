import { useState, ReactNode, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { skillsData } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SiReact, SiJavascript, SiGit, SiHtml5, SiCss3, SiTailwindcss, SiSqlite, SiTypescript } from 'react-icons/si';
import { FaUniversalAccess } from 'react-icons/fa';

export default function Skills() {
  const { t } = useTranslation();
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center py-16 md:py-24 bg-secondary/50 dark:bg-accent/5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div initial="hidden" animate={isSectionVisible ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.h2 variants={staggerItem} className="section-heading">{t('skills.title')}</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">{t('skills.description')}</motion.p>
          </motion.div>
        </div>
        <Technologies />
      </div>
    </section>
  );
}

function Technologies() {
  const { t } = useTranslation();
  const [techRef, isTechVisible] = useScrollAnimation<HTMLDivElement>();
  
  return (
    <motion.div ref={techRef} initial="hidden" animate={isTechVisible ? "visible" : "hidden"} variants={staggerContainer} className="max-w-4xl mx-auto">
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-8 text-center">{t('skills.technologiesTitle')}</motion.h3>
      <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"> {/* Aumentei o gap */}
        {skillsData.map((tech, index) => (
          <TechnologyCard 
            key={index} 
            nameKey={tech.nameKey} 
            icon={tech.icon} 
            descriptionKey={tech.descriptionKey}
            delay={index * 0.05}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

interface TechnologyCardProps {
  nameKey: string;
  icon: string;
  descriptionKey: string;
  delay: number;
}

function TechnologyCard({ nameKey, icon, descriptionKey, delay }: TechnologyCardProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsClicked(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsClicked(false);
      }
    };

    const checkTooltipPosition = () => {
      if (cardRef.current && tooltipRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const tooltipHeight = 120;
        
        if (cardRect.top < tooltipHeight + 50) { // Aumentei a margem de segurança
          setTooltipPosition('bottom');
        } else {
          setTooltipPosition('top');
        }
      }
    };

    if (isClicked) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      checkTooltipPosition();
      window.addEventListener('resize', checkTooltipPosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', checkTooltipPosition);
    };
  }, [isClicked]);

  const getIcon = (): ReactNode => {
    const iconProps = { className: "text-4xl text-primary mb-3" };
    switch (icon) {
      case 'html5-css3': return (
        <div className="flex gap-1 text-4xl text-primary mb-3">
          <SiHtml5 className="transition-transform duration-300" style={{ transform: isHovered ? 'translateY(-5px)' : 'none' }} />
          <SiCss3 className="transition-transform duration-300" style={{ transform: isHovered ? 'translateY(-5px)' : 'none', transitionDelay: '0.1s' }} />
        </div>
      );
      case 'react': return <SiReact {...iconProps} />;
      case 'javascript': return <SiJavascript {...iconProps} />;
      case 'typescript': return <SiTypescript {...iconProps} />;
      case 'tailwind': return <SiTailwindcss {...iconProps} />;
      case 'sqlite': return <SiSqlite {...iconProps} />;
      case 'git': return <SiGit {...iconProps} />;
      case 'universal-access': return <FaUniversalAccess {...iconProps} />;
      default: return <div className="h-10 w-10 bg-primary rounded-full mb-3"></div>;
    }
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const getTooltipClass = () => {
    const baseClass = "absolute left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-xl z-50 max-w-xs w-full text-center"; // z-50 aumentado
    
    if (tooltipPosition === 'top') {
      return `${baseClass} -top-3 -translate-y-full`; // Ajuste na posição
    } else {
      return `${baseClass} -bottom-3 translate-y-full`; // Ajuste na posição
    }
  };

  const getArrowClass = () => {
    const baseClass = "absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-b border-r border-border/50 rotate-45 z-50";
    
    if (tooltipPosition === 'top') {
      return `${baseClass} bottom-0 translate-y-1`;
    } else {
      return `${baseClass} top-0 -translate-y-1 border-t border-l border-b-0 border-r-0`;
    }
  };

  const getHintClass = () => {
    const baseClass = "absolute left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground/70 whitespace-nowrap z-50";
    
    if (tooltipPosition === 'top') {
      return `${baseClass} -bottom-7`; // Mais distante
    } else {
      return `${baseClass} -top-7`; // Mais distante
    }
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="flex flex-col items-center p-4 bg-card rounded-lg overflow-visible relative cursor-pointer group"
      variants={staggerItem}
      transition={{ delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)", transition: { type: "spring", stiffness: 400, damping: 15 } }}
      whileTap={{ scale: 0.95 }}
      style={{ zIndex: isClicked ? 40 : 'auto' }} // Card com z-index maior quando ativo
    >
      <motion.div animate={isHovered ? { scale: [1, 1.2, 1.1], rotate: [0, 5, -5, 0], transition: { duration: 0.6 } } : {}}>
        {getIcon()}
      </motion.div>
      <motion.span 
        className="font-medium text-center"
        animate={isHovered ? { color: "hsl(var(--primary))", transition: { duration: 0.3 } } : {}}
      >
        {nameKey}
      </motion.span>
      <motion.div
        className="w-full h-0.5 bg-primary/50 mt-3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "center" }}
      />

      {/* Subtle Description Tooltip */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            ref={tooltipRef}
            className={getTooltipClass()}
            initial={{ opacity: 0, y: tooltipPosition === 'top' ? 10 : -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltipPosition === 'top' ? 10 : -10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className="text-xs text-muted-foreground leading-tight break-words">
              {t(descriptionKey)}
            </p>
            <div className={getArrowClass()}></div>
            
            
            <div className={getHintClass()}>
              Clique fora para fechar
            </div>
          </motion.div>
        )}
      </AnimatePresence>

     
    </motion.div>
  );
}