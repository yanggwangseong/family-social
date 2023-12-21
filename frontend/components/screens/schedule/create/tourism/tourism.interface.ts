import { PeriodsType } from '@/atoms/periodAtom';

export interface TourismProps {
	onChangePeriods: (dates: PeriodsType[]) => void;
	isSelectedPeriod: PeriodsType;
}
