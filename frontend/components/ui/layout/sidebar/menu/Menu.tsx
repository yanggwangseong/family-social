import React, { FC } from 'react';
import styles from './Menu.module.scss';
import { MenuProps } from './menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

const Menu: FC<MenuProps> = ({ link, Icon, menu, handleCloseMainSidebar }) => {
	const router = useRouter();
	const { pathname } = router;

	const onCloseMainSidebar = () => {
		handleCloseMainSidebar();
	};

	return (
		<Link
			className={cn(styles.sidebar_menu_container, {
				[styles.active]: !!pathname.startsWith(link),
			})}
			href={link}
			onClick={onCloseMainSidebar}
		>
			<Icon size={40}></Icon>
			<div className={styles.sidebar_menu_text}>{menu}</div>
		</Link>
	);
};

export default Menu;
