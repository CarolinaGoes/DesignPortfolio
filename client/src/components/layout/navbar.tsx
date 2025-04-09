import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { slideFromTop } from '@/lib/animations';
import { Code, Moon, Sun, Menu, X } from 'lucide-react';
import LanguageSelector from './language-selector';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { toggleTheme, isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Navegação principal">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2 transition-colors duration-300" aria-label="Voltar ao topo">
          <Code className="h-6 w-6" />
          <span>DevPortfolio</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#home" label={t('navbar.home')} />
          <NavLink href="#projects" label={t('navbar.projects')} />
          <NavLink href="#skills" label={t('navbar.skills')} />
          <NavLink href="#about" label={t('navbar.about')} />
          <NavLink href="#contact" label={t('navbar.contact')} />
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full text-primary hover:bg-primary/10"
            aria-label={isDarkMode ? t('theme.light') : t('theme.dark')}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-foreground hover:bg-accent"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu" 
            className="md:hidden bg-background shadow-lg absolute w-full left-0 top-full z-50"
            variants={slideFromTop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <MobileNavLink href="#home" label={t('navbar.home')} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="#projects" label={t('navbar.projects')} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="#skills" label={t('navbar.skills')} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="#about" label={t('navbar.about')} onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="#contact" label={t('navbar.contact')} onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a 
      href={href} 
      className="text-foreground hover:text-primary transition-colors duration-300 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {label}
      <motion.span 
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.a>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <motion.a 
      href={href} 
      className="text-foreground hover:text-primary transition-colors duration-300 py-2 block"
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <span className="flex items-center">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="mr-2 text-primary"
        >
          ▸
        </motion.span>
        {label}
      </span>
    </motion.a>
  );
}
