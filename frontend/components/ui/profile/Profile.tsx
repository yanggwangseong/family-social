import React, { FC, useState } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';
import FeedPublicSelect from '../select/FeedPublicSelect';
import { Union, feedPublicSelectOptions } from 'types';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';

const Profile: FC<{
	chat?: ChatListResponse;
	commentContents?: string;
	profileImage?: string;
	username?: string;
	email?: string;
	role?: string;
	isPublic?: Union<typeof feedPublicSelectOptions>;
	onChageIsPublic?: (status: Union<typeof feedPublicSelectOptions>) => void;
}> = ({
	chat,
	commentContents,
	profileImage,
	username,
	email,
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
				{email && <div className={styles.profile_email}>{email}</div>}
				{isPublic && (
					<FeedPublicSelect
						onChageIsPublic={onChageIsPublic}
						isPublic={isPublic}
					/>
				)}
				{role && <div className={styles.profile_role}>관리자</div>}
			</div>
			{chat && (
				<div className={styles.chat_container}>
					<div className={styles.chat_card_container}>
						<div className={styles.chat_top_container}>
							<div className={styles.chat_username}>
								{chat.recentMessage.memberName}
							</div>
							<div className={styles.chat_date}>오후 2:50</div>
						</div>
						<div className={styles.chat_message}>
							{chat.recentMessage.message}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
