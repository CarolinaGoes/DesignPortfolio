import { skills } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { 
  SiReact, SiVuedotjs, SiJavascript, SiSass, 
  SiGit, SiFigma, SiNodedotjs, SiMongodb, SiAngular, SiHtml5, SiCss3
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

        <Technologies />
      </div>
    </section>
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
      className="max-w-4xl mx-auto"
    >
      <motion.h3 variants={staggerItem} className="text-2xl font-semibold mb-8 text-center">Tecnologias & Ferramentas</motion.h3>
      
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
  const getIcon = () => {
    switch (icon) {
      case 'html5-css3': return (
        <div className="flex gap-1 text-4xl text-primary mb-3">
          <SiHtml5 />
          <SiCss3 />
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
      <span className="font-medium text-center">{name}</span>
    </motion.div>
  );
}
