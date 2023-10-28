import React, { FC } from 'react';
import { CommentsProps } from './comments-interface';
import styles from './Comments.module.scss';
import CommentItem from './comment-item/CommentItem';
import Profile from '../../profile/Profile';
import FieldWithTextarea from '../../field/field-area/FieldArea';
import { FaRegSmile } from 'react-icons/fa';

const Comments: FC<CommentsProps> = ({
	comments,
	isToggleCommentWrite,
	commentTextAreaRef,
}) => {
	return (
		<div className={styles.comment_container}>
			{isToggleCommentWrite && (
				<div className="my-2 flex">
					<Profile />
					<div className="border border-solid border-customDark rounded-full px-6 py-3 h-12 flex-1 ml-4 flex">
						<div className="mr-2">
							<FaRegSmile size={22} />
						</div>
						<FieldWithTextarea
							fieldClass="hidden_border_textarea"
							placeholder="댓글을 입력 하세요."
							ref={commentTextAreaRef}
						></FieldWithTextarea>
					</div>
				</div>
			)}

			{comments.map(comment => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</div>
	);
};

export default Comments;
