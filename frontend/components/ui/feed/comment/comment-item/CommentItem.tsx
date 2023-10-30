import React, { FC, useState } from 'react';
import styles from './CommentItem.module.scss';
import Profile from '@/components/ui/profile/Profile';
import { CommentsResponse } from '@/shared/interfaces/comment.interface';
import { BsDot } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegSmile } from 'react-icons/fa';
import FieldWithTextarea from '@/components/ui/field/field-area/FieldArea';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const CommentItem: FC<{ comment: CommentsResponse; depth: number }> = ({
	comment,
	depth,
}) => {
	const [isReply, setIsReply] = useState<boolean>(false);

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
					<div className="border border-solid border-customDark rounded-full px-6 py-3 h-12 flex-1 ml-4 flex">
						<div className="mr-2 relative">
							<FaRegSmile className={'cursor-pointer'} size={22} />
						</div>
						<FieldWithTextarea
							fieldClass="hidden_border_textarea"
							placeholder="댓글을 입력 하세요."
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
				</div>
			)}
			{comment.childrenComments && (
				<div className={styles.child_comment_container}>
					{comment.childrenComments?.map(child => (
						<CommentItem
							key={child.id}
							comment={child}
							depth={depth + 1}
						></CommentItem>
					))}
				</div>
			)}
		</>
	);
};

export default CommentItem;
