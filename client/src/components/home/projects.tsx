import { projects } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, cardHover, buttonHover, rotate3D, fadeInUp } from '@/lib/animations';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Projects() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="section-heading">{t('projects.title')}</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">
              {t('projects.description')}
            </motion.p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonHover}
          >
            <Button variant="outline" asChild>
              <a href="#" className="flex items-center gap-2">
                <span>Ver todos os projetos</span>
                <motion.div
                  animate={{ x: hoveredIndex !== null ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ExternalLink className="h-4 w-4" />
                </motion.div>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, index, isHovered, onHover, onLeave }: ProjectCardProps) {
  const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  });
  const { t } = useTranslation();

  return (
    <motion.div
      ref={cardRef}
      className="project-card overflow-hidden rounded-xl bg-card"
      initial="hidden"
      animate={isCardVisible ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.imageAlt} 
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            transition: { duration: 0.4 }
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex flex-wrap gap-1"
            variants={staggerContainer}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          >
            {project.tags.map((tag, tagIndex) => (
              <motion.div key={tagIndex} variants={staggerItem}>
                <Badge variant="secondary" className="bg-primary/90 text-primary-foreground hover:bg-primary/80">{tag}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <div className="p-6">
        <motion.h3 
          className={`text-xl font-semibold mb-2 ${isHovered ? 'text-primary' : 'text-foreground'}`}
          transition={{ duration: 0.3 }}
        >{project.title}</motion.h3>
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <motion.a 
            href={project.demoLink} 
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <span>{t('projects.viewLive')}</span>
            <motion.div
              animate={{ 
                x: isHovered ? [0, 5, 0] : 0,
                transition: { duration: 0.5, repeat: isHovered ? 1 : 0 }
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </motion.a>
          <motion.a 
            href={project.repoLink} 
            className="text-muted-foreground hover:text-primary transition-colors duration-300" 
            aria-label="Abrir no GitHub"
            whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
          >
            <Github className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
