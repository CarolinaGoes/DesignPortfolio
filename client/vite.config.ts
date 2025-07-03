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
  alias: {
    '@': new URL('./src', import.meta.url).pathname,
    '@shared': new URL('./shared', import.meta.url).pathname,
  },
},
  server: {
    port: 5173, 
    open: true, 
  },
 
})


