import { PeriodsType } from '@/atoms/periodAtom';
import {
	TourFestivalItem,
	TourSearchItem,
} from '@/shared/interfaces/tour.interface';

export interface TourismItemProps {
	tourItem: TourismItemInterSactionType;
}

export type TourismItemInterSactionType = TourFestivalItem | TourSearchItem;
