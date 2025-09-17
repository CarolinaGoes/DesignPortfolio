import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared')
    }
  },
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'terser',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('lodash') || id.includes('axios')) {
              return 'common-vendor'
            }
            return 'vendor'
          }
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entries/[name]-[hash].js'
      }
    }
  },
  
  server: {
    port: 5173,
    host: true,
    strictPort: false, // Mudado para false para permitir outras portas
    open: true,
    cors: true,
    // Configurações de HMR (Hot Module Replacement)
    hmr: {
      overlay: true,
      port: 24678 // Porta específica para HMR
    },
    // Watch options para melhor detecção de mudanças
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  },
  
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    postcss: './postcss.config.js' // Se renomear para .js
  },
  
  // Configurações de otimização para desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled'
    ],
    exclude: ['@vite/client', '@vite/env']
  }
})