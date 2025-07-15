import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    defaultNS: 'common',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Carregando...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);