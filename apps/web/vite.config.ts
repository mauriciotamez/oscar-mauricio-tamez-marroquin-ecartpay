import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'log-urls',
      configureServer(server) {
        server.printUrls = () => {
          console.log('\n🌐 Vue.js app is running at:');
          console.log(`➜ Local:   http://localhost:3002`);
          console.log(`➜ Network: http://${server.resolvedUrls?.network[0]}\n`);
        };
      },
    },
  ],
  server: {
    port: 3002,
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
