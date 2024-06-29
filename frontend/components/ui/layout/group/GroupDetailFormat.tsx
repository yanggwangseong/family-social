import React, { ChangeEvent, FC, PropsWithChildren, useRef } from 'react';
import styles from './GroupDetailFormat.module.scss';
import Header from '../../header/Header';
import { GroupDetailFormatProps } from './group-detail-format.interface';
import LottieLike from '@/components/ui/lottie/LottieLike';

import GroupDetailSidebar from '../sidebar/group/detail/GroupDetailSidebar';
import Image from 'next/image';
import { PiPencilDuotone, PiLightningDuotone } from 'react-icons/pi';
import { motion } from 'framer-motion';
import TabMenu from '../../tab-menu/TabMenu';
import { groupTabMenus } from '../../tab-menu/tab-menu.constants';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { useCreateFeed } from '@/hooks/useCreateFeed';
import ToggleModal from '../../modal/ToggleModal';
import { InviteMenu } from '../../modal/toggle-menu.constants';
import { useModal } from '@/hooks/useModal';
import CustomButton from '../../button/custom-button/CustomButton';
import Profile from '../../profile/Profile';
import { useMutation } from 'react-query';
import { MediaService } from '@/services/media/media.service';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import axios from 'axios';
import { useCreateEvent } from '@/hooks/useCreateEvent';

const GroupDetailFormat: FC<PropsWithChildren<GroupDetailFormatProps>> = ({
	children,
	groupId,
	lottieRef,
	handleLottieComplete,
	page,
}) => {
	const { handleCreateFeed } = useCreateFeed();

	const { handleCreateEvent } = useCreateEvent();

	const hiddenFileInput = useRef<HTMLInputElement | null>(null);

	const invitationModalWrapperRef = useRef<HTMLDivElement>(null);

	const {
		isShowing: isOpenInvitation,
		handleToggleModal: handleCloseInvitationModal,
	} = useModal(invitationModalWrapperRef);

	const { mutateAsync } = useMutation(
		['group-cover-image-upload'],
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

	const handleGroupCoverImageUpload = async (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		const uploadedFiles: File[] = Array.from(event.target.files || []);

		await mutateAsync(uploadedFiles[0]);
	};

	const handleClick = () => {
		hiddenFileInput.current!.click();
	};

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
									onChange={handleGroupCoverImageUpload}
									ref={hiddenFileInput}
								/>
							</div>
						</div>
						<div className={styles.main_contents_container}>
							<div className={styles.banner_profile_contaienr}>
								{/* 프로필 */}
								<Profile username="양광성" role="관리자" />
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
