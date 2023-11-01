import { CommentsResponse } from '@/shared/interfaces/comment.interface';

export interface CommentsProps {
	comments: CommentsResponse[];
	feedId: string;
	isToggleCommentWrite: boolean;
	onCommentRefetch: () => void;
	onLikeComment: () => void;
}

export interface CreateCommentRequest {
	commentContents: string;
	replyId?: string;
	parentId?: string;
	feedId: string;
}

export interface UpdateCommentRequest
	extends Pick<CreateCommentRequest, 'commentContents'> {}
