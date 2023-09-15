import React, { FC } from 'react';
import styles from './GroupRequests.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';

const GroupRequests: FC = () => {
	return (
		<Format title={'group-requests'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupSidebar />
					<div>contensts</div>
					<div>rightside</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupRequests;
