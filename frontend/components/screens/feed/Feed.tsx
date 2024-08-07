import React, { FC } from 'react';
import styles from './Feed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import FeedItem from '@/components/ui/feed/FeedItem';
import { FeedService } from '@/services/feed/feed.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';

import { useLottieLike } from '@/hooks/useLottieLike';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { useRouter } from 'next/router';
import { feedTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import MyFeed from './my-feed/MyFeed';
import { useFeedLike } from '@/hooks/useFeedLike';
import { useCommentLike } from '@/hooks/useCommentLike';
import { PiPencilDuotone } from 'react-icons/pi';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import { AnimatePresence, motion } from 'framer-motion';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { useFeedIntersectionObserver } from '@/hooks/useFeedIntersectionObserver';

const Feed: FC = () => {
	const router = useRouter();
	const query = router.query as { options: 'TOP' | 'MYFEED' | 'ALL' };

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	const { handleCreateFeed } = useCreateFeed();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useFeedIntersectionObserver(
		['feeds', query.options ?? 'TOP'],
		async ({ pageParam = 1 }) =>
			await FeedService.getFeeds(pageParam, query.options),
		query.options,
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
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					<LottieLike
						lottieRef={lottieRef}
						onLottieComplete={handleLottieComplete}
					/>

					{/* 왼쪽 사이드바 */}

					<MainSidebar />

					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							{/* 탭메뉴 */}

							<div className={styles.tap_menu_container}>
								<TabMenu list={feedTabMenus} options={query.options} />
							</div>

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
						</div>
						<div
							className={styles.mobile_create_feed_btn_container}
							onClick={handleCreateFeed}
						>
							<motion.div {...BUTTONGESTURE}>
								<PiPencilDuotone size={28} color="#0a0a0a" />
							</motion.div>
						</div>
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default Feed;
