import { projects, projectCategories } from '@/lib/data';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, cardHover, buttonHover, rotate3D, fadeInUp } from '@/lib/animations';
import { ExternalLink, Github, ArrowRight, Filter, Code, FileCode, Brackets, PaintBucket, Layers, Database, Folder } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Projects() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Função para retornar o ícone de cada categoria nos botões de filtro
  const getCategoryButtonIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'all':
        return <Filter className="h-4 w-4 mr-2" />;
      case 'html-css':
        return <Code className="h-4 w-4 mr-2" />;
      case 'javascript':
        return <FileCode className="h-4 w-4 mr-2" />;
      case 'react':
        return <Brackets className="h-4 w-4 mr-2" />;
      case 'tailwind':
        return <PaintBucket className="h-4 w-4 mr-2" />;
      case 'vue':
        return <Layers className="h-4 w-4 mr-2" />;
      case 'php':
        return <Database className="h-4 w-4 mr-2" />;
      default:
        return <Folder className="h-4 w-4 mr-2" />;
    }
  };
  
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

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
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isSectionVisible ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <motion.p variants={staggerItem} className="w-full text-center mb-3 text-muted-foreground">
            {t('projects.filter')}
          </motion.p>
          
          {projectCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300",
                  selectedCategory === category.id ? "bg-primary text-primary-foreground" : ""
                )}
              >
                {getCategoryButtonIcon(category.id)}
                {t(`projects.categories.${category.id}`)}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(null)}
                />
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-muted-foreground text-lg">
                  Nenhum projeto encontrado nesta categoria.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-12">
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonHover}
          >
            <Button variant="outline" asChild>
              <a href="#" className="flex items-center gap-2">
                <span>{t('projects.viewAll')}</span>
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

  const getCategoryIcon = () => {
    switch (project.category) {
      case 'html-css':
        return <Code className="h-5 w-5 text-primary" />;
      case 'javascript':
        return <FileCode className="h-5 w-5 text-primary" />;
      case 'react':
        return <Brackets className="h-5 w-5 text-primary" />;
      case 'tailwind':
        return <PaintBucket className="h-5 w-5 text-primary" />;
      case 'vue':
        return <Layers className="h-5 w-5 text-primary" />;
      case 'php':
        return <Database className="h-5 w-5 text-primary" />;
      default:
        return <Folder className="h-5 w-5 text-primary" />;
    }
  };

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
        <motion.div 
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-1.5 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
        >
          <Badge variant="outline" className="px-2 py-0.5 flex items-center gap-1 border-primary/20">
            {getCategoryIcon()}
            <span className="text-xs font-medium">{t(`projects.categories.${project.category}`)}</span>
          </Badge>
        </motion.div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <motion.h3 
            className={`text-xl font-semibold ${isHovered ? 'text-primary' : 'text-foreground'}`}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
        </div>
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
