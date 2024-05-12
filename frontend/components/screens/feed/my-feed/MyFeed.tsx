import React, { FC, useEffect, useState } from 'react';
import styles from './MyFeed.module.scss';
import { useInfiniteQuery } from 'react-query';
import { FeedService } from '@/services/feed/feed.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import FeedItem from '@/components/ui/feed/FeedItem';
import { useFeedLike } from '@/hooks/useFeedLike';
import { useCommentLike } from '@/hooks/useCommentLike';
import { AnimatePresence } from 'framer-motion';
import { useFeedIntersectionObserver } from '@/hooks/useFeedIntersectionObserver';

const MyFeed: FC<{
	handleIsLottie: (status: boolean) => void;
}> = ({ handleIsLottie }) => {
	// const {
	// 	data,
	// 	fetchNextPage,
	// 	hasNextPage,
	// 	isLoading,
	// 	isError,
	// 	isRefetching,
	// 	refetch,
	// } = useInfiniteQuery(
	// 	['my-feeds'],
	// 	async ({ pageParam = 1 }) =>
	// 		await FeedService.getFeeds(pageParam, 'MYFEED'),
	// 	{
	// 		getNextPageParam: (lastPage, allPosts) => {
	// 			return lastPage.page !== allPosts[0].totalPage
	// 				? lastPage.page + 1
	// 				: undefined;
	// 		},
	// 	},
	// );

	// const [observedPost, setObservedPost] = useState('');

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useFeedIntersectionObserver(
		['my-feeds'],
		async ({ pageParam = 1 }) =>
			await FeedService.getFeeds(pageParam, 'MYFEED'),
	);

	const handleRefetch = (pageValue: number) => {
		refetch({ refetchPage: (page, index) => index === pageValue - 1 });
	};

	const { handleUpdateLike } = useFeedLike({ handleRefetch, handleIsLottie });

	const { handleLikeComment } = useCommentLike({
		handleRefetch,
		handleIsLottie,
	});

	// useEffect(() => {
	// 	const observeElement = (element: HTMLElement | null) => {
	// 		if (!element) return;
	// 		// 브라우저 viewport와 설정한 요소(Element)와 교차점을 관찰
	// 		const observer = new IntersectionObserver(
	// 			// entries는 IntersectionObserverEntry 인스턴스의 배열
	// 			entries => {
	// 				console.log('entries', entries);
	// 				// isIntersecting: 관찰 대상의 교차 상태(Boolean)
	// 				if (entries[0].isIntersecting === true) {
	// 					console.log('마지막 포스트에 왔습니다');
	// 					fetchNextPage();
	// 					observer.unobserve(element); //이전에 observe 하고 있던걸 없애준다.
	// 				}
	// 			},
	// 			{ threshold: 1 },
	// 		);
	// 		// 대상 요소의 관찰을 시작
	// 		observer.observe(element);
	// 	};

	// 	//포스트가 없다면 return
	// 	if (
	// 		!data?.pages[data?.pages.length - 1].list ||
	// 		data?.pages[data?.pages.length - 1].list.length === 0
	// 	)
	// 		return;
	// 	//posts 배열안에 마지막 post에 id를 가져옵니다.
	// 	const id =
	// 		data?.pages[data?.pages.length - 1].list[
	// 			data?.pages[data?.pages.length - 1].list.length - 1
	// 		].feedId;
	// 	//posts 배열에 post가 추가되서 마지막 post가 바뀌었다면
	// 	// 바뀐 post중 마지막post를 observedPost로
	// 	if (id !== observedPost) {
	// 		setObservedPost(id);
	// 		observeElement(document.getElementById(id));
	// 	}
	// 	return () => {};
	// }, [data, fetchNextPage, observedPost]);

	return (
		<div className={styles.feed_container}>
			{isLoading && <Skeleton />}
			{data?.pages.map((page, pageIndex) => (
				<AnimatePresence key={pageIndex}>
					{page.list.map((feed, index) => (
						<FeedItem
							key={feed.feedId}
							index={index}
							feed={feed}
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

export default MyFeed;
