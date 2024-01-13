import React, { FC } from 'react';
import styles from './TabMenu.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { TabeMenuListType } from './tab-menu.interface';
import { TabMenus, Union } from 'types';

const TabMenu: FC<{
	list: TabeMenuListType[];
	options: Union<typeof TabMenus>;
}> = ({ options = 'TOP', list }) => {
	const router = useRouter();

	return (
		<div className={styles.top_tab_menus}>
			{list.map((item, index) => (
				<Link
					key={index}
					className={cn(styles.tab_menu_item, {
						[styles.active]: options === item.options,
					})}
					href={`${item.link}`}
				>
					{item.title}
				</Link>
			))}
		</div>
	);
};

export default TabMenu;
