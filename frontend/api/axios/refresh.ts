import { API_URL, SSR_API_URL } from '@/constants/index';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const axiosRefreshAPI = (() => {
	const axiosInstance = axios.create({
		baseURL: typeof window !== 'undefined' ? API_URL : SSR_API_URL,
		withCredentials: true,
	});

	axiosInstance.interceptors.response.use(
		(res: AxiosResponse) => {
			return {
				...res,
				data: res.data.data,
			};
		},
		async (error: AxiosError) => {
			return Promise.reject(error);
		},
	);

	return () => axiosInstance.post('/auth/refreshtoken');
})();
