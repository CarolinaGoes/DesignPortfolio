import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/use-language';

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground" aria-label="Mudar idioma">
          <Globe className="h-5 w-5" />
          <span className="sr-only">
            {language === 'pt' ? 'Mudar idioma' : 'Change language'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className={language === 'pt' ? 'bg-primary/10 font-medium' : ''}
          onClick={() => changeLanguage('pt')}
        >
          Português
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={language === 'en' ? 'bg-primary/10 font-medium' : ''}
          onClick={() => changeLanguage('en')}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}