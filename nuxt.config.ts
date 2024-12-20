// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["public/css/main.css"],

	app: {
		head: {
			title: "Lang Glider",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ charset: "utf-8" },
			],
		},
	},

	modules: ["@nuxtjs/google-fonts"],
	googleFonts: {
		families: {
			"Funnel Display": [400, 500, 600, 700],
		},
		display: "swap",
		preload: true,
		download: true,
		base64: false,
	},
});
