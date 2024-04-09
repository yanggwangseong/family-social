import { CommentsResponse } from '@/shared/interfaces/comment.interface';

export interface CommentsProps {
	comments: CommentsResponse[];
	feedId: string;
	feedWriterId: string;
	isToggleCommentWrite: boolean;
	onCommentRefetch: () => void;
	onLikeComment: (commentId: string) => void;
}

export interface CreateCommentRequest {
	commentContents: string;
	feedWriterId: string;
	replyId?: string;
	parentId?: string;
	feedId: string;
}

export interface UpdateCommentRequest
	extends Pick<CreateCommentRequest, 'commentContents'> {}
