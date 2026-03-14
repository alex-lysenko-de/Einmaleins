import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      manifest: false,     // manifest.json liegt in public/ und wird manuell gepflegt
      injectRegister: false, // Registrierung erfolgt manuell via registerSW.js
    }),
  ],

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
