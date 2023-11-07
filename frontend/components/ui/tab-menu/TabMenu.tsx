import React, { FC } from 'react';
import styles from './TabMenu.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

const TabMenu: FC<{
	options: 'TOP' | 'MYFEED' | 'ALL';
}> = ({ options = 'TOP' }) => {
	const router = useRouter();

	return (
		<div className={styles.top_tab_menus}>
			<Link
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
			</Link>
		</div>
	);
};

export default TabMenu;
