import { PeriodsType } from '@/atoms/periodAtom';
import { Union, schdulePages } from 'types';

export interface ScheduleDateProps {
	handleChangePage: (page: Union<typeof schdulePages>) => void;
	onChangeScheduleName: (name: string) => void;
	isScheduleName: string;
	onChangePeriods: (dates: PeriodsType[]) => void;
	handleChangeDate: (dates: [Date, Date]) => void;
	startDate: Date;
	endDate: Date;
	isPeriodTimes: PeriodsType[];
}
