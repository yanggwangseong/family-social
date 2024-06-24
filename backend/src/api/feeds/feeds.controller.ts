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
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryRunner } from 'typeorm';

import { IsPagination } from '@/common/decorators/is-pagination.decorator';
import { PaginationDecorator } from '@/common/decorators/pagination.decorator';
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
import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { IsMineCommentGuard } from '@/common/guards/is-mine-comment.guard';
import { IsMineFeedGuard } from '@/common/guards/is-mine-feed.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { PaginationInterceptor } from '@/common/interceptors/pagination.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import { TransactionInterceptor } from '@/common/interceptors/transaction.interceptor';
import { parseUUIDPipeMessage } from '@/common/pipe-message/parse-uuid-pipe-message';
import { Pagination } from '@/common/strategies/context/pagination';
import {
	COMMENT_ON_MY_POST_TITLE,
	LIKE_ON_MY_POST_TITLE,
} from '@/constants/notification.const';
import { PaginationEnum } from '@/constants/pagination.const';
import { CommentCreateReqDto } from '@/models/dto/comments/req/comment-create-req.dto';
import { CommentUpdateReqDto } from '@/models/dto/comments/req/comment-update-req.dto';
import { FeedCreateReqDto } from '@/models/dto/feed/req/feed-create-req.dto';
import { FeedLikeUpdateReqDto } from '@/models/dto/feed/req/feed-like-update-req.dto';
import { FeedPaginationReqDto } from '@/models/dto/feed/req/feed-pagination-req.dto';
import { FeedUpdateReqDto } from '@/models/dto/feed/req/feed-update.req.dto';
import { FeedEntity } from '@/models/entities/feed.entity';

