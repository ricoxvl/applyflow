import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // A relative base works on localhost and under a GitHub Pages repository path.
  base: './',
});
