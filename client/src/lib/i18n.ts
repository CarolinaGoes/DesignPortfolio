import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traduções
import ptCommon from '../locales/pt/common.json';
import enCommon from '../locales/en/common.json';

// Recursos com as traduções
const resources = {
  pt: {
    common: ptCommon
  },
  en: {
    common: enCommon
  }
};

i18n
  // Detectar idioma do navegador
  .use(LanguageDetector)
  // Passar i18n para react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    fallbackLng: 'pt',
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // React já escapa valores
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;