import { modalAtom } from '@/atoms/modalAtom';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { feedIdAtom } from '@/atoms/feedIdAtom';
import { FeedService } from '@/services/feed/feed.service';

import LayerModalVariantWrapper from './LayerModalVariantWrapper';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const FeedDeleteConfirm: FC = () => {
	const [isFeedId, setIsFeedId] = useRecoilState(feedIdAtom);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const { mutate: deleteFeedSync } = useCreateMutation(
		async () => await FeedService.deleteFeed(isFeedId),
		{
			mutationKey: ['delete-feed'],
			onSuccess: data => {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '피드 삭제',
					layer: LayerMode.successLayerModal,
					lottieFile: 'deleteAnimation',
					message: '피드를 삭제 하였습니다',
					onConfirm: () => {
						setIsFeedId('');
					},
				});
			},
		},
	);

	const handleClick = () => {
		deleteFeedSync();
	};

	return (
		<LayerModalVariantWrapper>
			<div className="my-10 text-sm text-customGray">
				정말 해당 피드를 삭제하시겠습니까?
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

export default FeedDeleteConfirm;
