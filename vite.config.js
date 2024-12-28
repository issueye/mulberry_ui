import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },

  server: {
    port: 3000, // 设置为 3002
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:6678',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/static': {
        target: 'http://0.0.0.0:6678',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/static/, '/static')
      }
    }
  },

  define: {
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
  },

  plugins: [
    vue(),
  ],
})
