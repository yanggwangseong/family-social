import React, { FC } from 'react';
import { CommentsProps } from './comments-interface';
import styles from './Comments.module.scss';
import CommentItem from './comment-item/CommentItem';
import Profile from '../../profile/Profile';
import CommentForm from '../../form/CommentForm';

const Comments: FC<CommentsProps> = ({
	comments,
	feedId,
	isToggleCommentWrite,
	onCommentRefetch,
}) => {
	return (
		<div className={styles.comment_container}>
			{isToggleCommentWrite && (
				<div className="my-2 flex">
					{/* 프로필 */}
					<Profile />
					<div className="flex-1">
						{/* comment form */}
						<CommentForm onCommentRefetch={onCommentRefetch} feedId={feedId} />
					</div>
				</div>
			)}

			{comments.map(comment => (
				<CommentItem
					key={comment.id}
					comment={comment}
					depth={0}
					onCommentRefetch={onCommentRefetch}
					feedId={feedId}
				/>
			))}
		</div>
	);
};

export default Comments;
