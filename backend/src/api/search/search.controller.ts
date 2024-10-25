import {
	Controller,
	Delete,
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
import {
	DeleteSearchHistorySwagger,
	DeleteSearchTermSwagger,
	GetSearchHistorySwagger,
} from '@/common/decorators/swagger/swagger-search.decorator';
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
	SEARCH_TYPE_GROUP,
	SEARCH_TYPE_MEMBER,
	SEARCH_TYPE_TOUR,
} from '@/constants/string-constants';
import {
	ReturnBasicPaginationType,
	withBasicPaginationResponse,
} from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { TourKeywordQueryReqDto } from '@/models/dto/tour/req/tour-keyword-query-req.dto';
import { TourHttpSearchTourismResDto } from '@/models/dto/tour/res/tour-http-search-tourism-res.dto';
import { SearchType, Union } from '@/types';

import { SearchService } from './search.service';
import { GroupsService } from '../groups/groups.service';
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
		private readonly groupsService: GroupsService,
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
		// 검색어가 없으면 저장하지 않음
		if (members.length > 0) {
			await this.searchService.addSearchTerm(sub, username, SEARCH_TYPE_MEMBER);
		}

		return members;
	}

	/**
	 * @summary 그룹 이름에 해당하는 그룹 리스트 검색
	 *
	 * @tag groups
	 * @param groupName 그룹 이름
	 * @param sub 인증된 사용자 아이디
	 * @returns 검색된 그룹 정보 리스트
	 */
	async getGroupsByGroupName(
		@Param('groupName') groupName: string,
		@CurrentUser('sub') sub: string,
	) {
		const groups = await this.groupsService.getGroupsByGroupName(
			groupName,
			sub,
		);

		// 검색어 저장을 위해 호출
		// 검색어가 없으면 저장하지 않음
		if (groups.length > 0) {
			await this.searchService.addSearchTerm(sub, groupName, SEARCH_TYPE_GROUP);
		}

		return groups;
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
		// 검색어가 없으면 저장하지 않음
		if (result.list.length > 0) {
			await this.searchService.addSearchTerm(sub, keyword, SEARCH_TYPE_TOUR);
		}
		return result;
	}

	/**
	 * @summary 검색 기록 가져오기
	 *
	 * @tag search
	 * @param sub 인증된 사용자 아이디
	 * @param searchType 검색 타입
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns {Promise<string[]>}
	 */
	@GetSearchHistorySwagger()
	@Get('/search-histories/:searchType')
	async getSearchHistory(
		@CurrentUser('sub') sub: string,
		@Param('searchType', new ParseSearchTypePipe())
		searchType: Union<typeof SearchType>,
	): Promise<string[]> {
		return await this.searchService.getRecentSearchTerms(sub, searchType);
	}

	/**
	 * @summary 검색 전체 기록 삭제
	 *
	 * @tag search
	 * @param sub 인증된 사용자 아이디
	 * @param searchType 검색 타입
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns {Promise<void>}
	 */
	@DeleteSearchHistorySwagger()
	@Delete('/search-histories/:searchType')
	async deleteSearchHistory(
		@CurrentUser('sub') sub: string,
		@Param('searchType', new ParseSearchTypePipe())
		searchType: Union<typeof SearchType>,
	): Promise<void> {
		return await this.searchService.clearSearchHistory(sub, searchType);
	}

	/**
	 * @summary 특정 검색 기록 삭제
	 *
	 * @tag search
	 * @param sub 인증된 사용자 아이디
	 * @param searchType 검색 타입
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns {Promise<void>}
	 */
	@DeleteSearchTermSwagger()
	@Delete('/search-histories/:searchType/:term')
	async deleteSearchTerm(
		@CurrentUser('sub') sub: string,
		@Param('term') term: string,
		@Param('searchType', new ParseSearchTypePipe())
		searchType: Union<typeof SearchType>,
	): Promise<void> {
		return await this.searchService.deleteSearchTerm(sub, searchType, term);
	}
}
