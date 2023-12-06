import { Union, schdulePages } from 'types';

export interface SchedulePeriodProps {
	onChangePage: (page: Union<typeof schdulePages>) => void;
}
