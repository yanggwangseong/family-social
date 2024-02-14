import React, { FC, useState } from 'react';
import styles from './ScheduleDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import ScheduleDetailSelect from '@/components/ui/select/schedule/detail/ScheduleDetailSelect';
import { useRouter } from 'next/router';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { useQuery } from 'react-query';
import Skeleton from '@/components/ui/skeleton/Skeleton';

const ScheduleDetail: FC = () => {
	const router = useRouter();

	const [isSelectedPeriod, setIsSelectedPeriod] = useState<string>('ALL');

	const query = router.query as { scheduleId: string };

	const { data, isLoading } = useQuery(
		['get-scheduleId', query.scheduleId],
		async () =>
			await ScheduleService.getScheduleById(
				'75aca3da-1dac-48ef-84b8-cdf1be8fe37d',
				query.scheduleId,
			),
	);

	const handleSelectedPeriod = (period: string) => {
		setIsSelectedPeriod(period);
	};

	return (
		<Format title={'schedule-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />

				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							{isLoading && !data && <Skeleton></Skeleton>}

							{/* select박스 */}
							{data && (
								<>
									<div className={styles.title_container}>
										<div className={styles.title}>{data.scheduleName}</div>
										<div className={styles.title_period}>
											{`${data.startPeriod.toString()} ~ ${data.endPeriod.toString()}`}
										</div>
									</div>
									<ScheduleDetailSelect
										schedulePeriods={data.schedulePeriods}
										onSelectedPeriod={handleSelectedPeriod}
										isSelectedPeriod={isSelectedPeriod}
									></ScheduleDetailSelect>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default ScheduleDetail;
