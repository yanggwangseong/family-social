import React, { FC, useState } from 'react';
import styles from './RightSidebar.module.scss';
import cn from 'classnames';

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
		</div>
	);
};

export default RightSidebar;
