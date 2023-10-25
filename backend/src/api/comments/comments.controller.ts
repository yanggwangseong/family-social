import { AccessTokenGuard } from '@/common/guards/accessToken.guard';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
import {
	Body,
	Controller,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { CommentCreateReqDto } from '@/models/dto/comments/req/comment-create-req.dto';
import { CreateCommentSwagger } from '@/common/decorators/swagger/swagger-comment.decorator';

@UseInterceptors(LoggingInterceptor, TimeoutInterceptor)
@UseGuards(AccessTokenGuard)
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	/**
	 * @summary 특정 feed에 댓글, 대댓글, 대대댓글 작성
	 *
	 * @tag comments
	 * @param {string} dto.commentContents - 댓글의 글내용
	 * @param {string} dto.replyId  - 실제 답글 단 댓글의 Id
	 * @param {string} dto.parentId - 최초 부모격인 댓글 Id
	 * @param {string} dto.feedId   - 특정 feed의 Id
	 * @param {string} sub  	    - 멤버Id
	 * @author YangGwangSeong <soaw83@gmail.com>
	 * @returns 피드id, 피드 공개/비공개
	 */
	@CreateCommentSwagger()
	@Post()
	async createComments(
		@CurrentUser('sub') sub: string,
		@Body() dto: CommentCreateReqDto,
	) {
		return await this.commentsService.createComments({
			commentContents: dto.commentContents,
			replyId: dto.replyId,
			parentId: dto.parentId,
			feedId: dto.feedId,
			memberId: sub,
		});
	}
}
