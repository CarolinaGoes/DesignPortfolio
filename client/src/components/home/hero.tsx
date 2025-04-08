import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Phone, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="py-16 md:py-24 bg-secondary dark:bg-accent/10 transition-colors duration-300 overflow-hidden relative">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/30 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          className="order-2 md:order-1"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <p className="text-primary font-medium mb-2">Olá, eu sou</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {personalInfo.name}
            <span className="block text-primary">{personalInfo.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            {personalInfo.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="#projects" className="flex items-center gap-2">
                <span>Ver projetos</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">
                Entrar em contato
              </a>
            </Button>
          </div>
          <div className="flex mt-8 gap-4">
            <a 
              href={personalInfo.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="WhatsApp"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.email} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300" 
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="order-1 md:order-2 flex justify-center"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary to-primary/70 p-1.5 shadow-lg flex items-center justify-center overflow-hidden">
            <img 
              src={personalInfo.image} 
              alt={personalInfo.imageAlt} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
