import { projects } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Projects() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="projects" className="py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="section-heading">Meus Projetos</motion.h2>
            <motion.div variants={staggerItem} className="section-divider"></motion.div>
            <motion.p variants={staggerItem} className="section-description">
              Uma seleção dos meus trabalhos recentes demonstrando minhas habilidades em design, 
              desenvolvimento frontend e acessibilidade.
            </motion.p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" asChild>
            <a href="#" className="flex items-center gap-2">
              <span>Ver todos os projetos</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      initial="hidden"
      animate={isCardVisible ? "visible" : "hidden"}
      variants={staggerItem}
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.imageAlt} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/90 text-primary-foreground hover:bg-primary/80">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <a href={project.demoLink} className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors duration-300">
            <span>Ver detalhes</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a 
            href={project.repoLink} 
            className="text-muted-foreground hover:text-primary transition-colors duration-300" 
            aria-label="Abrir no GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
