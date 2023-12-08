import { axiosAPI } from 'api/axios';

export const TourService = {
	async getTourAreaCodes() {
		const { data } = await axiosAPI.get(
			`tours/area?numOfRows=17&pageNo=1&areaCode=1`,
		);
		return data;
	},
};
