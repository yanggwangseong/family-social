import { orderSelectOptionsKeys } from '@/components/screens/schedule/create/tourism/tourism.interface';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import {
	TourAdditionalUnionType,
	TourAreaCodeItem,
	TourDetailItem,
	TourFestivalItem,
	TourImageItem,
	TourIntroductionUnionType,
	TourResponseItem,
	TourSearchItem,
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

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourServiceCategoriesResponse>
		>(url);
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

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourResponseItem>
		>(url);

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

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourSearchItem>
		>(url);

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
		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourFestivalItem>
		>(url);

		return data;
	},

	async getTourDetail(contentId: string, contentTypeId: string) {
		const url = `tours/${contentId}/common-information?numOfRows=10&pageNo=1&contentTypeId=${contentTypeId}`;

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourDetailItem>
		>(url);
		return data;
	},

	/**
	 * 이미지 정보 조회
	 * @param contentId 컨텐츠 아이디
	 * @param numOfRows 가져 올 갯수
	 * @param pageNo 페이지 번호
	 * @returns {BasicPaginationResponse<TourImageItem>}
	 */
	async getTourImages(
		contentId: string,
		numOfRows: string,
		pageNo: string,
	): Promise<BasicPaginationResponse<TourImageItem>> {
		const url = `tours/${contentId}/images?numOfRows=${numOfRows}&pageNo=${pageNo}`;

		const { data } = await axiosAPI.get<BasicPaginationResponse<TourImageItem>>(
			url,
		);

		return data;
	},

	/**
	 * 소개 정보 조회
	 * @description 컨텐츠 타입에 따라 다른 소개 정보를 제공 한다
	 * @param contentId 컨텐츠 아이디
	 * @param numOfRows 가져 올 갯수
	 * @param pageNo 페이지 번호
	 * @param contentTypeId 컨텐츠 타입 (12, 14, 15, 25, 28, 32, 38, 39)
	 *
	 */
	async getIntroductionByContentTypeId({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: string;
		pageNo: string;
		contentTypeId: string;
	}) {
		const url = `tours/${contentId}/introduction?numOfRows=${numOfRows}&pageNo=${pageNo}&contentTypeId=${contentTypeId}`;

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourIntroductionUnionType>
		>(url);

		return data;
	},

	/**
	 * 반복 추가 정보 조회
	 * @description 컨텐츠 타입에 따라 다른 반복 추가 정보를 제공 한다
	 * @param contentId 컨텐츠 아이디
	 * @param numOfRows 가져 올 갯수
	 * @param pageNo 페이지 번호
	 * @param contentTypeId 컨텐츠 타입 (12, 14, 15, 25, 28, 32, 38, 39)
	 *
	 */
	async getAdditionalExplanation({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: string;
		pageNo: string;
		contentTypeId: string;
	}) {
		const url = `tours/${contentId}/additional-explanation?numOfRows=${numOfRows}&pageNo=${pageNo}&contentTypeId=${contentTypeId}`;

		const { data } = await axiosAPI.get<
			BasicPaginationResponse<TourAdditionalUnionType>
		>(url);

		return data;
	},
};
