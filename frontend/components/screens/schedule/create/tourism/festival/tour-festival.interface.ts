import { PeriodsType } from '@/atoms/periodAtom';

export interface TourFestivalProps {
	onChangePeriods: (dates: PeriodsType[]) => void;
}
