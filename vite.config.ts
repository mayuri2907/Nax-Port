import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
