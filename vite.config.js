import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://mome.manoharmakarla.com/apiv2/save.php'
    }
  },
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600, }
})
