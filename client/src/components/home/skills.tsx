import { skills } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useEffect, useState } from 'react';
import { 
  SiReact, SiVuedotjs, SiJavascript, SiSass, 
  SiGit, SiFigma, SiNodedotjs, SiMongodb 
} from 'react-icons/si';
import { AccessibilityIcon } from 'lucide-react';

export default function Skills() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  
  return (
    <section id="skills" className="py-16 md:py-24 bg-secondary/50 dark:bg-accent/5 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="section-heading">Minhas Habilidades</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">
              Sempre me mantendo atualizada com as tecnologias mais recentes e focando em criar 
              experiências acessíveis e de alta qualidade.
            </motion.p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <TechnicalSkills />
          <Technologies />
        </div>
      </div>
    </section>
  );
}

function TechnicalSkills() {
  const [skillsRef, isSkillsVisible] = useScrollAnimation<HTMLDivElement>();
  
  return (
    <motion.div 
      ref={skillsRef}
      initial="hidden"
      animate={isSkillsVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-8">Habilidades Técnicas</motion.h3>
      
      {skills.technical.map((skill, index) => (
        <ProgressBar 
          key={index} 
          skill={skill.name} 
          percentage={skill.percentage} 
          delay={index * 0.1}
          isVisible={isSkillsVisible}
        />
      ))}
    </motion.div>
  );
}

function Technologies() {
  const [techRef, isTechVisible] = useScrollAnimation<HTMLDivElement>();
  
  return (
    <motion.div 
      ref={techRef}
      initial="hidden"
      animate={isTechVisible ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-8">Tecnologias & Ferramentas</motion.h3>
      
      <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 gap-6">
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

interface ProgressBarProps {
  skill: string;
  percentage: number;
  delay: number;
  isVisible: boolean;
}

function ProgressBar({ skill, percentage, delay, isVisible }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    } else {
      setWidth(0);
    }
  }, [isVisible, percentage, delay]);
  
  return (
    <motion.div 
      className="mb-6"
      variants={staggerItem}
    >
      <div className="flex items-center mb-2">
        <span className="font-medium">{skill}</span>
      </div>
      <div className="w-full h-2 bg-secondary dark:bg-muted rounded-full overflow-hidden">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </motion.div>
  );
}

interface TechnologyCardProps {
  name: string;
  icon: string;
  delay: number;
}

function TechnologyCard({ name, icon, delay }: TechnologyCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'react': return <SiReact className="text-4xl text-primary mb-3" />;
      case 'vuejs': return <SiVuedotjs className="text-4xl text-primary mb-3" />;
      case 'js-square': return <SiJavascript className="text-4xl text-primary mb-3" />;
      case 'sass': return <SiSass className="text-4xl text-primary mb-3" />;
      case 'git-alt': return <SiGit className="text-4xl text-primary mb-3" />;
      case 'figma': return <SiFigma className="text-4xl text-primary mb-3" />;
      case 'node-js': return <SiNodedotjs className="text-4xl text-primary mb-3" />;
      case 'database': return <SiMongodb className="text-4xl text-primary mb-3" />;
      case 'universal-access': return <AccessibilityIcon className="h-8 w-8 text-primary mb-3" />;
      default: return <div className="h-8 w-8 bg-primary rounded-full mb-3"></div>;
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      variants={staggerItem}
      transition={{ delay }}
    >
      {getIcon()}
      <span className="font-medium">{name}</span>
    </motion.div>
  );
}
