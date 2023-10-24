import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Feed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import FeedItem from '@/components/ui/feed/FeedItem';
import { useInfiniteQuery, useMutation } from 'react-query';
import { FeedService, sleep } from '@/services/feed/feed.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import heartAnimation from '@/assets/lottie/like.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';

const Feed: FC = () => {
	const [isLottie, setIsLottie] = useState<boolean>(false);

	const lottieRef = useRef<LottieRefCurrentProps>(null);

	const handleLike = () => {
		if (lottieRef.current) {
			lottieRef.current.play();
			if (lottieRef.current?.animationContainerRef.current) {
				lottieRef.current.animationContainerRef.current.style.visibility =
					'visible';
			}
		}
	};

	const { mutate: feedLikeSync } = useMutation(
		['feed-like'],
		(feedId: string) => FeedService.updateLike(feedId),
		{
			onMutate: variable => {
				//Loading.hourglass();
			},
			async onSuccess(data) {
				if (data) {
					setIsLottie(true);
				}
				//Loading.remove();
				//if (data) Report.success('성공', `좋아요를 성공 하였습니다`, '확인');
				//Report.success('성공', `좋아요를 취소 하였습니다`, '확인');
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning(
						'실패',
						`${error.response?.data.message}`,
						'확인',
						() => Loading.remove(),
					);
				}
			},
		},
	);

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

	useEffect(() => {
		if (lottieRef.current) {
			lottieRef.current.stop();
			if (lottieRef.current?.animationContainerRef.current) {
				lottieRef.current.animationContainerRef.current.style.visibility =
					'hidden';
			}
			if (isLottie) {
				lottieRef.current.play();
				if (lottieRef.current?.animationContainerRef.current) {
					lottieRef.current.animationContainerRef.current.style.visibility =
						'visible';
				}
			}
		}
	}, [isLottie]);

	const handleLottieComplete = () => {
		if (lottieRef.current) {
			lottieRef.current.stop();
			if (lottieRef.current?.animationContainerRef.current) {
				lottieRef.current.animationContainerRef.current.style.visibility =
					'hidden';
			}
			setIsLottie(false);
			//lottieRef.current.animationContainerRef.current?.style.visibility = 'hidden'
			//lottieRef.current.animationContainerRef.current?.remove();
		}
	};

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

	const handleUpdateLike = (feedId: string) => {
		feedLikeSync(feedId);
	};

	return (
		<Format title={'feed'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* {isLottie ? (
						<div className={styles.modal_mask}>
							<div className={styles.lottie_container}>
								<Lottie
									animationData={heartAnimation}
									loop={false}
									lottieRef={lottieRef}
									onComplete={handleLottieComplete}
								/>
							</div>
						</div>
					) : null} */}
					<Lottie
						className={styles.lottie_container}
						animationData={heartAnimation}
						loop={false}
						lottieRef={lottieRef}
						onComplete={handleLottieComplete}
					/>

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
											<FeedItem
												key={feed.feedId}
												id={feed.feedId}
												myLike={feed.myLike}
												onLike={handleUpdateLike}
											/>
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
