import React, { FC, useState } from 'react';
import styles from './RightSidebar.module.scss';
import cn from 'classnames';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import Profile from '@/components/ui/profile/Profile';

const RightSidebar: FC = () => {
	const [isMenu, setIsMenu] = useState<boolean>(true);
	return (
		<div className={styles.right_sidebar_container}>
			<div className={styles.side_top_container}>
				<div className={styles.top_tab_menu}>
					<div
						className={cn(styles.top_tab_menu_item, {
							[styles.active]: !!isMenu,
						})}
					>
						멤버
					</div>
				</div>
				<div className={styles.top_tab_menu}>
					<div className={styles.top_tab_menu_item}>그룹</div>
				</div>
				<div className={styles.top_tab_menu}>
					<div className={styles.top_tab_menu_item}>즐겨찾기</div>
				</div>
			</div>
			<div className={styles.group_profile_container}>
				<GroupProfile
					group={{
						id: 'sdfsdf',
						groupDescription: '양씨네 가족입니다',
						groupName: '양씨네가족',
					}}
				></GroupProfile>
			</div>
			<div className={styles.list_container}>
				<div>
					<Profile username={'양광성'} role={'관리자'}></Profile>
				</div>
				<div>
					<Profile username={'양우성'} role={'멤버'}></Profile>
				</div>
			</div>
		</div>
	);
};

export default RightSidebar;
