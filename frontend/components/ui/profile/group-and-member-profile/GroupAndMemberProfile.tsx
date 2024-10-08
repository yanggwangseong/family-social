import React, { FC } from 'react';
import styles from './GroupAndMemberProfile.module.scss';
import Image from 'next/image';
import { GroupAndMemberProfileProps } from './group-and-member-profile.interface';
import ChatDescription from '../../chat/ChatDescription';
import { useHover } from '@/hooks/useHover';
import { AnimatePresence, motion } from 'framer-motion';
import GroupHoverModal from '../../modal/group-hover-modal/GroupHoverModal';

const GroupAndMemberProfile: FC<GroupAndMemberProfileProps> = ({
	groupName,
	username,
	group,
	chat,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	const { groupCoverImage } = group;

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.group_profile_container}>
					<div
						className={styles.group_image_container}
						onMouseOver={e => {
							e.stopPropagation();
							handleMouseOver(0);
						}}
						onMouseOut={e => {
							e.stopPropagation();
							handleMouseOut(0);
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
									<GroupHoverModal sharedGroup={group} />
								</motion.div>
							</AnimatePresence>
						)}
					</div>
					<div className={styles.profile_container}>
						<Image
							className="rounded-full"
							fill
							src={'/images/profile/profile.png'}
							alt="img"
						></Image>
					</div>
				</div>
			</div>
			{chat ? (
				<ChatDescription chat={chat} />
			) : (
				<div className={styles.description_container}>
					<div className={styles.group_name}>{groupName}</div>
					<div className={styles.member_name}>{username}</div>
				</div>
			)}
		</div>
	);
};

export default GroupAndMemberProfile;
