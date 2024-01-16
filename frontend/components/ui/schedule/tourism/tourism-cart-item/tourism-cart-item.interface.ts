import { TourismType } from '@/atoms/periodAtom';

export interface TourismCartItemProps {
	dataPosition: number;
	item: TourismType;
	onDragOver: (e: React.DragEvent<Element>) => void;
	onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragEnd: (e: React.DragEvent<Element>) => void;
	onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
	onDragLeave: (e: React.DragEvent<Element>) => void;
	onCompleTime: (position: number, hour: number, minute: number) => void;
}
