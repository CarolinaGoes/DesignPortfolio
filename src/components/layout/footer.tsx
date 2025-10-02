import { useTranslation } from 'react-i18next';
import { siteData } from '@/lib/data';
import { FiCode, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const footerLinks = [
  { href: '#home', translationKey: 'navbar.home' },
  { href: '#about', translationKey: 'navbar.about' },
  { href: '#skills', translationKey: 'navbar.skills' },
  { href: '#projects', translationKey: 'navbar.projects' },
  { href: '#contact', translationKey: 'navbar.contact' },
];

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="lg:col-span-1">
            <a href="#home" className="text-3xl font-bold text-primary flex items-center gap-2 justify-center md:justify-start">
              <FiCode className="h-6 w-6" />
              <span>{t('hero.name')}</span>
            </a>
            <p className="mt-2 text-gray-400 max-w-md mx-auto md:mx-0">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinksTitle')}</h4>
              <ul className="space-y-2">
                {footerLinks.map(({ href, translationKey }) => (
                  <li key={href}>
                    <a href={href} className="text-gray-400 hover:text-primary transition-colors duration-300">
                      {t(translationKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
               <h4 className="text-lg font-semibold text-white mb-4">{t('contact.info.socialTitle')}</h4>
               <div className="flex space-x-4 justify-center md:justify-start">
                <a href={siteData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary" aria-label={t('contact.socials.github')}>
                  <FiGithub className="h-6 w-6" />
                </a>
                <a href={siteData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary" aria-label={t('contact.socials.linkedin')}>
                  <FiLinkedin className="h-6 w-6" />
                </a>
                
                <a href={`mailto:${siteData.email}`} className="text-gray-400 hover:text-primary" aria-label={t('contact.socials.email')}>
                  <FiMail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright', { year: currentYear, name: t('hero.name') })}
          </p>
        </div>
      </div>
    </footer>
  );
}