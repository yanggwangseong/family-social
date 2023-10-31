import { commentAtom } from '@/atoms/commentAtom';
import { modalAtom } from '@/atoms/modalAtom';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { CommentService } from '@/services/comment/comment.service';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const CommentDeleteConfirm: FC = () => {
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const [IsComment, setIsComment] = useRecoilState(commentAtom);

	const { mutate: deleteCommentSync } = useMutation(
		['delete-comment'],
		() =>
			CommentService.deleteComment({
				feedId: IsComment.feedId,
				commentId: IsComment.commentId,
			}),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `댓글을 삭제 하였습니다.`, '확인', () => {
					setIsComment({ commentId: '', feedId: '' });
					setIsShowing(false);
				});
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

	const handleClick = () => {
		deleteCommentSync();
	};
	return (
		<div>
			<div className="my-10 text-sm text-customGray">
				정말 해당 댓글을 삭제하시겠습니까?
			</div>
			<div className="flex w-full gap-5">
				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-customDark text-customOrange 
			font-bold border border-solid border-customDark 
			rounded-full p-[10px] w-full hover:opacity-80"
					onClick={handleClick}
				>
					삭제
				</CustomButton>

				<CustomButton
					type="button"
					className="mt-8 mb-4 bg-white text-customDark 
			font-bold border border-solid border-customDark 
			rounded-full p-[10px] w-full hover:bg-gray-200"
					onClick={() => setIsShowing(false)}
				>
					취소
				</CustomButton>
			</div>
		</div>
	);
};

export default CommentDeleteConfirm;
