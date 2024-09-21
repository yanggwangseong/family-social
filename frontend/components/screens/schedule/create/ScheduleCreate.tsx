import Header from '@/components/ui/header/Header';
import Format from '@/components/ui/layout/Format';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleCreate.module.scss';
import SchedulePeriod from './schedule-period/SchedulePeriod';
import SelectGroup from './select-group/SelectGroup';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { Union, schdulePages } from 'types';
import Tourism from './tourism/Tourism';
import ScheduleSidebar from '@/components/ui/layout/sidebar/schedule/ScheduleSidebar';
import { useRecoilState } from 'recoil';
import { PeriodsType, periodAtom } from '@/atoms/periodAtom';
import { TranslateDateFormat } from '@/utils/translate-date-format';
import { ScheduleItemResponse } from '@/shared/interfaces/schedule.interface';
import ScheduleDate from './schedule-date/ScheduleDate';
import { getDateRange } from '@/utils/get-date-range';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import { motion } from 'framer-motion';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { PiUsersThreeDuotone, PiAirplaneDuotone } from 'react-icons/pi';
import { FormatDateToString } from '@/utils/formatDateToString';
import { useMemberBelongToGroups } from '@/hooks/use-query/useMemberBelongToGroups';

const ScheduleCreate: FC<{
	scheduleItem?: ScheduleItemResponse;
}> = ({ scheduleItem }) => {
	const [isClosePanel, setIsClosePanel] = useState(false);

	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	// schedule-date
	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const [isScheduleName, setIsScheduleName] = useState<string>(
		scheduleItem ? scheduleItem.scheduleName : '',
	);

	// schedule-date
	const [isPeriodTimes, setIsPeriodTimes] = useState<PeriodsType[]>([]);

	const [isStartEndPeriod, setIsStartEndPeriod] = useState<{
		startPeriod: string;
		endPeriod: string;
	}>({
		startPeriod: scheduleItem
			? TranslateDateFormat(new Date(scheduleItem.startPeriod), 'yyyy-MM-dd')
			: '',
		endPeriod: scheduleItem
			? TranslateDateFormat(new Date(scheduleItem.endPeriod), 'yyyy-MM-dd')
			: '',
	});

	const [dateRange, setDateRange] = useState<Date[]>(
		scheduleItem
			? [
					FormatDateToString(scheduleItem.startPeriod),
					FormatDateToString(scheduleItem.endPeriod),
			  ]
			: [new Date(), new Date()],
	);

	const handleChangeDate = (dates: [Date, Date]) => {
		setDateRange(dates);

		const [startDate, endDate] = dates;

		if (startDate && endDate) {
			const startPeriod = TranslateDateFormat(startDate, 'yyyy-MM-dd');

			const endPeriod = TranslateDateFormat(endDate, 'yyyy-MM-dd');

			const datesRange = getDateRange(startPeriod, endPeriod);

			// 시작기간 종료기간
			handleChangeStartEndPeriod(startPeriod, endPeriod);

			setIsSelectedPeriod(datesRange[0]);

			setIsPeriodTimes(
				datesRange.map(date => ({
					period: date,
					startTime: '10:00',
					endTime: '22:00',
				})),
			);
		}
	};

	const [isPage, setIsPage] =
		useState<Union<typeof schdulePages>>('selectGroupPage');

	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups(scheduleItem ? scheduleItem.groupId : '');

	const handleChangePage = (page: Union<typeof schdulePages>) => {
		setIsPage(page);
	};

	const handleChangePeriods = (dates: PeriodsType[]) => {
		setIsPeriods(dates);
	};

	const handleChangeScheduleName = (name: string) => {
		setIsScheduleName(name);
	};

	const handleChangeStartEndPeriod = (
		startPeriod: string,
		endPeriod: string,
	) => {
		setIsStartEndPeriod({
			startPeriod,
			endPeriod,
		});
	};

	const handleClosePanel = () => {
		setIsClosePanel(true);
	};

	const [startDate, endDate] = dateRange;

	useEffect(() => {
		if (scheduleItem && scheduleItem.schedulePeriods) {
			const periods: PeriodsType[] = scheduleItem.schedulePeriods.map(
				period => ({
					period: period.period,
					startTime: period.startTime,
					endTime: period.endTime,
					tourisms: period.tourisms?.map(tourism => ({
						contentId: tourism.contentId,
						stayTime: tourism.stayTime,
						tourismImage: tourism.tourismImage,
						title: tourism.title,
						position: tourism.position,
						stayTimeWritable: tourism.stayTimeWritable,
					})),
				}),
			);

			setIsSelectedPeriod(periods[0].period);
			setIsPeriods(periods);
		}
	}, [scheduleItem, setIsPeriods, setIsSelectedPeriod]);

	return (
		<Format title={'schedule-create'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							{isPage === 'selectGroupPage' && (!data || isLoading) ? (
								<Skeleton />
							) : (
								isPage === 'selectGroupPage' &&
								data && (
									<SelectGroup
										onChangePage={handleChangePage}
										data={data}
										handleSelectedGroup={handleSelectedGroup}
										isSelecteGroup={isSelecteGroup}
									></SelectGroup>
								)
							)}
							{isPage === 'scheduleDatePage' && (
								<ScheduleDate
									handleChangePage={handleChangePage}
									onChangeScheduleName={handleChangeScheduleName}
									isScheduleName={isScheduleName}
									onChangePeriods={handleChangePeriods}
									handleChangeDate={handleChangeDate}
									startDate={startDate}
									endDate={endDate}
									isPeriodTimes={isPeriodTimes}
								></ScheduleDate>
							)}
							{isPage === 'periodPage' && (
								<SchedulePeriod
									onChangePage={handleChangePage}
									isPeriods={isPeriods}
									startDate={startDate}
									endDate={endDate}
								></SchedulePeriod>
							)}
							{isPage === 'tourismPage' && <Tourism></Tourism>}
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					<ScheduleSidebar
						isSelecteGroup={isSelecteGroup}
						isScheduleName={isScheduleName}
						isStartEndPeriod={isStartEndPeriod}
						onChangePage={handleChangePage}
						isPage={isPage}
						isClosePanel={isClosePanel}
						handleClosePanel={handleClosePanel}
						scheduleItem={scheduleItem}
					/>

					{isClosePanel && (
						<div
							className={styles.mobile_panel_btn_container}
							onClick={() => setIsClosePanel(false)}
						>
							{isPage === 'tourismPage' ? (
								<motion.div {...BUTTONGESTURE}>
									<PiAirplaneDuotone size={28} color="#0a0a0a" />
								</motion.div>
							) : (
								<motion.div {...BUTTONGESTURE}>
									<PiUsersThreeDuotone size={28} color="#0a0a0a" />
								</motion.div>
							)}
						</div>
					)}
				</div>
			</div>
		</Format>
	);
};

export default ScheduleCreate;
