import { PeriodsType } from '@/atoms/periodAtom';

export interface ScheduleSidebarProps {
	periodItem: PeriodsType;
	onSelectedPeriod: (period: PeriodsType) => void;
}
