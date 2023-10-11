import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./styles/**/*.{css,scss}',
	],
	theme: {
		extend: {
			colors: {
				basic: '#fff9f4',
				customDark: '#0a0a0a',
				customGray: '#707070',
				customOrange: '#e5855d',
				customGray2427: 'rgba(10, 10, 10, 0.27)',
				bgSplash: '#111111',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
export default config;
