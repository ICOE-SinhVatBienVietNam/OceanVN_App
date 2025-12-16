/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: false
      },
      manifest: {
        name: 'SINH VẬT BIỂN VIỆT NAM',
        short_name: 'SVBVN',
        description: 'Nơi chia sẻ kiến thức về các sinh vật biển ở Việt Nam',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
            {
                src: 'favicon.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'favicon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'favicon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
