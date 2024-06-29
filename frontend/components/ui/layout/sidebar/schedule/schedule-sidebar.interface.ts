import { ScheduleItemResponse } from '@/shared/interfaces/schedule.interface';
import { Union, schdulePages } from 'types';

export interface ScheduleSidebarProps {
	isSelecteGroup: string;
	isScheduleName: string;
	isStartEndPeriod: {
		startPeriod: string;
		endPeriod: string;
	};
	isPage: Union<typeof schdulePages>;
	onChangePage: (page: Union<typeof schdulePages>) => void;
	isClosePanel: boolean;
	handleClosePanel: () => void;
	scheduleItem?: ScheduleItemResponse;
}
