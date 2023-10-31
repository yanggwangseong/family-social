interface CommentFormProps {
	onCommentRefetch: () => void;
	feedId: string;
	parentId?: string;
	replyId?: string;
	handleCloseReply?: () => void;
}
