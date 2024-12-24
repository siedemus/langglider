// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				css: ["assets/css/main.css"],
				modules: [
				 "@nuxtjs/google-fonts",
				 "@hypernym/nuxt-anime",
				 "@nuxtjs/supabase",
				 "@nuxt/icon",
				],

				supabase: {
								url: process.env.NUXT_PUBLIC_SUPABASE_URL,
								key: process.env.SUPABASE_KEY,
								serviceKey: process.env.SUPABASE_SERVICE_ROLE,
								redirect: false
				},

				app: {
								head: {
												title: "Lang Glider",
												meta: [
																{ name: "viewport", content: "width=device-width, initial-scale=1" },
																{ charset: "utf-8" },
												],
								},
				},

				googleFonts: {
								families: {
												"Funnel Display": [400, 500, 600, 700, 800],
								},
								display: "swap",
								preload: true,
								download: true,
								base64: false,
				},

				compatibilityDate: "2024-11-01",
				devtools: { enabled: true },
});