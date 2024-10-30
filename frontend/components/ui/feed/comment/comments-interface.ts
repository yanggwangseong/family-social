import { CommentsResponse } from '@/shared/interfaces/comment.interface';
import { CreateMentionRequest } from '../../form/comment-form.interface';
import { SearchMemberResponse } from '@/shared/interfaces/member.interface';

export interface CommentsProps {
	comments: CommentsResponse[];
	feedId: string;
	feedWriterId: string;
	isToggleCommentWrite: boolean;
	onCommentRefetch: () => void;
	onLikeComment: (commentId: string) => void;
}

export interface CommentsPropsWithAuth extends CommentsProps {
	authData: SearchMemberResponse;
}

export interface CreateCommentRequest {
	commentContents: string;
	feedWriterId: string;
	replyId?: string;
	parentId?: string;
	feedId: string;
	mentions: CreateMentionRequest[];
}

export interface UpdateCommentRequest
	extends Pick<CreateCommentRequest, 'commentContents' | 'mentions'> {}
