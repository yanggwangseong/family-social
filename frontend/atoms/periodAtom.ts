import { atom } from 'recoil';

export interface PeriodsType {
	period: string;
	startTime: string;
	endTime: string;
	tourisms?: TourismType[];
}

export interface TourismType {
	contentId: string;
	stayTime: string;
	tourismImage: string;
	title: string;
	position: number;
	stayTimeWritable: boolean;
}

export const periodAtom = atom<PeriodsType[]>({
	default: [],
	key: 'periods',
});
