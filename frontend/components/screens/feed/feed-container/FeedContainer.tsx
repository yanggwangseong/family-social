import React, { FC } from 'react';
import styles from './FeedContainer.module.scss';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { AnimatePresence } from 'framer-motion';
import FeedItem from '@/components/ui/feed/FeedItem';
import { useFeedIntersectionObserver } from '@/hooks/useFeedIntersectionObserver';
import { useRouter } from 'next/router';
import { FeedService } from '@/services/feed/feed.service';
import { useFeedLike } from '@/hooks/useFeedLike';
import { useCommentLike } from '@/hooks/useCommentLike';
import { FeedContainerProps } from './feed-container.interface';

const FeedContainer: FC<FeedContainerProps> = ({
	options = 'TOP',
	handleIsLottie,
}) => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useFeedIntersectionObserver(
		['feeds', options],
		async ({ pageParam = 1 }) => await FeedService.getFeeds(pageParam, options),
		options,
	);

	const handleRefetch = (pageValue: number) => {
		refetch({ refetchPage: (page, index) => index === pageValue - 1 });
	};

	const { handleUpdateLike } = useFeedLike({ handleRefetch, handleIsLottie });

	const { handleLikeComment } = useCommentLike({
		handleRefetch,
		handleIsLottie,
	});

	return (
		<div className={styles.feed_container}>
			{isLoading && <Skeleton />}
			{data?.pages.map((page, pageIndex) => (
				<AnimatePresence key={pageIndex}>
					{page.list.map((feed, index) => (
						<FeedItem
							key={feed.feedId}
							feed={feed}
							index={index}
							onLike={handleUpdateLike}
							page={page.page}
							onRefetch={handleRefetch}
							onLikeComment={handleLikeComment}
						/>
					))}
				</AnimatePresence>
			))}

			{isRefetching && (
				<React.Fragment>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</React.Fragment>
			)}
		</div>
	);
};

export default FeedContainer;