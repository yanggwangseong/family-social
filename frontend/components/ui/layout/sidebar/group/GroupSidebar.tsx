import React, { FC } from 'react';
import styles from './GroupSidebar.module.scss';
import {
	AiOutlineAudit,
	AiOutlineUsergroupAdd,
	AiOutlineCompass,
	AiOutlineTeam,
} from 'react-icons/ai';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Menu from '../menu/Menu';

const GroupSidebar: FC = () => {
	const router = useRouter();
	const handleClickPageMove = () => {
		router.push('/groups/create');
	};

	return (
		<div className={styles.sidebar_container}>
			<div className={styles.sidebar_title}>그룹</div>
			{/* 사이드 메뉴 */}
			<Menu link="/groups/feeds" Icon={AiOutlineAudit} menu="내 피드" />
			<Menu link="/groups/joins" Icon={AiOutlineTeam} menu="내 그룹" />
			<Menu
				link="/groups/requests"
				Icon={AiOutlineUsergroupAdd}
				menu="그룹 요청"
			/>
			<Menu link="/groups/discover" Icon={AiOutlineCompass} menu="찾아보기" />

			<div className={styles.sidebar_btn_container}>
				<CustomButton
					type="button"
					className="mt-8 bg-customOrange text-customDark 
					font-bold border border-solid border-customDark 
					rounded-full p-[10px]
					w-full hover:bg-orange-500
					"
					onClick={handleClickPageMove}
				>
					+ 새 그룹 만들기
				</CustomButton>
			</div>
		</div>
	);
};

export default GroupSidebar;
