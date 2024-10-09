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
