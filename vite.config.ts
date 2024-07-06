import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import path from "path"
import react from '@vitejs/plugin-react'
//import fs  from 'fs'

export default defineConfig({
  plugins: [
    //basicSsl(),
    react(),
    TanStackRouterVite()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {

      },
      
    },
  },
})
