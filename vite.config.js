import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'esbuild',
    target: 'es2020',
    // CSS inlineado en el HTML — elimina el request bloqueante de style.css
    cssCodeSplit: false,
    assetsInlineLimit: 10240, // 10 KiB — inlinea CSS pequeño + assets
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('firebase'))    return 'firebase'
          if (id.includes('@emailjs'))    return 'emailjs'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom'))   return 'react-dom'
          if (id.includes('node_modules/react/') || id.includes('scheduler')) return 'react'
        },
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },
    chunkSizeWarningLimit: 200,
  },
})