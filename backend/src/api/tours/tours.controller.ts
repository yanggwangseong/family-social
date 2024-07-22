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
	GetHttpTourApiAreaCodesSwagger,
	GetHttpTourApiCommonInformationSwagger,
	GetHttpTourApiFestivalSwagger,
	GetHttpTourApiImagesByCotentIdSwagger,
	GetHttpTourApiIntroductionSwagger,
	GetHttpTourApiListSwagger,
	GetHttpTourApiServiceCategoriesSwagger,
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
import { TourAreaCodeQueryReqDto } from '@/models/dto/tour/req/tour-area-code-query-req.dto';
import { TourBasicQueryReqDto } from '@/models/dto/tour/req/tour-basic-query-req.dto';
import { TourCategoryQueryReqDto } from '@/models/dto/tour/req/tour-category-query-req.dto';
import { TourFestivalQueryReqDto } from '@/models/dto/tour/req/tour-festival-query-req.dto';
import { TourListQueryReqDto } from '@/models/dto/tour/req/tour-list-query-req.dto';
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

	/**
	 * @summary 지역기반 관광정보 조회
	 *
	 * @tag tours
	 * @param contentId 컨텐츠 아이디
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 소개 정보
	 */
	@GetHttpTourApiListSwagger()
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
	async findAll(@Query() queryDto: TourListQueryReqDto) {
		return await this.toursService.findAll(queryDto);
	}

	/**
	 * @summary 지역 코드 조회
	 *
	 * @tag tours
	 * @param contentId 컨텐츠 아이디
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 소개 정보
	 */
	@GetHttpTourApiAreaCodesSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpAreaCodeResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(withBasicPaginationResponse(TourHttpAreaCodeResDto))
	@Get('/area')
	async getHttpTourApiAreaCodes(@Query() queryDto: TourAreaCodeQueryReqDto) {
		return await this.toursService.getHttpTourApiAreaCodes(queryDto);
	}

	/**
	 * @summary 서비스 분류 코드조회
	 *
	 * @tag tours
	 * @param contentId 컨텐츠 아이디
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 소개 정보
	 */
	@GetHttpTourApiServiceCategoriesSwagger()
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
		@Query() queryDto: TourCategoryQueryReqDto,
	) {
		return await this.toursService.getHttpTourApiServiceCategories(queryDto);
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
	@Get('/:contentId/images')
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
