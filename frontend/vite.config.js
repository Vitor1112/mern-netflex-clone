import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Todas  requisições que começam com /api serão redirecionadas para http://localhost:3000
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      }
    }
  }
})
