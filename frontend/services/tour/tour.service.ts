import {
	TourAreaCodesResponse,
	TourServiceCategoriesResponse,
} from '@/shared/interfaces/tour.interface';
import { axiosAPI } from 'api/axios';

export const TourService = {
	async getTourAreaCodes(areaCode?: string) {
		let url = `tours/area?numOfRows=100&pageNo=1`;
		if (areaCode) url += `&areaCode=${areaCode}`;
		const { data } = await axiosAPI.get<TourAreaCodesResponse>(url);
		return data;
	},

	async getServiceCategories({
		firstCategory,
		secondCategory,
		thirdCategory,
		contentTypeId,
	}: {
		firstCategory?: string;
		secondCategory?: string;
		thirdCategory?: string;
		contentTypeId?: string;
	}) {
		let url = `tours/service-categories?numOfRows=50&pageNo=1`;

		if (contentTypeId) url += `&contentTypeId=${contentTypeId}`;
		if (firstCategory) url += `&cat1=${firstCategory}`;
		if (secondCategory) url += `&cat2=${secondCategory}`;
		if (thirdCategory) url += `&cat3=${thirdCategory}`;

		const { data } = await axiosAPI.get<TourServiceCategoriesResponse>(url);
		return data;
	},
};