import { FeedsService } from './feeds.service';
import { CommentsService } from '../comments/comments.service';
import { MentionsService } from '../mentions/mentions.service';
import { NotificationsService } from '../notifications/notifications.service';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('feeds')
@Controller('feeds')
export class FeedsController {
	constructor(
		private readonly feedsService: FeedsService,
		private readonly commentsService: CommentsService,
		private readonly notificationsService: NotificationsService,
		private readonly mentionsService: MentionsService,
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
	async findFeedById(
		@Param(
			'feedId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		feedId: string,
		@CurrentUser('sub') sub: string,
	) {
		const mentionTypeId = await this.mentionsService.findMentionIdByMentionType(
			'mention_on_feed',
		);

		const result = await this.feedsService.findFeedInfoById(
			feedId,
			mentionTypeId,
			sub,
		);

		return result;
	}

	/**
	 * @summary 피드를 가져옵니다.
	 *
	 * @tag feeds
	 * @param {number} page - 페이징을 위한 page 번호
	 * @param {string} sub  - 인증된 사용자의 아이디
	 * @param groupId 특정 그룹에 해당하는 피드를 가져오기 위한 그룹 아이디
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns feed
	 */
	// @Query('options') options: 'TOP' | 'MYFEED' |  'ALL'로 가져올떄 옵션 추가
	@GetFeedsSwagger()
	@UseInterceptors(PaginationInterceptor<FeedEntity>)
	@IsPagination(PaginationEnum.BASIC)
	@Get()
	async findAllFeed(
		@CurrentUser('sub') sub: string,
		// @Query('options')
		// options: 'TOP' | 'MYFEED' | 'ALL' | 'GROUPFEED',
		// @Query(
		// 	'page',
		// 	new DefaultValuePipe(1),
		// 	new ParseIntPipe({ exceptionFactory: () => parseIntPipeMessage('page') }),
		// )
		// page: number,
		// @Query(
		// 	'groupId',
		// 	new ParseUUIDPipe({
		// 		exceptionFactory: parseUUIDPipeMessage,
		// 		optional: true,
		// 	}),
		// )
		// groupId?: string,
		@Query() paginationDto: FeedPaginationReqDto,
		@PaginationDecorator() pagination: Pagination<FeedEntity>,
	) {
		return await this.feedsService.findAllFeed(sub, paginationDto, pagination);
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
	@UseGuards(IsMineFeedGuard)
	@UseInterceptors(TransactionInterceptor)
	@Put(':feedId')
	async updateFeed(
		@Param(
			'feedId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		feedId: string,
		@Body() dto: FeedUpdateReqDto,
		@QueryRunnerDecorator() qr: QueryRunner,
		@CurrentUser('sub') sub: string,
	) {
		await this.feedsService.updateFeed(
			{
				contents: dto.contents,
				isPublic: dto.isPublic,
				groupId: dto.groupId,
				medias: dto.medias,
				mentions: dto.mentions,
				feedId: feedId,
				memberId: sub,
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
	@UseInterceptors(TransactionInterceptor)
	@Put(':feedId/likes')
	async updateLikesFeedId(
		@CurrentUser() { sub, username }: { sub: string; username: string },
		@Param(
			'feedId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		feedId: string,
		@Body() dto: FeedLikeUpdateReqDto,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const isUpdateLike = await this.feedsService.updateLikesFeedId(
			sub,
			feedId,
			qr,
		);

		if (isUpdateLike) {
			await this.notificationsService.createNotification(
				{
					notificationType: 'like_on_my_post',
					recipientId: dto.feedWriterId,
					senderId: sub,
					notificationTitle: `${username} ${LIKE_ON_MY_POST_TITLE}`,
					notificationDescription: `${username} ${LIKE_ON_MY_POST_TITLE}`,
					notificationFeedId: feedId,
				},
				qr,
			);
		}

		return isUpdateLike;
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
	@UseGuards(IsMineFeedGuard)
	@UseInterceptors(TransactionInterceptor)
	@Delete(':feedId')
	async deleteFeed(
		@Param(
			'feedId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		feedId: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const mentionTypeId = await this.mentionsService.findMentionIdByMentionType(
			'mention_on_feed',
		);

		await this.feedsService.deleteFeed(feedId, mentionTypeId, qr);
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
	@UseInterceptors(TransactionInterceptor)
	@Post(':feedId/comments')
	async createComment(
		@CurrentUser() { sub, username }: { sub: string; username: string },
		@Body() dto: CommentCreateReqDto,
		@Param(
			'feedId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		feedId: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const commentId = await this.commentsService.createComment(
			{
				commentContents: dto.commentContents,
				replyId: dto.replyId,
				parentId: dto.parentId,
				feedId: feedId,
				memberId: sub,
				mentions: dto.mentions,
			},
			qr,
		);

		await this.mentionsService.createMentions(
			{
				mentionType: 'mention_on_comment',
				mentions: dto.mentions,
				mentionSenderId: sub,
				mentionFeedId: feedId,
				mentionCommentId: commentId,
			},
			qr,
		);

		await this.notificationsService.createNotification(
			{
				notificationType: 'comment_on_my_post',
				recipientId: dto.feedWriterId,
				senderId: sub,
				notificationTitle: `${username} ${COMMENT_ON_MY_POST_TITLE}`,
				notificationDescription: dto.commentContents,
				notificationFeedId: feedId,
			},
			qr,
		);
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
	@UseInterceptors(TransactionInterceptor)
	@UseGuards(IsMineCommentGuard)
	@Put(':feedId/comments/:commentId')
	async updateComment(
		@Body() dto: CommentUpdateReqDto,
		@Param(
			'feedId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		feedId: string,
		@Param(
			'commentId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		commentId: string,
		@CurrentUser('sub') sub: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const comment = await this.commentsService.updateComment(
			commentId,
			dto.commentContents,
			qr,
		);

		await this.mentionsService.updateMentions(
			{
				mentionType: 'mention_on_comment',
				mentions: dto.mentions,
				mentionSenderId: sub,
				mentionFeedId: feedId,
				mentionCommentId: commentId,
			},
			qr,
		);

		return comment;
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
	@UseInterceptors(TransactionInterceptor)
	@UseGuards(IsMineCommentGuard)
	@Delete(':feedId/comments/:commentId')
	async deleteComment(
		@Param(
			'feedId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		feedId: string,
		@Param(
			'commentId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		commentId: string,
		@QueryRunnerDecorator() qr: QueryRunner,
	) {
		const mentionTypeId = await this.mentionsService.findMentionIdByMentionType(
			'mention_on_comment',
		);

		await this.mentionsService.deleteMentionsByFeedId(
			{ mentionFeedId: feedId, mentionCommentId: commentId, mentionTypeId },
			qr,
		);

		return await this.commentsService.deleteComment(commentId, qr);
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
		@Param(
			'commentId',
			new ParseUUIDPipe({ exceptionFactory: parseUUIDPipeMessage }),
		)
		commentId: string,
	) {
		return await this.commentsService.updateLikesCommentId(sub, commentId);
	}
}
