import React, { FC, useEffect, useState } from 'react';
import styles from './Feed.module.scss';
import Format from '@/components/ui/layout/Format';
import Header from '@/components/ui/header/Header';
import MainSidebar from '@/components/ui/layout/sidebar/main/MainSidebar';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import FeedItem from '@/components/ui/feed/FeedItem';
import { useInfiniteQuery, useMutation } from 'react-query';
import { FeedService } from '@/services/feed/feed.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import RightSidebar from '@/components/ui/layout/sidebar/main/rightSidebar/RightSidebar';
import heartAnimation from '@/assets/lottie/like.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useLottieLike } from '@/hooks/useLottieLike';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { CommentService } from '@/services/comment/comment.service';
import { useRouter } from 'next/router';
import { feedTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import MyFeed from './my-feed/MyFeed';
import { useFeedLike } from '@/hooks/useFeedLike';
import { useCommentLike } from '@/hooks/useCommentLike';
import { PiPencilDuotone } from 'react-icons/pi';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import { AnimatePresence, motion } from 'framer-motion';
import { BUTTONGESTURE } from '@/utils/animation/gestures';

const Feed: FC = () => {
	const router = useRouter();
	const query = router.query as { options: 'TOP' | 'MYFEED' | 'ALL' };

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	const { handleCreateFeed } = useCreateFeed();

	// const handleLike = () => {
	// 	if (lottieRef.current) {
	// 		lottieRef.current.play();
	// 		if (lottieRef.current?.animationContainerRef.current) {
	// 			lottieRef.current.animationContainerRef.current.style.visibility =
	// 				'visible';
	// 		}
	// 	}
	// };

	// const { mutate: feedLikeSync } = useMutation(
	// 	['feed-like'],
	// 	(data: { feedId: string; page: number }) =>
	// 		FeedService.updateLike(data.feedId),
	// 	{
	// 		onMutate: variable => {
	// 			//Loading.hourglass();
	// 		},
	// 		onSuccess(data, variable) {
	// 			const pageValue = variable.page;
	// 			if (data === true) {
	// 				handleIsLottie(true);
	// 				Notify.success('좋아요를 누르셨습니다');
	// 			}
	// 			if (data === false) {
	// 				Notify.warning('좋아요를 취소하셨습니다');
	// 			}

	// 			refetch({ refetchPage: (page, index) => index === pageValue - 1 });

	// 			//Loading.remove();
	// 			//if (data) Report.success('성공', `좋아요를 성공 하였습니다`, '확인');
	// 			//Report.success('성공', `좋아요를 취소 하였습니다`, '확인');
	// 		},
	// 		onError(error) {
	// 			if (axios.isAxiosError(error)) {
	// 				Report.warning(
	// 					'실패',
	// 					`${error.response?.data.message}`,
	// 					'확인',
	// 					() => Loading.remove(),
	// 				);
	// 			}
	// 		},
	// 	},
	// );

	// const { mutate: commentLikeSync } = useMutation(
	// 	['comment-like'],
	// 	(data: { feedId: string; commentId: string; page: number }) =>
	// 		CommentService.updateLike(data.feedId, data.commentId),
	// 	{
	// 		onMutate: variable => {
	// 			//Loading.hourglass();
	// 		},
	// 		onSuccess(data, variable) {
	// 			const pageValue = variable.page;
	// 			if (data === true) {
	// 				handleIsLottie(true);
	// 				Notify.success('좋아요를 누르셨습니다');
	// 			}
	// 			if (data === false) {
	// 				Notify.warning('좋아요를 취소하셨습니다');
	// 			}

	// 			refetch({ refetchPage: (page, index) => index === pageValue - 1 });

	// 			//Loading.remove();
	// 			//if (data) Report.success('성공', `좋아요를 성공 하였습니다`, '확인');
	// 			//Report.success('성공', `좋아요를 취소 하였습니다`, '확인');
	// 		},
	// 		onError(error) {
	// 			if (axios.isAxiosError(error)) {
	// 				Report.warning(
	// 					'실패',
	// 					`${error.response?.data.message}`,
	// 					'확인',
	// 					() => Loading.remove(),
	// 				);
	// 			}
	// 		},
	// 	},
	// );

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useInfiniteQuery(
		['feeds'],
		async ({ pageParam = 1 }) =>
			await FeedService.getFeeds(pageParam, query.options),
		{
			getNextPageParam: (lastPage, allPosts) => {
				return lastPage.page !== allPosts[0].totalPage
					? lastPage.page + 1
					: undefined;
			},
		},
	);

	const [observedPost, setObservedPost] = useState('');

	// const handleUpdateLike = (feedId: string, page: number) => {
	// 	feedLikeSync({ feedId, page });
	// };

	const handleRefetch = (pageValue: number) => {
		refetch({ refetchPage: (page, index) => index === pageValue - 1 });
	};

	const { handleUpdateLike } = useFeedLike({ handleRefetch, handleIsLottie });

	const { handleLikeComment } = useCommentLike({
		handleRefetch,
		handleIsLottie,
	});

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
			].feedId;
		//posts 배열에 post가 추가되서 마지막 post가 바뀌었다면
		// 바뀐 post중 마지막post를 observedPost로
		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
		return () => {};
	}, [data, fetchNextPage, observedPost]);

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

					{/* <Lottie
						className={styles.lottie_container}
						animationData={heartAnimation}
						loop={false}
						lottieRef={lottieRef}
						onComplete={handleLottieComplete}
					/> */}
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

							{query.options === 'MYFEED' ? (
								<MyFeed handleIsLottie={handleIsLottie} />
							) : (
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
							)}
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
