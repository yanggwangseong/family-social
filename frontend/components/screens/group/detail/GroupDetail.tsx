import React, { FC, useRef, useState } from 'react';
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
import { motion } from 'framer-motion';
import TabMenu from '@/components/ui/tab-menu/TabMenu';
import { groupTabMenus } from '@/components/ui/tab-menu/tab-menu.constants';
import { BUTTONGESTURE } from '@/utils/animation/gestures';
import { useCreateFeed } from '@/hooks/useCreateFeed';

const GroupDetail: FC = () => {
	const router = useRouter();
	const { groupId } = router.query as { groupId: string };

	const { handleCreateFeed } = useCreateFeed();

	const invitationModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenInvitation,
		handleToggleModal: handleCloseInvitationModal,
	} = useModal(invitationModalWrapperRef);

	return (
		<Format title={'group-detail'}>
			<div className={styles.container}>
				{/* 헤더 */}
				<Header />
				<div className={styles.contents_container}>
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
									<div className={styles.btn_text}>수정</div>
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
								<div>피드</div>
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
