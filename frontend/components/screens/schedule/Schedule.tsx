import React, { FC } from 'react';
import styles from './Schedule.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { scheduleTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import ScheduleSidebar from '@/components/ui/layout/sidebar/schedule/ScheduleSidebar';

const Schedule: FC = () => {
	return (
		<Format title={'schedule'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							<TabMenu
								list={scheduleTabMenus}
								options={'SCHEDULEALL'}
							></TabMenu>
							<div>d</div>
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					{/* <ScheduleSidebar /> */}
				</div>
			</div>
		</Format>
	);
};

export default Schedule;
