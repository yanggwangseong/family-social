import React, { FC, useState } from 'react';
import styles from './CommentItem.module.scss';
import Profile from '@/components/ui/profile/Profile';
import { CommentsResponse } from '@/shared/interfaces/comment.interface';
import { BsDot } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import CommentForm from '@/components/ui/form/CommentForm';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { LayerMode } from 'types';
import { commentAtom } from '@/atoms/commentAtom';
import { useLottieLike } from '@/hooks/useLottieLike';
import { PiHeartDuotone } from 'react-icons/pi';

const CommentItem: FC<{
	comment: CommentsResponse;
	depth: number;
	feedId: string;
	onCommentRefetch: () => void;
	onLikeComment: (commentId: string) => void;
}> = ({ comment, depth, onCommentRefetch, feedId, onLikeComment }) => {
	const [isReply, setIsReply] = useState<boolean>(false);
	const [isSeeMore, setIsSeeMore] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const [isLike, setIsLike] = useState<boolean>(
		comment.myLikeByComment ? comment.myLikeByComment : false,
	);

	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);
	const [, setIsComment] = useRecoilState(commentAtom);

	const replyId = comment.id;
	const parentId = comment.parentId ? comment.parentId : comment.id;

	const handleLikeComment = () => {
		onLikeComment(comment.id);
		setIsLike(!isLike);
	};

	const handleCloseReply = () => {
		setIsReply(false);
	};

	const handleSeeMore = () => {
		setIsSeeMore(!isSeeMore);
	};

	const handleDeleteComment = () => {
		setIsShowing(!isShowing); // layer modal 보여주기
		setIsLayer({
			modal_title: '댓글 삭제',
			layer: LayerMode.commentDeleteConfirm,
		}); // layer modal 어떤 layer를 보여 줄건지

		setIsComment({
			feedId: comment.feedId,
			commentId: comment.id,
		}); // 삭제를 위해 commentId 전역 recoil 변수에 담기
	};

	const handleEditComment = () => {
		setIsEdit(!isEdit);
	};

	const seeMoreText = isSeeMore
		? '숨기기'
		: `댓글 ${comment.childrenComments?.length}개 더보기`;

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
					<div className={styles.comment_reply} onClick={handleEditComment}>
						수정
					</div>
					<div>
						<BsDot size={22} color="#0a0a0a"></BsDot>
					</div>
					<div className={styles.comment_reply} onClick={handleDeleteComment}>
						삭제
					</div>

					{depth === 0 && comment.childrenComments?.length !== 0 && (
						<>
							<div>
								<BsDot size={22} color="#0a0a0a"></BsDot>
							</div>
							<div className={styles.comment_reply} onClick={handleSeeMore}>
								{seeMoreText}
							</div>
						</>
					)}

					<div className={styles.comment_like_container}>
						{isLike ? (
							<PiHeartDuotone
								size={28}
								color="#FB1F42"
								className={styles.like_icon}
								onClick={handleLikeComment}
							/>
						) : (
							<PiHeartDuotone
								size={28}
								className={styles.like_icon}
								onClick={handleLikeComment}
							/>
						)}

						<div className={styles.like_count}>
							{comment.sumLikeByComment ? comment.sumLikeByComment : 0}
						</div>
					</div>
				</div>
			</div>
			{isEdit && (
				<div>
					{/* comment form */}
					<CommentForm
						onCommentRefetch={onCommentRefetch}
						feedId={feedId}
						replyId={replyId}
						parentId={parentId}
						commentId={comment.id}
						isEdit={isEdit}
						commentContents={comment.commentContents}
						handleCloseReply={handleCloseReply}
						handleEditComment={handleEditComment}
					/>
				</div>
			)}
			{isReply && (
				<div>
					{/* comment form */}
					<CommentForm
						onCommentRefetch={onCommentRefetch}
						feedId={feedId}
						replyId={replyId}
						parentId={parentId}
						commentId={comment.id}
						handleCloseReply={handleCloseReply}
					/>
				</div>
			)}
			{comment.childrenComments && isSeeMore && (
				<div className={styles.child_comment_container}>
					{comment.childrenComments?.map(child => (
						<CommentItem
							key={child.id}
							comment={child}
							depth={depth + 1}
							feedId={feedId}
							onCommentRefetch={onCommentRefetch}
							onLikeComment={onLikeComment}
						></CommentItem>
					))}
				</div>
			)}
		</>
	);
};

export default CommentItem;
