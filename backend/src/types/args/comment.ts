import { CommentCreateReqDto } from '@/models/dto/comments/req/comment-create-req.dto';

export interface ICreateCommentsArgs
	extends Omit<CommentCreateReqDto, 'feedWriterId'> {
	feedId: string;
	memberId: string;
}
