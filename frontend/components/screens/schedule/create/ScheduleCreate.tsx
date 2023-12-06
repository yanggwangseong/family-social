import Header from '@/components/ui/header/Header';
import Format from '@/components/ui/layout/Format';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import React, { FC } from 'react';
import styles from './ScheduleCreate.module.scss';
import { useMemberBelongToGroups } from '@/hooks/useMemberBelongToGroups';

const ScheduleCreate: FC = () => {
	const { data, isLoading } = useMemberBelongToGroups();

	return (
		<Format title={'schedule-create'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}></div>
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default ScheduleCreate;
