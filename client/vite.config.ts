// client/vite.config.ts
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
    },
    preserveSymlinks: true
  },

  build: {
    rollupOptions: {
      external: [
        // ✅ Adicione estas regras específicas para bloquear arquivos do server
        /\.\.\/server/,
        /server\//,
        /^server$/,
        /\/server\//,
        /shared\/schema/,
        'drizzle-orm/pg-core',
        'drizzle-orm',
        'zod',
        /^drizzle-orm/,
        /^zod/
      ],
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
        }
      }
    }
  }
})