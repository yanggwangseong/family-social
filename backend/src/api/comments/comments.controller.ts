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
}
