import React, { FC } from 'react';
import styles from './GroupFeed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import GroupSidebar from '@/components/ui/layout/sidebar/group/GroupSidebar';
import feedAnimation from '@/assets/lottie/feed.json';
import Lottie from 'lottie-react';

const GroupFeed: FC = () => {
	return (
		<Format title={'group-feeds'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<GroupSidebar />
					<div className={styles.main_contents_container}>
						<div className={styles.top_title_contianer}>
							<div className={styles.top_title}>내 피드</div>
						</div>
						{/* 그룹별 내가 올린 피드가 만약 없을경우 */}
						<div className={styles.lottie_container}>
							<Lottie className={styles.lottie} animationData={feedAnimation} />
						</div>
						<div className={styles.found_title}>내가 올린 피드가 없습니다</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default GroupFeed;
