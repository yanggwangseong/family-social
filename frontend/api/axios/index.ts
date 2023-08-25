import { ACCESS_TOKEN_KEY } from '@/constants/index';
import { getCookie } from '@/utils/cookie';
import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { axiosRefreshAPI } from './refresh';

export const getContentType = () => ({
	'Content-Type': 'application/json',
});

export const API_URL = `http://localhost:3000/api`;

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
});

axiosClassic.interceptors.response.use((res: AxiosResponse) => {
	return {
		...res,
		data: res.data.data,
	};
});

export const axiosAPI = (() => {
	const axiosInstance = axios.create({
		baseURL: API_URL,
	});

	axiosInstance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const accessToken = getCookie(ACCESS_TOKEN_KEY as string);

			if (accessToken) {
				config.headers.setAuthorization(`Bearer ${accessToken}`);
			}

			return config;
		},
		(error: AxiosError) => Promise.reject(error.response),
	);

	axiosInstance.interceptors.response.use(
		(res: AxiosResponse) => {
			return {
				...res,
				data: res.data.data,
			};
		},
		async (error: AxiosError) => {
			const { config, response } = error;

			if (!config || !response) {
				return Promise.reject(error);
			}

			if (response?.status !== 401) {
				return Promise.reject(error);
			}

			try {
				await axiosRefreshAPI();

				return axiosInstance(config);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		},
	);

	return axiosInstance;
})();
