import { ScheduleRepository } from '@/models/repositories/schedule.repository';
import { TourismPeriodRepository } from '@/models/repositories/tourism-period.repository';
import { TourismRepository } from '@/models/repositories/tourism.repository';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ToursService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly scheduleRepository: ScheduleRepository,
		private readonly tourismPeriodRepository: TourismPeriodRepository,
		private readonly tourismRepository: TourismRepository,
	) {}

	private readonly serviceKey: string =
		this.configService.get<string>('TOUR_API_SERVICE_KEY') ?? '';
	private readonly MobileApp: string = 'FAM';
	private endPoint = this.configService.get<string>('TOUR_API_END_POINT');
	private listYN: string = 'Y'; // 목록구분(Y=목록, N=개수) N은 총 갯수
	private MobileOS: string = 'ETC';
	private _type: string = 'json';

	// private readonly config: {
	// 	serviceKey?: string;
	// 	MobileOS: string;
	// 	MobileApp: string;
	// 	_type: string;
	// } = {
	// 	serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
	// 	MobileOS: 'ETC',
	// 	MobileApp: 'FAM',
	// 	_type: 'json',
	// };

	async findAll({
		arrange,
		contentTypeId,
		areaCode,
		sigunguCode,
		numOfRows,
		pageNo,
		cat1,
		cat2,
		cat3,
	}: {
		arrange: string;
		contentTypeId: string;
		areaCode: number;
		sigunguCode: number;
		numOfRows: number;
		pageNo: number;
		cat1: string;
		cat2: string;
		cat3: string;
	}) {
		let httpServiceUrl = `${this.endPoint}/KorService1/areaBasedList1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}
		&MobileApp=${this.MobileApp}&_type=${this._type}&listYN=${this.listYN}
		&arrange=${arrange}&contentTypeId=${contentTypeId}
		&areaCode=${areaCode}&sigunguCode=${sigunguCode}`;

		if (cat1) httpServiceUrl += `&cat1=${cat1}`;
		if (cat2) httpServiceUrl += `&cat2=${cat2}`;
		if (cat3) httpServiceUrl += `&cat3=${cat3}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	async getHttpTourApiAreaCodes({
		numOfRows,
		pageNo,
		areaCode,
	}: {
		numOfRows: number;
		pageNo: number;
		areaCode: number;
	}) {
		let httpServiceUrl = `${this.endPoint}/KorService1/areaCode1?serviceKey=${this.serviceKey}&numOfRows=${numOfRows}
		&pageNo=${pageNo}&MobileOS=${this.MobileOS}&MobileApp=${this.MobileApp}&_type=${this._type}`;

		if (areaCode) httpServiceUrl += `&areaCode=${areaCode}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	async getHttpTourApiServiceCategories({
		numOfRows,
		pageNo,
		contentTypeId,
		cat1,
		cat2,
		cat3,
	}: {
		numOfRows: number;
		pageNo: number;
		contentTypeId: string;
		cat1: string;
		cat2: string;
		cat3: string;
	}) {
		let httpServiceUrl = `${this.endPoint}/KorService1/categoryCode1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}
		&contentTypeId=${contentTypeId}&MobileApp=${this.MobileApp}&_type=${this._type}`;

		if (cat1) httpServiceUrl += `&cat1=${cat1}`;
		if (cat2) httpServiceUrl += `&cat2=${cat2}`;
		if (cat3) httpServiceUrl += `&cat3=${cat3}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	async getHttpTourApiIntroduction({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: number;
		pageNo: number;
		contentTypeId: string;
	}) {
		let httpServiceUrl = `${this.endPoint}/KorService1/detailIntro1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}
		&contentTypeId=${contentTypeId}&MobileApp=${this.MobileApp}&_type=${this._type}&contentId=${contentId}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	async getHttpTourApiAdditionalExplanation({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: number;
		pageNo: number;
		contentTypeId: string;
	}) {
		let httpServiceUrl = `${this.endPoint}/KorService1/detailInfo1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}
		&contentTypeId=${contentTypeId}&MobileApp=${this.MobileApp}&_type=${this._type}&contentId=${contentId}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	async getHttpTourApiCommonInformation({
		contentId,
		numOfRows,
		pageNo,
		contentTypeId,
	}: {
		contentId: string;
		numOfRows: number;
		pageNo: number;
		contentTypeId: string;
	}) {
		const config = {
			defaultYN: 'Y', // 기본정보조회여부( Y,N )
			firstImageYN: 'Y', // 원본, 썸네일대표 이미지, 이미지 공공누리유형정보 조회여부( Y,N )
			areacodeYN: 'Y', // 지역코드, 시군구코드조회여부( Y,N )
			catcodeYN: 'Y', // 대,중,소분류코드조회여부( Y,N )
			addrinfoYN: 'Y', // 주소, 상세주소조회여부( Y,N )
			mapinfoYN: 'Y', // 좌표X, Y 조회여부( Y,N )
			overviewYN: 'Y', // 콘텐츠개요조회여부( Y,N )
		};

		let httpServiceUrl = `${this.endPoint}/KorService1/detailCommon1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}
		&contentTypeId=${contentTypeId}&MobileApp=${this.MobileApp}&_type=${this._type}&contentId=${contentId}
		&defaultYN=${config.defaultYN}&firstImageYN=${config.firstImageYN}&areacodeYN=${config.areacodeYN}
		&catcodeYN=${config.catcodeYN}&addrinfoYN=${config.addrinfoYN}&mapinfoYN=${config.mapinfoYN}&overviewYN=${config.overviewYN}
		`;

		const [introduction, common, additional, images] = [
			await this.getHttpTourApiIntroduction({
				contentId,
				numOfRows,
				pageNo,
				contentTypeId,
			}),
			await this.HttpServiceResponse(httpServiceUrl),
			await this.getHttpTourApiAdditionalExplanation({
				contentId,
				numOfRows,
				pageNo,
				contentTypeId,
			}),
			await this.getHttpTourApiImagesByCotentId({
				contentId,
				numOfRows,
				pageNo,
			}),
		];

		const commonInfromation = {
			items: common.response.body.items,
		};

		commonInfromation.items.introduction = introduction.response.body.items;
		commonInfromation.items.additional = additional.response.body.items;
		commonInfromation.items.image = images.response.body.items;

		return commonInfromation;
	}

	async getHttpTourApiImagesByCotentId({
		contentId,
		numOfRows,
		pageNo,
	}: {
		contentId: string;
		numOfRows: number;
		pageNo: number;
	}) {
		const imageYN: string = 'Y'; // 이미지조회1 : Y=콘텐츠이미지조회 N=”음식점”타입의음식메뉴이미지
		const subImageYN: string = 'Y'; // 이미지조회2 : Y=원본,썸네일이미지조회,공공누리 저작권유형정보조회 N=Null

		let httpServiceUrl = `${this.endPoint}/KorService1/detailImage1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}&MobileApp=${this.MobileApp}&_type=${this._type}
		&contentId=${contentId}&imageYN=${imageYN}&subImageYN=${subImageYN}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	async getHttpTourApiFestivalSchedule({
		numOfRows,
		pageNo,
		eventStartDate,
	}: {
		numOfRows: number;
		pageNo: number;
		eventStartDate: string;
	}) {
		const arrange = 'A';
		let httpServiceUrl = `${this.endPoint}/KorService1/searchFestival1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}&MobileApp=${this.MobileApp}&_type=${this._type}
		&listYN=${this.listYN}&arrange=${arrange}&eventStartDate=${eventStartDate}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	async getHttpTourApiSearch({
		numOfRows,
		pageNo,
		keyword,
	}: {
		numOfRows: number;
		pageNo: number;
		keyword: string;
	}) {
		const arrange = 'A';
		const contentTypeId = 12;

		let httpServiceUrl = `${this.endPoint}/KorService1/searchKeyword1?serviceKey=${this.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${this.MobileOS}&MobileApp=${this.MobileApp}&_type=${this._type}
		&listYN=${this.listYN}&arrange=${arrange}&contentTypeId=${contentTypeId}&keyword=${keyword}`;

		return this.HttpServiceResponse(httpServiceUrl);
	}

	private async HttpServiceResponse(url: string) {
		const { data } = await firstValueFrom(
			this.httpService.get(url).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw 'An error happened!';
				}),
			),
		);

		return data.response.body;
	}
}
