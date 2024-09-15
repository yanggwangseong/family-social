import { TourLayerMode } from '@/components/ui/tour/TourIntroductionController';
import { BasicPaginationResponse } from '@/shared/interfaces/pagination.interface';
import {
	AdditionalExplanationArgs,
	ServiceCategoriesArgs,
	IntroductionByContentTypeIdArgs,
	SearchTourFestivalListArgs,
	TourListsArgs,
} from '@/shared/interfaces/search.interface';
import {
	TourAdditionalUnionType,
	TourAreaCodeItem,
	TourDetailItem,
	TourFestivalItem,
	TourImageItem,
	TourIntroductionUnionType,
	TourResponseItem,
	TourServiceCategoriesResponse,
} from '@/shared/interfaces/tour.interface';
import { switchCaseMach } from '@/utils/switch-case-mach';
import { axiosAPI } from 'api/axios';
import { TourAdditionalType, Union } from 'types';

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
	}: ServiceCategoriesArgs) {
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
	}: TourListsArgs) {
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

	async searchTourFestivalList({
		pageNo,
		numOfRows,
		areaCode,
		sigunguCode,
		isSelected,
		eventStartDate,
	}: SearchTourFestivalListArgs) {
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
	}: IntroductionByContentTypeIdArgs): Promise<TourIntroductionUnionType> {
		const url = `tours/${contentId}/introduction?numOfRows=${numOfRows}&pageNo=${pageNo}&contentTypeId=${contentTypeId}`;

		const { data } = await axiosAPI.get<TourIntroductionUnionType>(url);

		const kind = switchCaseMach<string, Union<typeof TourLayerMode>>(
			contentTypeId,
		)
			.on(
				x => x === '12',
				() => 'tourist',
			)
			.on(
				x => x === '14',
				() => 'cultural',
			)
			.on(
				x => x === '15',
				() => 'festival',
			)
			.on(
				x => x === '25',
				() => 'tourCourse',
			)
			.on(
				x => x === '28',
				() => 'leports',
			)
			.on(
				x => x === '32',
				() => 'accomodation',
			)
			.on(
				x => x === '38',
				() => 'shopping',
			)
			.on(
				x => x === '39',
				() => 'restaurant',
			)
			.otherwise(() => 'tourist');

		return {
			...data,
			kind,
		};
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
	}: AdditionalExplanationArgs): Promise<TourAdditionalUnionType> {
		const url = `tours/${contentId}/additional-explanation?numOfRows=${numOfRows}&pageNo=${pageNo}&contentTypeId=${contentTypeId}`;

		const { data } = await axiosAPI.get<TourAdditionalUnionType>(url);

		const kind = switchCaseMach<string, Union<typeof TourAdditionalType>>(
			contentTypeId,
		)
			// 12, 14, 15, 28, 38, 39
			.on(
				x =>
					x === '12' ||
					x === '14' ||
					x === '15' ||
					x === '28' ||
					x === '38' ||
					x === '39',
				() => 'additionalCommon',
			)
			.on(
				x => x === '25',
				() => 'additionalTourCourse',
			)
			.on(
				x => x === '32',
				() => 'additionalAccomodation',
			)
			.otherwise(() => 'additionalCommon');

		return {
			...data,
			kind,
		};
	},
};
