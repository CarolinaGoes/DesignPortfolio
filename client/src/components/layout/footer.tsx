import { Link } from 'wouter';
import { personalInfo } from '@/lib/data';
import { FiCode, FiGithub, FiLinkedin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="#home" className="text-3xl font-bold text-primary flex items-center gap-2">
              <FiCode className="h-6 w-6" />
              <span>{personalInfo.name}</span>
            </Link>
            <p className="mt-2 text-gray-400 max-w-md">
              Desenvolvendo interfaces intuitivas, acessíveis e visualmente atraentes com as tecnologias mais modernas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {[
                  { href: '#home', label: 'Início' },
                  { href: '#projects', label: 'Projetos' },
                  { href: '#skills', label: 'Habilidades' },
                  { href: '#about', label: 'Sobre' },
                  { href: '#contact', label: 'Contato' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-400 hover:text-primary transition-colors duration-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
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
              <FiGithub className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <FiPhone className="h-5 w-5" />
            </a>
            <a 
              href={personalInfo.socialLinks.email} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <FiMail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
