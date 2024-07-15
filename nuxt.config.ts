// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    [
      '@element-plus/nuxt',
      {
        importStyle: 'scss',
        themes: ['dark'],
      },
    ],
    '@pinia/nuxt',
    'nuxt-icon',
  ],
  css: ['assets/styles/index.scss'],
  alias: {
    '~~': fileURLToPath(new URL('./', import.meta.url)),
    '@@': fileURLToPath(new URL('./', import.meta.url)),
    '~': fileURLToPath(new URL('./src', import.meta.url)),
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    assets: fileURLToPath(new URL('./assets', import.meta.url)),
    public: fileURLToPath(new URL('./public', import.meta.url)),
    '#shared': fileURLToPath(new URL('./src/6 shared', import.meta.url)),
    '#entities': fileURLToPath(new URL('./src/5 entities', import.meta.url)),
    '#features': fileURLToPath(new URL('./src/4 features', import.meta.url)),
    '#widgets': fileURLToPath(new URL('./src/3 widgets', import.meta.url)),
    styles: fileURLToPath(new URL('./assets/styles', import.meta.url)),
    fonts: fileURLToPath(new URL('./assets/fonts', import.meta.url)),
    app: fileURLToPath(new URL('./src/1 app', import.meta.url)),
    pages: fileURLToPath(new URL('./src/2 pages', import.meta.url)),
  },
  dir: {
    plugins: './src/1 app/plugins',
    layouts: './src/1 app/layouts/ui',
    middleware: './src/1 app/middleware/model',
    pages: './src/2 pages',
  },
  components: {
    global: false,
    dirs: [],
  },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      env: process.env,
    },
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.NUXT_API_SERVER || 'http://localhost:3000/',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api\/v1/, '/api'),
        },
      },
    },
  },
});
