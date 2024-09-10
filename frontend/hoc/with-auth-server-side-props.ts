import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { SSR_API_URL } from '../constants';

export interface WithAuthServerSidePropsContext
	extends GetServerSidePropsContext {
	axiosInstance: AxiosInstance;
}

export const withAuthServerSideProps = (
	getServerSidePropsFunction: GetServerSideProps,
) => {
	return async (context: WithAuthServerSidePropsContext) => {
		const cookies = context.req.headers.cookie || '';
		const cookiesArray = cookies?.split(';');

		const authenticationCookie = cookiesArray?.find(cookie =>
			cookie.trim().startsWith('Authentication='),
		);

		const authorizationCookie = cookiesArray?.find(cookie =>
			cookie.trim().startsWith('Authorization='),
		);

		const accessToken = authorizationCookie
			? authorizationCookie.split('=')[1].trim()
			: '';

		if (!accessToken || !authenticationCookie) {
			return {
				redirect: {
					destination: '/signin',
					permanent: false,
				},
			};
		}

		try {
			const response = await axios.post(
				`${SSR_API_URL}/auth/refreshtoken`,
				{},
				{
					headers: {
						Cookie: `Authentication=${authenticationCookie
							.split('=')[1]
							.trim()}`,
					},
				},
			);

			const newAuthenticationCookie = response.headers['set-cookie']?.find(
				cookie => cookie.trim().startsWith('Authentication='),
			);

			const newAuthorizationCookie = response.headers['set-cookie']?.find(
				cookie => cookie.trim().startsWith('Authorization='),
			);

			const axiosInstance = axios.create({
				baseURL: SSR_API_URL,
				headers: {
					Authorization: newAuthorizationCookie
						? `Bearer ${newAuthorizationCookie
								.split('=')[1]
								.split(';')[0]
								.trim()}`
						: '',
					Cookie: newAuthenticationCookie
						? `Authentication=${newAuthenticationCookie
								.split('=')[1]
								.split(';')[0]
								.trim()}`
						: '',
				},
			});

			axiosInstance.interceptors.response.use((res: AxiosResponse) => {
				return {
					...res,
					data: res.data.data,
				};
			});

			context.axiosInstance = axiosInstance;

			const result = await getServerSidePropsFunction(context);

			// 반환 값이 없을 경우 props: {}를 기본으로 반환
			return result || { props: {} };
		} catch (error) {
			return {
				redirect: {
					destination: '/signin',
					permanent: false,
				},
			};
		}
	};
};
