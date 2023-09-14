import React, { FC } from 'react';
import styles from './GroupSidebar.module.scss';
import {
	AiOutlineAudit,
	AiOutlineUsergroupAdd,
	AiOutlineCompass,
} from 'react-icons/ai';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';

const GroupSidebar: FC = () => {
	return (
		<div className={styles.sidebar_container}>
			<div className={styles.sidebar_title}>그룹</div>
			<div className={styles.sidebar_menu_container}>
				<AiOutlineAudit size={40}></AiOutlineAudit>
				<div className={styles.sidebar_menu_text}>내 피드</div>
			</div>
			<div className={styles.sidebar_menu_container}>
				<AiOutlineUsergroupAdd size={40}></AiOutlineUsergroupAdd>
				<div className={styles.sidebar_menu_text}>그룹 요청</div>
			</div>
			<div className={styles.sidebar_menu_container}>
				<AiOutlineCompass size={40}></AiOutlineCompass>
				<div className={styles.sidebar_menu_text}>찾아보기</div>
			</div>
			<div className={styles.sidebar_btn_container}>
				<CustomButton
					type="button"
					className="mt-8 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full py-4 px-4
					w-52 hover:bg-orange-500
					"
				>
					+ 새 그룹 만들기
				</CustomButton>
			</div>
		</div>
	);
};

export default GroupSidebar;
