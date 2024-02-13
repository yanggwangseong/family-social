import React, { FC } from 'react';
import styles from './ScheduleDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import ScheduleDetailSelect from '@/components/ui/select/schedule/detail/ScheduleDetailSelect';

const ScheduleDetail: FC = () => {
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
							<div className="flex">
								<div>여행9</div>
								<div>2024.1.21-2024.1.24</div>
							</div>
							{/* select박스 */}
							<ScheduleDetailSelect></ScheduleDetailSelect>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default ScheduleDetail;
