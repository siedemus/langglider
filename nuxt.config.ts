// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', "@nuxtjs/google-fonts"],

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
      exclude: ["/"],
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