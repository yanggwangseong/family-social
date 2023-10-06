import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import {
	Controller,
	Get,
	Post,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FeedsService } from './feeds.service';
import { BadRequestServiceException } from '@/common/exception/service.exception';
import { CreateBodyImageMulterOptions } from '@/utils/upload-media';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('feeds')
@Controller('feeds')
export class FeedsController {
	constructor(private readonly feedsService: FeedsService) {}

	@Post('/test')
	@UseInterceptors(
		FilesInterceptor('files', 10, CreateBodyImageMulterOptions()),
	)
	@ApiConsumes('multipart/form-data')
	async upload(@UploadedFiles() files: Express.MulterS3.File[]) {
		if (!files?.length) {
			throw BadRequestServiceException(`파일이 없습니다.`);
		}
		const locations = files.map(({ location }) => location);
		return locations;
	}
}
