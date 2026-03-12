import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/einmaleins/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,  // using hand-crafted public/manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ]
})