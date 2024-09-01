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
    /** If you need HTTPS, generate a cert with mkcert and fill in the https props below. 
     *  Also ensure that your local api is running with listenOptions.UseHttps();
     *  Don't forget to change the localhost target to https.
     */
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, '../_wildcard.localhost.com+4-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, '../_wildcard.localhost.com+4.pem')),
    // }, 
    // host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:6060', 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/app/, '/api'), // Rewrite /app to /api       
        /** Debug logging */
        // configure: (proxy, _options) => {
        //   proxy.on('error', (err, _req, _res) => {
        //     console.log('proxy error', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq, req, _res) => {
        //     console.log('Sending Request to the Target:', req.method, req.url);
        //   });
        //   proxy.on('proxyRes', (proxyRes, req, _res) => {
        //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        //   });
        // },
      },
      '/app/api': {
        target: 'http://localhost:6060', 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/app/, ''), 
      },
    },
  },
})
