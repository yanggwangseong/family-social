import {
	Controller,
	Post,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { BadRequestServiceException } from '@/common/exception/service.exception';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { ERROR_FILE_NOT_FOUND } from '@/constants/business-error';
import { CreateMemberProfileImageMulterOptions } from '@/utils/upload-media';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('medias')
@Controller('medias')
export class MediasController {
	constructor() {}

	@Post('/members/profile')
	@UseInterceptors(
		FilesInterceptor('files', 1, CreateMemberProfileImageMulterOptions()),
	)
	@ApiConsumes('multipart/form-data')
	async uploadProfile(@UploadedFiles() files: Express.MulterS3.File[]) {
		if (!files?.length) {
			throw BadRequestServiceException(ERROR_FILE_NOT_FOUND);
		}
		const locations = files.map(({ location }) => location);
		return locations;
	}
}
