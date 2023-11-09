// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  ssr: false,
  runtimeConfig: {
    public: {
      baseUrl: "",
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
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: "th",
    strategy: "no_prefix",
    locales: [
      {
        code: 'th',
        iso: 'th-TH',
        name: 'Thai',
        file: 'th.ts',
        path_image: '/images/flag/th.png'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.ts',
        path_image: '/images/flag/en.png'
      }
    ],
    detectBrowserLanguage: {
      fallbackLocale: 'th',
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  }
})
