import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ScheduleSidebar.module.scss';

import { ScheduleSidebarProps } from './schedule-sidebar.interface';
import cn from 'classnames';
import { PiEqualsBold } from 'react-icons/pi';
import ScheduleSidebarController from './ScheduleSidebarController';
import { useResizeVertical } from '@/hooks/useResizeVertical';

const ScheduleSidebar: FC<ScheduleSidebarProps> = ({
	isSelecteGroup,
	isScheduleName,
	isStartEndPeriod,
	isPage,
}) => {
	const maxSidebarHeight = window.innerHeight - 80;
	const minSidebarHeight = 330;

	const { handleTouchStart, handleMouseDown, sidebarRef } = useResizeVertical(
		maxSidebarHeight,
		minSidebarHeight,
	);

	if (isPage === 'selectGroupPage') return null;

	return (
		<div
			className={cn(styles.right_sidebar_container, {
				[styles.mobile_toruism_sidebar]: isPage === 'tourismPage',
			})}
			ref={sidebarRef}
		>
			<div
				className={styles.resize_panel_btn}
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
			>
				<PiEqualsBold size={24} />
			</div>
			<ScheduleSidebarController
				isSelecteGroup={isSelecteGroup}
				isScheduleName={isScheduleName}
				isStartEndPeriod={isStartEndPeriod}
				isPage={isPage}
				status={isPage}
			/>
		</div>
	);
};

export default ScheduleSidebar;
