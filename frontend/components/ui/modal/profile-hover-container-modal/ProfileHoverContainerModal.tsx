import React, { FC } from 'react';
import Image from 'next/image';
import styles from './ProfileHoverContainerModal.module.scss';
import { ProfileHoverContainerModalProps } from './profile-hover-container-modal.interface';
import { AnimatePresence, motion } from 'framer-motion';
import GroupHoverModal from '../group-hover-modal/GroupHoverModal';
import MemberHoverModal from '../member-hover-modal/MemberHoverModal';

const ProfileHoverContainerModal: FC<ProfileHoverContainerModalProps> = ({
	group,
	member,
	handleMouseOver,
	handleMouseOut,
	isHovering,
}) => {
	return (
		<div className={styles.container}>
			{group && (
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
						src={group.groupCoverImage || '/images/banner/sm/group-base-sm.png'}
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
								<GroupHoverModal sharedGroup={group} />
							</motion.div>
						</AnimatePresence>
					)}
				</div>
			)}
			{member && (
				<div
					className={styles.profile_container}
					onMouseOver={e => {
						e.stopPropagation();
						handleMouseOver(1);
					}}
					onMouseOut={e => {
						e.stopPropagation();
						handleMouseOut();
					}}
				>
					<Image
						className="rounded-full"
						fill
						src={member.profileImage || '/images/profile/profile.png'}
						alt="profile-img"
					/>
					{isHovering === 1 && (
						<AnimatePresence key={1}>
							<motion.div
								key={1}
								className={styles.mention_view_modal}
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: { duration: 0.5 },
								}}
								exit={{ opacity: 0, transition: { duration: 1 } }}
							>
								<MemberHoverModal mentionRecipient={member} />
							</motion.div>
						</AnimatePresence>
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileHoverContainerModal;
