import React, { FC } from 'react';
import styles from './Schedule.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { scheduleTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';

import { PiPencilDuotone } from 'react-icons/pi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import ScheduleContainer from './schedule-container/ScheduleContainer';
import { useRouter } from 'next/router';

const Schedule: FC = () => {
	const router = useRouter();
	const query = router.query as {
		options: 'SCHEDULEALL' | 'MYSCHEDULE' | 'SHAREDSCHEDULE';
	};

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
							<div className={styles.tab_menu_wrap}>
								<TabMenu
									list={scheduleTabMenus}
									options={query.options}
								></TabMenu>
							</div>

							<ScheduleContainer options={query.options} />
						</div>
						<Link
							className={styles.mobile_create_schedule_btn_container}
							href={`/schedules/create`}
						>
							<motion.div {...BUTTONGESTURE}>
								<PiPencilDuotone size={28} color="#0a0a0a" />
							</motion.div>
						</Link>
					</div>
					{/* 오른쪽 사이드바 */}
					{/* <ScheduleSidebar /> */}
				</div>
			</div>
		</Format>
	);
};

export default Schedule;
