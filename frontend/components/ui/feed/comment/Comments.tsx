import React, { FC } from 'react';
import { CommentsProps } from './comments-interface';
import styles from './Comments.module.scss';
import CommentItem from './comment-item/CommentItem';

const Comments: FC<CommentsProps> = ({ comments }) => {
	return (
		<div className={styles.comment_container}>
			{comments.map(comment => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</div>
	);
};

export default Comments;
