import { PeriodsType } from '@/atoms/periodAtom';
import { Union, schdulePages } from 'types';

export interface SchedulePeriodProps {
	onChangePage: (page: Union<typeof schdulePages>) => void;
	onChangePeriods: (dates: PeriodsType[]) => void;
	onChangeScheduleName: (name: string) => void;
	isPeriods: PeriodsType[];
}
