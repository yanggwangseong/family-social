import { PeriodsType } from '@/atoms/periodAtom';

export interface TourContentTypeProps {
	onChangePeriods: (dates: PeriodsType[]) => void;
	isSelectedPeriod: PeriodsType;
}
