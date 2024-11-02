import React, { ChangeEvent, FC, PropsWithChildren, useRef } from 'react';
import styles from './GroupDetailFormat.module.scss';
import Header from '@/components/ui/header/Header';
import { GroupDetailFormatProps } from './group-detail-format.interface';
import LottieLike from '@/components/ui/lottie/LottieLike';

import GroupDetailSidebar from '@/ui/layout/sidebar/group/detail/GroupDetailSidebar';
import Image from 'next/image';
import { PiPencilDuotone, PiLightningDuotone } from 'react-icons/pi';
import { motion } from 'framer-motion';
import TabMenu from '@/ui/tab-menu/TabMenu';
import { groupTabMenus } from '@/ui/tab-menu/tab-menu.constants';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import ToggleModal from '@/ui/modal/ToggleModal';
import { InviteMenu } from '@/ui/modal/toggle-menu.constants';
import { useModal } from '@/hooks/useModal';
import CustomButton from '@/ui/button/custom-button/CustomButton';
import Profile from '@/ui/profile/Profile';
import { MediaService } from '@/services/media/media.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useCreateEvent } from '@/hooks/useCreateEvent';
import { useCreateMutation } from '@/hooks/useCreateMutation';
import { useRecoilState } from 'recoil';
import { modalAtom, modalLayerAtom } from '@/atoms/modalAtom';
import { useRouter } from 'next/router';
import { LayerMode } from 'types';
import { groupFollowAtom } from '@/atoms/groupFollowAtom';

const GroupDetailFormat: FC<PropsWithChildren<GroupDetailFormatProps>> = ({
	children,
	groupId,
	lottieRef,
	handleLottieComplete,
	page,
	groupAccessLevel,
}) => {
	const router = useRouter();
	const [isShowing, setIsShowing] = useRecoilState(modalAtom);
	const [, setIsLayer] = useRecoilState(modalLayerAtom);
	const [, setGroupFollow] = useRecoilState(groupFollowAtom);

	const { handleCreateFeed } = useCreateFeed();

	const { handleCreateEvent } = useCreateEvent();

	const hiddenFileInput = useRef<HTMLInputElement | null>(null);

	const invitationModalWrapperRef = useRef<HTMLDivElement>(null);

	const {
		isShowing: isOpenInvitation,
		handleToggleModal: handleCloseInvitationModal,
	} = useModal(invitationModalWrapperRef);

	const { mutateAsync } = useCreateMutation(
		async (file: File) =>
			await MediaService.uploadGroupCoverImage(file, groupId),
		{
			mutationKey: ['group-cover-image-upload'],
			onSuccess: data => {
				Loading.remove();
				Report.success('성공', `이미지 업로드에 성공 하였습니다.`, '확인');
			},
		},
	);

	const handleGroupCoverImageUpload = async (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const uploadedFiles: File[] = Array.from(event.target.files || []);

		await mutateAsync(uploadedFiles[0]);
	};

	const handleClick = () => {
		hiddenFileInput.current!.click();
	};

	const handleFollowLayerModal = () => {
		setIsShowing(!isShowing);
		setIsLayer({
			modal_title: '그룹 팔로우',
			layer: LayerMode.groupFollowModal,
		});
		setGroupFollow({ groupId });
	};

	console.log(groupAccessLevel.accessLevel);
	// [TODO] api/groups/:groupId 수정 필요.
	const isMineGroup = false;

	return (
		<div className={styles.container}>
			{/* 헤더 */}
			<Header />
			<div className={styles.contents_container}>
				{/* lottie-like */}
				{page === 'GROUPFEED' && lottieRef && handleLottieComplete && (
					<LottieLike
						lottieRef={lottieRef}
						onLottieComplete={handleLottieComplete}
					/>
				)}

				<GroupDetailSidebar
					groupId={groupId}
					groupAccessLevel={groupAccessLevel}
					handleFollowLayerModal={handleFollowLayerModal}
				/>

				<div className={styles.detail_container}>
					<div className={styles.main}>
						<div className={styles.banner_img_container}>
							<Image
								fill
								src={'/images/banner/group-base.png'}
								alt="banner"
							></Image>
							{/* TODO 그룹 역할이 main일때 수정 가능 */}
							<div className={styles.banner_edit_btn}>
								<PiPencilDuotone size={22} />
								<button className={styles.btn_text} onClick={handleClick}>
									수정
								</button>

								<input
									type="file"
									id="fileUpload"
									style={{ display: 'none' }}
									onChange={handleGroupCoverImageUpload}
									ref={hiddenFileInput}
								/>
							</div>
						</div>
						<div className={styles.main_contents_container}>
							<div className={styles.banner_profile_contaienr}>
								{/* 프로필 [TODO] */}
								{/* 본인이 해당 그룹에 속해 있을때만 표시 */}
								{isMineGroup ? (
									<>
										<Profile
											username="양광성2"
											role="관리자"
											searchMember={{
												id: '410b7202-660a-4423-a6c3-6377857241cc',
												username: '양광성',
												email: 'rhkdtjd_12@naver.com',
												profileImage: '/images/profile/profile.png',
											}}
										/>

										<div className={styles.banner_profile_right_contaienr}>
											{page === 'GROUPFEED' && (
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
											)}

											{page === 'GROUPEVENT' && (
												<div className={styles.create_feed_btn}>
													<CustomButton
														type="button"
														className="bg-customOrange text-customDark 
												font-bold border border-solid border-customDark 
												rounded-full w-full py-[10px] px-7
												hover:bg-orange-500
												"
														onClick={handleCreateEvent}
													>
														+ 이벤트 만들기
													</CustomButton>
												</div>
											)}
											{/* TODO 그룹 역할이 main일때 초대 가능 */}
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
									</>
								) : (
									<div className={styles.create_feed_btn}>
										<CustomButton
											type="button"
											className="bg-customOrange text-customDark 
												font-bold border border-solid border-customDark 
												rounded-full w-full py-[10px] px-7
												hover:bg-orange-500
												"
											onClick={handleFollowLayerModal}
										>
											+ 팔로우
										</CustomButton>
									</div>
								)}
							</div>
							{/* 탭 메뉴 */}
							<div className={styles.tap_menu_container}>
								<TabMenu list={groupTabMenus} options={page} />
							</div>
							{children}
						</div>
					</div>
					{page === 'GROUPFEED' && (
						<div
							className={styles.mobile_create_feed_btn_container}
							onClick={handleCreateFeed}
						>
							<motion.div {...BUTTONGESTURE}>
								<PiPencilDuotone size={28} color="#0a0a0a" />
							</motion.div>
						</div>
					)}

					{page === 'GROUPEVENT' && (
						<div
							className={styles.mobile_create_feed_btn_container}
							onClick={handleCreateEvent}
						>
							<motion.div {...BUTTONGESTURE}>
								<PiLightningDuotone size={28} color="#0a0a0a" />
							</motion.div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default GroupDetailFormat;
