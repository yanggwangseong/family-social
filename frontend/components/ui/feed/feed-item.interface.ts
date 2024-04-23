import { FeedInfo } from '@/shared/interfaces/feed.interface';

export interface FeedItemProps {
	feed: FeedInfo;
	page: number;
	index: number;
	onLike: (feedId: string, page: number, feedWriterId: string) => void;
	onRefetch: (pageValue: number) => void;
	onLikeComment: (feedId: string, commentId: string, page: number) => void;
}
