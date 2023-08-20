import axios, { AxiosResponse } from 'axios';

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
