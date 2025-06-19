import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Esta linha é crucial
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true // Ative para debug
  }
})