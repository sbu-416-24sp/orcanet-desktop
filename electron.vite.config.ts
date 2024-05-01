import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib'),
        '@shared': resolve('src/shared'),
        '@shadcn': resolve('src/renderer/src/shadcn')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@shadcn': resolve('src/renderer/src/shadcn'),
        "@/hooks": resolve('src/renderer/src/hooks'),
        "@/assets": resolve('src/renderer/src/assets'),
        "@/store": resolve('src/renderer/src/store'),
        "@/components": resolve('src/renderer/src/components'),
        "@/mocks": resolve('src/renderer/src/mocks'),
      }
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:45002',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
});