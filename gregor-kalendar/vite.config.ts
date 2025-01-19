import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
      proxy: {
        '/api': {
             target: 'http://127.0.0.1:5000',
             changeOrigin: true,
             secure: false,
         }
    }
  },
})
