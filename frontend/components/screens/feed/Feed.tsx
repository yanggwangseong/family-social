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
						<div className={styles.main_contents_container}>
							<div className={styles.top_tab_menus}>
								<div className={`${styles.tab_menu_item} ${styles.active}`}>
									TOP
								</div>
								<div className={styles.tab_menu_item}>MY FEED</div>
								<div className={styles.tab_menu_item}>ALL</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Feed;
