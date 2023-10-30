import React, { FC, useState } from 'react';
import styles from './CommentItem.module.scss';
import Profile from '@/components/ui/profile/Profile';
import { CommentsResponse } from '@/shared/interfaces/comment.interface';
import { BsDot } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import CommentForm from '@/components/ui/form/CommentForm';

const CommentItem: FC<{
	comment: CommentsResponse;
	depth: number;
	onCommentRefetch: () => void;
	feedId: string;
}> = ({ comment, depth, onCommentRefetch, feedId }) => {
	const [isReply, setIsReply] = useState<boolean>(false);

	const replyId = comment.id;
	const parentId = comment.parentId;
	return (
		<>
			<div>
				{/* 프로필 */}
				<Profile commentContents={comment.commentContents} />
				<div className={styles.comment_card_bottom_container}>
					<div className={styles.comment_published}>5분전</div>
					<div>
						<BsDot size={22} color="#0a0a0a"></BsDot>
					</div>

					<div
						className={styles.comment_reply}
						onClick={() => setIsReply(!isReply)}
					>
						답글
					</div>
					<div>
						<BsDot size={22} color="#0a0a0a"></BsDot>
					</div>
					<div className={styles.comment_reply}>더보기</div>
					<div className={styles.comment_like_container}>
						<AiOutlineHeart size={28} className={styles.like_icon} />
					</div>
				</div>
			</div>
			{isReply && (
				<div>
					{/* comment form */}
					<CommentForm
						onCommentRefetch={onCommentRefetch}
						feedId={feedId}
						replyId={replyId}
						parentId={parentId}
					/>
				</div>
			)}
			{comment.childrenComments && (
				<div className={styles.child_comment_container}>
					{comment.childrenComments?.map(child => (
						<CommentItem
							key={child.id}
							comment={child}
							depth={depth + 1}
							onCommentRefetch={onCommentRefetch}
							feedId={feedId}
						></CommentItem>
					))}
				</div>
			)}
		</>
	);
};

export default CommentItem;
