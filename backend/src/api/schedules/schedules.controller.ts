import {
	Body,
	Controller,
	Param,
	ParseUUIDPipe,
	Patch,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import {
	PatchScheduleTitleSwagger,
	PatchScheduleUploadThumbnailImageSwagger,
} from '@/common/decorators/swagger/swagger-schedule.decorator';
import { BadRequestServiceException } from '@/common/exception/service.exception';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { ScheduleUpdateTitleDto } from '@/models/dto/schedule/req/schedule-update-title.dto';
import { createScheduleThumbnailImageMulterOptions } from '@/utils/upload-media';

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
		@Param('scheduleId', ParseUUIDPipe) scheduleId: string,
		@Body() dto: ScheduleUpdateTitleDto,
	) {
		return await this.schedulesService.updateScheduleTitleById(
			scheduleId,
			dto.scheduleName,
		);
	}

	/**
	 * @summary 특정 스케줄 여행스케줄 썸네일 변경
	 *
	 * @tag schedules
	 * @param {string} scheduleId - 스케줄 아이디
	 * @param {Express.MulterS3.File} files - 업로드 파일
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns string[]
	 */
	@PatchScheduleUploadThumbnailImageSwagger()
	@Patch(':scheduleId/uploads/thumbnail-image')
	@UseInterceptors(
		FilesInterceptor('files', 1, createScheduleThumbnailImageMulterOptions()),
	)
	async PatchScheduleUploadThumbnailImage(
		@UploadedFiles() files: Express.MulterS3.File[],
		@Param('scheduleId', ParseUUIDPipe) scheduleId: string,
	) {
		if (!files?.length) {
			throw BadRequestServiceException(`파일이 없습니다.`);
		}
		const locations = files.map(({ location }) => location);

		await this.schedulesService.updateScheduleThumbnail(
			scheduleId,
			locations[0],
		);

		return locations;
	}
}
