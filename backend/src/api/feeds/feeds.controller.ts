import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
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
import {
	CreateFeedSwagger,
	UpdateFeedSwagger,
} from '@/common/decorators/swagger/swagger-feed.decorator';
import { MediasService } from '../medias/medias.service';
import { FeedUpdateReqDto } from '@/models/dto/feed/req/feed-update.req.dto';

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

	/**
	 * @summary feed 수정
	 *
	 * @tag feeds
	 * @param contents 피드 글내용
	 * @param isPublic 피드 공개/비공개
	 * @param groupId  유저가 속하는 그룹 Id
	 * @param feedId   피드Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@UpdateFeedSwagger()
	@Put(':feedId')
	async updateFeed(
		@Param('feedId', ParseUUIDPipe) feedId: string,
		@Body() dto: FeedUpdateReqDto,
	) {
		await this.feedsService.updateFeed({
			contents: dto.contents,
			isPublic: dto.isPublic,
			groupId: dto.groupId,
			feedId: feedId,
		});

		await this.mediasService.updateFeedMedias(dto.medias, feedId);
	}

	//[TODO] 수정시 기존에 있는 이미지와 같은 이름 이미지인지 확인 있는거면 업데이트 x
	//		 contensts나 isPublic은 수정, groupId도 바뀔 수 있음.
	// 커스텀 데코레이터로 해당 피드 올린사람이랑 sub 비교해서 다르면 마 니꺼 아니잖아 에러메세지.

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
