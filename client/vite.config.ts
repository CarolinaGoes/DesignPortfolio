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
        'drizzle-orm/pg-core',
        'drizzle-orm',
        '@radix-ui/react-slider',
        'zod',
        /^drizzle-orm/,
        /^@radix-ui/,
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