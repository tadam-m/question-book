// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Question Book',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    },
  },
  ssr: false,

  typescript: {
    typeCheck: true,
    strict: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  css: ['@/assets/style/main.css'],
})