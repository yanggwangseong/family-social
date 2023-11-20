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
	) {}

	private readonly endPoint =
		this.configService.get<string>('TOUR_API_END_POINT');

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
		const config = {
			serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
			//numOfRows: 10,
			//pageNo: 1,
			MobileOS: 'ETC',
			MobileApp: 'FAM',
			_type: 'json',
			listYN: 'Y',
			//arrange: 'A',
			//contentTypeId: 12,
			//areaCode: 1,
			//sigunguCode: 1,
		};

		let httpServiceUrl = `${this.endPoint}/KorService1/areaBasedList1?serviceKey=${config.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${config.MobileOS}
		&MobileApp=${config.MobileApp}&_type=${config._type}&listYN=${config.listYN}
		&arrange=${arrange}&contentTypeId=${contentTypeId}
		&areaCode=${areaCode}&sigunguCode=${sigunguCode}`;

		if (cat1) httpServiceUrl += `&cat1=${cat1}`;
		if (cat2) httpServiceUrl += `&cat2=${cat2}`;
		if (cat3) httpServiceUrl += `&cat3=${cat3}`;

		const { data } = await firstValueFrom(
			this.httpService.get(httpServiceUrl).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw 'An error happened!';
				}),
			),
		);

		return data;
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
		//@param numOfRows number
		//@param pageNo number
		//@param areaCode number

		const config = {
			serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
			MobileOS: 'ETC',
			MobileApp: 'FAM',
			_type: 'json',
			listYN: 'Y',
			arrange: 'A',
			contentTypeId: 12,
		};

		const { data } = await firstValueFrom(
			this.httpService
				.get(
					`${this.endPoint}/KorService1/areaCode1?serviceKey=${config.serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${config.MobileOS}&MobileApp=${config.MobileApp}&areaCode=${areaCode}&_type=${config._type}`,
				)
				.pipe(
					catchError((error: AxiosError) => {
						console.log(error);
						throw 'An error happened!';
					}),
				),
		);

		return data;
	}

	async getHttpTourApiServiceCategories({
		numOfRows,
		pageNo,
	}: {
		numOfRows: number;
		pageNo: number;
	}) {
		const config = {
			serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
			MobileOS: 'ETC',
			MobileApp: 'FAM',
			_type: 'json',
			contentTypeId: 12,
		};
		// cat1 대분류코드
		// cat2 중분류코드
		// cat3 소분류코드

		let httpServiceUrl = `${this.endPoint}/KorService1/categoryCode1?serviceKey=${config.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${config.MobileOS}
		&contentTypeId=${config.contentTypeId}&MobileApp=${config.MobileApp}&_type=${config._type}`;

		const { data } = await firstValueFrom(
			this.httpService.get(httpServiceUrl).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw 'An error happened!';
				}),
			),
		);

		return data;
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
		const config = {
			serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
			MobileOS: 'ETC',
			MobileApp: 'FAM',
			_type: 'json',
			//contentTypeId: 12,
		};

		let httpServiceUrl = `${this.endPoint}/KorService1/detailIntro1?serviceKey=${config.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${config.MobileOS}
		&contentTypeId=${contentTypeId}&MobileApp=${config.MobileApp}&_type=${config._type}&contentId=${contentId}`;

		const { data } = await firstValueFrom(
			this.httpService.get(httpServiceUrl).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw 'An error happened!';
				}),
			),
		);

		return data;
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
		const config = {
			serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
			MobileOS: 'ETC',
			MobileApp: 'FAM',
			_type: 'json',
			//contentTypeId: 12,
		};

		let httpServiceUrl = `${this.endPoint}/KorService1/detailInfo1?serviceKey=${config.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${config.MobileOS}
		&contentTypeId=${contentTypeId}&MobileApp=${config.MobileApp}&_type=${config._type}&contentId=${contentId}`;

		const { data } = await firstValueFrom(
			this.httpService.get(httpServiceUrl).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw 'An error happened!';
				}),
			),
		);

		return data;
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
			serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
			MobileOS: 'ETC',
			MobileApp: 'FAM',
			_type: 'json',
			defaultYN: 'Y', // 기본정보조회여부( Y,N )
			firstImageYN: 'Y', // 원본, 썸네일대표 이미지, 이미지 공공누리유형정보 조회여부( Y,N )
			areacodeYN: 'Y', // 지역코드, 시군구코드조회여부( Y,N )
			catcodeYN: 'Y', // 대,중,소분류코드조회여부( Y,N )
			addrinfoYN: 'Y', // 주소, 상세주소조회여부( Y,N )
			mapinfoYN: 'Y', // 좌표X, Y 조회여부( Y,N )
			overviewYN: 'Y', // 콘텐츠개요조회여부( Y,N )
		};

		let httpServiceUrl = `${this.endPoint}/KorService1/detailCommon1?serviceKey=${config.serviceKey}
		&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${config.MobileOS}
		&contentTypeId=${contentTypeId}&MobileApp=${config.MobileApp}&_type=${config._type}&contentId=${contentId}
		&defaultYN=${config.defaultYN}&firstImageYN=${config.firstImageYN}&areacodeYN=${config.areacodeYN}
		&catcodeYN=${config.catcodeYN}&addrinfoYN=${config.addrinfoYN}&mapinfoYN=${config.mapinfoYN}&overviewYN=${config.overviewYN}
		`;

		const { data } = await firstValueFrom(
			this.httpService.get(httpServiceUrl).pipe(
				catchError((error: AxiosError) => {
					console.log(error);
					throw 'An error happened!';
				}),
			),
		);

		return data;
	}
}
