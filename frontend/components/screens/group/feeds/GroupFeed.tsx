import React, { FC, useState } from 'react';
import styles from './GroupFeed.module.scss';
import Format from '@/components/ui/layout/Format';
import feedAnimation from '@/assets/lottie/feed.json';
import Lottie from 'lottie-react';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';
import { useInfiniteSelect } from '@/hooks/useInfiniteSelect';
import { FeedService } from '@/services/feed/feed.service';
import { FEED_PAGINATE_LIMIT } from '@/constants/pagination.constant';

const GroupFeed: FC = () => {
	const [observedPost, setObservedPost] = useState<string | null>(null);

	const {
		data,
		isLoading,
		isRefetching,
		fetchNextPage,
		hasNextPage,
		isError,
		refetch,
	} = useInfiniteSelect(
		['my-group-feeds'],
		async ({ pageParam = 1 }) =>
			await FeedService.getMyFeedsByBelongToGroups(
				pageParam,
				FEED_PAGINATE_LIMIT,
			),
	);

	return (
		<Format title={'group-feeds'}>
			<GroupFormat>
				<div className={styles.top_title_container}>
					<div className={styles.top_title}>내 피드</div>
				</div>
				{/* 그룹별 내가 올린 피드가 만약 없을경우 */}
				<div>
					<div className={styles.lottie_container}>
						<Lottie className={styles.lottie} animationData={feedAnimation} />
					</div>
					<div className={styles.found_title}>내가 올린 피드가 없습니다</div>
				</div>
			</GroupFormat>
		</Format>
	);
};

export default GroupFeed;
