import React, { FC } from 'react';
import styles from './GroupAndMemberProfile.module.scss';
import Image from 'next/image';
import { GroupAndMemberProfileProps } from './group-and-member-profile.interface';

const GroupAndMemberProfile: FC<GroupAndMemberProfileProps> = ({
	groupName,
	username,
}) => {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.group_profile_container}>
					<Image
						fill
						src={'/images/banner/sm/group-base-sm.png'}
						alt="img"
					></Image>
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
			<div className={styles.description_container}>
				<div className={styles.group_name}>{groupName}</div>
				<div className={styles.member_name}>{username}</div>
			</div>
		</div>
	);
};

export default GroupAndMemberProfile;
