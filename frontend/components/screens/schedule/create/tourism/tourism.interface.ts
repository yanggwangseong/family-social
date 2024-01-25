import { PeriodsType } from '@/atoms/periodAtom';
import { Union } from 'types';
import { orderSelectOptions } from './tourism.constants';

export interface TourismProps {
	onChangePeriods: (dates: PeriodsType[]) => void;
}

export type orderSelectOptionsValues = Union<typeof orderSelectOptions>;
export type orderSelectOptionsKeys = keyof typeof orderSelectOptions;
