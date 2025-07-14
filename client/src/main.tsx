import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/i18n'; 

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Carregando...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);