import axios, { AxiosError, AxiosResponse } from 'axios';

export const API_URL = `http://localhost:3000/api`;

export const axiosRefreshAPI = (() => {
	const axiosInstance = axios.create({
		baseURL: API_URL,
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
