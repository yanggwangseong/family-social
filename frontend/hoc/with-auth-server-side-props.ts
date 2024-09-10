import { axiosAPI } from 'api/axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const withAuthServerSideProps = (
	getServerSidePropsFunction: GetServerSideProps,
) => {
	return async (context: GetServerSidePropsContext) => {
		const cookies = context.req.headers.cookie || '';

		// 쿠키 문자열을 개별 쿠키로 분리
		const cookiesArray = cookies?.split(';');

		// Authentication 쿠키 찾기
		const authenticationCookie = cookiesArray?.find(cookie =>
			cookie.trim().startsWith('Authentication='),
		);

		// authorizationCookie 쿠키 찾기
		const authorizationCookie = cookiesArray?.find(cookie =>
			cookie.trim().startsWith('Authorization='),
		);

		// accessToken
		const accessToken = authorizationCookie
			? authorizationCookie.split('=')[1]
			: '';

		// 인증 토큰이 없으면 로그인 페이지로 리다이렉트
		if (!accessToken) {
			return {
				redirect: {
					destination: '/login', // 로그인 페이지로 이동
					permanent: false,
				},
			};
		}

		// 인증 API 요청에 Authorization 헤더를 추가
		axiosAPI.defaults.headers.common[
			'Authorization'
		] = `Bearer ${accessToken.trim()}`;

		// 원래 getServerSidePropsFunction 호출 (ex: fetchMyPage)
		const result = await getServerSidePropsFunction(context);

		// Authorization 헤더 제거 (보안 강화)
		authAPI.defaults.headers.common['Authorization'] = '';

		return result;
	};
};
