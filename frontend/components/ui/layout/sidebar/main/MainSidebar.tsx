import React, { FC } from 'react';
import styles from './MainSidebar.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Menu from '../menu/Menu';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	PiUserCircleGearDuotone,
	PiCalendarCheckDuotone,
	PiUsersThreeDuotone,
	PiArticleDuotone,
} from 'react-icons/pi';
import { useMainSidebar } from '@/hooks/useMainSidebar';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import { motion } from 'framer-motion';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { useMenuAnimation } from '@/hooks/useMenuAnimation';

const MainSidebar: FC = () => {
	const router = useRouter();
	const { pathname } = router;
	const isSchedulesRoute = pathname.startsWith('/schedules');

	const { handleCreateFeed } = useCreateFeed();

	const {
		isLeftSidebarShowing,
		setIsLeftSidebarShowing,
		handleCloseMainSidebar,
		isMobile,
	} = useMainSidebar();

	const { sidebarScope } = useMenuAnimation(isLeftSidebarShowing);

	return (
		<>
			<motion.div className={styles.sidebar_container} ref={sidebarScope}>
				<motion.div>
					<motion.div
						className={styles.mobile_close_btn}
						onClick={handleCloseMainSidebar}
					>
						x
					</motion.div>
					{/* 사이드 메뉴 */}
					<motion.div className={styles.contents_wrap}>
						<Menu
							link="/feeds"
							Icon={PiArticleDuotone}
							menu="피드"
							handleCloseMainSidebar={handleCloseMainSidebar}
						/>
						<Menu
							link="/groups/feeds"
							Icon={PiUsersThreeDuotone}
							menu="그룹"
							handleCloseMainSidebar={handleCloseMainSidebar}
						/>
						<Menu
							link="/schedules"
							Icon={PiCalendarCheckDuotone}
							menu="여행 일정"
							handleCloseMainSidebar={handleCloseMainSidebar}
						/>
						<Menu
							link="/accounts"
							Icon={PiUserCircleGearDuotone}
							menu="계정"
							handleCloseMainSidebar={handleCloseMainSidebar}
						/>
					</motion.div>
					<motion.div
						{...BUTTONGESTURE}
						className={styles.sidebar_btn_container}
					>
						{isSchedulesRoute ? (
							<Link
								className="mt-8 bg-customOrange text-customDark 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px]
									w-full hover:bg-orange-500 inline-block text-center
									shadow-button-shadow
									"
								href={`/schedules/create`}
								onClick={handleCloseMainSidebar}
							>
								+ 일정 만들기
							</Link>
						) : (
							<CustomButton
								type="button"
								className="mt-8 bg-customOrange text-customDark 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px]
									w-full hover:bg-orange-500
									"
								onClick={() => {
									handleCloseMainSidebar();
									handleCreateFeed();
								}}
							>
								+ 피드
							</CustomButton>
						)}
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
};

export default MainSidebar;
