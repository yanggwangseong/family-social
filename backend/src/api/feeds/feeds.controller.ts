import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import {
	Body,
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
import { CurrentUser } from '@/common/decorators/user.decorator';
import { FeedCreateReqDto } from '@/models/dto/feed/req/feed-create-req.dto';
import { CreateFeedSwagger } from '@/common/decorators/swagger/swagger-feed.decorator';
import { MediasService } from '../medias/medias.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('feeds')
@Controller('feeds')
export class FeedsController {
	constructor(
		private readonly feedsService: FeedsService,
		private readonly mediasService: MediasService,
	) {}

	/**
	 * @summary 유저가 속하는 Group에서 feed 생성
	 *
	 * @tag feeds
	 * @param contents 피드 글내용
	 * @param isPublic 피드 공개/비공개
	 * @param groupId  유저가 속하는 그룹 Id
	 * @param sub  	   멤버Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 피드id, 피드 공개/비공개
	 */
	@CreateFeedSwagger()
	@Post()
	async createFeed(
		@Body() dto: FeedCreateReqDto,
		@CurrentUser('sub') sub: string,
	) {
		const feed = await this.feedsService.createFeed({
			contents: dto.contents,
			isPublic: dto.isPublic,
			memberId: sub,
			groupId: dto.groupId,
		});

		await this.mediasService.createFeedMedias(dto.medias, feed.id);

		return feed;
	}

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
