import { TourAreaCodesResponse } from '@/shared/interfaces/tour.interface';
import { axiosAPI } from 'api/axios';

export const TourService = {
	async getTourAreaCodes() {
		const { data } = await axiosAPI.get<TourAreaCodesResponse>(
			`tours/area?numOfRows=100&pageNo=1&areaCode=1`,
		);
		return data;
	},
};
