import {
	Controller,
	Get,
	Param,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';

import { IsPagination } from '@/common/decorators/is-pagination.decorator';
import { IsResponseDtoDecorator } from '@/common/decorators/is-response-dto.decorator';
import { IsTourInformationType } from '@/common/decorators/is-tour-information-type.decorator';
import {
	GetHttpTourApiAdditionalExplanationSwagger,
	GetHttpTourApiCommonInformationSwagger,
	GetHttpTourApiFestivalSwagger,
	GetHttpTourApiImagesByCotentIdSwagger,
	GetHttpTourApiIntroductionSwagger,
} from '@/common/decorators/swagger/swagger-tour.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { InformationTypeResponseDtoInterceptor } from '@/common/interceptors/information-type-response-dto.interceptor';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { ResponseDtoInterceptor } from '@/common/interceptors/reponse-dto.interceptor';
import { PaginationEnum } from '@/constants/pagination.const';
import { TourInformationEnum } from '@/constants/tour-information-type.const';
import {
	ReturnBasicPaginationType,
	withBasicPaginationResponse,
} from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { TourBasicQueryReqDto } from '@/models/dto/tour/req/tour-basic-query-req.dto';
import { TourFestivalQueryReqDto } from '@/models/dto/tour/req/tour-festival-query-req.dto';
import { TourPaginationQueryReqDto } from '@/models/dto/tour/req/tour-pagination-query-req.dto';
import { TourHttpAreaCodeResDto } from '@/models/dto/tour/res/tour-http-area-code-res.dto';
import { TourHttpCommonResDto } from '@/models/dto/tour/res/tour-http-common-res.dto';
import { TourHttpFestivalScheduleResDto } from '@/models/dto/tour/res/tour-http-festival-schedule-res.dto';
import { TourHttpImagesResDto } from '@/models/dto/tour/res/tour-http-images-res.dto';
import { TourHttpServiceCategoryResDto } from '@/models/dto/tour/res/tour-http-service-category-res.dto';
import { TourHttpTourismListResDto } from '@/models/dto/tour/res/tour-http-tourism-list-res.dto';

import { ToursService } from './tours.service';

@UseInterceptors(LoggingInterceptor)
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
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpTourismListResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(
		withBasicPaginationResponse(TourHttpTourismListResDto),
	)
	@Get()
	async findAll(
		@Query('arrange') arrange: string,
		@Query('contentTypeId') contentTypeId: string,
		@Query('areaCode') areaCode: string,
		@Query('sigunguCode') sigunguCode: string,
		@Query('numOfRows') numOfRows: string,
		@Query('pageNo') pageNo: string,
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

	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpAreaCodeResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(withBasicPaginationResponse(TourHttpAreaCodeResDto))
	@Get('/area')
	async getHttpTourApiAreaCodes(
		@Query('numOfRows') numOfRows: string,
		@Query('pageNo') pageNo: string,
		@Query('areaCode') areaCode: string,
	) {
		return await this.toursService.getHttpTourApiAreaCodes({
			numOfRows,
			pageNo,
			areaCode,
		});
	}

	// 서비스 분류 코드조회
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpServiceCategoryResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(
		withBasicPaginationResponse(TourHttpServiceCategoryResDto),
	)
	@Get('/service-categories')
	async getHttpTourApiServiceCategories(
		@Query('numOfRows') numOfRows: string,
		@Query('pageNo') pageNo: string,
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

	/**
	 * @summary 공통정보 조회
	 *
	 * @tag tours
	 * @param contentId 컨텐츠 아이디
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 소개 정보
	 */
	@GetHttpTourApiCommonInformationSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpCommonResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(withBasicPaginationResponse(TourHttpCommonResDto))
	@Get('/:contentId/common-information')
	async getHttpTourApiCommonInformation(
		@Param('contentId') contentId: string,
		@Query() queryDto: TourBasicQueryReqDto,
	) {
		return await this.toursService.getHttpTourApiCommonInformation({
			contentId,
			...queryDto,
		});
	}

	/**
	 * @summary 소개 정보 조회
	 *
	 * @tag tours
	 * @param contentId 컨텐츠 아이디
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 소개 정보
	 */
	@GetHttpTourApiIntroductionSwagger()
	@UseInterceptors(
		InformationTypeResponseDtoInterceptor,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsTourInformationType(TourInformationEnum.INTRO)
	@IsPagination(PaginationEnum.BASIC)
	@Get('/:contentId/introduction')
	async getHttpTourApiIntroduction(
		@Param('contentId') contentId: string,
		@Query() queryDto: TourBasicQueryReqDto,
	) {
		return await this.toursService.getHttpTourApiIntroduction({
			contentId,
			...queryDto,
		});
	}

	/**
	 * @summary 반복 추가 정보 조회
	 *
	 * @tag tours
	 * @param contentId 컨텐츠 아이디
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 반복 정보
	 */
	@GetHttpTourApiAdditionalExplanationSwagger()
	@UseInterceptors(
		InformationTypeResponseDtoInterceptor,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsTourInformationType(TourInformationEnum.ADDITIONAL)
	@IsPagination(PaginationEnum.BASIC)
	@Get('/:contentId/additional-explanation')
	async getHttpTourApiAdditionalExplanation(
		@Param('contentId') contentId: string,
		@Query() queryDto: TourBasicQueryReqDto,
	) {
		return await this.toursService.getHttpTourApiAdditionalExplanation({
			contentId,
			...queryDto,
		});
	}

	/**
	 * @summary contentId에 해당하는 관광정보에 매핑되는 이미지 정보 조회
	 *
	 * @tag tours
	 * @param contentId 컨텐츠 아이디
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns {TourHttpImagesResDto}
	 */
	@GetHttpTourApiImagesByCotentIdSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpImagesResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(withBasicPaginationResponse(TourHttpImagesResDto))
	@Get('/:contentId/Images')
	async getHttpTourApiImagesByCotentId(
		@Param('contentId') contentId: string,
		@Query() queryDto: TourPaginationQueryReqDto,
	) {
		return await this.toursService.getHttpTourApiImagesByCotentId({
			contentId,
			...queryDto,
		});
	}

	/**
	 * @summary 행사정보조회 행사 시작일에 따른 행사 정보 조회
	 *
	 * @tag tours
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns {TourHttpFestivalScheduleResDto}
	 */
	@GetHttpTourApiFestivalSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpFestivalScheduleResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(
		withBasicPaginationResponse(TourHttpFestivalScheduleResDto),
	)
	@Get('/festival')
	async getHttpTourApiFestivalSchedule(
		@Query() queryDto: TourFestivalQueryReqDto,
	) {
		return await this.toursService.getHttpTourApiFestivalSchedule(queryDto);
	}
}
