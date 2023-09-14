import Format from '@/components/ui/layout/Format';
import React, { FC } from 'react';
import styles from './Group.module.scss';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';
import Header from '@/components/ui/header/Header';

const Group: FC = () => {
	return (
		<Format title={'groups'}>
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

export default Group;
