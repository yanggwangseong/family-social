import React, { FC, useState } from 'react';
import { CommentsProps } from './comments-interface';
import styles from './Comments.module.scss';
import CommentItem from './comment-item/CommentItem';
import Profile from '../../profile/Profile';
import FieldWithTextarea from '../../field/field-area/FieldArea';
import { FaRegSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import CustomButton from '../../button/custom-button/CustomButton';

const Comments: FC<CommentsProps> = ({
	comments,
	isToggleCommentWrite,
	commentTextAreaRef,
}) => {
	const [isEmoji, setIsEmoji] = useState<boolean>(false);

	const handleEmojiView = () => {
		setIsEmoji(!isEmoji);
	};
	return (
		<div className={styles.comment_container}>
			{isToggleCommentWrite && (
				<div className="my-2 flex">
					<Profile />
					<form className={styles.form}>
						<div className="border border-solid border-customDark rounded-full px-6 py-3 h-12 flex-1 ml-4 flex">
							<div className="mr-2 relative">
								<FaRegSmile
									className={'cursor-pointer'}
									size={22}
									onClick={handleEmojiView}
								/>
								{isEmoji && (
									<div className=" absolute z-10 -top-[420px]">
										<EmojiPicker
											height={400}
											autoFocusSearch={false}
											searchDisabled={true}
											skinTonesDisabled={true}
										/>
									</div>
								)}
							</div>
							<FieldWithTextarea
								fieldClass="hidden_border_textarea"
								placeholder="댓글을 입력 하세요."
								ref={commentTextAreaRef}
							></FieldWithTextarea>
							<div className="flex items-center justify-center">
								<CustomButton
									type="submit"
									className="text-customOrange font-extrabold bg-basic text-sm"
									shadowNone={true}
								>
									POST
								</CustomButton>
							</div>
						</div>
					</form>
				</div>
			)}

			{comments.map(comment => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</div>
	);
};

export default Comments;
