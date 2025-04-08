import { Link } from 'wouter';
import { personalInfo } from '@/lib/data';
import { Code, Github, Linkedin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email é obrigatório",
        description: "Por favor, informe seu email para se inscrever na newsletter.",
        variant: "destructive"
      });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, informe um email válido.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally send this to your API
    console.log("Newsletter subscription:", email);
    
    toast({
      title: "Inscrição realizada!",
      description: "Você foi inscrito na newsletter com sucesso."
    });
    
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="#home" className="text-3xl font-bold text-primary flex items-center gap-2">
              <Code className="h-6 w-6" />
              <span>{personalInfo.name}</span>
            </Link>
            <p className="mt-2 text-gray-400 max-w-md">
              Desenvolvendo interfaces intuitivas, acessíveis e visualmente atraentes com as tecnologias mais modernas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-primary transition-colors duration-300">Início</a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-primary transition-colors duration-300">Projetos</a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-primary transition-colors duration-300">Habilidades</a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-primary transition-colors duration-300">Sobre</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-primary transition-colors duration-300">Contato</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Serviços</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Desenvolvimento Web</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">UI/UX Design</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Consultoria</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Treinamentos</a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Receba novidades e dicas de desenvolvimento</p>
              <form className="flex" onSubmit={handleNewsletterSubmit}>
                <Input 
                  type="email" 
                  placeholder="seu.email@exemplo.com" 
                  className="rounded-r-none border-r-0 focus-visible:ring-0"
                  aria-label="Seu email para newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="default"
                  className="rounded-l-none"
                  aria-label="Inscrever-se na newsletter"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a 
              href={personalInfo.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.email} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
