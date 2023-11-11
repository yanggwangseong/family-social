import React, { FC } from 'react';
import styles from './TabMenu.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { TabeMenuListType } from './tab-menu.interface';

const TabMenu: FC<{
	list: TabeMenuListType[];
	options: 'TOP' | 'MYFEED' | 'ALL';
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
					{item.options}
				</Link>
			))}
			{/* <Link
				className={cn(styles.tab_menu_item, {
					[styles.active]: options === 'TOP',
				})}
				href={'/feeds?options=TOP'}
			>
				TOP
			</Link>
			<Link
				className={cn(styles.tab_menu_item, {
					[styles.active]: options === 'MYFEED',
				})}
				href={'/feeds?options=MYFEED'}
			>
				MY FEED
			</Link>
			<Link
				className={cn(styles.tab_menu_item, {
					[styles.active]: options === 'ALL',
				})}
				href={'/feeds?options=ALL'}
			>
				ALL
			</Link> */}
		</div>
	);
};

export default TabMenu;
