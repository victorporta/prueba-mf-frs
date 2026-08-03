import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
const shared = {
  react: { singleton: true, requiredVersion: '^19.2.8', import: false },
  'react-dom': { singleton: true, requiredVersion: '^19.2.8', import: false },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // classic JSX avoids shared `react/jsx-runtime`, which breaks under MF + Vite serve
    react({ jsxRuntime: 'classic' }),
    federation({
      name: 'pokemon-history',
      filename: 'remoteEntry.js',
      exposes: {
        './PokemonHistory': './src/App.tsx',
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
    port: 3002,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
    cors: true,
  },
})
