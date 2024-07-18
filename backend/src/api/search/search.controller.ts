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
import { GetMembersByUserNameSwagger } from '@/common/decorators/swagger/swagger-member.decorator';
import { GetHttpTourApiSearchSwagger } from '@/common/decorators/swagger/swagger-tour.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { ResponseDtoInterceptor } from '@/common/interceptors/reponse-dto.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { PaginationEnum } from '@/constants/pagination.const';
import {
	ReturnBasicPaginationType,
	withBasicPaginationResponse,
} from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { TourKeywordQueryReqDto } from '@/models/dto/tour/req/tour-keyword-query-req.dto';
import { TourHttpSearchTourismResDto } from '@/models/dto/tour/res/tour-http-search-tourism-res.dto';

import { MembersService } from '../members/members.service';
import { ToursService } from '../tours/tours.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('search')
@Controller('search')
export class SearchController {
	constructor(
		private readonly membersService: MembersService,
		private readonly toursService: ToursService,
	) {}

	/**
	 * @summary 유저이름에 해당하는 유저 리스트 검색
	 *
	 * @tag members
	 * @param {string} username   		- 수정 할 memberId
	 * @param {string} sub   			- 인가된 유저 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 검색된 유저정보 리스트
	 */
	@GetMembersByUserNameSwagger()
	@Get('/members/username/:username')
	async getMembersByUserName(
		@Param('username') username: string,
		@CurrentUser('sub') sub: string,
	) {
		const { groupIds } = await this.membersService.findGroupIdsBelongToMyGroup(
			sub,
		);

		return await this.membersService.findMembersByUserName(
			username,
			sub,
			groupIds,
		);
	}

	/**
	 * @summary 관광 아이템 키워드 검색
	 *
	 * @tag members
	 * @param keyword 검색어
	 * @param arrange 범위
	 * @param contentTypeId 컨텐츠 아이디
	 * @param numOfRows 페이징 가져올 로우 갯수
	 * @param pageNo 페이징 페이지 번호
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 검색된 유저정보 리스트
	 */
	@GetHttpTourApiSearchSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof TourHttpSearchTourismResDto>
		>,
		PaginationInterceptor<ObjectLiteral>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(
		withBasicPaginationResponse(TourHttpSearchTourismResDto),
	)
	@Get('/tours/keyword/:keyword')
	async getHttpTourApiSearch(
		@Param('keyword') keyword: string,
		@Query() queryDto: TourKeywordQueryReqDto,
	) {
		return await this.toursService.getHttpTourApiSearch({
			keyword,
			...queryDto,
		});
	}
}
