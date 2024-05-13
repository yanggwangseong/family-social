import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './GroupDetail.module.scss';
import Format from '@/components/ui/layout/Format';
import { useRouter } from 'next/router';
import Header from '@/components/ui/header/Header';
import GroupDetailSidebar from '@/components/ui/layout/sidebar/group/detail/GroupDetailSidebar';
import Image from 'next/image';
import Profile from '@/components/ui/profile/Profile';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import ToggleModal from '@/components/ui/modal/ToggleModal';
import { InviteMenu } from '@/components/ui/modal/toggle-menu.constants';
import { useModal } from '@/hooks/useModal';
import { PiPencilDuotone } from 'react-icons/pi';
import { AnimatePresence, motion } from 'framer-motion';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { groupTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import LottieLike from '@/components/ui/lottie/LottieLike';
import { useLottieLike } from '@/hooks/useLottieLike';
import { useFeedLike } from '@/hooks/useFeedLike';
import { useCommentLike } from '@/hooks/useCommentLike';
import { useInfiniteQuery, useMutation } from 'react-query';
import { FeedService } from '@/services/feed/feed.service';
import { GroupService } from '@/services/group/group.service';
import Skeleton from '@/components/ui/skeleton/Skeleton';
import FeedItem from '@/components/ui/feed/FeedItem';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useFeedIntersectionObserver } from '@/hooks/useFeedIntersectionObserver';
import axios from 'axios';
import { MediaService } from '@/services/media/media.service';

const GroupDetail: FC = () => {
	const router = useRouter();

	const query = router.query as {
		options: 'GROUPFEED' | 'GROUPMEMBER' | 'GROUPEVENT';
	};

	//const [observedPost, setObservedPost] = useState('');

	const { groupId } = router.query as { groupId: string };

	const { handleCreateFeed } = useCreateFeed();

	const { handleIsLottie, lottieRef, handleLottieComplete } = useLottieLike();

	const hiddenFileInput = useRef<HTMLInputElement | null>(null);

	const invitationModalWrapperRef = useRef<HTMLDivElement>(null);

	const {
		isShowing: isOpenInvitation,
		handleToggleModal: handleCloseInvitationModal,
	} = useModal(invitationModalWrapperRef);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isError,
		isRefetching,
		refetch,
	} = useFeedIntersectionObserver(
		['group-feeds', groupId],
		async ({ pageParam = 1 }) =>
			await FeedService.getFeeds(pageParam, 'GROUPFEED', groupId),
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

	const { mutateAsync } = useMutation(
		['profile-image-upload'],
		async (file: File) =>
			await MediaService.uploadGroupCoverImage(file, groupId),
		{
			onMutate: variable => {
				Loading.hourglass();
			},
			onSuccess(data) {
				Loading.remove();
				Report.success('성공', `이미지 업로드에 성공 하였습니다.`, '확인');
			},
			onError(error) {
				if (axios.isAxiosError(error)) {
					Report.warning('실패', `${error.response?.data.message}`, '확인');
				}
			},
		},
	);

	const handleAddDocuments = async (event: ChangeEvent<HTMLInputElement>) => {
		const uploadedFiles: File[] = Array.from(event.target.files || []);

		await mutateAsync(uploadedFiles[0]);
	};

	const handleClick = () => {
		hiddenFileInput.current!.click();
	};

	return (
		<Format title={'group-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
					{/* lottie-like */}
					<LottieLike
						lottieRef={lottieRef}
						onLottieComplete={handleLottieComplete}
					/>

					<GroupDetailSidebar groupId={groupId} />
					<div className={styles.detail_container}>
						<div className={styles.main}>
							<div className={styles.banner_img_container}>
								<Image
									fill
									src={'/images/banner/group-base.png'}
									alt="banner"
								></Image>
								<div className={styles.banner_edit_btn}>
									<PiPencilDuotone size={22} />
									<button className={styles.btn_text} onClick={handleClick}>
										수정
									</button>

									<input
										type="file"
										id="fileUpload"
										style={{ display: 'none' }}
										onChange={handleAddDocuments}
										ref={hiddenFileInput}
									/>
								</div>
							</div>
							<div className={styles.main_contents_container}>
								<div className={styles.banner_profile_contaienr}>
									{/* 프로필 */}
									<Profile username="양광성" role="관리자" />
									<div className={styles.banner_profile_right_contaienr}>
										<div className={styles.create_feed_btn}>
											<CustomButton
												type="button"
												className="bg-customOrange text-customDark 
												font-bold border border-solid border-customDark 
												rounded-full w-full py-[10px] px-7
												hover:bg-orange-500
												"
												onClick={handleCreateFeed}
											>
												+ 피드
											</CustomButton>
										</div>
										<motion.div
											className={styles.toggle_menu_container}
											initial={false}
											animate={isOpenInvitation ? 'open' : 'closed'}
											ref={invitationModalWrapperRef}
										>
											<CustomButton
												type="button"
												className="bg-customOrange text-customDark 
												font-bold border border-solid border-customDark 
												rounded-full w-full py-[10px] px-7
												hover:bg-orange-500
												"
												onClick={handleCloseInvitationModal}
											>
												+ 초대하기
											</CustomButton>

											{/*  toggle modal */}
											<ToggleModal
												list={InviteMenu}
												onClose={handleCloseInvitationModal}
											/>
										</motion.div>
									</div>
								</div>
								{/* 탭 메뉴 */}
								<div className={styles.tap_menu_container}>
									<TabMenu list={groupTabMenus} options={'GROUPFEED'} />
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
				</div>
			</div>
		</Format>
	);
};

export default GroupDetail;
