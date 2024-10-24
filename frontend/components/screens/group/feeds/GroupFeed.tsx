import React, { FC, useEffect, useState } from 'react';
import styles from './GroupFeed.module.scss';
import Format from '@/components/ui/layout/Format';
import feedAnimation from '@/assets/lottie/feed.json';
import Lottie from 'lottie-react';
import GroupFormat from '@/components/ui/layout/group/GroupFormat';
import { useInfiniteSelect } from '@/hooks/useInfiniteSelect';
import { FeedService } from '@/services/feed/feed.service';
import { FEED_PAGINATE_LIMIT } from '@/constants/pagination.constant';
import { useFeedLike } from '@/hooks/useFeedLike';
import { useLottieLike } from '@/hooks/useLottieLike';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { useCommentLike } from '@/hooks/useCommentLike';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import { AnimatePresence } from 'framer-motion';
import FeedItem from '@/components/ui/feed/FeedItem';

const GroupFeed: FC = () => {
	const [observedPost, setObservedPost] = useState<string | null>(null);

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

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

	useEffect(() => {
		const observeElement = (element: HTMLElement | null) => {
			if (!element) return;

			// 브라우저 viewport와 설정한 요소(Element)와 교차점을 관찰
			const observer = new IntersectionObserver(
				// entries는 IntersectionObserverEntry 인스턴스의 배열
				entries => {
					console.log('entries', entries);
					// isIntersecting: 관찰 대상의 교차 상태(Boolean)
					if (entries[0].isIntersecting === true) {
						console.log('마지막 포스트에 왔습니다');
						fetchNextPage();
						observer.unobserve(element); //이전에 observe 하고 있던걸 없애준다.
					}
				},
				{ threshold: 1 },
			);
			// 대상 요소의 관찰을 시작
			observer.observe(element);
		};

		//포스트가 없다면 return
		if (
			!data?.pages[data?.pages.length - 1].list ||
			data?.pages[data?.pages.length - 1].list.length === 0
		)
			return;
		//posts 배열안에 마지막 post에 id를 가져옵니다.
		const id =
			data?.pages[data?.pages.length - 1].list[
				data?.pages[data?.pages.length - 1].list.length - 1
			].groupId;

		//posts 배열에 post가 추가되서 마지막 post가 바뀌었다면
		// 바뀐 post중 마지막post를 observedPost로
		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
		return () => {};
	}, [data, fetchNextPage, observedPost]);

	const handleRefetch = (pageValue: number) => {
		refetch({ refetchPage: (page, index) => index === pageValue - 1 });
	};

	const { handleUpdateLike } = useFeedLike({ handleRefetch, handleIsLottie });

	const { handleLikeComment } = useCommentLike({
		handleRefetch,
		handleIsLottie,
	});

	return (
		<Format title={'group-feeds'}>
			<GroupFormat>
				<LottieLike
					lottieRef={lottieRef}
					onLottieComplete={handleLottieComplete}
				/>
				<div className={styles.top_title_container}>
					<div className={styles.top_title}>내 피드</div>
				</div>

				<div className={styles.contents_container}>
					{isLoading && <Skeleton />}
					{data?.pages.map((page, pageIndex) => (
						<AnimatePresence key={pageIndex}>
							{page.list.map((feed, index) => (
								<div className={styles.feed_container} key={index}>
									{feed.feeds.map((feed, index) => (
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
								</div>
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
					{/* 그룹별 내가 올린 피드가 만약 없을경우 */}
					{data?.pages.length === 0 && (
						<div>
							<div className={styles.lottie_container}>
								<Lottie
									className={styles.lottie}
									animationData={feedAnimation}
								/>
							</div>
							<div className={styles.found_title}>
								내가 올린 피드가 없습니다
							</div>
						</div>
					)}
				</div>
			</GroupFormat>
		</Format>
	);
};

export default GroupFeed;
