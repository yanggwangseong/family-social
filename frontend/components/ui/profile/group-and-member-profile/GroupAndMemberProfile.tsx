import React, { FC } from 'react';
import styles from './GroupAndMemberProfile.module.scss';
import { GroupAndMemberProfileProps } from './group-and-member-profile.interface';
import ChatDescription from '../../chat/ChatDescription';
import { useHover } from '@/hooks/useHover';
import ProfileHoverContainerModal from '../../modal/profile-hover-container-modal/ProfileHoverContainerModal';

const GroupAndMemberProfile: FC<GroupAndMemberProfileProps> = ({
	group,
	member,
	chat,
}) => {
	const { handleMouseOver, handleMouseOut, isHovering } = useHover();

	return (
		<div className={styles.container}>
			<div>
				<ProfileHoverContainerModal
					group={group}
					member={member}
					handleMouseOver={handleMouseOver}
					handleMouseOut={handleMouseOut}
					isHovering={isHovering}
				/>
				{/* <div className={styles.group_profile_container}>
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
									<GroupHoverModal sharedGroup={group} />
								</motion.div>
							</AnimatePresence>
						)}
					</div>
					<div
						className={styles.profile_container}
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
							className="rounded-full"
							fill
							src={member.profileImage ?? '/images/profile/profile.png'}
							alt="profile-img"
						></Image>

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
									<MemberHoverModal
										mentionRecipient={member}
									></MemberHoverModal>
								</motion.div>
							</AnimatePresence>
						)}
					</div>
				</div> */}
			</div>
			{chat ? (
				<ChatDescription chat={chat} />
			) : (
				<div className={styles.description_container}>
					<div className={styles.group_name}>{group.groupName}</div>
					<div className={styles.member_name}>{member.username}</div>
				</div>
			)}
		</div>
	);
};

export default GroupAndMemberProfile;
