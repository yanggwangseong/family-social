import React, { FC, useEffect, useState } from 'react';
import styles from './SidebarScheduleTourism.module.scss';
import SchedulePeriodSelect from '@/components/ui/select/schedule/SchedulePeriodSelect';
import { PeriodsType, periodAtom } from '@/atoms/periodAtom';
import { useRecoilState } from 'recoil';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { getSumTime } from '@/utils/get-sum-time';
import ScheduleTourism from '@/components/ui/schedule/tourism/Tourism';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { useMutation } from 'react-query';
import { CreateScheduleRequest } from '@/shared/interfaces/schedule.interface';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ScheduleSidebarProps } from '../schedule-sidebar.interface';
import { sharedFamIdsAtom } from '@/atoms/sharedFamIdsAtom';
import { useSuccessLayerModal } from '@/hooks/useSuccessLayerModal';
import { LayerMode } from 'types';

const SidebarScheduleTourism: FC<ScheduleSidebarProps> = ({
	isSelecteGroup,
	isScheduleName,
	isStartEndPeriod,
	isPage,
	scheduleItem,
}) => {
	const router = useRouter();
	const [isValidate, setIsValidate] = useState<boolean>(false);
	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);
	const [isSharedFamIds, setIsSharedFamIds] = useRecoilState(sharedFamIdsAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const { handleSuccessLayerModal } = useSuccessLayerModal();

	const { mutate: createScheduleSync } = useMutation(
		['create-schedule'],
		(data: CreateScheduleRequest) =>
			ScheduleService.createSchedules({ ...data }),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();

				handleSuccessLayerModal({
					modalTitle: '일정 생성',
					layer: LayerMode.successLayerModal,
					lottieFile: 'createScheduleAnimation',
					message: '일정을 생성 하였습니다',
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

	const handleCreateSchedule = () => {
		Confirm.show(
			'일정 생성',
			'해당 일정을 생성 하시겠습니까?',
			'일정 생성',
			'닫기',
			() => {
				createScheduleSync({
					groupId: isSelecteGroup,
					scheduleName: isScheduleName,
					startPeriod: isStartEndPeriod.startPeriod,
					endPeriod: isStartEndPeriod.endPeriod,
					periods: isPeriods,
					sharedFamIds: isSharedFamIds,
				});
			},
			() => {},
			{},
		);
	};

	useEffect(() => {
		if (isPeriods) {
			const exist = isPeriods.every(
				value => value.tourisms && value.tourisms?.length !== 0,
			);
			setIsValidate(exist);
		}
	}, [isPeriods]);

	return (
		isSelectedPeriod && (
			<div className={styles.container}>
				<div className={styles.fix_container}>
					<div>
						<SchedulePeriodSelect></SchedulePeriodSelect>
					</div>
					<div className={styles.sidebar_tourism_total_time_container}>
						<div className={styles.tourism_count}>
							{isPeriods.map(item => {
								if (item.period === isSelectedPeriod) {
									return item.tourisms?.length;
								}
							})}
						</div>
						<div className={styles.stay_time}>
							{isPeriods.map(period => {
								if (period.period === isSelectedPeriod) {
									if (!period.tourisms) {
										return `0시간 0분`;
									}
									const total = period.tourisms.reduce(
										(prev, item) => {
											const hours =
												Number(prev.hours) +
												Number(item.stayTime.split(':')[0]);
											const minutes =
												Number(prev.minutes) +
												Number(item.stayTime.split(':')[1]);

											return {
												hours: hours + Math.floor(minutes / 60),
												minutes: minutes % 60,
											};
										},
										{ hours: 0, minutes: 0 },
									);

									const formattedTotal = `${String(total.hours)}시간 ${String(
										total.minutes,
									)}분`;
									return formattedTotal;
								}
							})}
							/
							{isPeriods.map(
								period =>
									period.period === isSelectedPeriod &&
									getSumTime(period.startTime, period.endTime),
							)}
						</div>
					</div>
				</div>
				<div className={styles.right_sidebar_contents_wrap}>
					<div>
						{isPeriods.map((period, index) => (
							<div className={styles.schedule_tourism_container} key={index}>
								{period.period === isSelectedPeriod ? (
									period.tourisms && period.tourisms.length > 0 ? (
										<ScheduleTourism
											tourList={period.tourisms}
										></ScheduleTourism>
									) : (
										<div className={styles.not_found_tourism_container}>
											<div className={styles.not_found_text}>
												장소를 선택해주세요.
											</div>
										</div>
									)
								) : null}
							</div>
						))}
					</div>
				</div>
				<div className={styles.right_sidebar_footer_container}>
					{scheduleItem ? (
						<CustomButton
							type="button"
							className="mt-8 bg-customOrange text-customDark 
						font-bold border border-solid border-customDark 
						rounded-full p-[10px]
						w-full hover:bg-orange-500
						"
							disabled={!isValidate}
						>
							일정 수정
						</CustomButton>
					) : (
						<CustomButton
							type="button"
							className="mt-8 bg-customOrange text-customDark 
						font-bold border border-solid border-customDark 
						rounded-full p-[10px]
						w-full hover:bg-orange-500
						"
							disabled={!isValidate}
							onClick={() => isValidate && handleCreateSchedule()}
						>
							일정 생성
						</CustomButton>
					)}
				</div>
			</div>
		)
	);
};

export default SidebarScheduleTourism;
