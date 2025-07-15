import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiAlertCircle, FiHome } from 'react-icons/fi'; // ✅ Ícone trocado

export default function NotFound() {
  const { t } = useTranslation(); // ✅ Hook de tradução

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 text-center">
        <CardContent className="pt-8">
          <div className="flex justify-center mb-4">
            <FiAlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{t('notFound.title')}</h1>
          <p className="mt-2 text-muted-foreground">
            {t('notFound.description')}
          </p>
          <Button asChild className="mt-6">
            <Link href="/">
              <FiHome className="mr-2 h-4 w-4" />
              {t('navbar.home')}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}