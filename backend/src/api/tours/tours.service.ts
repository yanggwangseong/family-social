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

	async findAll() {
		const config = {
			serviceKey: this.configService.get<string>('TOUR_API_SERVICE_KEY'),
			numOfRows: 10,
			pageNo: 1,
			MobileOS: 'ETC',
			MobileApp: 'FAM',
			_type: 'json',
			listYN: 'Y',
			arrange: 'A',
			contentTypeId: 12,
			areaCode: 1,
			sigunguCode: 1,
		};

		const { data } = await firstValueFrom(
			this.httpService
				.get(
					`${this.endPoint}/KorService1/areaBasedList1?serviceKey=${config.serviceKey}&numOfRows=${config.numOfRows}&pageNo=${config.pageNo}&MobileOS=${config.MobileOS}&MobileApp=${config.MobileApp}&_type=${config._type}&listYN=${config.listYN}&arrange=${config.arrange}&contentTypeId=${config.contentTypeId}&areaCode=${config.areaCode}&sigunguCode=${config.sigunguCode}`,
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
}
