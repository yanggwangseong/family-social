import {
	Controller,
	Delete,
	Get,
	Param,
	Query,
	Body,
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
import { ParseSearchTypePipe } from '@/common/pipes/parse-search-type.pipe';
import { PaginationEnum } from '@/constants/pagination.const';
import {
	ReturnBasicPaginationType,
	withBasicPaginationResponse,
} from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { TourKeywordQueryReqDto } from '@/models/dto/tour/req/tour-keyword-query-req.dto';
import { TourHttpSearchTourismResDto } from '@/models/dto/tour/res/tour-http-search-tourism-res.dto';
import { SearchType, Union } from '@/types';

import { SearchService } from './search.service';
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
		private readonly searchService: SearchService,
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

		const members = await this.membersService.findMembersByUserName(
			username,
			sub,
			groupIds,
		);

		// 검색어 저장을 위해 호출
		await this.searchService.addSearchTerm(sub, username, SearchType[1]);

		return members;
	}

	/**
	 * @summary 관광 아이템 키워드 검색
	 *
	 * @tag search
	 * @param keyword 검색 키워드
	 * @param queryDto query 옵션
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns {TourHttpSearchTourismResDto}
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
		@CurrentUser('sub') sub: string,
	) {
		const result = await this.toursService.getHttpTourApiSearch({
			keyword,
			...queryDto,
		});

		// 검색어 저장을 위해 호출
		await this.searchService.addSearchTerm(sub, keyword, SearchType[0]);
		return result;
	}

	@Get('/search-history')
	async getSearchHistory(
		@CurrentUser('sub') sub: string,
		@Query('searchType', new ParseSearchTypePipe())
		searchType: Union<typeof SearchType>,
	) {
		return await this.searchService.getRecentSearchTerms(sub, searchType);
	}

	@Delete('/search-history')
	async deleteSearchHistory(
		@CurrentUser('sub') sub: string,
		@Body('searchType', new ParseSearchTypePipe())
		searchType: Union<typeof SearchType>,
	) {
		return await this.searchService.clearSearchHistory(sub, searchType);
	}
}
