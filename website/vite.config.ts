import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      includeAssets: ['logo.svg'],
      manifest: {
        name: 'Pomix',
        short_name: 'Pomix',
        description: 'a progressive web app made to keep you focused',
        theme_color: '#888',
        icons: [
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
