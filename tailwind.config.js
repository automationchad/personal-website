/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./app.vue',
	],
	theme: {
		fontFamily: {
			primary: ['arialRegular'],
			secondary: ['chicagoRegular'],
		},
		extend: {
			transitionProperty: {
				width: 'width',
				height: 'height',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%', // add required value here
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
