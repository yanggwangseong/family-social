import React, { FC, useEffect, useState } from 'react';
import styles from './Feed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import FeedItem from '@/components/ui/feed/FeedItem';
import { useInfiniteQuery } from 'react-query';
import { FeedService } from '@/services/feed/feed.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';

const Feed: FC = () => {
	const { data, fetchNextPage, hasNextPage, isLoading, isError, isRefetching } =
		useInfiniteQuery(
			['feeds'],
			async ({ pageParam = 1 }) => await FeedService.getFeeds(pageParam),
			{
				getNextPageParam: (lastPage, allPosts) => {
					return lastPage.page !== allPosts[0].totalPage
						? lastPage.page + 1
						: undefined;
				},
			},
		);

	const [observedPost, setObservedPost] = useState('');

	useEffect(() => {
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
			].feedId;
		//posts 배열에 post가 추가되서 마지막 post가 바뀌었다면
		// 바뀐 post중 마지막post를 observedPost로
		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
		return () => {};
	}, [data]);

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

	return (
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* 왼쪽 사이드바 */}
					<MainSidebar />
					<div className={styles.detail_container}>
						<div className={styles.main_contents_container}>
							{/* 탭메뉴 */}
							<TabMenu />

							<div className={styles.feed_container}>
								{isLoading && <Skeleton />}
								{data?.pages.map((page, pageIndex) => (
									<React.Fragment key={pageIndex}>
										{page.list.map(feed => (
											<FeedItem key={feed.feedId} id={feed.feedId} />
										))}
									</React.Fragment>
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
					</div>
					{/* 오른쪽 사이드바 */}
					<RightSidebar />
				</div>
			</div>
		</Format>
	);
};

export default Feed;
