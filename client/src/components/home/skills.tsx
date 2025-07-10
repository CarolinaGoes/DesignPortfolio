import { skills } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import React, { useState } from 'react';
import { 
  SiReact, SiVuedotjs, SiJavascript, SiSass, 
  SiGit, SiFigma, SiNodedotjs, SiMongodb, SiAngular, SiHtml5, SiCss3
} from 'react-icons/si';
import { FiUniversalAccess } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Skills() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();
  
  return (
    <section id="skills" className="py-16 md:py-24 bg-secondary/50 dark:bg-accent/5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="section-heading">{t('skills.title')}</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">
              {t('skills.description')}
            </motion.p>
          </motion.div>
        </div>

        <Technologies />
      </div>
    </section>
  );
}

function Technologies() {
  const [techRef, isTechVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();
  
  return (
    <motion.div 
      ref={techRef}
      initial="hidden"
      animate={isTechVisible ? "visible" : "hidden"}
      variants={staggerContainer}
      className="max-w-4xl mx-auto"
    >
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-8 text-center">{t('skills.technologiesTitle')}</motion.h3>
      
      <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.technologies.map((tech, index) => (
          <TechnologyCard 
            key={index} 
            name={tech.name} 
            icon={tech.icon} 
            delay={index * 0.05}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

interface TechnologyCardProps {
  name: string;
  icon: string;
  delay: number;
}

function TechnologyCard({ name, icon, delay }: TechnologyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = () => {
    switch (icon) {
      case 'html5-css3': return (
        <div className="flex gap-1 text-4xl text-primary mb-3">
          <SiHtml5 className="transition-transform duration-300" style={{
            transform: isHovered ? 'translateY(-5px)' : 'none'
          }} />
          <SiCss3 className="transition-transform duration-300" style={{
            transform: isHovered ? 'translateY(-5px)' : 'none',
            transitionDelay: '0.1s'
          }} />
        </div>
      );
      case 'react': return <SiReact className="text-4xl text-primary mb-3" />;
      case 'vuejs': return <SiVuedotjs className="text-4xl text-primary mb-3" />;
      case 'angular': return <SiAngular className="text-4xl text-primary mb-3" />;
      case 'js-square': return <SiJavascript className="text-4xl text-primary mb-3" />;
      case 'sass': return <SiSass className="text-4xl text-primary mb-3" />;
      case 'git-alt': return <SiGit className="text-4xl text-primary mb-3" />;
      case 'figma': return <SiFigma className="text-4xl text-primary mb-3" />;
      case 'node-js': return <SiNodedotjs className="text-4xl text-primary mb-3" />;
      case 'database': return <SiMongodb className="text-4xl text-primary mb-3" />;
      case 'universal-access': return <FiUniversalAccess className="h-8 w-8 text-primary mb-3" />;
      default: return <div className="h-8 w-8 bg-primary rounded-full mb-3"></div>;
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center p-4 bg-card rounded-lg overflow-hidden"
      variants={staggerItem}
      transition={{ delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
    >
      <motion.div
        animate={isHovered ? {
          scale: [1, 1.2, 1.1],
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.6 }
        } : {}}
      >
        {getIcon()}
      </motion.div>
      <motion.span 
        className="font-medium text-center"
        animate={isHovered ? { 
          color: "hsl(var(--primary))",
          transition: { duration: 0.3 }
        } : {}}
      >
        {name}
      </motion.span>
      <motion.div
        className="w-full h-0.5 bg-primary/50 mt-3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
}
