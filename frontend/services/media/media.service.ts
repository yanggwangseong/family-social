import { axiosAPI } from 'api/axios';

export const MediaService = {
	async uploadfile(img: File[]): Promise<string[]> {
		const formData = new FormData();

		for (const file of img) {
			formData.append('files', file);
		}

		const { data } = await axiosAPI.post('/feeds/test', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return data;
	},

	async uploadProfileImage(img: File): Promise<string[]> {
		const formData = new FormData();
		formData.append('files', img);

		const { data } = await axiosAPI.post('/members/uploads/profile', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return data;
	},
};
