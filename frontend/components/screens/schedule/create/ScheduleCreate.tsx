import Header from '@/components/ui/header/Header';
import Format from '@/components/ui/layout/Format';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleCreate.module.scss';
import SchedulePeriod from './schedule-period/SchedulePeriod';
import SelectGroup from './select-group/SelectGroup';
import { useMemberBelongToGroups } from '@/hooks/useMemberBelongToGroups';
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

const ScheduleCreate: FC<{
	edit?: boolean;
	scheduleItem?: ScheduleItemResponse;
}> = ({ edit = false, scheduleItem }) => {
	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	// schedule-date
	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const [isScheduleName, setIsScheduleName] = useState<string>(
		edit && scheduleItem ? scheduleItem.scheduleName : '',
	);

	// schedule-date
	const [isPeriodTimes, setIsPeriodTimes] = useState<PeriodsType[]>([]);

	const [isStartEndPeriod, setIsStartEndPeriod] = useState<{
		startPeriod: string;
		endPeriod: string;
	}>({
		startPeriod:
			edit && scheduleItem
				? TranslateDateFormat(new Date(scheduleItem.startPeriod), 'yyyy-MM-dd')
				: '',
		endPeriod:
			edit && scheduleItem
				? TranslateDateFormat(new Date(scheduleItem.endPeriod), 'yyyy-MM-dd')
				: '',
	});

	const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()]);
	const [startDate, endDate] = dateRange;

	const handleChangeDate = (dates: [Date, Date]) => {
		setDateRange(dates);
	};

	const [isPage, setIsPage] =
		useState<Union<typeof schdulePages>>('selectGroupPage');

	const { data, isLoading, handleSelectedGroup, isSelecteGroup } =
		useMemberBelongToGroups(edit && scheduleItem ? scheduleItem.groupId : '');

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

	// schedule-date
	const selectedDates = () => {
		const startPeriod = TranslateDateFormat(startDate, 'yyyy-MM-dd');

		const endPeriod = TranslateDateFormat(endDate, 'yyyy-MM-dd');

		const dates = getDateRange(startPeriod, endPeriod);

		// 시작기간 종료기간
		handleChangeStartEndPeriod(startPeriod, endPeriod);

		setIsSelectedPeriod(dates[0]);

		setIsPeriodTimes(
			dates.map(date => ({
				period: date,
				startTime: '10:00',
				endTime: '22:00',
			})),
		);
		handleChangePage('periodPage');
	};

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
									selectedDates={selectedDates}
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
							{isPage === 'tourismPage' && (
								<Tourism onChangePeriods={handleChangePeriods}></Tourism>
							)}
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					<ScheduleSidebar
						isSelecteGroup={isSelecteGroup}
						isScheduleName={isScheduleName}
						isStartEndPeriod={isStartEndPeriod}
						onChangePage={handleChangePage}
						isPage={isPage}
						selectedDates={selectedDates}
					/>
				</div>
			</div>
		</Format>
	);
};

export default ScheduleCreate;
