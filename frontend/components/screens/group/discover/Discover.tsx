import React, { FC } from 'react';
import styles from './Discover.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';

const Discover: FC = () => {
	return (
		<Format title={'group-discover'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupSidebar />
					<div className={styles.main_contents_container}>
						<div className={styles.top_title_container}>
							<div className={styles.top_title}>찾아보기</div>
						</div>
						{/* 그룹별 내가 올린 피드가 만약 없을경우 */}
						<div>찾아보기 작업중</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Discover;
