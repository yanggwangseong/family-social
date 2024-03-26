import { Union, schdulePages } from 'types';

export interface ScheduleSidebarProps {
	isSelecteGroup: string;
	isScheduleName: string;
	isStartEndPeriod: {
		startPeriod: string;
		endPeriod: string;
	};
	isPage: Union<typeof schdulePages>;
}
