import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeIn, slideUp } from '@/lib/animations';
import { siteData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import profileImage from "../../assets/profileImage.jpg";
import { FiArrowRight, FiGithub, FiLinkedin, FiPhone, FiMail } from 'react-icons/fi';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="py-16 md:py-24 bg-secondary dark:bg-accent/10 transition-colors duration-300 overflow-hidden relative">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/30 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        <motion.div 
          className="order-2 lg:order-1 z-10"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <p className="text-primary font-medium mb-2">{t('hero.greeting')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('hero.name')}
            <span className="block text-primary">{t('hero.title')}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            {t('hero.description')}
          </p>
          <div className="flex flex-wrap gap-4">
           <Button asChild>
              <a href="#projects" className="flex items-center gap-2">
                <span>{t('hero.projectsButton')}</span>
                <FiArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">
                {t('hero.contactButton')}
              </a>
            </Button>
          </div>
          <div className="flex mt-8 gap-4">
            <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t('contact.socials.github')}>
              <FiGithub className="h-5 w-5" />
            </a>
            <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t('contact.socials.linkedin')}>
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a href={siteData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={t('contact.socials.whatsapp')}>
              <FiPhone className="h-5 w-5" />
            </a>
            <a href={`mailto:${siteData.email}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label={t('contact.socials.email')}>
              <FiMail className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="relative"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          >
            <motion.div
              className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-60"
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            />
            <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary to-primary/70 p-1.5 shadow-lg flex items-center justify-center overflow-hidden relative z-10">
              <img 
                src={profileImage} 
                alt={t('hero.imageAlt')} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/30 rounded-full blur-xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 0.5 }}
            />
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 bg-primary/40 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}