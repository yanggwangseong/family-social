import { CommentAtomDefaultValue, commentAtom } from '@/atoms/commentAtom';
import { modalAtom } from '@/atoms/modalAtom';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { CommentService } from '@/services/comment/comment.service';
import React, { FC } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useRecoilState } from 'recoil';

import LayerModalVariantWrapper from './LayerModalVariantWrapper';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const CommentDeleteConfirm: FC = () => {
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const [IsComment, setIsComment] = useRecoilState(commentAtom);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { mutate: deleteCommentSync } = useCreateMutation(
		async () =>
			await CommentService.deleteComment({
				feedId: IsComment.feedId,
				commentId: IsComment.commentId,
			}),
		{
			mutationKey: ['delete-comment'],
			onSuccess: data => {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '댓글 삭제',
					layer: LayerMode.successLayerModal,
					lottieFile: 'deleteAnimation',
					message: '댓글을 삭제 하였습니다',
					onConfirm: () => {
						setIsComment({ ...CommentAtomDefaultValue });
					},
				});
			},
		},
	);

	const handleClick = () => {
		deleteCommentSync();
	};

	return (
		<LayerModalVariantWrapper>
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
		</LayerModalVariantWrapper>
	);
};

export default CommentDeleteConfirm;
