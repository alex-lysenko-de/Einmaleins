import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Basispfad für GitHub Pages (Repository-Name)
  base: '/einmaleins/',

  build: {
    rollupOptions: {
      output: {
        // Versionierte Dateinamen → optimales Browser-Caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
