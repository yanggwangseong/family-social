import React, { FC } from 'react';
import styles from './Feed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';

const Feed: FC = () => {
	return (
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>ㅇㅇ</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Feed;
