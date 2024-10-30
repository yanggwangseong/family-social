import React, { FC } from 'react';
import { CommentsProps, CommentsPropsWithAuth } from './comments-interface';
import styles from './Comments.module.scss';
import CommentItem from './comment-item/CommentItem';
import Profile from '../../profile/Profile';
import CommentForm from '../../form/CommentForm';
import { withAuthClientSideProps } from 'hoc/with-auth-client-side-props';

const Comments: FC<CommentsPropsWithAuth> = ({
	comments,
	feedId,
	feedWriterId,
	isToggleCommentWrite,
	onCommentRefetch,
	onLikeComment,
	authData,
}) => {
	return (
		<div className={styles.comment_container}>
			{isToggleCommentWrite && (
				<div className={styles.comment_write_container}>
					{/* 프로필 */}
					<Profile searchMember={authData} />
					<div className={styles.comment_write_form}>
						{/* comment form */}
						<CommentForm
							onCommentRefetch={onCommentRefetch}
							feedId={feedId}
							feedWriterId={feedWriterId}
						/>
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
					feedWriterId={feedWriterId}
					onLikeComment={onLikeComment}
				/>
			))}
		</div>
	);
};

export default withAuthClientSideProps<CommentsProps>(Comments);
