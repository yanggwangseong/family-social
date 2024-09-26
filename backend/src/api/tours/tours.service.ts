import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { catchError, firstValueFrom } from 'rxjs';

import { InternalServerErrorException } from '@/common/exception/service.exception';
import { ERROR_INTERNAL_SERVER_ERROR } from '@/constants/business-error';
import {
	ENV_TOUR_API_END_POINT,
	ENV_TOUR_API_SERVICE_KEY,
} from '@/constants/env-keys.const';
import { ToursCache } from '@/models/cache/tours-cache';
import { TourHttpAreaCodeResDto } from '@/models/dto/tour/res/tour-http-area-code-res.dto';
import { TourHttpCommonResDto } from '@/models/dto/tour/res/tour-http-common-res.dto';
import { TourHttpFestivalScheduleResDto } from '@/models/dto/tour/res/tour-http-festival-schedule-res.dto';
import { TourHttpImagesResDto } from '@/models/dto/tour/res/tour-http-images-res.dto';
import { TourHttpSearchTourismResDto } from '@/models/dto/tour/res/tour-http-search-tourism-res.dto';
import { TourHttpServiceCategoryResDto } from '@/models/dto/tour/res/tour-http-service-category-res.dto';
import { TourHttpTourismListResDto } from '@/models/dto/tour/res/tour-http-tourism-list-res.dto';
import { TourHttpResponse, TourListArgs } from '@/types/args/tour';
import { BasicPaginationResponse } from '@/types/pagination';
import {
	AdditionalUnionType,
	TourCommonInformationUnionType,
} from '@/types/type';

