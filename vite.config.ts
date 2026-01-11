import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      // favicon-tabicon, apple-touch-icon-for ios app icon, mask-icon - android
      manifest: {
        name: 'CheapMarket',
        display: 'standalone',
        short_name: 'CheapMarket',
        
        description: 'Baku Supermarket Price Comparison',
        theme_color: '#2563eb', // Blue-600 
        icons: [
          {
            src: 'logo.png',
            sizes: '500x500',
            type: 'image/png'
          },
          {
            src: 'markets-old.png',
            sizes: '1500x1500',
            type: 'image/png'
          },

        ]
      }

    })
  ],
})

