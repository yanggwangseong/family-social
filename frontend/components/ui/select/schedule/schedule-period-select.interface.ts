import { PeriodsType } from '@/atoms/periodAtom';

export interface SchedulePeriodSelectProps {
	selectedDate: string;
	onSelectedPeriod: (period: PeriodsType) => void;
}
