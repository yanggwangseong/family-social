export interface FeedItemProps {
	id: string;
	myLike?: boolean;
	onLike: (feedId: string) => void;
}
