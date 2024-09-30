import React, { FC } from 'react';
import styles from './Profile.module.scss';
import Image from 'next/image';
import FeedPublicSelect from '../select/FeedPublicSelect';
import { Union, feedPublicSelectOptions } from 'types';
import { ChatListResponse } from '@/shared/interfaces/chat.interface';
import MentionView from '../mention/mention-view/MentionView';
import DirectChatMembers from '../chat/direct-chat-members/DirectChatMembers';
import { CommentsResponse } from '@/shared/interfaces/comment.interface';

import ChatDescription from '../chat/ChatDescription';

const Profile: FC<{
	chat?: ChatListResponse;
	comment?: CommentsResponse;
	profileImage?: string;
	username?: string;
	email?: string;
	role?: string;
	isPublic?: Union<typeof feedPublicSelectOptions>;
	onChageIsPublic?: (status: Union<typeof feedPublicSelectOptions>) => void;
}> = ({
	chat,
	comment,
	profileImage,
	username,
	email,
	role,
	isPublic,
	onChageIsPublic,
}) => {
	return (
		<div className={styles.profile_container}>
			<DirectChatMembers chat={chat} profileImage={profileImage} />

			<div>
				{comment && (
					<>
						<div className={styles.profile_comment_username}>
							{comment.member.username}
						</div>
						<div className={styles.profile_comment_contents}>
							<MentionView
								contents={comment.commentContents}
								mentions={comment.mentions}
							></MentionView>
						</div>
					</>
				)}

				{username && <div className={styles.profile_username}>{username}</div>}
				{email && <div className={styles.profile_email}>{email}</div>}
				{isPublic && (
					<FeedPublicSelect
						onChageIsPublic={onChageIsPublic}
						isPublic={isPublic}
					/>
				)}
				{role && <div className={styles.profile_role}>관리자</div>}
			</div>
			{chat && <ChatDescription chat={chat} />}
		</div>
	);
};

export default Profile;
