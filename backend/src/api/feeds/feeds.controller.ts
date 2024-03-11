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
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { QueryRunner } from 'typeorm';

import { QueryRunnerDecorator } from '@/common/decorators/query-runner.decorator';
import {
	CreateCommentSwagger,
	DeleteCommentSwagger,
	LikesCommentSwagger,
	UpdateCommentSwagger,
} from '@/common/decorators/swagger/swagger-comment.decorator';
import {
	CreateFeedSwagger,
	DeleteFeedSwagger,
	UpdateFeedSwagger,
	GetFeedsSwagger,
	LikesFeedSwagger,
	GetFeedDetailSwagger,
} from '@/common/decorators/swagger/swagger-feed.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { BadRequestServiceException } from '@/common/exception/service.exception';
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { TransactionInterceptor } from '@/common/interceptors/transaction.interceptor';
import { CommentCreateReqDto } from '@/models/dto/comments/req/comment-create-req.dto';
import { CommentUpdateReqDto } from '@/models/dto/comments/req/comment-update-req.dto';
import { FeedCreateReqDto } from '@/models/dto/feed/req/feed-create-req.dto';
import { FeedUpdateReqDto } from '@/models/dto/feed/req/feed-update.req.dto';
import { CreateBodyImageMulterOptions } from '@/utils/upload-media';

import { FeedsService } from './feeds.service';
import { CommentsService } from '../comments/comments.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('feeds')
@Controller('feeds')
export class FeedsController {
	constructor(
		private readonly feedsService: FeedsService,
		private readonly commentsService: CommentsService,
	) {}

	/**
	 * @summary 단일 피드를 가져옵니다
	 *
	 * @tag feeds
	 * @param {string} feedId - 단일 피드를 조회하기 위한 피드 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns feed
	 */
	@GetFeedDetailSwagger()
	@Get(':feedId')
	async findFeedById(@Param('feedId', ParseUUIDPipe) feedId: string) {
		return await this.feedsService.findFeedInfoById(feedId);
	}

	/**
	 * @summary 피드를 가져옵니다.
	 *
	 * @tag feeds
	 * @param {number} page - 페이징을 위한 page 번호
	 * @param {string} sub  - 인증된 사용자의 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns feed
	 */
	// @Query('options') options: 'TOP' | 'MYFEED' |  'ALL'로 가져올떄 옵션 추가
	@GetFeedsSwagger()
	@Get()
	async findAllFeed(
		@Query('options') options: 'TOP' | 'MYFEED' | 'ALL',
		@Query('page') page: number,
		@CurrentUser('sub') sub: string,
	) {
		return await this.feedsService.findAllFeed(page, sub, options);
	}

