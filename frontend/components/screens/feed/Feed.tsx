import React, { FC } from 'react';
import styles from './Feed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import FeedItem from '@/components/ui/feed/FeedItem';

const Feed: FC = () => {
	return (
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							{/* 탭메뉴 */}
							<TabMenu />
							<div className={styles.feed_container}>
								<FeedItem />
								<FeedItem />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Feed;
