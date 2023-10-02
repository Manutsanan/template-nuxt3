// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL || '',
    }
  },
  app: {
    head: {
      title: 'NEW TEMPLATE',
      script: [
        {
          src: "https://kit.fontawesome.com/43b81f9fb6.js",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  css: ['bootstrap/scss/bootstrap.scss', 'sweetalert2/src/sweetalert2.scss', "~/assets/scss/main.scss"],
  modules: ['@pinia/nuxt'],
})
