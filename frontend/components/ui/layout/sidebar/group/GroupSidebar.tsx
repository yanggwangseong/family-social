import React, { FC } from 'react';
import styles from './GroupSidebar.module.scss';
import {
	PiUsersThreeDuotone,
	PiUserPlusDuotone,
	PiUserRectangleDuotone,
	PiCompassDuotone,
} from 'react-icons/pi';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useRouter } from 'next/router';
import Menu from '../menu/Menu';
import { useMainSidebar } from '@/hooks/useMainSidebar';
import { motion } from 'framer-motion';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { useMenuAnimation } from '@/hooks/useMenuAnimation';

const GroupSidebar: FC = () => {
	const router = useRouter();
	const handleClickPageMove = () => {
		router.push('/groups/create');
	};

	const { isLeftSidebarShowing, handleCloseMainSidebar } = useMainSidebar();

	const { sidebarScope } = useMenuAnimation(isLeftSidebarShowing);

	return (
		<>
			<motion.div
				className={styles.sidebar_container}
				ref={sidebarScope}
				initial={{ transform: 'translateX(-100%)' }} // 초기 상태: 왼쪽으로 이동하여 숨김
			>
				<motion.div
					className={styles.mobile_close_btn}
					onClick={handleCloseMainSidebar}
				>
					x
				</motion.div>
				<div className={styles.sidebar_title}>그룹</div>
				{/* 사이드 메뉴 */}
				<div className={styles.contents_wrap}>
					<Menu
						link="/groups/feeds"
						Icon={PiUserRectangleDuotone}
						menu="내 피드"
						handleCloseMainSidebar={handleCloseMainSidebar}
					/>
					<Menu
						link="/groups/joins"
						Icon={PiUsersThreeDuotone}
						menu="내 그룹"
						handleCloseMainSidebar={handleCloseMainSidebar}
					/>
					<Menu
						link="/groups/requests"
						Icon={PiUserPlusDuotone}
						menu="그룹 요청"
						handleCloseMainSidebar={handleCloseMainSidebar}
					/>
					<Menu
						link="/groups/discover"
						Icon={PiCompassDuotone}
						menu="찾아보기"
						handleCloseMainSidebar={handleCloseMainSidebar}
					/>
				</div>

				<motion.div {...BUTTONGESTURE} className={styles.sidebar_btn_container}>
					<CustomButton
						type="button"
						className="mt-0 md:mt-8 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px]
					w-full hover:bg-orange-500
					"
						onClick={handleClickPageMove}
					>
						+ 새 그룹 만들기
					</CustomButton>
				</motion.div>
			</motion.div>
		</>
	);
};

export default GroupSidebar;
