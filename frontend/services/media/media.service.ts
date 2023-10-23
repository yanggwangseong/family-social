import { axiosAPI } from 'api/axios';

export const MediaService = {
	async uploadfile(img: File[]) {
		const formData = new FormData();

		for (const file of img) {
			formData.append('files', file);
		}

		const { data } = await axiosAPI.post('/feeds/test', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return data;
	},
};
