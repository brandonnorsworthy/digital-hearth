import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const API_TARGET = env.API_URL ?? 'http://localhost:5125'

  return {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    preview: {
      allowedHosts: env.PREVIEW_ALLOWED_HOSTS?.split(',') ?? [],
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: API_TARGET,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        workbox: {
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api/],
        },
        manifest: {
          name: 'Digital Hearth',
          short_name: 'Hearth',
          description: 'Household task coordination and meal planning',
          theme_color: '#f8faf3',
          background_color: '#f8faf3',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      pool: 'forks',
      setupFiles: ['./src/test/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
      },
    },
  }
})
