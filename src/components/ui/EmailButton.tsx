// src/components/ui/EmailButton.tsx - VERSÃO ALTERNATIVA
'use client';

import { FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface EmailButtonProps {
  email: string;
  label: string;
}

export function EmailButton({ email, label }: EmailButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    
    console.log('Tentando abrir email para:', email);
    
    // Método 1: Tentar com window.location (mais compatível)
    try {
      window.location.href = `mailto:${email}?subject=Contato via Portfólio&body=Olá Carolina, vim através do seu portfólio!`;
    } catch (error) {
      console.error('Erro com window.location:', error);
      
      // Método 2: Tentar com window.open
      try {
        window.open(`mailto:${email}?subject=Contato via Portfólio&body=Olá Carolina, vim através do seu portfólio!`, '_self');
      } catch (error2) {
        console.error('Erro com window.open:', error2);
        
        // Método 3: Criar elemento dinâmico
        try {
          const link = document.createElement('a');
          link.href = `mailto:${email}?subject=Contato via Portfólio&body=Olá Carolina, vim através do seu portfólio!`;
          link.click();
        } catch (error3) {
          console.error('Erro com elemento dinâmico:', error3);
          alert('Não foi possível abrir o cliente de email. Por favor, envie um email manualmente para: ' + email);
        }
      }
    }
    
    // Reset após 2 segundos
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <motion.button
      onClick={handleEmailClick}
      disabled={isClicked}
      className={`text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg bg-background/50 hover:bg-background/80 border border-border/50 hover:border-primary/30 flex items-center justify-center ${
        isClicked ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      whileHover={{ scale: isClicked ? 1 : 1.05 }}
      whileTap={{ scale: isClicked ? 1 : 0.95 }}
      aria-label={label}
    >
      <FiMail className="h-5 w-5" />
      {isClicked && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded"
        >
          Abrindo...
        </motion.span>
      )}
    </motion.button>
  );
}