import { orderSelectOptionsKeys } from '@/components/screens/schedule/create/tourism/tourism.interface';
import {
	TourAreaCodesResponse,
	TourListResponse,
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

	async getTourLists({
		numOfRows,
		pageNo,
		contentTypeId,
		areaCode,
		sigunguCode,
		cat1,
		cat2,
		cat3,
		isSelected,
	}: {
		numOfRows: number;
		pageNo: number;
		contentTypeId: string;
		areaCode: string;
		sigunguCode: string;
		cat1: string;
		cat2: string;
		cat3: string;
		isSelected: orderSelectOptionsKeys;
	}) {
		let arrange = 'O';
		if (isSelected === 'orderSubject') {
			arrange = 'O';
		} else if (isSelected === 'orderCreated') {
			arrange = 'R';
		} else if (isSelected === 'orderUpdated') {
			arrange = 'Q';
		}

		let url = `tours?arrange=${arrange}&contentTypeId=${contentTypeId}&numOfRows=${numOfRows}&pageNo=${pageNo}
		&areaCode=${areaCode}&sigunguCode=${sigunguCode}&cat1=${cat1}&cat2=${cat2}&cat3=${cat3}
		`;

		const { data } = await axiosAPI.get<TourListResponse>(url);
		return data;
	},
};
