import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleSidebar.module.scss';

import { ScheduleSidebarProps } from './schedule-sidebar.interface';
import cn from 'classnames';
import SidebarScheduleTourism from './sidebar-schedule-tourism/SidebarScheduleTourism';
import SidebarSharedMembers from './sidebar-shared-members/SidebarSharedMembers';
import ScheduleSidebarController from './ScheduleSidebarController';

const ScheduleSidebar: FC<ScheduleSidebarProps> = ({
	isSelecteGroup,
	isScheduleName,
	isStartEndPeriod,
	isPage,
}) => {
	if (isPage === 'selectGroupPage') return null;

	return (
		<div
			className={cn(styles.right_sidebar_container, {
				[styles.mobile_toruism_sidebar]: isPage === 'tourismPage',
			})}
		>
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
