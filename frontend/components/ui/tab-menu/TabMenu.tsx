import React, { FC } from 'react';
import styles from './TabMenu.module.scss';

const TabMenu: FC = () => {
	return (
		<div className={styles.top_tab_menus}>
			<div className={`${styles.tab_menu_item} ${styles.active}`}>TOP</div>
			<div className={styles.tab_menu_item}>MY FEED</div>
			<div className={styles.tab_menu_item}>ALL</div>
		</div>
	);
};

export default TabMenu;
