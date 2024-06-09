import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: ['chrome89', 'edge89', 'firefox89', 'safari15'],
    sourcemap: true
  }


})