@Injectable()
export class ToursService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly toursCache: ToursCache,
	) {}

	private readonly serviceKey: string =
		this.configService.get<string>(ENV_TOUR_API_SERVICE_KEY) ?? '';
	private readonly MobileApp: string = 'FAM';
	private endPoint = this.configService.get<string>(ENV_TOUR_API_END_POINT);
	private listYN = 'Y'; // 목록구분(Y=목록, N=개수) N은 총 갯수
	private MobileOS = 'ETC';
	private _type = 'json';

	async findAll(
		findQueryArgs: TourListArgs,
	): Promise<BasicPaginationResponse<TourHttpTourismListResDto>> {
		const { cat1, cat2, cat3 } = findQueryArgs;

		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/areaBasedList1`,
		);

		for (const [key, value] of Object.entries(findQueryArgs)) {
			newUrl.searchParams.append(key, value);
		}

		newUrl.searchParams.append('listYN', this.listYN);

		if (cat1) newUrl.searchParams.append('cat1', cat1);
		if (cat2) newUrl.searchParams.append('cat2', cat2);
		if (cat3) newUrl.searchParams.append('cat3', cat3);

		const data = await this.HttpServiceResponse<TourHttpTourismListResDto>(
			newUrl.toString(),
		);

		return {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};
	}

	async getHttpTourApiAreaCodes({
		numOfRows,
		pageNo,
		areaCode,
	}: {
		numOfRows: string;
		pageNo: string;
		areaCode?: string;
	}): Promise<BasicPaginationResponse<TourHttpAreaCodeResDto>> {
		const cacheKey = `areaCode1:${numOfRows}:${pageNo}${
			areaCode ? `:${areaCode}` : ''
		}`;
		const cachedData = await this.toursCache.getAreaCodesCache(cacheKey);

		if (cachedData) {
			return cachedData;
		}

		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/areaCode1`,
		);

		newUrl.searchParams.append('numOfRows', numOfRows);
		newUrl.searchParams.append('pageNo', pageNo);

		if (areaCode) newUrl.searchParams.append('areaCode', areaCode);

		const data = await this.HttpServiceResponse<TourHttpAreaCodeResDto>(
			newUrl.toString(),
		);

		const result = {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};

		// 캐시에 데이터 저장
		await this.toursCache.setAreaCodesCache(cacheKey, result);

		return result;
	}

	async getHttpTourApiServiceCategories({
		numOfRows,
		pageNo,
		contentTypeId,
		cat1,
		cat2,
		cat3,
	}: {
		numOfRows: string;
		pageNo: string;
		contentTypeId: string;
		cat1?: string;
		cat2?: string;
		cat3?: string;
	}): Promise<BasicPaginationResponse<TourHttpServiceCategoryResDto>> {
		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/categoryCode1`,
		);

		newUrl.searchParams.append('pageNo', pageNo);
		newUrl.searchParams.append('numOfRows', numOfRows);

		if (contentTypeId)
			newUrl.searchParams.append('contentTypeId', contentTypeId);

		if (cat1) newUrl.searchParams.append('cat1', cat1);
		if (cat2) newUrl.searchParams.append('cat2', cat2);
		if (cat3) newUrl.searchParams.append('cat3', cat3);

		const data = await this.HttpServiceResponse<TourHttpServiceCategoryResDto>(
			newUrl.toString(),
		);

		const result = {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};

		return result;
	}

	async getHttpTourApiIntroduction({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: string;
		pageNo: string;
		contentTypeId: string;
	}): Promise<BasicPaginationResponse<TourCommonInformationUnionType>> {
		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/detailIntro1`,
		);

		newUrl.searchParams.append('numOfRows', numOfRows);
		newUrl.searchParams.append('pageNo', pageNo);
		newUrl.searchParams.append('contentTypeId', contentTypeId);
		newUrl.searchParams.append('contentId', contentId);

		/**
		 *  관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
		 *  관광 타입에 따라 다른 response 값 return
		 *
		 */
		const data = await this.HttpServiceResponse<TourCommonInformationUnionType>(
			newUrl.toString(),
		);

		return {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};
	}

	async getHttpTourApiAdditionalExplanation({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: string;
		pageNo: string;
		contentTypeId: string;
	}): Promise<BasicPaginationResponse<AdditionalUnionType>> {
		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/detailInfo1`,
		);

		newUrl.searchParams.append('numOfRows', numOfRows);
		newUrl.searchParams.append('pageNo', pageNo);
		newUrl.searchParams.append('contentTypeId', contentTypeId);
		newUrl.searchParams.append('contentId', contentId);

		/**
		 *  관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
		 *  관광 타입에 따라 다른 response 값 return
		 *
		 */
		const data = await this.HttpServiceResponse<AdditionalUnionType>(
			newUrl.toString(),
		);

		return {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};
	}

	async getHttpTourApiCommonInformation({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: string;
		pageNo: string;
		contentTypeId: string;
	}): Promise<BasicPaginationResponse<TourHttpCommonResDto>> {
		const config = {
			defaultYN: 'Y', // 기본정보조회여부( Y,N )
			firstImageYN: 'Y', // 원본, 썸네일대표 이미지, 이미지 공공누리유형정보 조회여부( Y,N )
			areacodeYN: 'Y', // 지역코드, 시군구코드조회여부( Y,N )
			catcodeYN: 'Y', // 대,중,소분류코드조회여부( Y,N )
			addrinfoYN: 'Y', // 주소, 상세주소조회여부( Y,N )
			mapinfoYN: 'Y', // 좌표X, Y 조회여부( Y,N )
			overviewYN: 'Y', // 콘텐츠개요조회여부( Y,N )
		};

		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/detailCommon1`,
		);

		newUrl.searchParams.append('numOfRows', numOfRows);
		newUrl.searchParams.append('pageNo', pageNo);
		newUrl.searchParams.append('contentTypeId', contentTypeId);
		newUrl.searchParams.append('contentId', contentId);

		for (const [key, value] of Object.entries(config)) {
			newUrl.searchParams.append(key, value);
		}

		const data = await this.HttpServiceResponse<TourHttpCommonResDto>(
			newUrl.toString(),
		);

		return {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};
	}

	async getHttpTourApiImagesByCotentId({
		contentId,
		numOfRows,
		pageNo,
	}: {
		contentId: string;
		numOfRows: string;
		pageNo: string;
	}): Promise<BasicPaginationResponse<TourHttpImagesResDto>> {
		const imageYN: string = 'Y'; // 이미지조회1 : Y=콘텐츠이미지조회 N=”음식점”타입의음식메뉴이미지
		const subImageYN: string = 'Y'; // 이미지조회2 : Y=원본,썸네일이미지조회,공공누리 저작권유형정보조회 N=Null

		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/detailImage1`,
		);

		newUrl.searchParams.append('numOfRows', numOfRows);
		newUrl.searchParams.append('pageNo', pageNo);
		newUrl.searchParams.append('contentId', contentId);
		newUrl.searchParams.append('imageYN', imageYN);
		newUrl.searchParams.append('subImageYN', subImageYN);

		const data = await this.HttpServiceResponse<TourHttpImagesResDto>(
			newUrl.toString(),
		);

		return {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};
	}

	async getHttpTourApiFestivalSchedule({
		numOfRows,
		pageNo,
		eventStartDate,
		areaCode,
		sigunguCode,
		arrange,
	}: {
		numOfRows: string;
		pageNo: string;
		eventStartDate: string;
		areaCode: string;
		sigunguCode: string;
		arrange: string;
	}): Promise<BasicPaginationResponse<TourHttpFestivalScheduleResDto>> {
		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/searchFestival1`,
		);

		newUrl.searchParams.append('numOfRows', numOfRows);
		newUrl.searchParams.append('pageNo', pageNo);
		newUrl.searchParams.append('listYN', this.listYN);
		newUrl.searchParams.append('eventStartDate', eventStartDate);
		newUrl.searchParams.append('arrange', arrange);

		if (areaCode) newUrl.searchParams.append('areaCode', areaCode);
		if (sigunguCode) newUrl.searchParams.append('sigunguCode', sigunguCode);

		const data = await this.HttpServiceResponse<TourHttpFestivalScheduleResDto>(
			newUrl.toString(),
		);

		return {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};
	}

	async getHttpTourApiSearch({
		numOfRows,
		pageNo,
		keyword,
		arrange,
		contentTypeId,
	}: {
		numOfRows: string;
		pageNo: string;
		keyword: string;
		arrange: string;
		contentTypeId: string;
	}): Promise<BasicPaginationResponse<TourHttpSearchTourismResDto>> {
		const newUrl = this.CreateTourHttpUrl(
			`${this.endPoint}/KorService1/searchKeyword1`,
		);

		newUrl.searchParams.append('numOfRows', numOfRows);
		newUrl.searchParams.append('pageNo', pageNo);
		newUrl.searchParams.append('listYN', this.listYN);
		newUrl.searchParams.append('arrange', arrange);
		newUrl.searchParams.append('contentTypeId', contentTypeId);
		newUrl.searchParams.append('keyword', keyword);

		const data = await this.HttpServiceResponse<TourHttpSearchTourismResDto>(
			newUrl.toString(),
		);

		return {
			list: data.items.item,
			page: data.pageNo,
			take: data.numOfRows,
			count: data.totalCount,
		};
	}

	private CreateTourHttpUrl(httpUrl: string) {
		const url = new URL(httpUrl);
		url.searchParams.append('serviceKey', decodeURIComponent(this.serviceKey));

		url.searchParams.append('MobileOS', this.MobileOS);
		url.searchParams.append('MobileApp', this.MobileApp);
		url.searchParams.append('_type', this._type);

		return url;
	}

	private async HttpServiceResponse<T>(url: string) {
		const { data } = await firstValueFrom<AxiosResponse<TourHttpResponse<T>>>(
			this.httpService.get(url).pipe(
				catchError((error: AxiosError) => {
					throw InternalServerErrorException(error.message);
				}),
			),
		);

		const result = XMLValidator.validate(`${data}`);
		if (result === true) {
			const options = {
				ignoreAttributes: false,
				attributeNamePrefix: '@_',
			};
			const parser = new XMLParser(options);
			const result = parser.parse(`${data}`);

			// [TODO] slack
			// all-exception-filter로 인해서 설정 안해줘도 됨.
			// throw InternalServerErrorException(
			// 	`code: ${result.OpenAPI_ServiceResponse.cmmMsgHeader.returnReasonCode}`,
			// );
			throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		}

		// [TODO] slack throw InternalServerErrorException(ERROR_INTERNAL_SERVER_ERROR);
		// all-exception-filter로 인해서 설정 안해줘도 됨.
		if (typeof data.response.body.items === 'string') {
			const item = {
				item: [],
			};
			data.response.body.items = item;
		}

		const { response } = data;
		const { body } = response;

		return body;
	}
}
