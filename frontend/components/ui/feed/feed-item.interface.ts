export interface FeedItemProps {
	id: string;
	myLike?: boolean;
	sumLike?: number;
	page: number;
	onLike: (feedId: string, page: number) => void;
}
