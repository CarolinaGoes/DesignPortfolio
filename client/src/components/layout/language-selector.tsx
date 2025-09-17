import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FiGlobe } from 'react-icons/fi'; // substituindo o Globe do lucide por react-icons

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-foreground/80 hover:text-foreground" 
          aria-label={i18n.language === 'pt' ? 'Mudar idioma' : 'Change language'}
        >
          <FiGlobe className="h-5 w-5" />
          <span className="sr-only">
            {i18n.language === 'pt' ? 'Mudar idioma' : 'Change language'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={i18n.language === 'pt' ? 'bg-primary/10 font-medium' : ''}
          onClick={() => i18n.changeLanguage('pt')}
        >
          Português
        </DropdownMenuItem>
        <DropdownMenuItem
          className={i18n.language === 'en' ? 'bg-primary/10 font-medium' : ''}
          onClick={() => i18n.changeLanguage('en')}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}