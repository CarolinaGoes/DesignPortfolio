import React from 'react';
import { createRoot } from 'react-dom/client';



function HelloWorldApp() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'green', fontSize: '48px', textAlign: 'center' }}>
        O AMBIENTE FOI CORRIGIDO!
      </h1>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<HelloWorldApp />);