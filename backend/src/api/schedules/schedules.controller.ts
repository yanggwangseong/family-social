import {
	Body,
	Controller,
	Param,
	ParseUUIDPipe,
	Patch,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PatchScheduleTitleSwagger } from '@/common/decorators/swagger/swagger-schedule.decorator';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
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
