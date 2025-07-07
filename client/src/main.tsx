import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/i18n'; // Garante que o i18next seja inicializado

// Seus providers de Tema e Acessibilidade provavelmente devem ficar dentro do App.tsx
// ou serem gerenciados de outra forma, mas por agora, vamos removê-los para isolar o problema.

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Carregando...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);