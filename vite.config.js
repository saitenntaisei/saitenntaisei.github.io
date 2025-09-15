import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // user/organization pages deploy at domain root
  plugins: [react()],
  build: {
    outDir: 'docs', // GitHub Pages serves from docs/
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})

