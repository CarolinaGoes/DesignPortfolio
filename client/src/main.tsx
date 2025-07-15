import React from 'react';
import { createRoot } from 'react-dom/client';

// Este console.log TEM que aparecer
console.log("--- O NOVO main.tsx ESTÁ SENDO EXECUTADO! ---");

function HelloWorldApp() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'red', fontSize: '48px', textAlign: 'center' }}>
        A PÁGINA ATUALIZOU!
      </h1>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<HelloWorldApp />);