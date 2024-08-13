/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname:
					'elasticbeanstalk-ap-northeast-2-655111786396.s3.ap-northeast-2.amazonaws.com',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: 'tong.visitkorea.or.kr',
				port: '',
				pathname: '/cms/resource/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: 'k.kakaocdn.net',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'k.kakaocdn.net',
				port: '',
				pathname: '**',
			},
		],
	},
};

module.exports = nextConfig;
