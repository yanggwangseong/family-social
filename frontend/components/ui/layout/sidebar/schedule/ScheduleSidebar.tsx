import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './ScheduleSidebar.module.scss';

import { ScheduleSidebarProps } from './schedule-sidebar.interface';
import cn from 'classnames';
import { PiEqualsBold, PiMinusBold } from 'react-icons/pi';
import ScheduleSidebarController from './ScheduleSidebarController';
import { useResizeVertical } from '@/hooks/useResizeVertical';
import { useIsMobile } from '@/hooks/useIsMobile';

const ScheduleSidebar: FC<ScheduleSidebarProps> = ({
	isSelecteGroup,
	isScheduleName,
	isStartEndPeriod,
	isPage,
	onChangePage,
	isClosePanel,
	handleClosePanel,
}) => {
	const { handleTouchStart, handleMouseDown, sidebarRef } = useResizeVertical(
		80,
		330,
	);

	if (isPage === 'selectGroupPage') return null;

	return (
		<div
			className={cn(styles.right_sidebar_container, {
				[styles.mobile_toruism_sidebar]:
					isClosePanel === false &&
					(isPage === 'tourismPage' ||
						isPage === 'scheduleDatePage' ||
						isPage === 'periodPage'),
			})}
			ref={sidebarRef}
		>
			<div className={styles.panel_btn_container}>
				<div
					className={styles.resize_panel_btn}
					onMouseDown={handleMouseDown}
					onTouchStart={handleTouchStart}
				>
					<PiEqualsBold size={24} />
				</div>
				<div className={styles.panel_close_btn} onClick={handleClosePanel}>
					<PiMinusBold size={14} />
				</div>
			</div>
			<ScheduleSidebarController
				isSelecteGroup={isSelecteGroup}
				isScheduleName={isScheduleName}
				isStartEndPeriod={isStartEndPeriod}
				isPage={isPage}
				status={isPage}
				onChangePage={onChangePage}
				isClosePanel={isClosePanel}
				handleClosePanel={handleClosePanel}
			/>
		</div>
	);
};

export default ScheduleSidebar;
