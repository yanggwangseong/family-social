import { CommentsResponse } from '@/shared/interfaces/comment.interface';

export interface CommentsProps {
	comments: CommentsResponse[];
	feedId: string;
	isToggleCommentWrite: boolean;
	onCommentRefetch: () => void;
}

export interface CreateCommentRequest {
	commentContents: string;
	replyId?: string;
	parentId?: string;
	feedId: string;
}
