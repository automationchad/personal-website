// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	app: {
		head: {
			title: 'William Marzella | Engineering Systems Manager',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [
				{
					name: 'description',
					content:
						'William Marzella, an experienced Engineering Systems Manager, specializes in optimizing engineering processes and systems for efficiency and innovation.',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},
	css: ['~/assets/css/main.css'],
	modules: ['@nuxt/content'],
	content: {},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
