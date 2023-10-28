import { CommentsResponse } from '@/shared/interfaces/comment.interface';

export interface CommentsProps {
	comments: CommentsResponse[];
	isToggleCommentWrite: boolean;
	commentTextAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}
