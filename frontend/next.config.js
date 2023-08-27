/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
};

module.exports = {
	...nextConfig,
	env: {
		DB_TYPE: process.env.DB_TYPE,
	},
};
