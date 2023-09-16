import React, { FC } from 'react';
import styles from './GroupRequests.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';
import Invitations from './invitations/Invitations';

const GroupRequests: FC = () => {
	return (
		<Format title={'group-requests'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupSidebar />
					<div className={styles.main_contents_container}>
						<div className={styles.top_title}>그룹 멤버 초대 요청</div>
						{/* 그룹 초대 요청리스트 */}
						<Invitations />
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupRequests;
