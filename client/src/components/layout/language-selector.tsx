import { useTranslation } from 'react-i18next'; // Importe o hook
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';


export default function LanguageSelector() {
  // CORREÇÃO: Pegue o objeto 'i18n' do hook
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground" aria-label="Mudar idioma">
          <Globe className="h-5 w-5" />
          <span className="sr-only">
            {/* CORREÇÃO: Use i18n.language */}
            {i18n.language === 'pt' ? 'Mudar idioma' : 'Change language'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          // CORREÇÃO: Use i18n.language
          className={i18n.language === 'pt' ? 'bg-primary/10 font-medium' : ''}
          // CORREÇÃO: Use i18n.changeLanguage
          onClick={() => i18n.changeLanguage('pt')}
        >
          Português
        </DropdownMenuItem>
        <DropdownMenuItem
          // CORREÇÃO: Use i18n.language
          className={i18n.language === 'en' ? 'bg-primary/10 font-medium' : ''}
          // CORREÇÃO: Use i18n.changeLanguage
          onClick={() => i18n.changeLanguage('en')}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}