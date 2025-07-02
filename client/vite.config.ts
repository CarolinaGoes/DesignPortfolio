import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    // Esta é a forma moderna e recomendada de criar aliases no Vite
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  server: {
    port: 5000, // Mantive a sua porta 5000
    open: true, // Abrirá o navegador automaticamente
  },
  // A secção 'css' foi removida. O Vite detetará o seu postcss.config.js automaticamente.
})