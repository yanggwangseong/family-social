import React, { FC } from 'react';
import styles from './SharedMembers.module.scss';
import { SharedMembersProps } from './shared-members.interface';
import { useHover } from '@/hooks/useHover';
import { AnimatePresence, motion } from 'framer-motion';
import SharedMembersHoverModal from '../modal/shared-members-hover-modal/SharedMembersHoverModal';
import ProfileHoverContainerModal from '../modal/profile-hover-container-modal/ProfileHoverContainerModal';

const SharedMembers: FC<SharedMembersProps> = ({
	sharedMembers,
	sharedGroup,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	return (
		<div className={styles.container}>
			<ProfileHoverContainerModal
				group={sharedGroup}
				member={sharedMembers[0].member}
				handleMouseOver={handleMouseOver}
				handleMouseOut={handleMouseOut}
				isHovering={isHovering}
			/>
			{/* <div className={styles.shared_members_img_container}>
				<div
					className={styles.group_image_container}
					onMouseOver={e => {
						e.stopPropagation();
						handleMouseOver(0);
					}}
					onMouseOut={e => {
						e.stopPropagation();
						handleMouseOut();
					}}
				>
					<Image
						fill
						src={
							groupCoverImage
								? groupCoverImage
								: '/images/banner/sm/group-base-sm.png'
						}
						alt="group-img"
					/>
					{isHovering === 0 && (
						<AnimatePresence key={0}>
							<motion.div
								key={0}
								className={styles.group_hover_modal}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
								exit={{ opacity: 0, transition: { duration: 1 } }}
							>
								<GroupHoverModal sharedGroup={sharedGroup} />
							</motion.div>
						</AnimatePresence>
					)}
				</div>
				<div
					className={styles.img_conatiner}
					onMouseOver={e => {
						e.stopPropagation(); // 이벤트 버블링 중지
						handleMouseOver(1);
					}}
					onMouseOut={e => {
						e.stopPropagation(); // 이벤트 버블링 중지
						handleMouseOut();
					}}
				>
					<Image
						className={styles.profile_img}
						fill
						src={
							sharedMembers[0].member.profileImage ??
							'/images/profile/profile.png'
						}
						alt="profile-img"
					></Image>

					{isHovering === 1 && (
						<AnimatePresence key={1}>
							<motion.div
								key={1}
								className={styles.mention_view_modal}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
								exit={{ opacity: 0, transition: { duration: 1 } }}
							>
								<MemberHoverModal
									mentionRecipient={sharedMembers[0].member}
								></MemberHoverModal>
							</motion.div>
						</AnimatePresence>
					)}
				</div>
			</div> */}
			<div
				className={styles.shared_text}
				onMouseOver={e => {
					handleMouseOver(2);
				}}
				onMouseOut={e => {
					handleMouseOut();
				}}
			>
				{`${sharedMembers.length}명에게 공유됨`}
				{isHovering === 2 && (
					<AnimatePresence key={2}>
						<motion.div
							key={2}
							className={styles.mention_view_modal}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
							exit={{ opacity: 0, transition: { duration: 1 } }}
						>
							<SharedMembersHoverModal sharedMembers={sharedMembers} />
						</motion.div>
					</AnimatePresence>
				)}
			</div>
		</div>
	);
};

export default SharedMembers;
