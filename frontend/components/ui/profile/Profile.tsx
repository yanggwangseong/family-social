import React, { FC, useState } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';
import FeedPublicSelect from '../select/FeedPublicSelect';
import { Union, feedPublicSelectOptions } from 'types';

const Profile: FC<{
	commentContents?: string;
	profileImage?: string;
	username?: string;
	role?: string;
	isPublic?: Union<typeof feedPublicSelectOptions>;
	onChageIsPublic?: (status: Union<typeof feedPublicSelectOptions>) => void;
}> = ({
	commentContents,
	profileImage,
	username,
	role,
	isPublic,
	onChageIsPublic,
}) => {
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
				{isPublic && (
					<FeedPublicSelect
						onChageIsPublic={onChageIsPublic}
						isPublic={isPublic}
					/>
				)}
				{role && <div className={styles.profile_role}>관리자</div>}
			</div>
		</div>
	);
};

export default Profile;
