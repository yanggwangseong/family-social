import React, { FC } from 'react';
import styles from './MainSidebar.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Menu from '../menu/Menu';
import { AiOutlineAudit } from 'react-icons/ai';

const MainSidebar: FC = () => {
	return (
		<div className={styles.sidebar_container}>
			{/* 사이드 메뉴 */}
			<Menu link="/feeds" Icon={AiOutlineAudit} menu="피드" />

			<div className={styles.sidebar_btn_container}>
				<CustomButton
					type="button"
					className="mt-8 bg-customOrange text-customDark 
            font-bold border border-solid border-customDark 
            rounded-full p-[10px]
            w-full hover:bg-orange-500
            "
				>
					+ 피드
				</CustomButton>
			</div>
		</div>
	);
};

export default MainSidebar;
