import { orderSelectOptionsKeys } from '@/components/screens/schedule/create/tourism/tourism.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import {
	TourAreaCodeItem,
	TourDetailResponse,
	TourListResponse,
	TourServiceCategoriesResponse,
} from '@/shared/interfaces/tour.interface';
import { axiosAPI } from 'api/axios';

export const TourService = {
	async getTourAreaCodes(areaCode?: string) {
		let url = `tours/area?numOfRows=100&pageNo=1`;
		if (areaCode) url += `&areaCode=${areaCode}`;
		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourAreaCodeItem>
		>(url);
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

	async searchTourLists({
		keyword,
		isSelected,
		contentTypeId,
		pageNo,
		numOfRows,
	}: {
		keyword: string;
		isSelected: orderSelectOptionsKeys;
		numOfRows: number;
		pageNo: number;
		contentTypeId: string;
	}) {
		let arrange = 'O';
		if (isSelected === 'orderSubject') {
			arrange = 'O';
		} else if (isSelected === 'orderCreated') {
			arrange = 'R';
		} else if (isSelected === 'orderUpdated') {
			arrange = 'Q';
		}

		let url = `search/tours/keyword/${keyword}?arrange=${arrange}&contentTypeId=${contentTypeId}&numOfRows=${numOfRows}&pageNo=${pageNo}`;

		const { data } = await axiosAPI.get<TourListResponse>(url);
		return data;
	},

	async searchTourFestivalList({
		pageNo,
		numOfRows,
		areaCode,
		sigunguCode,
		isSelected,
		eventStartDate,
	}: {
		numOfRows: number;
		pageNo: number;
		areaCode: string;
		sigunguCode: string;
		isSelected: orderSelectOptionsKeys;
		eventStartDate: string;
	}) {
		let arrange = 'O';
		if (isSelected === 'orderSubject') {
			arrange = 'O';
		} else if (isSelected === 'orderCreated') {
			arrange = 'R';
		} else if (isSelected === 'orderUpdated') {
			arrange = 'Q';
		}

		let url = `tours/festival?arrange=${arrange}
		&numOfRows=${numOfRows}&pageNo=${pageNo}
		&areaCode=${areaCode}&sigunguCode=${sigunguCode}
		&eventStartDate=${eventStartDate}`;
		const { data } = await axiosAPI.get<TourListResponse>(url);
		return data;
	},

	async getTourDetail(contentId: string, contentTypeId: string) {
		const url = `tours/${contentId}/common-information?numOfRows=10&pageNo=1&contentTypeId=${contentTypeId}`;

		const { data } = await axiosAPI.get<TourDetailResponse>(url);
		return data;
	},
};
