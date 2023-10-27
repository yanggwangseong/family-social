import { CommentCreateReqDto } from '@/models/dto/comments/req/comment-create-req.dto';

export interface ICreateCommentsArgs extends CommentCreateReqDto {
	feedId: string;
	memberId: string;
}
