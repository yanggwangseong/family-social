import { modalAtom } from '@/atoms/modalAtom';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { GroupService } from '@/services/group/group.service';
import router from 'next/router';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import LayerModalVariantWrapper from './LayerModalVariantWrapper';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';
import { useCreateMutation } from '@/hooks/useCreateMutation';

const GroupDeleteConfirm: FC = () => {
	const { groupId } = router.query as { groupId: string };
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { mutate: deleteGroupSync } = useCreateMutation(
		async () => await GroupService.deleteGroup(groupId),
		{
			mutationKey: ['delete-group'],
			onSuccess: data => {
				Loading.remove();
				handleSuccessLayerModal({
					modalTitle: '그룹 삭제 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'deleteAnimation',
					message: '그룹을 삭제 성공 하였습니다',
				});
			},
		},
	);

	const handleClick = () => {
		deleteGroupSync();
	};

	return (
		<LayerModalVariantWrapper>
			<div className="my-10 text-sm text-customGray">
				정말 그룹을 삭제하시겠습니까?
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

export default GroupDeleteConfirm;
