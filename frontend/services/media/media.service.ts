import { axiosAPI } from 'api/axios';

export const MediaService = {
	async uploadfile(img: File[]): Promise<string[]> {
		const formData = new FormData();

		for (const file of img) {
			formData.append('files', file);
		}

		const { data } = await axiosAPI.post('/medias/feeds', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return data;
	},

	async uploadProfileImage(img: File): Promise<string[]> {
		const formData = new FormData();
		formData.append('files', img);

		const { data } = await axiosAPI.post('/medias/members/profile', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return data;
	},

	async uploadGroupCoverImage(img: File, groupId: string): Promise<string[]> {
		const formData = new FormData();
		formData.append('files', img);

		const { data } = await axiosAPI.patch(
			`/medias/groups/${groupId}/cover-image`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			},
		);

		return data;
	},
};
