import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
const shared = {
  react: { singleton: true, requiredVersion: '^19.2.8', eager: true },
  'react-dom': { singleton: true, requiredVersion: '^19.2.8', eager: true },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        'pokemon-detail': 'http://localhost:3001/assets/remoteEntry.js',
        'pokemon-history': 'http://localhost:3002/assets/remoteEntry.js',
      },
      shared,
    }),
    tailwindcss(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
})
