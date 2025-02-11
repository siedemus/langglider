// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', "@nuxtjs/google-fonts", "@pinia/nuxt", "vue-sonner/nuxt"],
  app: {
    head: {
      link: [{ rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" }]
    }
  },
  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  runtimeConfig: {
    public: {
      appUrl: ""
    }
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/request-reset", "/reset-password"],
    },
  },

  googleFonts: {
    families: {
      "Funnel Display": {
        wght: [400, 600, 700, 800],
      }
    }
  }
})