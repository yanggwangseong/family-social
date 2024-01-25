import { PeriodsType } from '@/atoms/periodAtom';

export interface TourSearchProps {
	onChangePeriods: (dates: PeriodsType[]) => void;
}
