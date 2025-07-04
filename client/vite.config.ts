import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'url'


 


export default defineConfig({
  

  
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
// Remova a referência ao postcss.config.js se não estiver usando
resolve: {
  alias: [
    {
      find: '@',
      replacement: path.resolve(__dirname, './src')
    },
    {
      find: '@shared',
      replacement: path.resolve(__dirname, './shared')
    }
  ]
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
    open: true,
    cors: true,
    host: true, 
    strictPort: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    postcss: './postcss.config.js' // Se estiver usando PostCSS
  }
})