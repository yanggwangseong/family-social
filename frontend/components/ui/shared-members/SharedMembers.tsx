import React, { FC } from 'react';
import Image from 'next/image';
import styles from './SharedMembers.module.scss';
import { SharedMembersProps } from './shared-members.interface';

const SharedMembers: FC<SharedMembersProps> = ({
	sharedMembers,
	sharedGroup,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.shared_members_img_container}>
				<Image
					fill
					src={
						sharedGroup.groupCoverImage ?? '/images/banner/sm/group-base-sm.png'
					}
					alt="img"
				></Image>
				<div className={styles.img_conatiner}>
					<Image
						className={styles.profile_img}
						fill
						src={
							sharedMembers.length > 0
								? sharedMembers[0].member.profileImage
								: '/images/banner/group-base.png'
						}
						alt=""
					></Image>
				</div>
			</div>
			<div className={styles.shared_text}>5명에게 공유됨</div>
		</div>
	);
};

export default SharedMembers;
