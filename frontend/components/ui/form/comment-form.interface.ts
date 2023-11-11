interface CommentFormProps {
	onCommentRefetch: () => void;
	feedId: string;
	parentId?: string;
	replyId?: string;
	commentId?: string;
	isEdit?: boolean;
	commentContents?: string;
	handleCloseReply?: () => void;
	handleEditComment?: () => void;
}
