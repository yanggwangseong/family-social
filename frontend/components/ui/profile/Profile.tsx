import React, { FC } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';

const Profile: FC<{
	commentContents?: string;
	profileImage?: string;
	username?: string;
	role?: string;
}> = ({ commentContents, profileImage, username, role }) => {
	return (
		<div className={styles.profile_container}>
			<div className={styles.profile_img_container}>
				<Image
					className="rounded-full"
					width={40}
					height={40}
					src={'/images/profile/profile.png'}
					alt="img"
				></Image>
			</div>
			<div>
				{commentContents && (
					<>
						<div className={styles.profile_comment_username}>양광성</div>
						<div className={styles.profile_comment_contents}>
							{commentContents}
						</div>
					</>
				)}

				{username && <div className={styles.profile_username}>양광성</div>}
				{role && <div className={styles.profile_role}>관리자</div>}
			</div>
		</div>
	);
};

export default Profile;
