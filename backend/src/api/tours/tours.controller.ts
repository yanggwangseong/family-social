import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { HttpService } from '@nestjs/axios';
import {
	Controller,
	Get,
	Param,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ToursService } from './tours.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('tours')
@Controller('tours')
export class ToursController {
	constructor(private readonly toursService: ToursService) {}

	// [프론트에서 위에 검색 옵션들로 인해 검색을 눌렸을때 아래에 생성되는 관광 리스트들]
	// @param arrange 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
	// @param contentTypeId 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
	// @param areaCode - 지역코드(지역코드조회 참고)
	// @param sigunguCode - 시군구코드(지역코드조회 참고)
	// @param numOfRows - 한페이지 결과수
	// @param pageNo - 페이지 번호
	// @param cat1 - 대분류 (getHttpTourApiServiceCategories 여기서 가져온 코드)
	// @param cat2 - 중분류 (getHttpTourApiServiceCategories 여기서 가져온 코드)
	// @param cat3 - 소분류 (getHttpTourApiServiceCategories 여기서 가져온 코드)
	@Get()
	async findAll(
		@Query('arrange') arrange: string,
		@Query('contentTypeId') contentTypeId: string,
		@Query('areaCode') areaCode: number,
		@Query('sigunguCode') sigunguCode: number,
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
		@Query('cat1') cat1: string,
		@Query('cat2') cat2: string,
		@Query('cat3') cat3: string,
	) {
		return await this.toursService.findAll({
			arrange,
			contentTypeId,
			areaCode,
			sigunguCode,
			numOfRows,
			pageNo,
			cat1,
			cat2,
			cat3,
		});
	}

	@Get('/area')
	async getHttpTourApiAreaCodes(
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
		@Query('areaCode') areaCode: number,
	) {
		return await this.toursService.getHttpTourApiAreaCodes({
			numOfRows,
			pageNo,
			areaCode,
		});
	}

	@Get('/service-categories')
	async getHttpTourApiServiceCategories(
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
		@Query('contentTypeId') contentTypeId: string,
		@Query('cat1') cat1: string,
		@Query('cat2') cat2: string,
		@Query('cat3') cat3: string,
	) {
		return await this.toursService.getHttpTourApiServiceCategories({
			numOfRows,
			pageNo,
			contentTypeId,
			cat1,
			cat2,
			cat3,
		});
	}

	// 타입별 공통 기본정보
	@Get('/:contentId/common-information')
	async getHttpTourApiCommonInformation(
		@Param('contentId') contentId: string,
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
		@Query('contentTypeId') contentTypeId: string,
	) {
		return await this.toursService.getHttpTourApiCommonInformation({
			contentId,
			numOfRows,
			pageNo,
			contentTypeId,
		});
	}

	// 간단한 소개정보 쉬는날, 개장기간 등 내역
	// @Get('/:contentId/introduction')
	// async getHttpTourApiIntroduction(
	// 	@Param('contentId') contentId: string,
	// 	@Query('numOfRows') numOfRows: number,
	// 	@Query('pageNo') pageNo: number,
	// 	@Query('contentTypeId') contentTypeId: string,
	// ) {
	// 	return await this.toursService.getHttpTourApiIntroduction({
	// 		contentId,
	// 		numOfRows,
	// 		pageNo,
	// 		contentTypeId,
	// 	});
	// }

	//위의 정보 말고도 부가설명이라고,해서 추가 정보를 제공해주는것
	// @Get('/:contentId/additional-explanation')
	// async getHttpTourApiAdditionalExplanation(
	// 	@Param('contentId') contentId: string,
	// 	@Query('numOfRows') numOfRows: number,
	// 	@Query('pageNo') pageNo: number,
	// 	@Query('contentTypeId') contentTypeId: string,
	// ) {
	// 	return await this.toursService.getHttpTourApiAdditionalExplanation({
	// 		contentId,
	// 		numOfRows,
	// 		pageNo,
	// 		contentTypeId,
	// 	});
	// }

	//contentId에 해당하는 관광정보에 매핑되는 이미지 정보 조회 (없을 수 도 있다.)
	// @Get('/:contentId/Images')
	// async getHttpTourApiImagesByCotentId(
	// 	@Param('contentId') contentId: string,
	// 	@Query('numOfRows') numOfRows: number,
	// 	@Query('pageNo') pageNo: number,
	// ) {
	// 	return await this.toursService.getHttpTourApiImagesByCotentId({
	// 		contentId,
	// 		numOfRows,
	// 		pageNo,
	// 	});
	// }

	//행사정보조회 행사 시작일에 따른 행사 정보 조회
	@Get('/festival')
	async getHttpTourApiFestivalSchedule(
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
		@Query('eventStartDate') eventStartDate: string,
	) {
		return await this.toursService.getHttpTourApiFestivalSchedule({
			numOfRows,
			pageNo,
			eventStartDate,
		});
	}

	//키워드 검색
	@Get('/search/:keyword')
	async getHttpTourApiSearch(
		@Param('keyword') keyword: string,
		@Query('arrange') arrange: string,
		@Query('contentTypeId') contentTypeId: string,
		@Query('numOfRows') numOfRows: number,
		@Query('pageNo') pageNo: number,
	) {
		return await this.toursService.getHttpTourApiSearch({
			keyword,
			numOfRows,
			pageNo,
			arrange,
			contentTypeId,
		});
	}
}
