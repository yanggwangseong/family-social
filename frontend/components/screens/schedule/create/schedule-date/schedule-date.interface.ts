import { PeriodsType } from '@/atoms/periodAtom';

export interface ScheduleDateProps {
	onChangeScheduleName: (name: string) => void;
	isScheduleName: string;
	onChangeStartEndPeriod: (startPeriod: string, endPeriod: string) => void;
	onChangePeriods: (dates: PeriodsType[]) => void;
	handleChangeDate: (dates: [Date, Date]) => void;
	startDate: Date;
	endDate: Date;
}