	/**
	 * @summary 유저가 속하는 Group에서 feed 생성
	 *
	 * @tag feeds
	 * @param {string} 	dto.contents - 피드 글내용
	 * @param {boolean} dto.isPublic - 피드 공개/비공개
	 * @param {string} 	dto.groupId  - 유저가 속하는 그룹 Id
	 * @param {MediaCreateReqDto[]} dto.medias - 미디어 파일들
	 * @param {string}  sub  	   	 - 멤버Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 피드id, 피드 공개/비공개
	 */
	@CreateFeedSwagger()
	@UseInterceptors(TransactionInterceptor)
	@Post()
	async createFeed(
		@Body() dto: FeedCreateReqDto,
		@CurrentUser('sub') sub: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const feed = await this.feedsService.createFeed(
			{
				...dto,
				memberId: sub,
			},
			qr,
		);

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
	 * @param {string} dto.contents - 피드 글내용
	 * @param {boolean} dto.isPublic - 피드 공개/비공개
	 * @param {string} dto.groupId  - 유저가 속하는 그룹 Id
	 * @param {string} feedId   	- 피드Id
	 * @param {MediaCreateReqDto[]} dto.medias - 미디어 파일들
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@UpdateFeedSwagger()
	@UseInterceptors(TransactionInterceptor)
	@Put(':feedId')
	async updateFeed(
		@Param('feedId', ParseUUIDPipe) feedId: string,
		@Body() dto: FeedUpdateReqDto,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		await this.feedsService.updateFeed(
			{
				contents: dto.contents,
				isPublic: dto.isPublic,
				groupId: dto.groupId,
				feedId: feedId,
				medias: dto.medias,
			},
			qr,
		);
	}

	/**
	 * @summary feed 좋아요
	 *
	 * @tag feeds
	 * @param {string} sub  	- 멤버 Id
	 * @param {string} feedId  	- 피드Id
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
	 * @param {string} feedId  - 피드Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@DeleteFeedSwagger()
	@UseInterceptors(TransactionInterceptor)
	@Delete(':feedId')
	async deleteFeed(
		@Param('feedId', ParseUUIDPipe) feedId: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		await this.feedsService.deleteFeed(feedId, qr);
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

	/**
	 * @summary 특정 feed에 댓글, 대댓글, 대대댓글 작성
	 *
	 * @tag comments
	 * @param {string} dto.commentContents - 댓글의 글내용
	 * @param {string} dto.replyId  - 실제 답글 단 댓글의 Id
	 * @param {string} dto.parentId - 최초 부모격인 댓글 Id
	 * @param {string} feedId   	- 특정 feed의 Id
	 * @param {string} sub  	    - 멤버Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@CreateCommentSwagger()
	@Post(':feedId/comments')
	async createComment(
		@CurrentUser('sub') sub: string,
		@Body() dto: CommentCreateReqDto,
		@Param('feedId', ParseUUIDPipe) feedId: string,
	) {
		// 피드가 존재 하는지 check;
		await this.feedsService.findFeedByIdOrThrow(feedId);

		return await this.commentsService.createComment({
			commentContents: dto.commentContents,
			replyId: dto.replyId,
			parentId: dto.parentId,
			feedId: feedId,
			memberId: sub,
		});
	}

	/**
	 * @summary 특정 댓글 수정하기
	 *
	 * @tag comments
	 * @param {string} dto.commentContents 	- 댓글의 글내용
	 * @param {string} feedId   			- 특정 feed의 Id
	 * @param {string} commentId  	    	- 수정 할 댓글 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@UpdateCommentSwagger()
	@Put(':feedId/comments/:commentId')
	async updateComment(
		@Body() dto: CommentUpdateReqDto,
		@Param('feedId', ParseUUIDPipe) feedId: string,
		@Param('commentId', ParseUUIDPipe) commentId: string,
	) {
		// 피드가 존재 하는지 check;
		await this.feedsService.findFeedByIdOrThrow(feedId);
		// 댓글이 존재 하는지 check;
		await this.commentsService.findCommentByIdOrThrow(commentId);

		return await this.commentsService.updateComment(
			commentId,
			dto.commentContents,
		);
	}

	/**
	 * @summary 특정 댓글 삭제하기
	 *
	 * @tag comments
	 * @param {string} feedId   			- 특정 feed의 Id
	 * @param {string} commentId  	    	- 수정 할 댓글 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns void
	 */
	@DeleteCommentSwagger()
	@Delete(':feedId/comments/:commentId')
	async deleteComment(
		@Param('feedId', ParseUUIDPipe) feedId: string,
		@Param('commentId', ParseUUIDPipe) commentId: string,
	) {
		// 피드가 존재 하는지 check;
		await this.feedsService.findFeedByIdOrThrow(feedId);
		// 댓글이 존재 하는지 check;
		await this.commentsService.findCommentByIdOrThrow(commentId);

		return await this.commentsService.deleteComment(commentId);
	}

	/**
	 * @summary comment 좋아요
	 *
	 * @tag comments
	 * @param {string} sub  		 - 멤버 Id
	 * @param {string} commentId  	 - 좋아요 할 댓글 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns boolean
	 */
	@LikesCommentSwagger()
	@Put(':feedId/comments/:commentId/likes')
	async updateLikesCommentId(
		@CurrentUser('sub') sub: string,
		@Param('commentId', ParseUUIDPipe) commentId: string,
	) {
		return await this.commentsService.updateLikesCommentId(sub, commentId);
	}
}
