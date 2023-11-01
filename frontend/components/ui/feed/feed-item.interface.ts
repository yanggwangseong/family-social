import { FeedInfo } from '@/shared/interfaces/feed.interface';

export interface FeedItemProps {
	feed: FeedInfo;
	page: number;
	onLike: (feedId: string, page: number) => void;
	onRefetch: (pageValue: number) => void;
	onLikeComment: (feedId: string, commentId: string, page: number) => void;
}
