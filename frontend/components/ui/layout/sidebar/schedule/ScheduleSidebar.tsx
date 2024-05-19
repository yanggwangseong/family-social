import React, { FC, useEffect, useState } from 'react';
import styles from './ScheduleSidebar.module.scss';

import { ScheduleSidebarProps } from './schedule-sidebar.interface';
import cn from 'classnames';
import SidebarScheduleTourism from './sidebar-schedule-tourism/SidebarScheduleTourism';

const ScheduleSidebar: FC<ScheduleSidebarProps> = ({
	isSelecteGroup,
	isScheduleName,
	isStartEndPeriod,
	isPage,
}) => {
	return (
		isPage === 'tourismPage' && (
			<div
				className={cn(styles.right_sidebar_container, {
					[styles.mobile_toruism_sidebar]: isPage === 'tourismPage',
				})}
			>
				<SidebarScheduleTourism
					isSelecteGroup={isSelecteGroup}
					isScheduleName={isScheduleName}
					isStartEndPeriod={isStartEndPeriod}
					isPage={isPage}
				/>
			</div>
		)
	);
};

export default ScheduleSidebar;
