import { modalAtom } from '@/atoms/modalAtom';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import React, { FC } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useMutation } from 'react-query';
import { ScheduleService } from '@/services/schedule/schedule.service';
import {
	ScheduleIdAtomDefaultValue,
	scheduleIdAtom,
} from '@/atoms/scheduleIdAtom';

import LayerModalVariantWrapper from './LayerModalVariantWrapper';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';

const ScheduleDeleteConfirm: FC = () => {
	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);
	const [IsScheduleId, setIsScheduleId] = useRecoilState(scheduleIdAtom);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { mutate: deleteScheduleSync } = useMutation(
		['delete-schedule'],
		() =>
			ScheduleService.deleteSchedule(
				IsScheduleId.scheduleId,
				IsScheduleId.groupId,
			),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();

				handleSuccessLayerModal({
					modalTitle: '여행 일정 삭제 성공',
					layer: LayerMode.successLayerModal,
					lottieFile: 'deleteAnimation',
					message: '해당 여행일정을 삭제 하였습니다',
					onConfirm: () => {
						setIsScheduleId({
							...ScheduleIdAtomDefaultValue,
						});
					},
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
		deleteScheduleSync();
	};

	return (
		<LayerModalVariantWrapper>
			<div className="my-10 text-sm text-customGray">
				정말 해당 여행일정을 삭제하시겠습니까?
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

export default ScheduleDeleteConfirm;
