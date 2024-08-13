import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IsPagination } from '@/common/decorators/is-pagination.decorator';
import { IsResponseDtoDecorator } from '@/common/decorators/is-response-dto.decorator';
import { PaginationDecorator } from '@/common/decorators/pagination.decorator';
import {
	GetSchedulesSwagger,
	PatchScheduleTitleSwagger,
} from '@/common/decorators/swagger/swagger-schedule.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { ResponseDtoInterceptor } from '@/common/interceptors/reponse-dto.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { parseUUIDPipeMessage } from '@/common/pipe-message/parse-uuid-pipe-message';
import { Pagination } from '@/common/strategies/context/pagination';
import { PaginationEnum } from '@/constants/pagination.const';
import {
	ReturnBasicPaginationType,
	withBasicPaginationResponse,
} from '@/models/dto/pagination/res/basic-pagination-res.dto';
import { SchedulePaginationReqDto } from '@/models/dto/schedule/req/schedule-pagination-req.dto';
import { ScheduleUpdateTitleDto } from '@/models/dto/schedule/req/schedule-update-title.dto';
import { ScheduleGetListResDto } from '@/models/dto/schedule/res/schedule-get-list-res.dto';
import { ScheduleEntity } from '@/models/entities/schedule.entity';

import { SchedulesService } from './schedules.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('schedules')
@Controller('schedules')
export class SchedulesController {
	constructor(private readonly schedulesService: SchedulesService) {}

	/**
	 * @summary 여행일정 리스트 전체 가져오기
	 *
	 * @tag schedules
	 * @param {number} page 							- 페이지 번호
	 * @param {number} limit 							- 가져 올 갯수
	 * @param {string} sub  							- 인증된 사용자 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 여행 일정 리스트
	 */
	@GetSchedulesSwagger()
	@UseInterceptors(
		ResponseDtoInterceptor<
			ReturnBasicPaginationType<typeof ScheduleGetListResDto>
		>,
		PaginationInterceptor<ScheduleEntity>,
	)
	@IsPagination(PaginationEnum.BASIC)
	@IsResponseDtoDecorator(withBasicPaginationResponse(ScheduleGetListResDto))
	@Get()
	async getSchedules(
		@Query() paginationDto: SchedulePaginationReqDto,
		@CurrentUser('sub') sub: string,
		@PaginationDecorator() pagination: Pagination<ScheduleEntity>,
	) {
		return await this.schedulesService.getScheduleListOwnMemberId(
			sub,
			paginationDto,
			pagination,
		);
	}

	/**
	 * @summary 특정 스케줄 여행제목 수정
	 *
	 * @tag schedules
	 * @param {string} scheduleId - 스케줄 아이디
	 * @param {string} dto.scheduleName - 스케줄 여행 제목
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@PatchScheduleTitleSwagger()
	@Patch(':scheduleId/title')
	async patchScheduleTitle(
		@Param(
			'scheduleId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		scheduleId: string,
		@Body() dto: ScheduleUpdateTitleDto,
	) {
		return await this.schedulesService.updateScheduleTitleById(
			scheduleId,
			dto.scheduleName,
		);
	}
}
