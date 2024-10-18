import {
	Controller,
	Get,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IsPagination } from '@/common/decorators/is-pagination.decorator';
import { IsResponseDtoDecorator } from '@/common/decorators/is-response-dto.decorator';
import { PaginationDecorator } from '@/common/decorators/pagination.decorator';
import { GetGroupEventsByBelongToGroupSwagger } from '@/common/decorators/swagger/swagger-group-event.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { ResponseDtoInterceptor } from '@/common/interceptors/reponse-dto.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { Pagination } from '@/common/strategies/context/pagination';
import { PaginationEnum } from '@/constants/pagination.const';
import { GroupEventPaginationReqDto } from '@/models/dto/group-event/req/group-event-pagination-req.dto';
import { GroupEventItemResDto } from '@/models/dto/group-event/res/group-event-item-res.dto';
import {
	ReturnBasicPaginationType,
	withBasicPaginationResponse,
} from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { GroupEventEntity } from '@/models/entities/group-event.entity';

import { GroupEventsService } from './group-events.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('group-events')
@Controller('group-events')
export class GroupEventsController {
	constructor(private readonly groupEventsService: GroupEventsService) {}

	/**
	 * 사용자가 속한 그룹의 이벤트 목록 조회
	 * @param paginationDto 페이지네이션 DTO
	 * @param pagination 페이지네이션 객체
	 * @param sub 사용자 ID
	 * @returns 이벤트 목록 및 페이지네이션 정보
	 */
	@GetGroupEventsByBelongToGroupSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof GroupEventItemResDto>
		>,
		PaginationInterceptor<GroupEventEntity>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(withBasicPaginationResponse(GroupEventItemResDto))
	@Get('/')
	async getGroupEventsByBelongToGroup(
		@Query() paginationDto: GroupEventPaginationReqDto,
		@PaginationDecorator() pagination: Pagination<GroupEventEntity>,
		@CurrentUser('sub') sub: string,
	) {
		return this.groupEventsService.findAllByBelongToGroup(
			pagination,
			paginationDto,
			sub,
		);
	}
}
