import { TourAreaCodesResponse } from '@/shared/interfaces/tour.interface';
import { axiosAPI } from 'api/axios';

export const TourService = {
	async getTourAreaCodes(areaCode?: string) {
		let url = `tours/area?numOfRows=100&pageNo=1`;
		if (areaCode) url += `&areaCode=${areaCode}`;
		const { data } = await axiosAPI.get<TourAreaCodesResponse>(url);
		return data;
	},
};
