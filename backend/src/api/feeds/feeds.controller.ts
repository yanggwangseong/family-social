import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FeedsService } from './feeds.service';
import { BadRequestServiceException } from '@/common/exception/service.exception';
import {
	CreateBodyImageMulterOptions,
	DeleteS3Media,
} from '@/utils/upload-media';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { FeedCreateReqDto } from '@/models/dto/feed/req/feed-create-req.dto';
import {
	CreateFeedSwagger,
	DeleteFeedSwagger,
	UpdateFeedSwagger,
	GetFeedsSwagger,
	LikesFeedSwagger,
} from '@/common/decorators/swagger/swagger-feed.decorator';
import { FeedUpdateReqDto } from '@/models/dto/feed/req/feed-update.req.dto';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('feeds')
@Controller('feeds')
export class FeedsController {
	constructor(private readonly feedsService: FeedsService) {}

	/**
	 * @summary 유저가 속하는 Group에서 feed 생성
	 *
	 * @tag feeds
	 * @param page 페이징을 위한 page 번호
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns feed
	 */
	@GetFeedsSwagger()
	@Get()
	async findAllFeed(@Query('page') page: number) {
		return await this.feedsService.findAllFeed(page);
	}

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
			medias: dto.medias,
		});

		return feed;
	}

	//[TODO] 수정시 기존에 있는 이미지와 같은 이름 이미지인지 확인 있는거면 업데이트 x
	//		 그렇게 생각 했으나, 그냥 다지우고 다시 생성 하는게 깔끔할듯.
	//		 contensts나 isPublic은 수정, groupId도 바뀔 수 있음.
	// 커스텀 데코레이터로 해당 피드 올린사람이랑 sub 비교해서 다르면 마 니꺼 아니잖아 에러메세지.
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
			medias: dto.medias,
		});
	}

	/**
	 * @summary feed 좋아요
	 *
	 * @tag feeds
	 * @param sub  멤버 Id
	 * @param feedId   피드Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns boolean
	 */
	@LikesFeedSwagger()
	@Put(':feedId/likes')
	async updateLikesFeedId(
		@CurrentUser('sub') sub: string,
		@Param('feedId', ParseUUIDPipe) feedId: string,
	) {
		return await this.feedsService.updateLikesFeedId(sub, feedId);
	}

	/**
	 * @summary feed 삭제
	 *
	 * @tag feeds
	 * @param feedId   피드Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@DeleteFeedSwagger()
	@Delete(':feedId')
	async deleteFeed(@Param('feedId', ParseUUIDPipe) feedId: string) {
		await this.feedsService.deleteFeed(feedId);
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
