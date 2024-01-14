import { PeriodsType } from '@/atoms/periodAtom';

export interface TourismItemProps {
	tour: any;
	onChangePeriods: (dates: PeriodsType[]) => void;
}
