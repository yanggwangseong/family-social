import React, { FC } from 'react';
import { Union, schdulePages } from 'types';
import SidebarScheduleTourism from './sidebar-schedule-tourism/SidebarScheduleTourism';
import SidebarSharedMembers from './sidebar-shared-members/SidebarSharedMembers';
import { ScheduleSidebarProps } from './schedule-sidebar.interface';

const StatusScheduleSidebar = {
	[schdulePages[1]]: SidebarSharedMembers,
	[schdulePages[2]]: SidebarSharedMembers,
	[schdulePages[3]]: SidebarScheduleTourism,
};

interface StatusProps extends ScheduleSidebarProps {
	status: (typeof schdulePages)[1 | 2 | 3];
}

const ScheduleSidebarController: FC<StatusProps> = ({ status, ...rest }) => {
	if (typeof StatusScheduleSidebar[status] !== 'undefined') {
		return React.createElement(StatusScheduleSidebar[status], rest);
	}
	return <div>오류가 발생했습니다. 고객센터로 문의 바랍니다.</div>;
};

export default ScheduleSidebarController;
