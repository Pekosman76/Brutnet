
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Crucial pour GitHub Pages (chemins relatifs)
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
});
