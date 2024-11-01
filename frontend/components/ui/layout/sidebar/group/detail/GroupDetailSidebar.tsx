import React, { FC, useRef, useState } from 'react';
import styles from './GroupDetailSidebar.module.scss';
import GroupProfile from '@/components/ui/profile/group-profile/GroupProfile';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import {
	PiUserDuotone,
	PiHouseDuotone,
	PiGearSixDuotone,
	PiUsersDuotone,
	PiUserPlusDuotone,
} from 'react-icons/pi';
import Line from '@/components/ui/line/Line';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import Link from 'next/link';
import ToggleModal from '@/components/ui/modal/ToggleModal';
import {
	GroupSettingMenu,
	InviteMenu,
} from '@/components/ui/modal/toggle-menu.constants';
import { useModal } from '@/hooks/useModal';
import { useMainSidebar } from '@/hooks/useMainSidebar';
import { motion } from 'framer-motion';
import { BUTTONGESTURE, INLINEBUTTONGESTURE } from '@/utils/animation/gestures';
import { useMenuAnimation } from '@/hooks/useMenuAnimation';
import { GroupDetailSidebarProps } from './group-detail-sidebar.interface';

const GroupDetailSidebar: FC<GroupDetailSidebarProps> = ({
	groupId,
	groupAccessLevel,
}) => {
	const [isToggleSetting, setToggleSetting] = useState<boolean>(true);

	const invitationModalWrapperRef = useRef<HTMLDivElement>(null);
	const settingModalWrapperRef = useRef<HTMLDivElement>(null);
	const {
		isShowing: isOpenInvitation,
		handleToggleModal: handleCloseInvitationModal,
	} = useModal(invitationModalWrapperRef);

	const {
		isShowing: isOpenSetting,
		handleToggleModal: handleCloseSettingModal,
	} = useModal(settingModalWrapperRef);

	const {
		isLeftSidebarShowing,
		setIsLeftSidebarShowing,
		handleCloseMainSidebar,
	} = useMainSidebar();

	const { sidebarScope } = useMenuAnimation(isLeftSidebarShowing);

	return (
		<>
			<motion.div className={styles.sidebar_container} ref={sidebarScope}>
				<motion.div
					className={styles.mobile_close_btn}
					onClick={handleCloseMainSidebar}
				>
					x
				</motion.div>
				<GroupProfile group={groupAccessLevel.group} />

				{/* 라인 */}
				<Line />

				{/* <div className={styles.sidebar_member_container}>
					<div className={styles.icon_container}>
						<PiUserDuotone size={24} color="#0a0a0a" />
					</div>
					<div
						className={styles.member_text}
					>{`${groupDetail.memberCount} 명`}</div>
				</div> */}
				<div className={styles.sidebar_member_container}>
					<div className={styles.member_container}>
						<div className={styles.icon_container}>
							<PiUserDuotone size={24} color="#0a0a0a" />
						</div>
						<div
							className={styles.member_text}
						>{`멤버 ${groupAccessLevel.memberCount}명`}</div>
					</div>
					<div className={styles.follow_container}>
						<div className={styles.follower_container}>
							<div className={styles.icon_container}>
								<PiUsersDuotone size={24} color="#0a0a0a" />
							</div>
							<div
								className={styles.member_text}
							>{`팔로워 ${groupAccessLevel.followers.length}개`}</div>
						</div>
						<div className={styles.following_container}>
							<div className={styles.icon_container}>
								<PiUserPlusDuotone size={24} color="#0a0a0a" />
							</div>
							<div
								className={styles.member_text}
							>{`팔로잉 ${groupAccessLevel.followings.length}개`}</div>
						</div>
					</div>
				</div>

				{/* 라인 */}
				<Line />

				<div className={styles.sidebar_btn_container}>
					{/* TODO 그룹 역할이 main일때 가능 아닐경우 팔로우 버튼 표시 */}
					<motion.div
						className={styles.toggle_menu_btn_container}
						initial={false}
						animate={isOpenInvitation ? 'open' : 'closed'}
						ref={invitationModalWrapperRef}
					>
						<CustomButton
							type="button"
							className="bg-customOrange text-customDark 
							font-bold border border-solid border-customDark 
							rounded-full p-[10px] w-full
							hover:bg-orange-500
							"
							onClick={handleCloseInvitationModal}
						>
							+ 초대하기
						</CustomButton>

						<ToggleModal
							list={InviteMenu}
							onClose={handleCloseInvitationModal}
						/>
					</motion.div>
					<motion.div
						className={styles.toggle_menu_icon_container}
						initial={false}
						animate={isOpenSetting ? 'open' : 'closed'}
						ref={settingModalWrapperRef}
					>
						<motion.div {...BUTTONGESTURE}>
							<BsThreeDots size={22} onClick={handleCloseSettingModal} />
						</motion.div>

						<ToggleModal
							list={GroupSettingMenu}
							onClose={handleCloseSettingModal}
						/>
					</motion.div>
				</div>
				<motion.div
					className={styles.sidebar_home_btn_container}
					onClick={handleCloseMainSidebar}
					{...INLINEBUTTONGESTURE}
				>
					<div className={styles.home_menu_container}>
						<div className={styles.icon_container}>
							<PiHouseDuotone size={22} />
						</div>
						<div className={styles.home_menu_text}>
							<div>커뮤니티 홈</div>
						</div>
					</div>
				</motion.div>

				<Line />

				{/* TODO 그룹 역할이 main일때 가능 */}
				<div className={styles.management_menu_container}>
					<div
						className={styles.management_toggle_menu_container}
						onClick={() => setToggleSetting(!isToggleSetting)}
					>
						<div className={styles.menu_text}>관리자 도구</div>
						<div className={styles.toggle_icon}>
							{isToggleSetting ? (
								<IoIosArrowUp size={22} />
							) : (
								<IoIosArrowDown size={22} />
							)}
						</div>
					</div>
					{isToggleSetting && (
						<motion.div {...INLINEBUTTONGESTURE}>
							<Link
								className={styles.menu_item_container}
								href={`/groups/${groupId}/edit`}
								onClick={handleCloseMainSidebar}
							>
								<div className={styles.icon_container}>
									<PiGearSixDuotone size={22} />
								</div>
								<div className={styles.menu_container}>
									<div>그룹 설정</div>
									<div className={styles.description}>
										그룹 정보 수정 등 관리
									</div>
								</div>
							</Link>
						</motion.div>
					)}
				</div>
			</motion.div>
		</>
	);
};

export default GroupDetailSidebar;
