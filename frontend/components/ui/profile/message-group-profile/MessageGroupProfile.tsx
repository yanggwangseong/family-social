import React, { FC } from 'react';
import styles from './MessageGroupProfile.module.scss';
import Image from 'next/image';
import { GroupProfileResponse } from '@/shared/interfaces/group.interface';
import ChatJoinMemberCount from '../../chat/chat-join-member-count/ChatJoinMemberCount';

const MessageGroupProfile: FC<{
	chatGroup: GroupProfileResponse;
	joinMemberCount: number;
}> = ({ chatGroup, joinMemberCount }) => {
	return (
		<div className={styles.container}>
			<div className={styles.group_profile_container}>
				<Image
					fill
					src={'/images/banner/sm/group-base-sm.png'}
					alt="img"
				></Image>
			</div>
			<div className={styles.group_profile_description_container}>
				<div className={styles.group_profile_description_top_container}>
					<div className={styles.group_name}>{chatGroup.groupName}</div>

					<ChatJoinMemberCount joinMemberCount={joinMemberCount} />
				</div>
				<div className={styles.group_description}>
					{chatGroup.groupDescription}
				</div>
			</div>
		</div>
	);
};

export default MessageGroupProfile;
