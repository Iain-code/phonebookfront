import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'phonebookfront-3.onrender.com',
      // other allowed hosts if necessary
    ],
  },
})