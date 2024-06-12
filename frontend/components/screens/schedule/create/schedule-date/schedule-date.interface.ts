import { PeriodsType } from '@/atoms/periodAtom';

export interface ScheduleDateProps {
	onChangeScheduleName: (name: string) => void;
	isScheduleName: string;
	onChangeStartEndPeriod: (startPeriod: string, endPeriod: string) => void;
	onChangePeriods: (dates: PeriodsType[]) => void;
}
