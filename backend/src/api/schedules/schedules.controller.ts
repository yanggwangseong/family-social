import {
	Body,
	Controller,
	DefaultValuePipe,
	Get,
	Param,
	ParseIntPipe,
	ParseUUIDPipe,
	Patch,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	GetSchedulesSwagger,
	PatchScheduleTitleSwagger,
} from '@/common/decorators/swagger/swagger-schedule.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { parseIntPipeMessage } from '@/common/pipe-message/parse-int-pipe-message';
import { parseUUIDPipeMessage } from '@/common/pipe-message/parse-uuid-pipe-message';
import { ScheduleUpdateTitleDto } from '@/models/dto/schedule/req/schedule-update-title.dto';

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
	@Get()
	async getSchedules(
		@Query(
			'page',
			new DefaultValuePipe(1),
			new ParseIntPipe({ exceptionFactory: () => parseIntPipeMessage('page') }),
		)
		page: number,
		@Query(
			'limit',
			new DefaultValuePipe(3),
			new ParseIntPipe({
				exceptionFactory: () => parseIntPipeMessage('limit'),
			}),
		)
		limit: number,
		@CurrentUser('sub') sub: string,
	) {
		return await this.schedulesService.getScheduleListOwnMemberId({
			memberId: sub,
			page,
			limit,
		});
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
